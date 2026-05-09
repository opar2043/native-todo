import { View, Text, ActivityIndicator, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export default function Namaz() {
  const [prayer, setPrayer] = useState(null);
  const [suras, setSuras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('prayer'); // 'prayer', 'suras', 'tasbih'
  const [count, setCount] = useState(0);

  useEffect(() => {
    const getData = async () => {
      try {
        // Get Prayer Times
        let { status } = await Location.requestForegroundPermissionsAsync();
        let latitude = 23.8103; // Default Dhaka
        let longitude = 90.4125;

        if (status === 'granted') {
          let location = await Location.getCurrentPositionAsync({});
          latitude = location.coords.latitude;
          longitude = location.coords.longitude;
        }

        const prayerRes = await fetch(
          `https://api.aladhan.com/v1/timings?latitude=${latitude}&longitude=${longitude}&method=2`
        );
        const prayerData = await prayerRes.json();
        setPrayer(prayerData.data.timings);

        // Get Suras
        const suraRes = await fetch('https://api.alquran.cloud/v1/surah');
        const suraData = await suraRes.json();
        setSuras(suraData.data.slice(0, 20)); // Just first 20 for now

        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    getData();
  }, []);

  const getNextPrayer = () => {
    if (!prayer) return null;
    const now = new Date();
    const currentTime = now.getHours() * 60 + now.getMinutes();
    
    const times = Object.entries(prayer).slice(0, 6).map(([name, time]) => {
        const [h, m] = time.split(':').map(Number);
        return { name, minutes: h * 60 + m, time };
    });

    return times.find(p => p.minutes > currentTime) || times[0];
  };

  const nextPrayer = getNextPrayer();

  return (
    <View className="flex-1 bg-white">
      {/* Tab Selector */}
      <View className="flex-row mt-12 px-6 mb-10">
        <TabButton active={tab === 'prayer'} label="PRAYERS" onPress={() => setTab('prayer')} />
        <TabButton active={tab === 'suras'} label="QURAN" onPress={() => setTab('suras')} />
        <TabButton active={tab === 'tasbih'} label="TASBIH" onPress={() => setTab('tasbih')} />
      </View>

      <ScrollView className="px-6">
        {tab === 'prayer' ? (
          <View>
            <View className="items-center mb-10">
                <View className="bg-indigo-50 w-20 h-20 rounded-md items-center justify-center mb-4 border border-indigo-100">
                    <Ionicons name="moon-outline" size={40} color="#4F46E5" />
                </View>
                <Text className="text-3xl font-bold text-slate-900 tracking-tight">Islamic Resource Pro</Text>
                <Text className="text-slate-400 font-bold uppercase tracking-[4px] text-[9px] mt-1">Spiritual Guidance System</Text>
            </View>

            {nextPrayer && (
                <View className="bg-indigo-600 rounded-md p-6 mb-10 shadow-md shadow-indigo-600/20 flex-row justify-between items-center">
                    <View>
                        <Text className="text-white/70 font-extrabold text-[9px] uppercase tracking-widest">Next Appointed Time</Text>
                        <Text className="text-white text-2xl font-bold mt-1">{nextPrayer.name}</Text>
                    </View>
                    <Text className="text-white text-3xl font-light">{nextPrayer.time}</Text>
                </View>
            )}

            <Text className="text-slate-400 text-[9px] font-extrabold uppercase mb-5 tracking-[4px]">Daily Schedule</Text>
            {prayer && Object.entries(prayer).slice(0, 6).map(([name, time]) => (
              <View
                key={name}
                className={`p-5 rounded-md mb-3 flex-row justify-between items-center border ${nextPrayer?.name === name ? 'bg-indigo-50 border-indigo-200 shadow-sm' : 'bg-white border-slate-100 shadow-sm'}`}
              >
                <View className="flex-row items-center">
                    <View className={`w-10 h-10 rounded-md items-center justify-center mr-4 border ${nextPrayer?.name === name ? 'bg-white border-indigo-100' : 'bg-slate-50 border-slate-100'}`}>
                        <Ionicons name="time-outline" size={18} color={nextPrayer?.name === name ? "#4F46E5" : "#94A3B8"} />
                    </View>
                    <Text className="text-slate-900 text-base font-bold">{name}</Text>
                </View>
                <Text className="text-indigo-600 font-bold text-lg">{String(time)}</Text>
              </View>
            ))}
          </View>
        ) : tab === 'suras' ? (
          <View>
            <Text className="text-slate-400 text-[9px] font-extrabold uppercase mb-6 tracking-[4px]">The Holy Quran Index</Text>
            {suras.map((sura) => (
              <TouchableOpacity
                key={sura.number}
                className="bg-white p-5 rounded-md mb-4 flex-row justify-between items-center border border-slate-100 shadow-sm"
              >
                <View className="flex-row items-center flex-1">
                    <View className="bg-indigo-600 w-12 h-12 rounded-md items-center justify-center mr-5 shadow-sm">
                        <Text className="text-white font-bold text-lg">{sura.number}</Text>
                    </View>
                    <View>
                        <Text className="text-slate-900 font-bold text-base">{sura.englishName}</Text>
                        <Text className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">{sura.revelationType} • {sura.numberOfAyahs} Ayahs</Text>
                    </View>
                </View>
                <Text className="text-indigo-600 font-bold text-2xl ml-2">{sura.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View className="items-center py-10">
            <Text className="text-slate-400 text-[9px] font-extrabold uppercase mb-12 tracking-[4px]">Dhikr Counter Pro</Text>
            
            <View className="bg-slate-50 w-72 h-72 rounded-md border border-slate-100 items-center justify-center shadow-inner relative">
                <Text className="text-indigo-600 text-8xl font-light tracking-tighter">{count}</Text>
                <Text className="text-slate-400 uppercase font-extrabold tracking-[4px] text-[9px] mt-6">Sequence Count</Text>
            </View>

            <TouchableOpacity 
                onPress={() => setCount(count + 1)}
                className="bg-indigo-600 w-24 h-24 rounded-md mt-16 items-center justify-center shadow-lg shadow-indigo-600/30 active:opacity-90"
            >
                <Ionicons name="finger-print" size={40} color="white" />
            </TouchableOpacity>

            <TouchableOpacity 
                onPress={() => setCount(0)}
                className="mt-16 border border-slate-200 px-12 py-4 rounded-md bg-white shadow-sm"
            >
                <Text className="text-slate-400 font-extrabold uppercase text-[10px] tracking-widest">Reset Sequence</Text>
            </TouchableOpacity>
          </View>
        )}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}

function TabButton({ active, label, onPress }) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className={`flex-1 py-4 rounded-md items-center border ${active ? 'bg-indigo-600 border-indigo-600 shadow-md shadow-indigo-600/20' : 'bg-white border-slate-100 ml-2'}`}
    >
      <Text className={`font-extrabold text-[10px] tracking-widest ${active ? 'text-white' : 'text-slate-400'}`}>{label}</Text>
    </TouchableOpacity>
  );
}