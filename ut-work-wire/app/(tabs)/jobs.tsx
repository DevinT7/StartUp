import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
  Platform, // Import Platform for shadows
} from "react-native";
import { Link } from "expo-router";
import { useData } from "@/lib/DataContext";
import { Ionicons } from "@expo/vector-icons";
import { Job } from "@/lib/mockData"; // Assuming Job type is exported from mockData

// --- Empty State Component (Styles Updated) ---
const EmptyJobsList = ({ query }: { query: string }) => (
  <View style={styles.emptyContainer}>
    <Ionicons
      name="search-outline"
      size={64}
      color="#f0e6e0" // <-- THEME CHANGE: Light orange-tan
    />
    <Text style={styles.emptyText}>No Jobs Found</Text>
    {query.length > 0 && (
      <Text style={styles.emptySubText}>Try adjusting your search query.</Text>
    )}
  </View>
);

// --- Job Card Component ---
// We memoize it so it only re-renders if its props change
const JobCard = React.memo(({ item }: { item: Job }) => (
  <Link href={{ pathname: "/job-detail", params: { id: item.id } }} asChild>
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardTextContainer}>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <Text style={styles.subText}>{item.company}</Text>
        <Text style={styles.subText}>{item.location}</Text>
      </View>
      <Ionicons
        name="chevron-forward"
        size={24}
        color="#cc5500" // <-- THEME CHANGE: This is already burnt orange!
      />
    </TouchableOpacity>
  </Link>
));

// --- List Header Component ---
const JobsListHeader = ({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (text: string) => void;
}) => (
  <View style={styles.headerContainer}>
    <Text style={styles.header}>Job Opportunities</Text> 
    <Text style={styles.headerSubtext}>Find your next opportunity.</Text>
    <View style={styles.searchContainer}>
      <Ionicons
        name="search-outline"
        size={20}
        color="gray"
        style={styles.searchIcon}
      />
      <TextInput
        placeholder="Search jobs or companies..."
        placeholderTextColor="#888"
        style={styles.searchInput}
        value={query}
        onChangeText={onQueryChange}
      />
    </View>
  </View>
);

// --- Main Screen ---
export default function JobsScreen() {
  const { jobs, loading } = useData();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = useMemo(() => {
    if (!searchQuery) return jobs;
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, jobs]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#cc5500" /> {/* This is already themed */}
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <JobCard item={item} />}
        // Use the new header component
        ListHeaderComponent={
          <JobsListHeader
            query={searchQuery}
            onQueryChange={setSearchQuery}
          />
        }
        // Use the empty state component
        ListEmptyComponent={<EmptyJobsList query={searchQuery} />}
        // Add padding to the content
        contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 20 }}
      />
    </SafeAreaView>
  );
}

// --- STYLES (WITH THEME CHANGES) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // Clean white background
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  // --- Header Styles ---
  headerContainer: {
    paddingTop: 16,
    paddingBottom: 20, // Space before the list starts
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
  // --- Card Styles ---
  card: {
    backgroundColor: "#fff", // White cards
    borderRadius: 16,
    padding: 18,
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // Modern Shadow
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
    flex: 1, // Ensures text container takes available space
    marginRight: 10, // Space between text and chevron
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: "600", // Semibold is cleaner
    color: "#333",
    marginBottom: 4,
  },
  subText: {
    fontSize: 14,
    color: "#777", // Lighter gray for secondary info
    marginTop: 2,
  },
  // --- Empty State Styles ---
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginTop: -80, // Adjust to center it more visually
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#555",
    marginTop: 16,
  },
  emptySubText: {
    fontSize: 14,
    color: "#999",
    marginTop: 8,
    textAlign: "center",
  },
});