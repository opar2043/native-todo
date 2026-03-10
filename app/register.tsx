import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useAuth from "../components/Hooks/useAuth";
import { useRouter } from "expo-router";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const { handleRegister } = useAuth();
  const router = useRouter();

const handleEmailRegister = async () => {
  try {
    await handleRegister(name, email, password);
    Alert.alert("Success", "Account Created Successfully");
    router.replace("/");
  } catch (error) {
    Alert.alert("Register Failed", error.message);
  }
};

  return (
    <View className="flex-1 justify-center bg-white px-6">

      <Text className="text-4xl font-bold text-center mb-10">
        Register - Native ToDo
      </Text>

      {/* Email */}
      <View className="flex-row items-center border border-black rounded-lg mb-4 px-3">
        <Ionicons name="mail-outline" size={20} color="black" />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="flex-1 p-4"
          autoCapitalize="none"
        />
      </View>

      {/* Email */}
      <View className="flex-row items-center border border-black rounded-lg mb-4 px-3">
        <Ionicons name="mail-outline" size={20} color="black" />
        <TextInput
          placeholder="Name"
          value={name}
          onChangeText={setName}
          className="flex-1 p-4"
          autoCapitalize="none"
        />
      </View>

      {/* Password */}
      <View className="flex-row items-center border border-black rounded-lg px-3">
        <Ionicons name="lock-closed-outline" size={20} color="black" />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="flex-1 p-4"
        />
      </View>

      {/* Register Button */}
      <TouchableOpacity
        className="bg-black mt-6 p-4 rounded-lg flex-row justify-center items-center"
        onPress={handleEmailRegister}
      >
        <Ionicons name="person-add-outline" size={20} color="white" />
        <Text className="text-white font-bold ml-2 text-lg">Register </Text>
      </TouchableOpacity>

      {/* Go Login */}
      <TouchableOpacity onPress={() => router.push("/")}>
        <Text className="text-center mt-6 text-black">
          Already have an account? <Text className="font-bold">Login</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default Register;