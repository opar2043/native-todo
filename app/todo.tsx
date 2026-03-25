import { View, Text, TextInput } from "react-native";
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

  const fetchData =  data && data.filter((d) => d.email == user.email);

  return (
    <View>
      {/* TODO LIST */}
      <View className="flex-1">
        <TodoItem data={fetchData} />
      </View>

      {/* ADD TODO INPUT */}
      <View className="flex-row items-center bg-white p-3 border-t border-gray-300">
        <TextInput
          placeholder="Add Your Todo"
          value={title}
          onChangeText={setTitle}
          className="flex-1 bg-gray-100 p-3 rounded-lg"
        />

        <Ionicons
          name="add-circle"
          size={35}
          color="#1E40AF"
          style={{ marginLeft: 10 }}
          onPress={handleAddTask}
        />
      </View>
    </View>
  );
}
