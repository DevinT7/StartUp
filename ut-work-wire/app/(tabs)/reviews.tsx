import React, { useState, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from "react-native";
import { ALL_USERS, MY_FRIENDS, User } from "@/lib/mockData";
import { Ionicons } from "@expo/vector-icons";

// In a real app, you'd manage this state in a context or with a hook
const myFriendIds = new Set(MY_FRIENDS.map((f) => f.id));

export default function NetworkScreen() { // Renamed component
  const [searchQuery, setSearchQuery] = useState("");

  const searchResults = useMemo(() => {
    if (!searchQuery) return [];
    // Filter users who are NOT already friends
    return ALL_USERS.filter(
      (user) =>
        !myFriendIds.has(user.id) &&
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const addFriend = (user: User) => {
    // In a real app, this would be an API call
    console.log("Adding friend:", user.name);
    myFriendIds.add(user.id);
    MY_FRIENDS.push(user);
    setSearchQuery(""); // Clear search
    // You would then need to trigger a re-render
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Network</Text>

      {/* Find Friends Section */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          placeholder="Find people..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Conditional List: Search Results or My Friends */}
      {searchQuery.length > 0 ? (
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<Text style={styles.listHeader}>Search Results</Text>}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.subText}>{item.work}</Text>
              </View>
              <TouchableOpacity style={styles.addButton} onPress={() => addFriend(item)}>
                <Ionicons name="add" size={24} color="#cc5500" />
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <FlatList
          data={MY_FRIENDS}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={<Text style={styles.listHeader}>My Friends ({MY_FRIENDS.length})</Text>}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.subText}>{item.work}</Text>
              </View>
              <Ionicons name="checkmark" size={24} color="green" />
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", color: "#cc5500", marginBottom: 12 },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  listHeader: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 16,
    borderRadius: 12,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: { fontSize: 18, fontWeight: "600" },
  subText: { fontSize: 14, color: "#555" },
  addButton: {
    borderColor: "#cc5500",
    borderWidth: 1.5,
    borderRadius: 20,
    padding: 4,
  },
});