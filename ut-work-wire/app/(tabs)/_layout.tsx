// app/(tabs)/_layout.tsx
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#cc5500",
        tabBarInactiveTintColor: "gray",
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = "home-outline";
          if (route.name === "jobs") iconName = "briefcase-outline";
          else if (route.name === "reviews") iconName = "chatbox-ellipses-outline";
          else if (route.name === "map") iconName = "map-outline";
          else if (route.name === "profile") iconName = "person-outline";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tabs.Screen name="jobs" options={{ title: "Jobs" }} />
      <Tabs.Screen name="reviews" options={{ title: "Reviews" }} />
      <Tabs.Screen name="map" options={{ title: "Map" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}
