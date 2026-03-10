import { TextInput, View, Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import TodoItem from "../components/TodoItem";
import { useEffect, useState } from "react";
import { taskService } from "../components/shared/service/task.route";
export const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);

  const fetchTasks = () => {
    fetch("https://task-management-server-one-gamma.vercel.app/tasks")
      .then((res) => res.json())
      .then((data) => setData(data));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    if (!title) return;

    await taskService.addTask({ title });

    setTitle("");
    fetchTasks();
  };
  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <Text className="font-bold px-4 text-2xl">Todo List</Text>

      <View className="flex-1">
        <TodoItem data={data} />
      </View>

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
    </SafeAreaView>
  );
};
