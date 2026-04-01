import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Weather() {
  const [weather, setWeather] = useState(null);

  const API_KEY = "9aabe9b0afebdfdf7304773b095539b0";

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=dhaka&appid=${API_KEY}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => setWeather(data))
      .catch((err) => console.log(err));
  }, []);

  if (!weather) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
        <Text className="mt-2 text-gray-500">Loading weather...</Text>
      </View>
    );
  }

  const condition = weather.weather[0].main;

  const getIcon = () => {
    switch (condition) {
      case "Clouds":
        return "cloud-outline";
      case "Rain":
        return "rainy-outline";
      case "Clear":
        return "sunny-outline";
      case "Haze":
        return "partly-sunny-outline";
      default:
        return "cloud-outline";
    }
  };

  return (
    <View className="flex-1 bg-white px-5 pt-14">
      
      {/* Header */}
      <Text className="text-2xl font-bold text-black">
        {weather.name}
      </Text>
      <Text className="text-gray-500 mb-6">
        {weather.weather[0].description}
      </Text>

      {/* Main Card */}
      <View className="bg-white rounded-2xl p-6 shadow-md border border-gray-100 items-center">

        <Ionicons name={getIcon()} size={80} color="black" />

        <Text className="text-5xl font-bold text-black mt-3">
          {Math.round(weather.main.temp)}°
        </Text>

        <Text className="text-gray-500 mt-1">
          Feels like {Math.round(weather.main.feels_like)}°
        </Text>
      </View>

      {/* Details Section */}
      <View className="flex-row justify-between mt-6">

        <View className="bg-gray-50 p-4 rounded-xl w-[30%] items-center">
          <Ionicons name="water-outline" size={22} color="black" />
          <Text className="text-gray-500 text-xs mt-1">Humidity</Text>
          <Text className="font-semibold">
            {weather.main.humidity}%
          </Text>
        </View>

        <View className="bg-gray-50 p-4 rounded-xl w-[30%] items-center">
          <Ionicons name="speedometer-outline" size={22} color="black" />
          <Text className="text-gray-500 text-xs mt-1">Pressure</Text>
          <Text className="font-semibold">
            {weather.main.pressure}
          </Text>
        </View>

        <View className="bg-gray-50 p-4 rounded-xl w-[30%] items-center">
          <Ionicons name="flag-outline" size={22} color="black" />
          <Text className="text-gray-500 text-xs mt-1">Wind</Text>
          <Text className="font-semibold">
            {weather.wind.speed} m/s
          </Text>
        </View>

      </View>

    </View>
  );
}