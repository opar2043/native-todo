import { View, FlatList } from "react-native";
import React from "react";
import TodoCard from "./TodoCard";

export default function TodoItem({ data }) {
  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <TodoCard item={item} />}
      />
    </View>
  );
}