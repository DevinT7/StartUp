import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, SafeAreaView, StyleSheet } from "react-native";

export default function ReviewsScreen() {
  const [reviews, setReviews] = useState([
    { id: "1", place: "Dell", review: "Great internship experience, learned a lot!" },
    { id: "2", place: "UT Library", review: "Relaxed environment, flexible hours." },
  ]);
  const [place, setPlace] = useState("");
  const [newReview, setNewReview] = useState("");

  const addReview = () => {
    if (!place || !newReview) return;
    setReviews([...reviews, { id: Date.now().toString(), place, review: newReview }]);
    setPlace("");
    setNewReview("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Workplace Reviews</Text>
      <TextInput placeholder="Place name" style={styles.input} value={place} onChangeText={setPlace} />
      <TextInput
        placeholder="Write your review..."
        style={[styles.input, { height: 80 }]}
        value={newReview}
        onChangeText={setNewReview}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={addReview}>
        <Text style={styles.buttonText}>Submit Review</Text>
      </TouchableOpacity>

      <FlatList
        data={reviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.jobTitle}>{item.place}</Text>
            <Text style={styles.subText}>{item.review}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },
  header: { fontSize: 22, fontWeight: "bold", color: "#cc5500", marginBottom: 12 },
  input: { backgroundColor: "#f0f0f0", borderRadius: 10, padding: 10, marginBottom: 10 },
  button: { marginTop: 8, backgroundColor: "#cc5500", paddingVertical: 8, borderRadius: 8 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
  card: { backgroundColor: "#f8f8f8", padding: 12, borderRadius: 12, marginVertical: 8 },
  jobTitle: { fontSize: 18, fontWeight: "600" },
  subText: { fontSize: 14, color: "#555" },
});
