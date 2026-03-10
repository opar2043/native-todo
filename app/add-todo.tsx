import {
  TextInput,
  View,
  Text,
  Alert,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import TodoItem from "../components/TodoItem";
import { useEffect, useState } from "react";
import { taskService } from "../components/shared/service/task.route";
import useAuth from "../components/Hooks/useAuth";
import { useRouter } from "expo-router";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [data, setData] = useState([]);
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  const { user, logOut } = useAuth();

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

  const handleUserLogout = async () => {
    try {
      await logOut();
      Alert.alert("Logout Successful!");
      router.replace('/')
    } catch (error) {
      Alert.alert("Sign Out Failed: " + error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      
      {/* HEADER */}
      <View className="flex-row justify-between items-center px-4 py-3 bg-white">

        <Text className="font-bold text-2xl">Todo List</Text>

        <TouchableOpacity onPress={() => setOpenMenu(!openMenu)}>
          <Image
            source={{
              uri: user?.photoURL || "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
            }}
            className="w-10 h-10 bg-blue-400 rounded-full"
          />
        </TouchableOpacity>

      </View>

      {/* PROFILE DROPDOWN */}
      {openMenu && (
        <View
          style={{
            position: "absolute",
            top: 70,
            right: 16,
            width: 220,
            backgroundColor: "white",
            borderRadius: 12,
            padding: 16,
            elevation: 10,
            zIndex: 1000,
          }}
        >
          {user?.photoURL && (
            <Image
              source={{ uri: user.photoURL }}
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                alignSelf: "center",
                marginBottom: 10,
              }}
            />
          )}

          <Text style={{ fontWeight: "bold", textAlign: "center", fontSize: 16 }}>
            {user?.displayName || "User"}
          </Text>

          <Text style={{ color: "gray", textAlign: "center", marginBottom: 10 }}>
            {user?.email}
          </Text>

          <TouchableOpacity
            style={{
              backgroundColor: "#ef4444",
              padding: 10,
              borderRadius: 8,
            }}
            onPress={handleUserLogout}
          >
            <Text style={{ color: "white", textAlign: "center", fontWeight: "bold" }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* TODO LIST */}
      <View className="flex-1">
        <TodoItem data={data} />
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

    </SafeAreaView>
  );
}