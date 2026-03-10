import { Text } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

import Login from "../components/Firebase/Login";
import AuthProvider from "../components/Firebase/AuthProvider";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export default function Index() {
  const Stack = createNativeStackNavigator();

  return (
  <SafeAreaView>
    <Login></Login>
  </SafeAreaView>

  );
}
