import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';

export default function Namaz() {
  const [prayer, setPrayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      const res = await fetch(
        `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
      );
      const data = await res.json();

      setPrayer(data.data.timings);
      setLoading(false);
    };

    getData();
  }, []);

  if (loading) {
    return <ActivityIndicator className="mt-10" size="large" />;
  }

  return (
    <View className="flex-1 bg-slate-900 px-5 pt-12">
      <Text className="text-white text-2xl font-bold text-center mb-6">
        🕌 Prayer Times
      </Text>

      {Object.entries(prayer).slice(0, 6).map(([name, time]) => (
        <View
          key={name}
          className="bg-slate-800 p-4 rounded-xl mb-3 flex-row justify-between"
        >
          <Text className="text-white text-base">{name}</Text>
          <Text className="text-sky-400 font-bold">{time}</Text>
        </View>
      ))}
    </View>
  );
}