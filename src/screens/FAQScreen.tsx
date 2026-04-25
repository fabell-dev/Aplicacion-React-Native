import { useState } from "react";
import {
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { PreguntaFrecuente } from "../types";

type Props = { onBack: () => void; faqs: PreguntaFrecuente[] };

export function FAQScreen({ onBack, faqs }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹ Volver</Text>
        </Pressable>
        <View style={styles.titleRow}>
          <View style={styles.iconWrap}>
            <Text style={styles.icon}>❓</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.title}>Preguntas Frecuentes</Text>
            <Text style={styles.subtitle}>
              Resuelve tus dudas sobre la carrera
            </Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.introCard}>
          <Text style={styles.introText}>
            Aqui encontraras respuestas a las preguntas mas comunes que tienen
            los estudiantes preuniversitarios sobre la carrera de Ingenieria en
            Ciencias Informaticas. Toca cada pregunta para ver la respuesta.
          </Text>
        </View>

        <View style={styles.itemsWrap}>
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <View key={index} style={styles.faqCard}>
                <Pressable
                  onPress={() => toggleQuestion(index)}
                  style={styles.questionButton}
                >
                  <Text style={styles.questionText}>{item.pregunta}</Text>
                  <Text style={[styles.chevron, isOpen && styles.chevronOpen]}>
                    ⌄
                  </Text>
                </Pressable>
                {isOpen ? (
                  <View style={styles.answerWrap}>
                    <Text style={styles.answerText}>{item.respuesta}</Text>
                  </View>
                ) : null}
              </View>
            );
          })}
        </View>

        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>Tienes mas preguntas?</Text>
          <Text style={styles.contactText}>
            Puedes explorar las demas secciones de la aplicacion o contactar con
            estudiantes universitarios a traves de la seccion de Mentorias
            Electronicas.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef2ff" },
  header: {
    backgroundColor: "#6d28d9",
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 12 : 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backButton: { marginBottom: 12 },
  backText: { color: "white", fontSize: 16, fontWeight: "600" },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  icon: { fontSize: 26, color: "white" },
  title: { color: "white", fontSize: 22, fontWeight: "700" },
  subtitle: { color: "#e9d5ff", marginTop: 2, fontSize: 13 },
  content: { padding: 16, gap: 12 },
  introCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
  },
  introText: { color: "#4b5563", lineHeight: 22 },
  itemsWrap: { gap: 12 },
  faqCard: {
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#ede9fe",
  },
  questionButton: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },
  questionText: { flex: 1, color: "#1f2937", fontWeight: "600" },
  chevron: { color: "#7c3aed", fontSize: 20, transform: [{ rotate: "0deg" }] },
  chevronOpen: { transform: [{ rotate: "180deg" }] },
  answerWrap: {
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
    borderTopColor: "#f3f4f6",
  },
  answerText: { color: "#6b7280", lineHeight: 22, paddingTop: 12 },
  contactCard: {
    marginTop: 8,
    backgroundColor: "#6d28d9",
    borderRadius: 16,
    padding: 16,
  },
  contactTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },
  contactText: { color: "#ede9fe", lineHeight: 22 },
});
