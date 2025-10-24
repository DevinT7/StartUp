import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Platform,
} from "react-native";
import { useData } from "@/lib/DataContext";
import { User } from "@/lib/mockData";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

// --- Dynamic Empty State ---
const EmptyState = ({ query }: { query: string }) => {
  const isSearching = query.length > 0;
  return (
    <View style={styles.emptyContainer}>
      <Ionicons
        name={isSearching ? "search-outline" : "people-outline"}
        size={64}
        color="#f0e6e0" // <-- THEME CHANGE: Light orange-tan
      />
      <Text style={styles.emptyText}>
        {isSearching ? "No Results Found" : "No Friends Yet"}
      </Text>
      <Text style={styles.emptySubText}>
        {isSearching
          ? "Try searching for a different name."
          : "Use the search bar above to find people."}
      </Text>
    </View>
  );
};

// --- Reusable List Header ---
const NetworkListHeader = ({
  query,
  onQueryChange,
  friendsCount,
}: {
  query: string;
  onQueryChange: (text: string) => void;
  friendsCount: number;
}) => (
  <View style={styles.headerContainer}>
    <Text style={styles.header}>My Network</Text>
    <Text style={styles.headerSubtext}>Find and manage your connections.</Text>
    <View style={styles.searchContainer}>
      <Ionicons
        name="search-outline"
        size={20}
        color="gray"
        style={styles.searchIcon}
      />
      <TextInput
        placeholder="Find people..."
        placeholderTextColor="#888"
        style={styles.searchInput}
        value={query}
        onChangeText={onQueryChange}
      />
    </View>
    {/* This header moves with the list */}
    <Text style={styles.listHeader}>
      {query.length > 0 ? "Search Results" : `My Friends (${friendsCount})`}
    </Text>
  </View>
);

// --- Reusable User Card ---
type UserCardProps = {
  user: User;
  variant: "friend" | "searchResult";
  onAddFriend: (user: User) => void;
};

const UserCard = React.memo(
  ({ user, variant, onAddFriend }: UserCardProps) => {
    // This is a "friend" in your network
    if (variant === "friend") {
      return (
        <Link
          href={{ pathname: "/user-profile", params: { id: user.id } }}
          asChild
        >
          <TouchableOpacity style={styles.card}>
            <View style={styles.cardTextContainer}>
              <Text style={styles.name}>{user.name}</Text>
              <Text style={styles.subText}>{user.work}</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color="#cc5500" // <-- THEME CHANGE: Make chevron orange
            />
          </TouchableOpacity>
        </Link>
      );
    }

    // This is a "search result" you can add
    return (
      <View style={styles.card}>
        <View style={styles.cardTextContainer}>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.subText}>{user.work}</Text>
        </View>
        <TouchableOpacity
          style={styles.addButton} // <-- THEME CHANGE: Style updated below
          onPress={() => onAddFriend(user)}
        >
          <Ionicons
            name="add"
            size={20}
            color="#fff" // <-- THEME CHANGE: Icon is white
          />
        </TouchableOpacity>
      </View>
    );
  }
);

// --- Main Screen ---
export default function NetworkScreen() {
  const { friends, nonFriends, addFriend } = useData();
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    return nonFriends.filter((user) => // <-- Add '=>'
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, nonFriends]);

  const handleAddFriend = (user: User) => {
    addFriend(user); // Call the function from context
    setSearchQuery(""); // Clear search
  };

  // Determine which list to show
  const listData = searchQuery.length > 0 ? searchResults : friends;
  const cardVariant = searchQuery.length > 0 ? "searchResult" : "friend";

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={listData}
        keyExtractor={(item) => item.id}
        // Render the new reusable card
        renderItem={({ item }) => (
          <UserCard
            user={item}
            variant={cardVariant}
            onAddFriend={handleAddFriend}
          />
        )}
        // Use the new header component
        ListHeaderComponent={
          <NetworkListHeader
            query={searchQuery}
            onQueryChange={setSearchQuery}
            friendsCount={friends.length}
          />
        }
        // Use the new empty state component
        ListEmptyComponent={<EmptyState query={searchQuery} />}
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
      />
    </SafeAreaView>
  );
}

// --- STYLES (WITH THEME CHANGES) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  // --- Header Styles ---
  headerContainer: {
    paddingTop: 16,
    paddingBottom: 10,
  },
  header: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#cc5500", // <-- THEME CHANGE: Burnt Orange
    marginBottom: 8,
  },
  headerSubtext: {
    fontSize: 16,
    color: "#666",
    marginBottom: 24,
  },
  // --- Search Bar Styles ---
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF6EE", // <-- THEME CHANGE: Light orange tint
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#f0e6e0", // <-- THEME CHANGE: Light orange border
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: "#333",
  },
  // --- List Header (Sub-header) ---
  listHeader: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 24,
    marginBottom: 10,
  },
  // --- Card Styles ---
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 18,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  cardTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: "#777",
    marginTop: 2,
  },
  addButton: {
    // <-- THEME CHANGE: Solid button
    backgroundColor: "#cc5500",
    width: 32,
    height: 32,
    borderRadius: 16, // Makes it a perfect circle
    alignItems: "center",
    justifyContent: "center",
  },
  // --- Empty State Styles ---
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: -80,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555", // <-- Kept this subtle for readability
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
  },
});