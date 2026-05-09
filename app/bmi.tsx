import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BMI() {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBmi] = useState(null);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const calculateBMI = () => {
    if (!height || !weight) {
        Alert.alert("Input Required", "Please provide both height and weight parameters.");
        return;
    }

    setLoading(true);
    
    // Simulate a brief analysis period for "Premium" feel
    setTimeout(() => {
        const heightInMeters = parseFloat(height) / 100;
        const weightInKg = parseFloat(weight);
        const bmiValue = (weightInKg / (heightInMeters * heightInMeters)).toFixed(1);
        const bmiNum = parseFloat(bmiValue);
        
        setBmi(bmiNum);

        if (bmiNum < 18.5) {
            setStatus("Underweight");
        } else if (bmiNum < 24.9) {
            setStatus("Optimal");
        } else if (bmiNum < 29.9) {
            setStatus("Overweight");
        } else {
            setStatus("Obese");
        }
        setLoading(false);
    }, 600);
  };

  const getStatusColor = () => {
    if (status === "Underweight") return "text-blue-500";
    if (status === "Optimal") return "text-emerald-500";
    if (status === "Overweight") return "text-orange-500";
    if (status === "Obese") return "text-rose-500";
    return "text-slate-400";
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="flex-1 px-6 pt-4">
        {/* HEADER */}
        <View className="flex-row items-center mb-10">
            <TouchableOpacity 
                onPress={() => router.back()}
                className="w-10 h-10 rounded-md bg-slate-50 border border-slate-100 items-center justify-center mr-4"
            >
                <Ionicons name="chevron-back" size={20} color="#1E293B" />
            </TouchableOpacity>
            <View>
                <Text className="text-indigo-600 font-extrabold uppercase tracking-[4px] text-[9px]">Biometric Unit</Text>
                <Text className="text-2xl font-bold text-slate-900">Health Scan Pro</Text>
            </View>
        </View>

        {/* INPUT SECTION */}
        <View className="bg-slate-50 border border-slate-100 p-8 rounded-md shadow-sm mb-10">
            <Text className="text-slate-400 mb-6 font-extrabold uppercase text-[9px] tracking-widest text-center">Physical Parameters</Text>
            
            <View className="flex-row justify-between mb-8">
            <View className="w-[48%]">
                <Text className="text-[9px] text-slate-400 mb-2 uppercase font-extrabold tracking-[2px] text-center">Height (cm)</Text>
                <TextInput
                placeholder="175"
                placeholderTextColor="#CBD5E1"
                keyboardType="numeric"
                value={height}
                onChangeText={setHeight}
                className="bg-white border border-slate-100 p-4 rounded-md text-center font-bold text-xl text-slate-900 shadow-sm"
                />
            </View>
            <View className="w-[48%]">
                <Text className="text-[9px] text-slate-400 mb-2 uppercase font-extrabold tracking-[2px] text-center">Weight (kg)</Text>
                <TextInput
                placeholder="70"
                placeholderTextColor="#CBD5E1"
                keyboardType="numeric"
                value={weight}
                onChangeText={setWeight}
                className="bg-white border border-slate-100 p-4 rounded-md text-center font-bold text-xl text-slate-900 shadow-sm"
                />
            </View>
            </View>

            <TouchableOpacity
            onPress={calculateBMI}
            className="bg-indigo-600 py-4 rounded-md shadow-md shadow-indigo-600/20 flex-row justify-center items-center"
            >
            {loading ? (
                <ActivityIndicator color="white" />
            ) : (
                <>
                    <Ionicons name="pulse-outline" size={20} color="white" />
                    <Text className="text-white text-center font-bold text-base ml-2 uppercase tracking-widest">Execute Scan</Text>
                </>
            )}
            </TouchableOpacity>
        </View>

        {/* RESULTS SECTION */}
        {bmi && (
            <View className="mb-24">
            <View className="items-center mb-10">
                <Text className="text-slate-400 font-extrabold text-[10px] uppercase tracking-widest mb-2">Calculated Index</Text>
                <View className="flex-row items-baseline">
                    <Text className="text-7xl font-light text-slate-900 tracking-tighter">{bmi}</Text>
                    <Text className="text-xl font-bold text-indigo-500 ml-2">BMI</Text>
                </View>
                <View className={`mt-6 px-8 py-2 rounded-md border ${getStatusColor().replace('text-', 'bg-').replace('500', '50')} ${getStatusColor().replace('text-', 'border-').replace('500', '100')}`}>
                    <Text className={`${getStatusColor()} font-extrabold text-sm uppercase tracking-widest`}>{status}</Text>
                </View>
            </View>

            {/* Range Indicator */}
            <View className="bg-slate-50 border border-slate-100 p-6 rounded-md mb-8 shadow-sm">
                <Text className="text-slate-400 font-extrabold text-[9px] uppercase tracking-widest mb-4 text-center">Clinical Scale</Text>
                <View className="h-3 bg-white rounded-md overflow-hidden flex-row border border-slate-100 shadow-inner">
                    <View className="flex-1 bg-blue-400" />
                    <View className="flex-1 bg-emerald-400" />
                    <View className="flex-1 bg-orange-400" />
                    <View className="flex-1 bg-rose-400" />
                </View>
                <View className="flex-row justify-between mt-2">
                    <Text className="text-slate-400 font-bold text-[8px] uppercase">Under</Text>
                    <Text className="text-slate-400 font-bold text-[8px] uppercase">Optimal</Text>
                    <Text className="text-slate-400 font-bold text-[8px] uppercase">Over</Text>
                    <Text className="text-slate-400 font-bold text-[8px] uppercase">Obese</Text>
                </View>
            </View>

            <View className="bg-slate-900 p-6 rounded-md shadow-xl flex-row items-center">
                <View className="flex-1 pr-4">
                    <Text className="text-white/60 font-bold uppercase text-[9px] mb-1">Clinical Observation</Text>
                    <Text className="text-white font-bold text-base leading-5">
                        Your index suggests a {status.toLowerCase()} profile. {bmi < 25 ? "Maintain balanced nutrition and regular activity." : "Consider optimizing your physical routine for better metrics."}
                    </Text>
                </View>
                <Ionicons name="medical-outline" size={32} color="#4F46E5" />
            </View>
            </View>
        )}
        </ScrollView>
    </SafeAreaView>
  );
}