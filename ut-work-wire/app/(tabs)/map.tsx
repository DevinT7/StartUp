import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { MY_FRIENDS, MY_PROFILE } from "@/lib/mockData"; // Import dynamic data

export default function MapScreen() {
  // Combine yourself and your friends for the map
  const allPins = [MY_PROFILE, ...MY_FRIENDS];

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 30.2849, // Center on UT Austin
          longitude: -97.7341,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {allPins.map((person) => (
          <Marker
            key={person.id}
            coordinate={person.coords}
            title={person.name}
            description={`Works at ${person.work}`}
            pinColor={person.id === MY_PROFILE.id ? "blue" : undefined} // Differentiate user
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});