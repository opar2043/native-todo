import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { AuthContext } from "./AuthProvider";

const Login = () => {
  const { googleSignIn: handleGoogleLogin, loading, handleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleEmailLogin = async () => {
    try {
      await handleLogin(email, password);
      Alert.alert("Success", "Logged In Successfully");
      router.replace("/add-todo");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  
  const handleGoogle = async () => {
    try {
      await googleSignIn();
      router.replace("/add-todo");
    } catch (error) {
      Alert.alert("Sign In Failed", error.message);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center bg-white px-8">
      
      <View className="items-center mb-12">
        <View className="bg-indigo-600 w-20 h-20 rounded-md items-center justify-center shadow-lg shadow-indigo-600/20 mb-6">
            <Ionicons name="layers" size={40} color="white" />
        </View>
        <Text className="text-4xl font-bold text-slate-900 tracking-tighter">NATIVE<Text className="text-indigo-600">PRO</Text></Text>
        <Text className="text-slate-400 font-bold uppercase tracking-[4px] text-[10px] mt-2">Executive Portal Access</Text>
      </View>

      {/* Email Input */}
      <View className="bg-slate-50 border border-slate-100 rounded-md mb-4 px-4 py-2">
        <Text className="text-indigo-600 font-extrabold text-[9px] uppercase tracking-widest mb-1">Identity Path</Text>
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

      {/* Login Button */}
      <TouchableOpacity
        className="bg-indigo-600 p-5 rounded-md flex-row justify-center items-center shadow-md shadow-indigo-600/20"
        onPress={handleEmailLogin}
      >
        <Text className="text-white font-bold text-lg uppercase tracking-widest">Authorize Session</Text>
      </TouchableOpacity>

      {/* Social Login Divider */}
      <View className="flex-row items-center my-10">
        <View className="flex-1 h-[1px] bg-slate-100" />
        <Text className="mx-4 text-slate-400 font-extrabold text-[9px] uppercase tracking-widest">Third Party Auth</Text>
        <View className="flex-1 h-[1px] bg-slate-100" />
      </View>

      {/* Google Login */}
      <TouchableOpacity
        className="bg-white border border-slate-100 p-4 rounded-md flex-row justify-center items-center shadow-sm"
        onPress={handleGoogleLogin}
      >
        <Ionicons name="logo-google" size={20} color="#E11D48" />
        <Text className="text-slate-700 font-bold ml-3 uppercase text-[10px] tracking-widest">Access with Google</Text>
      </TouchableOpacity>

      {/* Register Link */}
      <TouchableOpacity onPress={() => router.push("/register")} className="mt-12">
        <Text className="text-center text-slate-400 font-bold uppercase text-[10px] tracking-widest">
          New Associate? <Text className="text-indigo-600 font-extrabold">Initialize Profile</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
};

export default Login;
