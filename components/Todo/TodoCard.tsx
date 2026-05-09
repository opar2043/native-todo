import { View, Text, TouchableOpacity, Alert, TextInput } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function TodoCard({ item }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);

const handleRemove = (id) => {
  Alert.alert("Delete Task", "Are you sure?", [
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

          if (!res.ok) throw new Error("Delete failed");

          const data = await res.json();
          console.log(data);

          if (data.deletedCount > 0) {
            Alert.alert("Success", "Deleted");
            
          }
        } catch (error) {
          console.log(error);
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
    <View className="bg-white border border-slate-100 p-5 rounded-md mb-4 flex-row justify-between items-center shadow-sm">
      
      {/* TITLE / EDIT INPUT */}
      <View className="flex-1 mr-4">
        {isEditing ? (
            <TextInput
            value={editedTitle}
            onChangeText={setEditedTitle}
            className="bg-slate-50 border border-indigo-600/20 p-3 rounded-md text-slate-900 font-bold"
            />
        ) : (
            <View>
                <Text className="text-slate-900 font-bold text-lg tracking-tight">{item.title}</Text>
                <View className="flex-row items-center mt-2">
                    <View className="bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-100 mr-2">
                        <Text className="text-indigo-600 font-extrabold text-[8px] uppercase tracking-widest">Active</Text>
                    </View>
                    <Text className="text-slate-400 font-bold text-[9px] uppercase tracking-widest">Project ID: {item._id.slice(-4)}</Text>
                </View>
            </View>
        )}
      </View>

      <View className="flex-row items-center">
        {/* EDIT / SAVE */}
        {isEditing ? (
          <TouchableOpacity 
            onPress={handleUpdate}
            className="bg-emerald-600 w-10 h-10 rounded-md items-center justify-center mr-2 shadow-sm"
          >
            <Ionicons name="checkmark" size={20} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity 
            onPress={() => setIsEditing(true)}
            className="bg-slate-50 w-10 h-10 rounded-md items-center justify-center border border-slate-100 mr-2 shadow-sm"
          >
            <Ionicons name="create-outline" size={20} color="#4F46E5" />
          </TouchableOpacity>
        )}

        {/* DELETE */}
        <TouchableOpacity 
            onPress={() => handleRemove(item._id)}
            className="bg-slate-50 w-10 h-10 rounded-md items-center justify-center border border-slate-100 shadow-sm"
        >
          <Ionicons name="trash-outline" size={20} color="#E11D48" />
        </TouchableOpacity>
      </View>
    </View>
  );
}