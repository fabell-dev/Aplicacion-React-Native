import { StatusBar } from "expo-status-bar";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useState } from "react";
import { HomeScreen } from "./src/screens/HomeScreen";
import { UniversidadScreen } from "./src/screens/UniversidadScreen";
import { CarreraScreen } from "./src/screens/CarreraScreen";
import { TestVocacionalScreen } from "./src/screens/TestVocacionalScreen";
import { MentoriasScreen } from "./src/screens/MentoriasScreen";
import type { View as AppView } from "./src/types";

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>("home");

  const renderView = () => {
    switch (currentView) {
      case "home":
        return <HomeScreen onNavigate={setCurrentView} />;
      case "universidad":
        return <UniversidadScreen onBack={() => setCurrentView("home")} />;
      case "carrera":
        return <CarreraScreen onBack={() => setCurrentView("home")} />;
      case "test":
        return <TestVocacionalScreen onBack={() => setCurrentView("home")} />;
      case "mentorias":
        return <MentoriasScreen onBack={() => setCurrentView("home")} />;
      default:
        return <HomeScreen onNavigate={setCurrentView} />;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.container}>{renderView()}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#eef2ff",
  },
  container: {
    flex: 1,
  },
});
