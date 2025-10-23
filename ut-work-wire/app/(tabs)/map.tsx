import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
// import { MY_FRIENDS, MY_PROFILE } from "@/lib/mockData"; // <-- 1. DELETE THIS IMPORT
import { useData } from "@/lib/DataContext"; // <-- 2. ADD THIS IMPORT

export default function MapScreen() {
  const { profile, friends } = useData(); // <-- 3. GET DATA FROM CONTEXT

  // 4. This is now fully dynamic
  const allPins = [profile, ...friends]; 

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
            pinColor={person.id === profile.id ? "blue" : undefined} 
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});