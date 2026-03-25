import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import useAuth from "../Hooks/useAuth";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();
  const { user, logOut } = useAuth();

  const handleUserLogout = async () => {
    try {
      await logOut();
      Alert.alert("Logout Successful!");
      router.replace("/");
    } catch (error) {
      Alert.alert("Sign Out Failed: " + error.message);
    }
  };

  const handlebackHome = () => {
    router.replace("/add-todo");
  };

  return (
    <View style={{ position: "relative", zIndex: 100 }}>
      {/* Header Bar */}
      <View className="flex-row justify-between items-center px-5 py-4 bg-white border-b border-gray-100">
        <Text className="font-bold text-xl tracking-wide text-gray-800">
          Native ToDo
        </Text>

        <TouchableOpacity
          onPress={() => setOpenMenu((prev) => !prev)}
          className="active:opacity-70"
        >
          <Image
            source={{
              uri:
                user?.photoURL ||
                "https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png",
            }}
            className="w-11 h-11 rounded-full border-2 border-gray-200"
          />
        </TouchableOpacity>
      </View>

      {/* Overlay */}
      {openMenu && (
        <Pressable
          onPress={() => setOpenMenu(false)}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
      )}

      {/* Dropdown Menu */}
      {openMenu && (
        <View
          style={{
            position: "absolute",
            top: 70,
            right: 16,
            width: 240,
            backgroundColor: "white",
            borderRadius: 16,
            padding: 16,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 10,
          }}
        >
          {/* User Info */}
          <View className="items-center mb-4">
            <Text className="text-base font-semibold text-gray-800">
              {user?.displayName || "User"}
            </Text>
            <Text className="text-sm text-gray-500">{user?.email}</Text>
          </View>

          {/* Buttons */}
          <TouchableOpacity
            onPress={handlebackHome}
            className="bg-gray-100 py-2.5 rounded-md mb-3"
          >
            <Text className="text-center font-medium text-gray-700">
              ⬅ Back to Home
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleUserLogout}
            className="bg-red-500 py-2.5 rounded-md"
          >
            <Text className="text-center font-semibold text-white">
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}