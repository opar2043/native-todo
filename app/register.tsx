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
    <View className="flex-1 justify-center bg-white px-8">
      
      <View className="items-center mb-12">
        <View className="bg-indigo-600 w-20 h-20 rounded-md items-center justify-center shadow-lg shadow-indigo-600/20 mb-6">
            <Ionicons name="person-add" size={40} color="white" />
        </View>
        <Text className="text-4xl font-bold text-slate-900 tracking-tighter">JOIN<Text className="text-indigo-600">PRO</Text></Text>
        <Text className="text-slate-400 font-bold uppercase tracking-[4px] text-[10px] mt-2">Initialize Your Account</Text>
      </View>

      {/* Name Input */}
      <View className="bg-slate-50 border border-slate-100 rounded-md mb-4 px-4 py-2">
        <Text className="text-indigo-600 font-extrabold text-[9px] uppercase tracking-widest mb-1">Full Identity</Text>
        <View className="flex-row items-center">
            <Ionicons name="person-outline" size={18} color="#94A3B8" />
            <TextInput
            placeholder="John Doe"
            placeholderTextColor="#94A3B8"
            value={name}
            onChangeText={setName}
            className="flex-1 p-2 text-slate-900 font-bold"
            />
        </View>
      </View>

      {/* Email Input */}
      <View className="bg-slate-50 border border-slate-100 rounded-md mb-4 px-4 py-2">
        <Text className="text-indigo-600 font-extrabold text-[9px] uppercase tracking-widest mb-1">Access Email</Text>
        <View className="flex-row items-center">
            <Ionicons name="mail-outline" size={18} color="#94A3B8" />
            <TextInput
            placeholder="identity@domain.pro"
            placeholderTextColor="#94A3B8"
            value={email}
            onChangeText={setEmail}
            className="flex-1 p-2 text-slate-900 font-bold"
            autoCapitalize="none"
            />
        </View>
      </View>

      {/* Password Input */}
      <View className="bg-slate-50 border border-slate-100 rounded-md mb-8 px-4 py-2">
        <Text className="text-indigo-600 font-extrabold text-[9px] uppercase tracking-widest mb-1">Security Key</Text>
        <View className="flex-row items-center">
            <Ionicons name="lock-closed-outline" size={18} color="#94A3B8" />
            <TextInput
            placeholder="••••••••"
            placeholderTextColor="#94A3B8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="flex-1 p-2 text-slate-900 font-bold"
            />
        </View>
      </View>

      {/* Register Button */}
      <TouchableOpacity
        className="bg-indigo-600 p-5 rounded-md flex-row justify-center items-center shadow-md shadow-indigo-600/20"
        onPress={handleEmailRegister}
      >
        <Text className="text-white font-bold text-lg uppercase tracking-widest">Create Profile</Text>
      </TouchableOpacity>

      {/* Go Login */}
      <TouchableOpacity onPress={() => router.push("/")} className="mt-12">
        <Text className="text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest">
          Already Registered? <Text className="text-indigo-600 font-extrabold">Authorize Session</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default Register;