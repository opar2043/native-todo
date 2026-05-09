import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import TodoItem from "../components/Todo/TodoItem";
import { Ionicons } from "@expo/vector-icons";
import { taskService } from "../components/shared/service/task.route";
import useAuth from "../components/Hooks/useAuth";

export default function Todo() {
  const [title, setTitle] = useState("");
  const [data, setData] = useState();
  const { user } = useAuth();
  const fetchTasks = () => {
    fetch("https://task-management-server-one-gamma.vercel.app/tasks")
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!user || !title) return;

    const obj = {
      title,
      isDone: false,
      name: user.displayName || "N/A",
      email: user.email || "N/A",
    };

    try {
      await taskService.addTask(obj);
      setTitle("");
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData =  data && data.filter((d) => d.email == user?.email);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1">
        {/* HEADER */}
        <View className="px-6 pt-10 pb-6 border-b border-slate-50">
          <Text className="text-indigo-600 font-extrabold text-[10px] uppercase tracking-[4px] mb-1">Project Management</Text>
          <Text className="text-3xl font-bold text-slate-900">Task Board</Text>
        </View>

        {/* TODO LIST */}
        <View className="flex-1 px-4 pt-4">
          <TodoItem data={fetchData} />
        </View>

        {/* ADD TODO INPUT */}
        <View className="p-6 bg-slate-50 border-t border-slate-100 flex-row items-center">
          <TextInput
            placeholder="Log new assignment..."
            placeholderTextColor="#94A3B8"
            value={title}
            onChangeText={setTitle}
            className="flex-1 bg-white border border-slate-200 p-4 rounded-md text-slate-900 font-bold mr-4 shadow-sm"
          />

          <TouchableOpacity 
            onPress={handleAddTask}
            className="bg-indigo-600 w-14 h-14 rounded-md items-center justify-center shadow-md shadow-indigo-600/20"
          >
            <Ionicons name="add" size={32} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
