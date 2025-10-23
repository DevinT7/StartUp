import { View, Text, FlatList, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";

export default function JobsScreen() {
  const jobs = [
    { id: "1", title: "Research Assistant", location: "UT Austin - Liberal Arts", company: "UT Austin" },
    { id: "2", title: "Software Intern", location: "Downtown Austin", company: "Dell" },
    { id: "3", title: "Marketing Assistant", location: "Campus Area", company: "Student Media" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Job Opportunities</Text>
      <FlatList
        data={jobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.jobTitle}>{item.title}</Text>
            <Text style={styles.subText}>{item.company}</Text>
            <Text style={styles.subText}>{item.location}</Text>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>View Details</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", color: "#cc5500", marginBottom: 12 },
  card: { backgroundColor: "#f8f8f8", padding: 12, borderRadius: 12, marginVertical: 8 },
  jobTitle: { fontSize: 18, fontWeight: "600" },
  subText: { fontSize: 14, color: "#555" },
  button: { marginTop: 8, backgroundColor: "#cc5500", paddingVertical: 8, borderRadius: 8 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
