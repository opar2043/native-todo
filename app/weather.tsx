import { View, Text } from 'react-native'
import React from 'react'
import Namaz from '../components/Namaz/Namaz'
import Weather from '../components/Weather/Weather'

export default function weather() {
  return (
    <View>
     {/* <Namaz></Namaz> */}
     <Weather></Weather>
    </View>
  )
}