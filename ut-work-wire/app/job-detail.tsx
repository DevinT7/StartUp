import React from 'react'; // <-- Removed useLayoutEffect
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Alert, Share } from "react-native";
import { useLocalSearchParams, Stack } from "expo-router"; // <-- Removed useRouter
import * as WebBrowser from 'expo-web-browser'; 
import { useData } from "@/lib/DataContext"; 
import { Ionicons } from "@expo/vector-icons";

export default function JobDetailScreen() {
  const { jobs } = useData(); 
  const { id } = useLocalSearchParams();
  const job = jobs.find((j) => j.id === String(id));

  // Function to open browser (no change)
  const handleApply = async () => {
    if (!job) return;
    let url = `https://google.com/search?q=${job.company} ${job.title} careers`;
    await WebBrowser.openBrowserAsync(url);
  };

  // Function to share (no change)
  const handleShare = async () => {
    if (!job) return;
    try {
      await Share.share({
        message: `Check out this job: ${job.title} at ${job.company}!`,
      });
    } catch (error: any) {
      Alert.alert(error.message);
    }
  };

  // We removed the useLayoutEffect hook completely

  if (!job) {
    return (
      <SafeAreaView style={styles.container}>
        {/* Add a default Stack.Screen for the 'not found' state */}
        <Stack.Screen options={{ title: "Not Found" }} />
        <Text style={styles.title}>Job not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* --- THIS IS THE FIX ---
        We declare the screen options right here in the render.
        This is the modern Expo Router way to set dynamic options.
      */}
      <Stack.Screen 
        options={{ 
          title: job.company,
          headerRight: () => (
            <TouchableOpacity onPress={handleShare} style={{ marginRight: 10 }}>
              <Ionicons name="share-social-outline" size={24} color="#cc5500" />
            </TouchableOpacity>
          ),
        }} 
      />
      {/* --- END OF FIX --- */}
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>{job.title}</Text>
        <Text style={styles.company}>{job.company}</Text>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={16} color="#555" />
          <Text style={styles.subText}>{job.location}</Text>
        </View>

        <Text style={styles.sectionHeader}>Job Description</Text>
        <Text style={styles.description}>{job.description}</Text>

        <TouchableOpacity style={styles.button} onPress={handleApply}>
          <Text style={styles.buttonText}>Apply Now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// ... STYLES (No changes, same as before)
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