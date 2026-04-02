import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { UniversityTab } from "../types";

type Props = { onBack: () => void };

export function UniversidadScreen({ onBack }: Props) {
  const [activeTab, setActiveTab] = useState<UniversityTab>("info");

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack} style={styles.backButton}>
          <Text style={styles.backText}>‹ Volver</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Universidad UCI</Text>
      </View>

      <View style={styles.tabsRow}>
        <TabButton
          label="Informacion"
          active={activeTab === "info"}
          onPress={() => setActiveTab("info")}
        />
        <TabButton
          label="Vida"
          active={activeTab === "vida"}
          onPress={() => setActiveTab("vida")}
        />
        <TabButton
          label="Testimonios"
          active={activeTab === "testimonios"}
          onPress={() => setActiveTab("testimonios")}
        />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {activeTab === "info" && <InfoContent />}
        {activeTab === "vida" && <VidaContent />}
        {activeTab === "testimonios" && <TestimoniosContent />}
      </ScrollView>
    </View>
  );
}

function TabButton({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      style={[styles.tabButton, active && styles.tabButtonActive]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, active && styles.tabTextActive]}>
        {label}
      </Text>
    </Pressable>
  );
}

function InfoContent() {
  return (
    <>
      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: "#2563eb" }]}>
          Sobre la UCI
        </Text>
        <Text style={styles.cardText}>
          La Universidad de las Ciencias Informaticas (UCI) es una institucion
          educativa cubana especializada en la formacion de profesionales en
          tecnologias de la informacion y comunicaciones.
        </Text>
        <Text style={[styles.cardText, { marginTop: 10 }]}>
          Fundada en 2002, es referente nacional e internacional.
        </Text>
      </View>

      <View style={styles.softCard}>
        <Text style={styles.softTitle}>Datos Clave</Text>
        <InfoItem label="Ubicacion" value="La Habana, Cuba" />
        <InfoItem label="Fundacion" value="2002" />
        <InfoItem label="Modelo" value="Universidad-Empresa" />
        <InfoItem label="Especialidad" value="Ciencias Informaticas" />
      </View>

      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: "#1f2937" }]}>
          Modelo Universidad-Empresa
        </Text>
        <Text style={styles.cardText}>
          Combina estudio con produccion de software en proyectos reales desde
          los primeros anos.
        </Text>
      </View>
    </>
  );
}

function VidaContent() {
  const features = [
    [
      "🏠",
      "Residencia Estudiantil",
      "Alojamiento para estudiantes de otras provincias.",
    ],
    [
      "⚽",
      "Deportes y Recreacion",
      "Instalaciones deportivas y espacios de recreacion.",
    ],
    [
      "🎭",
      "Actividades Culturales",
      "Eventos y grupos para el desarrollo artistico.",
    ],
    [
      "📚",
      "Bibliotecas y Laboratorios",
      "Espacios de estudio con tecnologia actual.",
    ],
    ["🍽️", "Comedores", "Servicio de alimentacion con menus variados."],
  ];

  return (
    <>
      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: "#4f46e5" }]}>
          Vida en el Campus
        </Text>
        <Text style={styles.cardText}>
          La UCI ofrece una experiencia universitaria completa.
        </Text>
      </View>
      {features.map(([emoji, title, text]) => (
        <View key={title} style={styles.featureCard}>
          <Text style={styles.featureEmoji}>{emoji}</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.featureTitle}>{title}</Text>
            <Text style={styles.featureText}>{text}</Text>
          </View>
        </View>
      ))}
    </>
  );
}

function TestimoniosContent() {
  const data = [
    [
      "Maria Gonzalez",
      "3er Ano",
      "Experiencia unica en proyectos reales.",
      "#3b82f6",
    ],
    [
      "Carlos Rodriguez",
      "4to Ano",
      "Ambiente increible y aprendizaje continuo.",
      "#4f46e5",
    ],
    [
      "Ana Martinez",
      "5to Ano",
      "Preparacion para retos profesionales.",
      "#7c3aed",
    ],
    [
      "Jorge Lopez",
      "2do Ano",
      "Vida en campus activa y enriquecedora.",
      "#16a34a",
    ],
  ];

  return (
    <>
      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: "#7c3aed" }]}>
          Testimonios de Estudiantes
        </Text>
        <Text style={styles.cardText}>
          Conoce experiencias de quienes ya estudian en la UCI.
        </Text>
      </View>
      {data.map(([name, year, text, color]) => (
        <View
          key={name}
          style={[styles.testimonialCard, { borderLeftColor: color as string }]}
        >
          <Text style={styles.testimonialName}>{name}</Text>
          <Text style={styles.testimonialYear}>{year}</Text>
          <Text style={styles.testimonialText}>"{text}"</Text>
        </View>
      ))}
    </>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoItem}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "#1d4ed8",
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  backButton: { marginBottom: 10 },
  backText: { color: "white", fontSize: 16, fontWeight: "600" },
  headerTitle: {
    color: "white",
    fontSize: 23,
    fontWeight: "700",
    textAlign: "center",
  },
  tabsRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
  },
  tabButton: { flex: 1, paddingVertical: 12, alignItems: "center" },
  tabButtonActive: { borderBottomWidth: 2, borderBottomColor: "#2563eb" },
  tabText: { color: "#6b7280", fontSize: 13, fontWeight: "600" },
  tabTextActive: { color: "#2563eb" },
  content: { padding: 16, gap: 12 },
  card: { backgroundColor: "#fff", borderRadius: 16, padding: 16 },
  cardTitle: { fontSize: 18, fontWeight: "700", marginBottom: 8 },
  cardText: { color: "#4b5563", fontSize: 15, lineHeight: 22 },
  softCard: { backgroundColor: "#eff6ff", borderRadius: 16, padding: 16 },
  softTitle: {
    color: "#1e40af",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 8,
  },
  infoItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#dbeafe",
    paddingVertical: 8,
  },
  infoLabel: { color: "#4b5563" },
  infoValue: { color: "#1e3a8a", fontWeight: "600" },
  featureCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    gap: 12,
  },
  featureEmoji: { fontSize: 26 },
  featureTitle: { fontSize: 16, fontWeight: "700", color: "#1f2937" },
  featureText: { fontSize: 13, color: "#4b5563", marginTop: 2 },
  testimonialCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    borderLeftWidth: 4,
  },
  testimonialName: { color: "#111827", fontWeight: "700", fontSize: 16 },
  testimonialYear: { color: "#6b7280", fontSize: 13, marginBottom: 6 },
  testimonialText: { color: "#374151", fontStyle: "italic", lineHeight: 20 },
});
