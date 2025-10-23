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
          if (route.name === "jobs") {
            iconName = "briefcase-outline";
          } else if (route.name === "reviews") { // File is 'reviews'
            iconName = "people-outline"; // Icon is 'people'
          } else if (route.name === "map") {
            iconName = "map-outline";
          } else if (route.name === "profile") {
            iconName = "person-outline";
          }
          // We'll add the 'index' (Home) tab
          else if (route.name === "index") {
             iconName = "home-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* This is your new Home tab */}
      <Tabs.Screen name="index" options={{ title: "Home" }} /> 
      
      <Tabs.Screen name="jobs" options={{ title: "Jobs" }} />
      
      {/* We are REPURPOSING reviews.tsx to be our Network screen */}
      <Tabs.Screen 
        name="reviews" 
        options={{ title: "Network" }} // Title is 'Network'
      />
      
      <Tabs.Screen name="map" options={{ title: "Map" }} />
      <Tabs.Screen name="profile" options={{ title: "Profile" }} />
    </Tabs>
  );
}