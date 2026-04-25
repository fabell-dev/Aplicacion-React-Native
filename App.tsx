import { StatusBar } from "expo-status-bar";
import {
  BackHandler,
  Platform,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
  View,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { HomeScreen } from "./src/screens/HomeScreen";
import { UniversidadScreen } from "./src/screens/UniversidadScreen";
import { CarreraScreen } from "./src/screens/CarreraScreen";
import { TestVocacionalScreen } from "./src/screens/TestVocacionalScreen";
import { MentoriasScreen } from "./src/screens/MentoriasScreen";
import { FAQScreen } from "./src/screens/FAQScreen";
import type { AppContentData, View as AppView } from "./src/types";
import {
  FALLBACK_CONTENT,
  loadContentFromCacheOrFallback,
  refreshContentFromRemote,
} from "./src/services/contentStore";

export default function App() {
  const [currentView, setCurrentView] = useState<AppView>("home");
  const [content, setContent] = useState<AppContentData>(FALLBACK_CONTENT);
  const lastBackPressRef = useRef(0);

  useEffect(() => {
    let isMounted = true;

    const initializeContent = async () => {
      const cachedOrFallback = await loadContentFromCacheOrFallback();
      if (!isMounted) {
        return;
      }
      setContent(cachedOrFallback);

      const refreshed = await refreshContentFromRemote(cachedOrFallback);
      if (!isMounted) {
        return;
      }
      setContent(refreshed);
    };

    void initializeContent();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (Platform.OS !== "android") {
      return;
    }

    const subscription = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (currentView !== "home") {
          setCurrentView("home");
          return true;
        }

        const now = Date.now();
        if (now - lastBackPressRef.current < 2000) {
          return false;
        }

        lastBackPressRef.current = now;
        ToastAndroid.show(
          "Pulsa atras otra vez para salir",
          ToastAndroid.SHORT,
        );
        return true;
      },
    );

    return () => subscription.remove();
  }, [currentView]);

  const renderView = () => {
    switch (currentView) {
      case "home":
        return <HomeScreen onNavigate={setCurrentView} />;
      case "universidad":
        return (
          <UniversidadScreen
            onBack={() => setCurrentView("home")}
            testimonios={content.testimonios}
          />
        );
      case "carrera":
        return <CarreraScreen onBack={() => setCurrentView("home")} />;
      case "test":
        return <TestVocacionalScreen onBack={() => setCurrentView("home")} />;
      case "mentorias":
        return (
          <MentoriasScreen
            onBack={() => setCurrentView("home")}
            whatsappGroupLink={content.whatsappLink}
            mentores={content.mentores}
          />
        );
      case "faq":
        return (
          <FAQScreen
            onBack={() => setCurrentView("home")}
            faqs={content.preguntasFrecuentes}
          />
        );
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
