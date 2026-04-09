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
  const { googleSignIn, loading, handleLogin } = useContext(AuthContext);
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
    <View className="flex-1 justify-center bg-white px-6">
      <Text className="text-4xl font-bold text-black mb-10 text-center">
        Sign In - Native ToDo
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

      <View>
        <TextInput 
        placeholder="name"
        className="p-4"
        />
      </View>

      {/* Login Button */}
      <TouchableOpacity
        className="bg-black mt-6 p-4 rounded-lg flex-row justify-center items-center"
        onPress={handleEmailLogin}
      >
        <Ionicons name="log-in-outline" size={20} color="white" />
        <Text className="text-white font-bold ml-2 text-lg">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity className="bg-red-600 p-4 rounded-md mt-2">
        <Text>Forgot Password?</Text>
      </TouchableOpacity>
      <Text className="text-gray-400 text-center my-4">OR</Text>

      {/* Google */}
      <TouchableOpacity
        className="border border-black p-4 rounded-lg flex-row justify-center items-center"
        onPress={handleGoogle}
      >
        <FontAwesome
          name="google"
          size={20}
          color="black"
          style={{ marginRight: 10 }}
        />

        <Text className="text-black font-semibold text-base">
          Sign in with Google
        </Text>
      </TouchableOpacity>

      {/* Go Register */}
      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text className="text-center mt-6 text-black">
          Don't have an account? <Text className="font-bold">Register</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;
