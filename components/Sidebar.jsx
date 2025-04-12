import { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated } from "react-native";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function Sidebar() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const slideAnim = useState(new Animated.Value(-Dimensions.get('window').width))[0];

  const routes = [
    { name: "Home", path: "/Home" },
    { name: "About", path: "/About" },
    { name: "Scroll View", path: "/scroll-view" },
  ];

  useEffect(() => {
    Animated.timing(slideAnim, {
      toValue: isOpen ? 0 : -Dimensions.get('window').width,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    router.push("/login");
  };

  return (
    <>
      {/* Menu Button */}
      <TouchableOpacity style={styles.menuButton} onPress={toggleSidebar}>
        <MaterialIcons name="menu" size={28} color="#FFD700" />
      </TouchableOpacity>

      {isOpen && (
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={toggleSidebar}
        />
      )}

      {/* Sidebar with Slide Animation */}
      <Animated.View 
        style={[
          styles.sidebar,
          {
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        {/* Sidebar Header */}
        <View style={styles.sidebarHeader}>
          <Text style={styles.sidebarTitle}>Dols Store</Text>
          <TouchableOpacity onPress={toggleSidebar}>
            <MaterialIcons name="close" size={24} color="#FFD700" />
          </TouchableOpacity>
        </View>

        
        {routes.map((route, index) => (
          <TouchableOpacity
            key={index}
            style={styles.navItem}
            onPress={() => {
              router.push(route.path);
              setIsOpen(false);
            }}
          >
            <Text style={styles.navText}>{route.name}</Text>
          </TouchableOpacity>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          style={[styles.navItem, styles.logoutButton]}
          onPress={handleLogout}
        >
          <Text style={styles.navText}>Logout</Text>
        </TouchableOpacity>
      </Animated.View>
    </>
  );
}

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    left: 15,
    top: 27,
    zIndex: 10,
    padding: 10,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 20,
  },
  sidebar: {
    width: windowWidth * 0.7,
    backgroundColor: "#1E1E1E",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
    zIndex: 30,
    borderRightWidth: 1,
    borderRightColor: "#333",
  },
  sidebarHeader: {
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  sidebarTitle: {
    color: "#FFD700",
    fontSize: 20,
    fontWeight: "bold",
  },
  navItem: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  navText: {
    color: "#FFF",
    fontSize: 16,
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: "#333",
    borderRadius: 5,
    borderBottomWidth: 0,
  },
});
