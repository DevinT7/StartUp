import { View, StyleSheet, Image, Text } from "react-native";
import MapView, {
  Marker,
  Callout,
  MapViewProps,
} from "react-native-maps";
import { useData } from "@/lib/DataContext";

interface Person {
  id: string | number;
  coords: {
    latitude: number;
    longitude: number;
  };
  profilePic?: string; // Made optional if some might not have it
  name: string;
  work: string;
}

const mapStyle: MapViewProps["customMapStyle"] = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
];

export default function MapScreen() {
  const { profile, friends } = useData() as unknown as {
    profile: Person;
    friends: Person[];
  };

  const allPins = [profile, ...friends];

  // Temporary placeholder image URL
  const DEFAULT_PFP_URL = 'https://via.placeholder.com/40/FF5733/FFFFFF?text=PFP'; // Example: orange background, white text "PFP"

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
        customMapStyle={mapStyle}
      >
        {allPins.map((person) => {
          const isUser = person.id === profile.id;

          return (
            <Marker
              key={person.id}
              coordinate={person.coords}
            >
              <View
                style={[
                  styles.markerContainer,
                  isUser ? styles.userMarkerBorder : styles.friendMarkerBorder,
                ]}
              >
                <Image
                  // Use person.profilePic if available, otherwise use the default
                  source={{ uri: person.profilePic || DEFAULT_PFP_URL }}
                  style={styles.markerImage}
                />
              </View>

              <Callout tooltip>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutTitle}>{person.name}</Text>
                  <Text style={styles.calloutDescription}>
                    Works at {person.work}
                  </Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  markerContainer: {
    padding: 3,
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userMarkerBorder: {
    borderColor: "#007AFF",
    borderWidth: 3,
  },
  friendMarkerBorder: {
    borderColor: "#a3a3a3",
    borderWidth: 2,
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  calloutContainer: {
    width: 150,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  calloutDescription: {
    fontSize: 14,
    color: "#333",
  },
});