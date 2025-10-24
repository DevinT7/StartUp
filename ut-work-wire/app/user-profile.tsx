// app/user-profile.tsx

import { useLocalSearchParams, Stack } from "expo-router";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";
import { useData } from "@/lib/DataContext";
import { Ionicons } from "@expo/vector-icons";

export default function UserProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { friends, nonFriends, profile, loading } = useData();

  // Find the user from all possible lists
  const user = [profile, ...friends, ...nonFriends].find((u) => u.id === id);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#cc5500" />
      </View>
    );
  }

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
        <Stack.Screen options={{ title: "Not Found" }} />
        <View style={styles.profileHeader}>
          <Text style={styles.name}>User Not Found</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Use the 'Stack.Screen' component to set the title of the page
  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen options={{ title: user.name }} />
      <View style={styles.profileHeader}>
        <Ionicons name="person-circle-outline" size={80} color="#cc5500" />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.subText}>{user.major}</Text>
        <Text style={styles.subText}>Class of {user.graduation}</Text>
        <Text style={styles.subText}>Working at: {user.work}</Text>
      </View>

      {/* You could add more sections here later */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: { flex: 1, backgroundColor: "#fff" },
  profileHeader: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 8,
  },
  subText: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },
});