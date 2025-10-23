import { SafeAreaView, Text, StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
// import { MY_PROFILE, MY_FRIENDS } from "@/lib/mockData"; // <-- 1. DELETE THIS IMPORT
import { useData } from "@/lib/DataContext"; // <-- 2. ADD THIS IMPORT
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function ProfileScreen() {
  const { profile, friends } = useData(); // <-- 3. GET DATA FROM CONTEXT

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Ionicons name="person-circle-outline" size={80} color="#cc5500" />
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.subText}>{profile.major}</Text>
        <Text style={styles.subText}>Class of {profile.graduation}</Text>
        <Text style={styles.subText}>Working at: {profile.work}</Text>
      </View>

      <View style={styles.friendsSection}>
        {/* 4. This count is now dynamic! */}
        <Text style={styles.sectionHeader}>My Friends ({friends.length})</Text>
        <FlatList
          data={friends.slice(0, 3)} // <-- 5. Use 'friends'
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.friendCard}>
              <Ionicons name="person-circle-outline" size={40} color="#555" />
              <Text style={styles.friendName}>{item.name.split(" ")[0]}</Text>
            </View>
          )}
        />
        <Link href="/(tabs)/reviews" asChild> 
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View All Friends</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

// ... STYLES (No changes, same as before)
const styles = StyleSheet.create({
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
  friendsSection: {
    padding: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  friendCard: {
    alignItems: "center",
    marginRight: 16,
    width: 80,
  },
  friendName: {
    fontSize: 14,
    color: "#333",
    marginTop: 4,
  },
  button: {
    marginTop: 16,
    backgroundColor: "#f0f0f0",
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#cc5500",
    textAlign: "center",
    fontWeight: "600",
  },
});