import { Image } from "expo-image";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import ParallaxScrollView from "@/components/parallax-scroll-view";
import { HelloWave } from "@/components/hello-wave";
import { Ionicons } from "@expo/vector-icons";
import { MY_PROFILE } from "@/lib/mockData"; // Import user data

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#FCEEE3", dark: "#1A1A1A" }}
      headerImage={
        <Image
          source={require("@/assets/images/banner.png")}
          style={styles.headerImage}
        />
      }
    >
      {/* Welcome Header */}
      <ThemedView style={styles.headerContainer}>
        <View>
          <ThemedText type="title" style={styles.titleText}>
            Welcome Back, {MY_PROFILE.name.split(" ")[0]}!
          </ThemedText>
          <ThemedText type="subtitle" style={styles.subText}>
            Ready to find your next opportunity?
          </ThemedText>
        </View>
        <HelloWave />
      </ThemedView>

      {/* Quick Actions */}
      <ThemedView style={styles.quickActions}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          Quick Access
        </ThemedText>

        <View style={styles.buttonRow}>
          <Link href="/(tabs)/jobs" asChild>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="briefcase-outline" size={42} color="#cc5500" />
              <ThemedText style={styles.actionText}>Jobs</ThemedText>
            </TouchableOpacity>
          </Link>

          <Link href="/(tabs)/map" asChild>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="map-outline" size={42} color="#cc5500" />
              <ThemedText style={styles.actionText}>Map</ThemedText>
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.buttonRow}>
          {/* This button is REPURPOSED */}
          <Link href="/(tabs)/reviews" asChild>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="people-outline" size={42} color="#cc5500" />
              <ThemedText style={styles.actionText}>Network</ThemedText>
            </TouchableOpacity>
          </Link>

          <Link href="/(tabs)/profile" asChild>
            <TouchableOpacity style={styles.actionButton}>
              <Ionicons name="person-outline" size={42} color="#cc5500" />
              <ThemedText style={styles.actionText}>Profile</ThemedText>
            </TouchableOpacity>
          </Link>
        </View>
      </ThemedView>

      {/* Tip / Info Section */}
      <ThemedView style={styles.tipCard}>
        <ThemedText type="subtitle" style={styles.tipTitle}>
          💡 Networking Tip
        </ThemedText>
        <ThemedText style={styles.tipText}>
          Check the 'Network' tab to see who you know at companies you're
          interested in. A referral can make all the difference!
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    height: 300,
    width: "80%",
    position: "absolute",
    bottom: -50,
    right: 35,
    resizeMode: "contain", // FIX: Use contentFit instead of resizeMode
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  titleText: {
    fontSize: 28,
    fontWeight: "700",
  },
  subText: {
    color: "#666",
    fontSize: 16,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
  },
  quickActions: {
    marginTop: 16,
    marginBottom: 24,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 14,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
    marginHorizontal: 6,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    width: 48,
    height: 48,
    marginBottom: 8,
  },
  actionText: {
    fontWeight: "600",
    color: "#333",
  },
  tipCard: {
    backgroundColor: "#FFF6EE",
    padding: 16,
    borderRadius: 16,
    marginBottom: 20,
  },
  tipTitle: {
    fontWeight: "600",
    marginBottom: 6,
  },
  tipText: {
    color: "#555",
    fontSize: 15,
    lineHeight: 20,
  },
});