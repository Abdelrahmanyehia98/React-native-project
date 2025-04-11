import { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, TextInput, FlatList, Alert } from "react-native";
import Sidebar from "../components/Sidebar";
import { MaterialIcons, FontAwesome, Ionicons } from "@expo/vector-icons";

const products = [
  {
    id: 1,
    name: "Wireless Earbuds",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.5,
    reviews: 1245,
    image: require("../assets/earbuds.jpg")
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.2,
    reviews: 892,
    image: require("../assets/smartWatch.jpg")
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 45.99,
    originalPrice: 59.99,
    rating: 4.7,
    reviews: 2103,
    image: require("../assets/speakers.jpg")
  },
  {
    id: 4,
    name: "4K Smart TV",
    price: 499.99,
    originalPrice: 599.99,
    rating: 4.8,
    reviews: 3567,
    image: require("../assets/tv.jpg")
  },
];

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart([...cart, product]);
    Alert.alert("Added to Cart", `${product.name} was added to your cart`);
  };

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FontAwesome key={i} name="star" size={16} color="#FFD700" />);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<FontAwesome key={i} name="star-half-o" size={16} color="#FFD700" />);
      } else {
        stars.push(<FontAwesome key={i} name="star-o" size={16} color="#FFD700" />);
      }
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <Sidebar />
       <View style={styles.header}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search ...."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity style={styles.searchButton}>
            <MaterialIcons name="search" size={24} color="#FFD700" />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.cartButton}>
          <FontAwesome name="shopping-cart" size={24} color="#FFD700" />
          {cart.length > 0 && (
            <View style={styles.cartBadge}>
              <Text style={styles.cartBadgeText}>{cart.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Store Banner */}
      <View style={styles.bannerContainer}>
        <Text style={styles.storeName}>STORE</Text>
        <Text style={styles.storeTagline}>Premium Tech at Golden Prices</Text>
      </View>

      {/* Products Grid */}
      <FlatList
        data={filteredProducts}
        numColumns={2}
        contentContainerStyle={styles.productsGrid}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            <Image source={item.image} style={styles.productImage} />
            <View style={styles.productDetails}>
              <Text style={styles.productName} numberOfLines={2}>{item.name}</Text>

              <View style={styles.ratingContainer}>
                {renderStars(item.rating)}
                <Text style={styles.ratingText}>{item.rating}</Text>
              </View>

              <Text style={styles.reviewsText}>{item.reviews.toLocaleString()} ratings</Text>

              <View style={styles.priceContainer}>
                <Text style={styles.price}>${item.price.toFixed(2)}</Text>
                <Text style={styles.originalPrice}>${item.originalPrice.toFixed(2)}</Text>
              </View>

              <Text style={styles.deliveryBadge}>Dols Premium Delivery</Text>

              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.addToCartText}>Add to Cart</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  mainContent: {
    flex: 1,
    zIndex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1E1E1E",
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  menuButton: {
    padding: 8,
    marginRight: 10,
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    top: 50,
    left:30,
    backgroundColor: "#2D2D2D",
    borderRadius: 8,
    marginHorizontal: 5,
    height: 40,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: 15,
    fontSize: 16,
    color: "#FFF",
  },
  searchButton: {
    padding: 8,
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  cartButton: {
    padding: 8,
    position: "relative",
    top:13,
  },
  cartBadge: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "#FFD700",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  cartBadgeText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "bold",
  },
  bannerContainer: {
    top: 40,
    backgroundColor: "#1E1E1E",
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  storeName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFD700",
    letterSpacing: 2,
  },
  storeTagline: {
    fontSize: 14,
    color: "#AAA",
    marginTop: 5,
  },
  productsGrid: {
    padding: 50,
  },
  productCard: {
    flex: 1,
    margin: 5,
    backgroundColor: "#1E1E1E",
    borderRadius: 10,
    overflow: "hidden",
    maxWidth: "48%",
    borderWidth: 1,
    borderColor: "#333",
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "contain",
    backgroundColor: "#2D2D2D",
  },
  productDetails: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    marginBottom: 5,
    height: 40,
    color: "#FFF",
    fontWeight: '500',
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 2,
  },
  ratingText: {
    marginLeft: 5,
    color: "#FFD700",
    fontSize: 14,
  },
  reviewsText: {
    color: "#AAA",
    fontSize: 12,
    marginBottom: 5,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFD700",
  },
  originalPrice: {
    fontSize: 12,
    textDecorationLine: "line-through",
    color: "#777",
    marginLeft: 5,
  },
  deliveryBadge: {
    fontSize: 12,
    color: "#FFD700",
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: "#333",
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFD700",
  },
  addToCartText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#FFD700",
  },
});