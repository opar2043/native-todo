import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
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
    <SafeAreaView className="flex-1 bg-slate-50">
      {/* MAIN CONTENT */}
      <ScrollView className="flex-1 px-6 pt-6">
        
        {/* EXECUTIVE HEADER */}
        <View className="flex-row justify-between items-center mb-8">
          <View>
            <Text className="text-indigo-600 text-xs font-extrabold uppercase tracking-widest">System Dashboard</Text>
            <Text className="text-3xl font-bold text-slate-900">
              Good day, {user?.displayName?.split(' ')[0] || "User"}
            </Text>
          </View>
          <TouchableOpacity 
            onPress={() => setOpenMenu(!openMenu)}
            className="w-12 h-12 rounded-md bg-white border border-slate-200 items-center justify-center shadow-sm"
          >
            <Ionicons name="apps" size={24} color="#4F46E5" />
          </TouchableOpacity>
        </View>

        {/* ANALYTICS SUMMARY */}
        <View className="bg-white border border-slate-100 rounded-md p-6 mb-8 shadow-sm">
          <View className="flex-row items-center mb-6">
            <View className="w-16 h-16 rounded-md bg-slate-100 items-center justify-center mr-4 border border-slate-200">
                <Image
                source={{
                    uri: user?.photoURL || "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
                }}
                className="w-14 h-14 rounded-md"
                />
            </View>
            <View>
              <Text className="font-bold text-xl text-slate-900">{user?.displayName || "Member"}</Text>
              <Text className="text-slate-400 font-medium text-sm">{user?.email}</Text>
            </View>
          </View>

          <View className="flex-row justify-between border-t border-slate-50 pt-6">
            <View className="items-center w-[48%]">
              <Text className="text-2xl font-bold text-indigo-600">{data.length}</Text>
              <Text className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Total Projects</Text>
            </View>
            <View className="items-center w-[48%] border-l border-slate-100">
              <Text className="text-2xl font-bold text-emerald-600">{data.filter(t => t.isDone).length}</Text>
              <Text className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Successful</Text>
            </View>
          </View>
        </View>

        {/* EXECUTIVE SUITE */}
        <Text className="text-slate-900 font-bold text-lg mb-4">Executive Tools</Text>
        
        <View className="flex-row flex-wrap justify-between">
          <ToolItem 
            icon="cloud-outline" 
            label="Weather" 
            onPress={() => router.push("/weather")} 
            bgColor="bg-blue-50"
            iconColor="#3B82F6"
          />
          <ToolItem 
            icon="pulse-outline" 
            label="Health Scan" 
            onPress={() => router.push("/bmi")} 
            bgColor="bg-rose-50"
            iconColor="#E11D48"
          />
          <ToolItem 
            icon="calendar-outline" 
            label="Age Analysis" 
            onPress={() => router.push("/age-calculator")} 
            bgColor="bg-indigo-50"
            iconColor="#4F46E5"
          />
          <ToolItem 
            icon="leaf-outline" 
            label="Islamic Hub" 
            onPress={() => router.push("/islamic-hub")} 
            bgColor="bg-emerald-50"
            iconColor="#10B981"
          />
          <ToolItem 
            icon="calculator-outline" 
            label="Accounting" 
            onPress={() => router.push("/calculator")} 
            bgColor="bg-slate-50"
            iconColor="#475569"
          />
          <ToolItem 
            icon="list-outline" 
            label="Task Board" 
            onPress={() => router.push("/todo")} 
            bgColor="bg-neutral-50"
            iconColor="#171717"
          />
        </View>

        <View className="bg-indigo-600 rounded-md p-6 mt-6 mb-24 flex-row items-center">
          <View className="flex-1 pr-4">
            <Text className="text-white/80 font-bold mb-1 uppercase text-[10px] tracking-widest">Pro Tip</Text>
            <Text className="text-white text-lg font-bold">
              Organize your week ahead of time for peak efficiency.
            </Text>
          </View>
          <Ionicons name="rocket-outline" size={32} color="white" />
        </View>

      </ScrollView>

      {/* MINIMALIST NAV DOCK */}
      <View className="absolute bottom-6 left-6 right-6 h-16 bg-white border border-slate-100 rounded-md flex-row justify-around items-center shadow-lg">
        <NavIcon icon="home" active onPress={() => router.replace("/")} />
        <NavIcon icon="list" onPress={() => router.push("/todo")} />
        <NavIcon icon="add" large />
        <NavIcon icon="bar-chart" onPress={() => router.push("/bmi")} />
        <NavIcon icon="log-out" onPress={() => logOut()} />
      </View>

    </SafeAreaView>
  );
}

function ToolItem({ icon, label, onPress, bgColor, iconColor }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="w-[48%] bg-white border border-slate-100 p-4 rounded-md mb-4 flex-row items-center shadow-sm"
    >
      <View className={`${bgColor} w-10 h-10 rounded-md items-center justify-center mr-3`}>
        <Ionicons name={icon} size={20} color={iconColor} />
      </View>
      <Text className="text-slate-700 font-bold text-xs">{label}</Text>
    </TouchableOpacity>
  );
}

function NavIcon({ icon, active, large, onPress }) {
  if (large) {
    return (
      <TouchableOpacity className="bg-indigo-600 w-12 h-12 rounded-md items-center justify-center shadow-md shadow-indigo-500/40">
        <Ionicons name="add" size={28} color="white" />
      </TouchableOpacity>
    );
  }
  return (
    <TouchableOpacity onPress={onPress} className="items-center justify-center">
      <Ionicons name={icon} size={22} color={active ? "#4F46E5" : "#94A3B8"} />
    </TouchableOpacity>
  );
}


