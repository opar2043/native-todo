import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "./firebase.config";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Account Created Successfully");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-white px-6">
      <Text className="text-3xl font-bold mb-8">Register</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        className="border p-3 rounded-lg w-full mb-4"
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        className="border p-3 rounded-lg w-full mb-6"
        secureTextEntry
      />
      <TouchableOpacity
        onPress={handleRegister}
        className="bg-green-600 p-4 rounded-lg w-full"
      >
        <Text className="text-white font-bold text-center text-lg">Register</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Register;