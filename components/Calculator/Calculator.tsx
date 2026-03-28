import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function Calculator() {
  const [input, setInput] = useState("");

  const buttons = [
    "C", "⌫", "%", "/",
    "7", "8", "9", "*",
    "4", "5", "6", "-",
    "1", "2", "3", "+",
    "0", "00", ".", "=",
  ];

  const handlePress = (btn) => {
    if (btn === "C") {
      setInput("");
    } else if (btn === "⌫") {
      setInput((prev) => prev.slice(0, -1));
    } else if (btn === "=") {
      try {
        const result = eval(input); // 🔥 easiest way
        setInput(result.toString());
      } catch {
        setInput("Error");
      }
    } else {
      setInput((prev) => prev + btn);
    }
  };

  return (
    <View className="flex-1 justify-center px-5 bg-gray-100">
      
      {/* Display */}
      <View className="bg-white p-8 rounded-xl my-5 shadow">
        <Text className="text-right text-3xl text-gray-800">
          {input || "0"}
        </Text>
      </View>

      {/* Grid */}
      <View className="flex-row flex-wrap justify-between">
        {buttons.map((btn, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(btn)}
            className={`w-[22%] py-5 mb-3 rounded-xl items-center shadow 
              ${["/", "*", "-", "+", "%"].includes(btn) ? "bg-orange-100" : ""}
              ${btn === "C" ? "bg-red-400" : ""}
              ${btn === "=" ? "bg-green-400" : ""}
              ${btn === "⌫" ? "bg-yellow-300" : ""}
              ${!isNaN(btn) || btn === "." || btn === "00" ? "bg-white" : ""}
            `}
          >
            <Text className="text-xl text-gray-800">{btn}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}