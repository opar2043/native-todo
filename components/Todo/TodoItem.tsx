import React from "react";
import { FlatList, View } from "react-native";
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
