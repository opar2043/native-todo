import { View, TouchableOpacity, Text } from 'react-native'
import React from 'react'
import Namaz from '../components/Namaz/Namaz'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

export default function IslamicHubScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-6 pt-4 flex-row items-center">
        <TouchableOpacity 
          onPress={() => router.back()}
          className="bg-slate-50 w-10 h-10 rounded-md items-center justify-center border border-slate-100"
        >
          <Ionicons name="chevron-back" size={20} color="#1E293B" />
        </TouchableOpacity>
        <Text className="ml-4 text-slate-900 font-bold text-lg">Islamic Hub</Text>
      </View>
      <Namaz />
    </SafeAreaView>
  )
}
