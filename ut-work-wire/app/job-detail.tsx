import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router";
import { ALL_JOBS } from "@/lib/mockData";
import { Ionicons } from "@expo/vector-icons";

export default function JobDetailScreen() {
  const { id } = useLocalSearchParams();
  const job = ALL_JOBS.find((j) => j.id === String(id));

  if (!job) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Job not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Adds a nice header with a back button */}
      <Stack.Screen options={{ title: job.company }} />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.company}>{job.company}</Text>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={16} color="#555" />
          <Text style={styles.subText}>{job.location}</Text>
        </View>

        <Text style={styles.sectionHeader}>Job Description</Text>
        <Text style={styles.description}>{job.description}</Text>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Apply Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  company: {
    fontSize: 18,
    fontWeight: "500",
    color: "#cc5500",
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  subText: {
    fontSize: 16,
    color: "#555",
    marginLeft: 6,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#444",
  },
  button: {
    marginTop: 32,
    backgroundColor: "#cc5500",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 16,
  },
});