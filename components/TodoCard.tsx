import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function TodoCard({ item }) {

  const handleRemove = (id) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const res = await fetch(
                `https://task-management-server-one-gamma.vercel.app/tasks/${id}`,
                {
                  method: "DELETE",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );

              const data = await res.json();

              if (data.deletedCount > 0) {
                Alert.alert("Success", "Task Deleted Successfully");
              } else {
                Alert.alert("Error", "Failed to delete task");
              }
            } catch (error) {
              Alert.alert("Error", "Something went wrong");
            }
          },
        },
      ]
    );
  };

  return (
    <View className="flex-row justify-between p-4 border-b border-gray-300">
      <View>
        <Text className="text-lg">{item.title}</Text>
      </View>

      <TouchableOpacity onPress={() => handleRemove(item._id)}>
        <Ionicons name="trash" size={25} color="red" />
      </TouchableOpacity>
    </View>
  );
}