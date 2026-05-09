import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

export default function AgeCalculator() {
  const [day, setDay] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [ageData, setAgeData] = useState(null);

  const getZodiac = (d, m) => {
    const day = parseInt(d);
    const month = parseInt(m);
    if ((month == 1 && day <= 19) || (month == 12 && day >= 22)) return "Capricorn";
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return "Aquarius";
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return "Pisces";
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return "Aries";
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return "Taurus";
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return "Gemini";
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return "Cancer";
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return "Leo";
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return "Virgo";
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return "Libra";
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return "Scorpio";
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return "Sagittarius";
    return "";
  };

  const calculateAge = () => {
    if (!day || !month || !year) {
      Alert.alert("Error", "All parameters are required for professional analysis.");
      return;
    }

    const birthDate = new Date(`${year}-${month}-${day}`);
    const today = new Date();

    if (isNaN(birthDate.getTime())) {
      Alert.alert("Error", "Date format unrecognized.");
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    const diffTime = Math.abs(today.getTime() - birthDate.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;

    let nextBday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (nextBday < today) {
      nextBday.setFullYear(today.getFullYear() + 1);
    }
    const daysToNextBday = Math.ceil((nextBday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    setAgeData({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      daysToNextBday,
      zodiac: getZodiac(day, month),
      progress: Math.min((years / 100) * 100, 100).toFixed(1)
    });
  };

  const copyToClipboard = async () => {
    if (!ageData) return;
    const text = `Age Report: ${ageData.years}Y ${ageData.months}M ${ageData.days}D. Zodiac: ${ageData.zodiac}. Total Days: ${ageData.totalDays}. Generated via Premium Pro.`;
    await Clipboard.setStringAsync(text);
    Alert.alert("Success", "Professional report copied to clipboard.");
  };

  return (
    <ScrollView className="flex-1 bg-white px-6 pt-10">
      <View className="mb-10 items-center">
        <Text className="text-indigo-600 font-extrabold uppercase tracking-[4px] text-[10px] mb-2 text-center">Biometric Analysis</Text>
        <Text className="text-3xl font-bold text-slate-900 text-center">Age Statistics Pro</Text>
      </View>

      <View className="bg-slate-50 border border-slate-100 p-8 rounded-md shadow-sm mb-10">
        <Text className="text-slate-400 mb-6 font-extrabold uppercase text-[10px] tracking-widest text-center">Verify Birth Matrix</Text>
        
        <View className="flex-row justify-between mb-8">
          <InputGroup label="Day" value={day} onChange={setDay} placeholder="15" />
          <InputGroup label="Month" value={month} onChange={setMonth} placeholder="05" />
          <InputGroup label="Year" value={year} onChange={setYear} placeholder="1995" wide />
        </View>

        <TouchableOpacity
          onPress={calculateAge}
          className="bg-indigo-600 py-4 rounded-md shadow-md shadow-indigo-600/20 flex-row justify-center items-center"
        >
          <Ionicons name="analytics-outline" size={20} color="white" />
          <Text className="text-white text-center font-bold text-base ml-2 uppercase tracking-widest">Execute Analysis</Text>
        </TouchableOpacity>
      </View>

      {ageData && (
        <View className="mb-24">
          <View className="flex-row justify-between items-center mb-8">
            <Text className="text-lg font-bold text-slate-900 uppercase tracking-tight">Biological Audit</Text>
            <TouchableOpacity onPress={copyToClipboard} className="flex-row items-center bg-white border border-slate-200 px-4 py-2 rounded-md shadow-sm">
              <Ionicons name="copy-outline" size={16} color="#4F46E5" />
              <Text className="text-indigo-600 text-[10px] ml-2 font-extrabold uppercase tracking-widest">Copy Report</Text>
            </TouchableOpacity>
          </View>

          {/* Century Progress */}
          <View className="bg-slate-50 border border-slate-100 p-6 rounded-md mb-8 shadow-sm">
            <View className="flex-row justify-between mb-3 items-end">
                <Text className="text-slate-400 font-extrabold text-[9px] uppercase tracking-widest">Life Cycle Progress</Text>
                <Text className="text-indigo-600 font-extrabold text-[12px]">{ageData.progress}%</Text>
            </View>
            <View className="h-2.5 bg-white rounded-md overflow-hidden border border-slate-100 shadow-inner">
                <View className="h-full bg-indigo-600" style={{ width: `${ageData.progress}%` }} />
            </View>
          </View>

          {/* Results Grid */}
          <View className="flex-row flex-wrap justify-between">
            <ResultItem label="Years" value={ageData.years} color="#1E293B" />
            <ResultItem label="Months" value={ageData.months} color="#4F46E5" />
            <ResultItem label="Days" value={ageData.days} color="#6366F1" />
          </View>

          {/* Secondary Stats */}
          <View className="flex-row justify-between mt-8 mb-8">
             <InfoCard label="Zodiac Matrix" value={ageData.zodiac} icon="sparkles-outline" color="#F59E0B" />
             <InfoCard label="Birthday Lead" value={`${ageData.daysToNextBday} Days`} icon="calendar-outline" color="#3B82F6" />
          </View>

          <Text className="text-[10px] font-extrabold text-slate-400 uppercase mb-4 tracking-[6px] text-center">Extended Lifetime Metrics</Text>
          <View className="flex-row flex-wrap justify-between">
            <MiniStat label="Total Months" value={ageData.totalMonths.toLocaleString()} />
            <MiniStat label="Total Weeks" value={ageData.totalWeeks.toLocaleString()} />
            <MiniStat label="Total Days" value={ageData.totalDays.toLocaleString()} />
            <MiniStat label="Total Hours" value={ageData.totalHours.toLocaleString()} />
          </View>
        </View>
      )}
    </ScrollView>
  );
}

function InputGroup({ label, value, onChange, placeholder, wide }) {
  return (
    <View className={`${wide ? "w-[35%]" : "w-[28%]"}`}>
      <Text className="text-[9px] text-slate-400 mb-2 uppercase font-extrabold tracking-[2px] text-center">{label}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#CBD5E1"
        keyboardType="numeric"
        value={value}
        onChangeText={onChange}
        className="bg-white border border-slate-100 p-4 rounded-md text-center font-bold text-xl text-slate-900 shadow-sm"
      />
    </View>
  );
}

function ResultItem({ label, value, color }) {
  return (
    <View className="bg-slate-50 border border-slate-100 p-6 rounded-md w-[31%] items-center shadow-sm">
      <Text className="text-4xl font-light tracking-tighter" style={{ color }}>{value}</Text>
      <Text className="text-slate-400 text-[10px] font-extrabold uppercase mt-2 tracking-widest">{label}</Text>
    </View>
  );
}

function InfoCard({ label, value, icon, color }) {
  return (
    <View className="bg-white border border-slate-100 p-5 rounded-md w-[48%] flex-row items-center shadow-sm">
      <View className="bg-slate-50 w-10 h-10 rounded-md items-center justify-center mr-4">
        <Ionicons name={icon} size={20} color={color} />
      </View>
      <View>
        <Text className="text-slate-400 text-[9px] font-extrabold uppercase tracking-widest">{label}</Text>
        <Text className="text-slate-900 font-bold text-sm tracking-tight">{value}</Text>
      </View>
    </View>
  );
}

function MiniStat({ label, value }) {
  return (
    <View className="bg-slate-50 border border-slate-100 p-5 rounded-md w-[48%] mb-4 shadow-sm">
      <Text className="text-slate-400 text-[9px] font-extrabold uppercase mb-1 tracking-widest">{label}</Text>
      <Text className="text-slate-900 font-bold text-lg tracking-tighter">{value}</Text>
    </View>
  );
}
