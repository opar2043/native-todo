import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useAuth from "../components/Hooks/useAuth";

export default function AddTodo() {

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




return (
  <SafeAreaView className="flex-1 bg-gray-100">

    {/* MAIN CONTENT */}
    <View className="flex-1 px-4 pt-6 pb-24">

      {/* HEADER */}
      <View className="mb-5">
        <Text className="text-gray-500 text-sm">Welcome back</Text>
        <Text className="text-2xl font-bold">
          {user?.displayName || "User"}
        </Text>
      </View>

      {/* WHITE CARD (MAIN UI) */}
      <View className="bg-white rounded-2xl p-5 shadow-sm">

        {/* USER INFO */}
        <View className="flex-row items-center mb-5">
          <Image
            source={{
              uri:
                user?.photoURL ||
                "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
            }}
            className="w-14 h-14 rounded-full mr-3"
          />
          <View>
            <Text className="font-bold text-lg">
              {user?.displayName || "User"}
            </Text>
            <Text className="text-gray-500 text-sm">
              {user?.email}
            </Text>
          </View>
        </View>

        {/* STATS */}
        <View className="flex-row justify-between mb-6">
          <View className="bg-gray-100 p-4 rounded-xl w-[48%]">
            <Text className="text-lg font-bold">{data.length}</Text>
            <Text className="text-gray-500">Total Tasks</Text>
          </View>

          <View className="bg-gray-100 p-4 rounded-xl w-[48%]">
            <Text className="text-lg font-bold">
              {data.filter(t => t.isDone).length}
            </Text>
            <Text className="text-gray-500">Completed</Text>
          </View>
        </View>

        {/* QUICK TOOLS */}
        <Text className="font-semibold mb-3">Quick Tools</Text>

        <View className="flex-row justify-between">

          <TouchableOpacity
            className="items-center"
            onPress={() => router.push("/weather")}
          >
            <View className="bg-gray-100 p-3 rounded-full mb-1">
              <Ionicons name="cloud" size={22} color="black" />
            </View>
            <Text className="text-xs">Weather</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            onPress={() => router.push("/bmi")}
          >
            <View className="bg-gray-100 p-3 rounded-full mb-1">
              <Ionicons name="fitness" size={22} color="black" />
            </View>
            <Text className="text-xs">BMI</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            onPress={() => router.push("/calculator")}
          >
            <View className="bg-gray-100 p-3 rounded-full mb-1">
              <Ionicons name="calculator" size={22} color="black" />
            </View>
            <Text className="text-xs">Calc</Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="items-center"
            onPress={() => router.push("/todo")}
          >
            <View className="bg-gray-100 p-3 rounded-full mb-1">
              <Ionicons name="checkbox" size={22} color="black" />
            </View>
            <Text className="text-xs">Todo</Text>
          </TouchableOpacity>

        </View>
      </View>

      {/* EXTRA SECTION (optional nice touch) */}
      <View className="bg-white rounded-2xl p-5 mt-5">
        <Text className="font-semibold mb-2">Daily Tip</Text>
        <Text className="text-gray-500 text-sm">
          Stay consistent. Small daily progress leads to big results 🚀
        </Text>
      </View>

    </View>

    {/* BOTTOM NAVIGATION */}
    <View
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        backgroundColor: "white",
        paddingVertical: 12,
        borderTopWidth: 1,
        borderColor: "#e5e7eb",
      }}
    >
      <TouchableOpacity onPress={() => router.replace("/")}>
        <Ionicons name="home" size={26} color="#111" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/todo")}>
        <Ionicons name="checkbox" size={26} color="#111" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/weather")}>
        <Ionicons name="cloud" size={26} color="#111" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/bmi")}>
        <Ionicons name="fitness" size={26} color="#111" />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/calculator")}>
        <Ionicons name="calculator" size={26} color="#111" />
      </TouchableOpacity>
    </View>

  </SafeAreaView>
);
}
