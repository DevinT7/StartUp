import { View, StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen() {
  const friends = [
    { id: "1", name: "Alex", work: "Dell", coords: { latitude: 30.2672, longitude: -97.7431 } },
    { id: "2", name: "Jamie", work: "UT Library", coords: { latitude: 30.2849, longitude: -97.7341 } },
  ];

  return (
    <View style={styles.container}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: 30.2849,
          longitude: -97.7341,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {friends.map((f) => (
          <Marker key={f.id} coordinate={f.coords} title={f.name} description={`Works at ${f.work}`} />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});
