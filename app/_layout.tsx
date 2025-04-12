import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Sidebar" options={{ title: "sidebar" }} />
      <Stack.Screen name="Home" options={{ title: "Home" }} />
      <Stack.Screen name="index" options={{ title: "index" }} />
      <Stack.Screen name="About" options={{ title: "About" }} />
      <Stack.Screen name="scroll-view" options={{ title: "Scroll View" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
      <Stack.Screen name="signup" options={{ title: "signup" }} />
    </Stack>
  );
}
