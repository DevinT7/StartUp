import { SafeAreaView, Text, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My Profile</Text>
      <Text>Name: UT Student</Text>
      <Text>Major: Computer Science</Text>
      <Text>Graduation: 2026</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", color: "#cc5500", marginBottom: 12 },
});
