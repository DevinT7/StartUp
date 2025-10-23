import React, { useState, useMemo } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from "react-native";
import { Link } from "expo-router";
import { ALL_JOBS, Job } from "@/lib/mockData";
import { Ionicons } from "@expo/vector-icons";

export default function JobsScreen() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredJobs = useMemo(() => {
    if (!searchQuery) return ALL_JOBS;
    return ALL_JOBS.filter(
      (job) =>
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Job Opportunities</Text>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="gray" style={styles.searchIcon} />
        <TextInput
          placeholder="Search jobs or companies..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      
      <FlatList
        data={filteredJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          // This Link now points to our new job-detail screen
          <Link 
            href={{ 
              pathname: "/job-detail", 
              params: { id: item.id } 
            }} 
            asChild
          >
            <TouchableOpacity style={styles.card}>
              <View>
                <Text style={styles.jobTitle}>{item.title}</Text>
                <Text style={styles.subText}>{item.company}</Text>
                <Text style={styles.subText}>{item.location}</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#cc5500" />
            </TouchableOpacity>
          </Link>
        )}
      />
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
  card: { 
    backgroundColor: "#f8f8f8", 
    padding: 12, 
    borderRadius: 12, 
    marginVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  jobTitle: { fontSize: 18, fontWeight: "600" },
  subText: { fontSize: 14, color: "#555" },
});