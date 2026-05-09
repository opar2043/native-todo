import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

export default function Weather() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "9aabe9b0afebdfdf7304773b095539b0"; // Using existing key

  const fetchWeather = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const url = query.lat 
        ? `https://api.openweathermap.org/data/2.5/weather?lat=${query.lat}&lon=${query.lon}&appid=${API_KEY}&units=metric`
        : `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}&units=metric`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (data.cod !== 200) {
        setError(data.message || "City not found");
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Failed to fetch weather");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        fetchWeather("Dhaka"); // Fallback
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      fetchWeather({ lat: location.coords.latitude, lon: location.coords.longitude });
    })();
  }, []);

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeather(city);
      Keyboard.dismiss();
    }
  };

  const getIcon = (condition) => {
    switch (condition) {
      case "Clouds": return "cloud-outline";
      case "Rain": return "rainy-outline";
      case "Clear": return "sunny-outline";
      case "Haze": return "partly-sunny-outline";
      case "Snow": return "snow-outline";
      case "Thunderstorm": return "thunderstorm-outline";
      default: return "cloud-outline";
    }
  };

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-10">
      {/* Search Header */}
      <View className="flex-row items-center bg-slate-50 border border-slate-100 rounded-md px-4 py-3 mb-8 shadow-sm">
        <Ionicons name="location-outline" size={20} color="#4F46E5" />
        <TextInput
          placeholder="Enter global city..."
          placeholderTextColor="#94A3B8"
          value={city}
          onChangeText={setCity}
          onSubmitEditing={handleSearch}
          className="flex-1 ml-3 h-10 text-slate-900 font-bold"
        />
        {city ? (
          <TouchableOpacity onPress={() => setCity("")}>
            <Ionicons name="close-circle" size={20} color="#94A3B8" />
          </TouchableOpacity>
        ) : null}
      </View>

      {loading ? (
        <View className="py-24 items-center">
          <ActivityIndicator size="large" color="#4F46E5" />
          <Text className="mt-6 text-slate-400 font-bold uppercase tracking-widest text-[10px]">Accessing Meteorological Data...</Text>
        </View>
      ) : error ? (
        <View className="py-24 items-center bg-rose-50 border border-rose-100 rounded-md">
          <Ionicons name="alert-circle" size={50} color="#E11D48" />
          <Text className="mt-4 text-rose-900 font-bold text-base px-6 text-center">{error}</Text>
          <TouchableOpacity onPress={() => fetchWeather("London")} className="mt-6 bg-slate-900 px-8 py-3 rounded-md">
            <Text className="text-white font-bold text-sm">Default Search</Text>
          </TouchableOpacity>
        </View>
      ) : weather ? (
        <View>
          {/* Main Display */}
          <View className="mb-10 items-center">
            <Text className="text-indigo-600 font-extrabold uppercase tracking-[6px] text-[10px] mb-2">Atmospheric Report</Text>
            <Text className="text-4xl font-bold text-slate-900 mb-1">{weather.name}</Text>
            <Text className="text-slate-400 font-bold capitalize text-lg tracking-tight">{weather.weather[0].description}</Text>
          </View>

          {/* Central Hero Card */}
          <View className="bg-slate-50 border border-slate-100 rounded-md p-10 mb-8 items-center shadow-sm relative overflow-hidden">
            <View className="absolute right-0 top-0 opacity-10">
                 <Ionicons name={getIcon(weather.weather[0].main)} size={200} color="#4F46E5" />
            </View>
            <Ionicons name={getIcon(weather.weather[0].main)} size={80} color="#4F46E5" />
            <View className="flex-row items-start mt-6">
               <Text className="text-8xl font-light text-slate-900 tracking-tighter">{Math.round(weather.main.temp)}</Text>
               <Text className="text-4xl font-bold text-indigo-500 mt-2">°</Text>
            </View>
            <View className="bg-white px-6 py-2 rounded-md border border-slate-200 mt-4 shadow-sm">
                <Text className="text-slate-500 font-bold text-sm uppercase tracking-widest">
                  Feels like {Math.round(weather.main.feels_like)}°C
                </Text>
            </View>
          </View>

          {/* Data Grid */}
          <View className="flex-row flex-wrap justify-between">
            <StatRow icon="water-outline" label="Humidity" value={`${weather.main.humidity}%`} color="#3B82F6" />
            <StatRow icon="leaf-outline" label="Pressure" value={`${weather.main.pressure} hPa`} color="#10B981" />
            <StatRow icon="navigate-outline" label="Wind" value={`${weather.wind.speed} m/s`} color="#F59E0B" />
            <StatRow icon="thermometer-outline" label="Max Temp" value={`${Math.round(weather.main.temp_max)}°`} color="#E11D48" />
            <StatRow icon="sunny-outline" label="Sunrise" value={new Date(weather.sys.sunrise * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} color="#EA580C" />
            <StatRow icon="moon-outline" label="Sunset" value={new Date(weather.sys.sunset * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} color="#4F46E5" />
          </View>

          <View className="mt-10 p-6 bg-slate-900 rounded-md flex-row items-center justify-between shadow-xl">
             <View className="flex-1">
                <Text className="text-white/60 font-bold uppercase text-[9px] mb-1">Weather Sentiment</Text>
                <Text className="text-white font-bold text-base leading-5">
                    {weather.main.temp > 25 ? "Optimal conditions for outdoor collaboration." : "Colder environment detected. Recommend climate control."}
                </Text>
             </View>
             <Ionicons name="analytics-outline" size={30} color="#4F46E5" />
          </View>
        </View>
      ) : null}
      <View className="h-24" />
    </ScrollView>
  );
}

function StatRow({ icon, label, value, color }) {
  return (
    <View className="bg-white border border-slate-100 p-5 rounded-md w-[48%] items-center mb-4 shadow-sm">
      <View className="bg-slate-50 w-10 h-10 rounded-md items-center justify-center mb-3">
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <Text className="text-slate-400 text-[10px] uppercase font-extrabold tracking-widest">{label}</Text>
      <Text className="text-slate-900 font-bold text-lg mt-1">{value}</Text>
    </View>
  );
}