import "../global.css"
import { Stack } from "expo-router";
import AuthProvider from "../components/Firebase/AuthProvider";
import Header from "../components/shared/Header";

export default function RootLayout() {
  return (
    <AuthProvider> 
      <Header></Header>
      <Stack screenOptions={{ headerShown: false }} />
    </AuthProvider>
  );
}