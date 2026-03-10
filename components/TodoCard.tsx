import { View, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function TodoCard({ item }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);

  const handleRemove = (id) => {
    Alert.alert("Delete Task", "Are you sure you want to delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          try {
            const res = await fetch(
              `https://task-management-server-one-gamma.vercel.app/tasks/${id}`,
              { method: "DELETE" }
            );

            const data = await res.json();

            if (data.deletedCount > 0) {
              Alert.alert("Success", "Task Deleted Successfully");
            }
          } catch (error) {
            Alert.alert("Error", "Something went wrong");
          }
        },
      },
    ]);
  };

const handleUpdate = async () => {
  try {
    const res = await fetch(
      `https://task-management-server-one-gamma.vercel.app/tasks/${item._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editedTitle,
        }),
      }
    );

    const data = await res.json();

    if (data.modifiedCount > 0) {
      // Show alert with the updated title
      Alert.alert("Success", `Task Updated to: "${editedTitle}"`);
      setIsEditing(false);
    } else {
      Alert.alert("Info", "No changes were made");
    }
  } catch (error) {
    Alert.alert("Error", "Update failed");
  }
};

  return (
    <View className="flex-row justify-between items-center p-4 border-b border-gray-300">
      
      {/* TITLE / EDIT INPUT */}
      {isEditing ? (
        <TextInput
          value={editedTitle}
          onChangeText={setEditedTitle}
          className="flex-1 border p-2 rounded mr-3"
        />
      ) : (
        <Text className="text-lg flex-1">{item.title}</Text>
      )}

      <View className="flex-row gap-3">
        
        {/* DELETE */}
        <TouchableOpacity onPress={() => handleRemove(item._id)}>
          <Ionicons name="trash" size={25} color="red" />
        </TouchableOpacity>

        {/* EDIT / SAVE */}
        {isEditing ? (
          <TouchableOpacity onPress={handleUpdate}>
            <Ionicons name="checkmark" size={25} color="green" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setIsEditing(true)}>
            <Ionicons name="create-outline" size={25} color="blue" />
          </TouchableOpacity>
        )}

      </View>
    </View>
  );
}