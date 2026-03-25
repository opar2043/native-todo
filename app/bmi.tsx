import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function BMI() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [result, setResult] = useState(null);
  const [status, setStatus] = useState("");

  const router = useRouter();

  const calculateBMI = () => {
    if (!height || !weight) return;

    const heightInMeter = parseFloat(height) * 0.3048;
    const bmi = parseFloat(weight) / (heightInMeter * heightInMeter);

    setResult(bmi.toFixed(2));

    if (bmi < 18.5) setStatus("Underweight");
    else if (bmi < 24.9) setStatus("Normal");
    else if (bmi < 29.9) setStatus("Overweight");
    else setStatus("Obese");
  };

  return (
    <View className="flex-1 bg-gray-100 p-5">

      {/* HEADER */}
      <View className="flex-row items-center mb-6">
        <TouchableOpacity
          onPress={() => router.replace("/add-todo")}
          className="mr-3"
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <Text className="text-xl font-bold">BMI Calculator</Text>
      </View>

      {/* CARD */}
      <View className="bg-white p-5 rounded-md shadow-sm">

        {/* HEIGHT */}
        <Text className="text-gray-500 mb-1 text-sm">
          Height (feet)
        </Text>
        <TextInput
          placeholder="e.g. 5.6"
          keyboardType="numeric"
          value={height}
          onChangeText={setHeight}
          className="bg-gray-100 p-3 rounded-md mb-4"
        />

        {/* WEIGHT */}
        <Text className="text-gray-500 mb-1 text-sm">
          Weight (kg)
        </Text>
        <TextInput
          placeholder="e.g. 65"
          keyboardType="numeric"
          value={weight}
          onChangeText={setWeight}
          className="bg-gray-100 p-3 rounded-md mb-5"
        />

        {/* BUTTON */}
        <TouchableOpacity
          onPress={calculateBMI}
          className="bg-black py-3 rounded-md"
        >
          <Text className="text-white text-center font-semibold">
            Calculate BMI
          </Text>
        </TouchableOpacity>

        {/* RESULT */}
        {result && (
          <View className="mt-6 border-t border-gray-200 pt-4 items-center">
            <Text className="text-gray-500 text-sm">
              Your Result
            </Text>

            <Text className="text-3xl font-bold mt-1">
              {result}
            </Text>

            <Text className="mt-2 text-base font-semibold">
              {status}
            </Text>
          </View>
        )}
      </View>

      {/* INFO */}
      <View className="bg-white p-4 rounded-md mt-5">
        <Text className="font-semibold mb-2">BMI Categories</Text>
        <Text className="text-gray-500 text-sm leading-5">
          Underweight: {"<"} 18.5{"\n"}
          Normal: 18.5 – 24.9{"\n"}
          Overweight: 25 – 29.9{"\n"}
          Obese: 30+
        </Text>
      </View>

    </View>
  );
}