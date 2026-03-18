import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data.users));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Users: {users.length} - From Rijoan Rashid Opar, CSE 2302029019</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />

            <Text style={styles.name}>
              {item.firstName} {item.lastName}
            </Text>

            <Text>Age: {item.age}</Text>
            <Text>Gender: {item.gender}</Text>
            <Text>Blood: {item.bloodGroup}</Text>
            <Text>Phone: {item.phone}</Text>

            <Text>
              Address: {item.address.address}, {item.address.city},{" "}
              {item.address.country}
            </Text>

            <Text>Username: {item.username}</Text>
            <Text>Company: {item.company.name} ,{item.role}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  card: {
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },

  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginBottom: 8,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
});