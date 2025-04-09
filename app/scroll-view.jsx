import { useState } from "react";
import { View, Text, ScrollView, Image, TouchableOpacity, StyleSheet, Button, TextInput,StatusBar } from "react-native";
import Sidebar from "../components/Sidebar";

const initialData = [
  { id: 1, image: require("../assets/lemon.png") }, 
  { id: 2, image: require("../assets/mango.png") }, 
  { id: 3, image: require("../assets/icon.png")  }, 
  { id: 4, image: require("../assets/lemon.png") }, 
  { id: 5, image: require("../assets/mango.png") }, 
  { id: 6, image: require("../assets/lemon.png") }, 
  { id: 7, image: require("../assets/mango.png") }, 
  { id: 8, image: require("../assets/lemon.png") }, 
];

export default function HomeScreen() {
  const [data, setData] = useState(initialData);
  const [searchQuery, setSearchQuery] = useState("");

  const deleteItem = (id) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const restoreData = () => {
    setData(initialData);
  };

  const filteredData = data.filter((item) =>
    item.id.toString().includes(searchQuery)
  );

  return (
    <View style={styles.container}>
      <Sidebar />
      <View style={styles.content}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search "
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <Button style={styles.button} title="Restore" onPress={restoreData} />

        <ScrollView>
          {filteredData.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => deleteItem(item.id)}>
              <View style={styles.item}>
                <Image source={item.image} style={styles.image} />
                <Text style={styles.text}>ID: {item.id}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

       
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  item: {
    top: 40,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    backgroundColor: "blue",
    borderRadius: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  text: {
    fontSize: 16,
  },
  searchInput: {
    top: 40,
    height: 30,
    borderColor: "#ccc",
    borderWidth: 3,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 40,
  },
  button: {
    top:40,
    height: 30,
    marginBottom: 40,
    borderColor: "red",
  },
});