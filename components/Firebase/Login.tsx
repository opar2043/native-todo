import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, TextInput, Image, Alert } from "react-native";
import { AuthContext } from "./AuthProvider";
import { useRouter } from "expo-router";

const Login = () => {
  const { googleSignIn, user, loading , logOut  } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  // Email/Password Login
  const handlePass = () => {
    console.log("Email:", email);
    console.log("Password:", password);
    alert("Email login not implemented yet");
  };
// Google Sign In
  const handleLogin = async () => {
    try {
      await googleSignIn();
      alert("Google Sign In Successful!");
      router.replace("/add-todo")
    } catch (error) {
      alert("Sign In Failed: " + error.message);
    }
  };
  const handleUserLogout = async () => {
    try {
      await logOut();
      Alert.alert("Logout Successful!");
      router.replace("/")
    } catch (error) {
      Alert.alert("Sign Out Failed: " + error.message);
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#1E40AF" />
      </View>
    );
  }

  if (user) {
    return (
      <View className="flex-1 justify-center items-center bg-white px-6">
        {user.photoURL && (
          <Image
            source={{ uri: user.photoURL }}
            className="w-24 h-24 rounded-full mb-4"
          />
        )}
        <Text className="text-2xl font-bold mb-2">Welcome, {user.displayName}</Text>
        <Text className="text-gray-500 mb-6">{user.email}</Text>
        <TouchableOpacity
          className="bg-red-500 px-6 py-3 rounded-lg"
          onPress={() =>  handleUserLogout()}
        >
          <Text className="text-white font-bold text-center">Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-gradient-to-b from-blue-100 to-white px-6">
      <Text className="text-4xl font-bold mb-10 text-blue-900">Welcome Back</Text>

      {/* Email Login */}
      <View className="w-full mb-6">
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          className="border border-gray-300 p-4 rounded-lg mb-4 bg-white"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="border border-gray-300 p-4 rounded-lg bg-white"
        />
        <TouchableOpacity
          className="bg-blue-600 mt-6 p-4 rounded-lg"
          onPress={handlePass}
        >
          <Text className="text-white font-bold text-center text-lg">Login</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-gray-400 mb-4">or</Text>

      {/* Google Login */}
      <TouchableOpacity
        className="bg-red-500 flex-row items-center justify-center p-4 rounded-lg w-full"
        onPress={handleLogin}
      >
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png",
          }}
          style={{ width: 24, height: 24, marginRight: 10 }}
        />
        <Text className="text-white font-bold text-lg">Sign in with Google</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Login;