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
    <View className="flex-1 bg-white px-6 justify-center">
      
      {/* Executive Header */}
      <View className="mb-10 items-center">
        <Text className="text-indigo-600 font-extrabold uppercase tracking-[6px] text-[10px]">Accounting Interface</Text>
        <Text className="text-2xl font-bold text-slate-900 mt-1">Standard Calculator</Text>
      </View>

      {/* Display */}
      <View className="bg-slate-50 border border-slate-100 p-10 rounded-md mb-8 shadow-inner relative">
        <View className="absolute top-3 right-4">
            <Text className="text-slate-300 font-extrabold text-[8px] uppercase tracking-widest">Logic Processor</Text>
        </View>
        <Text className="text-right text-6xl font-light text-slate-900 tracking-tighter" numberOfLines={1} adjustsFontSizeToFit>
          {input || "0"}
        </Text>
      </View>

      {/* Grid */}
      <View className="flex-row flex-wrap justify-between">
        {buttons.map((btn, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handlePress(btn)}
            className={`w-[22%] py-6 mb-4 rounded-md items-center border shadow-sm
              ${["/", "*", "-", "+", "=", "%"].includes(btn) ? "bg-indigo-600 border-indigo-600 shadow-md shadow-indigo-600/20" : "bg-white border-slate-100"}
              ${btn === "C" ? "bg-rose-50 border-rose-100" : ""}
              ${btn === "⌫" ? "bg-slate-50 border-slate-100" : ""}
            `}
          >
            <Text className={`text-xl font-bold ${["/", "*", "-", "+", "=", "%"].includes(btn) ? "text-white" : btn === "C" ? "text-rose-600" : "text-slate-700"}`}>
              {btn}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View className="mt-10 border-t border-slate-50 pt-6">
        <Text className="text-slate-300 font-extrabold text-[8px] uppercase tracking-[8px] text-center">Executive Systems Pro</Text>
      </View>
    </View>
  );
}