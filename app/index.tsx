import { SafeAreaView } from "react-native-safe-area-context";
import Login from "../components/Firebase/Login";
import { Link } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Login />
    </SafeAreaView>
  );
}