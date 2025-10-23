import { SafeAreaView, Text, StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { MY_PROFILE, MY_FRIENDS } from "@/lib/mockData";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileHeader}>
        <Ionicons name="person-circle-outline" size={80} color="#cc5500" />
        <Text style={styles.name}>{MY_PROFILE.name}</Text>
        <Text style={styles.subText}>{MY_PROFILE.major}</Text>
        <Text style={styles.subText}>Class of {MY_PROFILE.graduation}</Text>
        <Text style={styles.subText}>Working at: {MY_PROFILE.work}</Text>
      </View>

      <View style={styles.friendsSection}>
        <Text style={styles.sectionHeader}>My Friends ({MY_FRIENDS.length})</Text>
        <FlatList
          data={MY_FRIENDS.slice(0, 3)} // Show first 3 friends as a preview
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
        {/* Link to the 'reviews' file, which is now our Network screen */}
        <Link href="/(tabs)/reviews" asChild> 
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>View All Friends</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

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