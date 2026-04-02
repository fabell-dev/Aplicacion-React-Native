import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { View as AppView } from "../types";

type HomeProps = {
  onNavigate: (
    view: Extract<AppView, "universidad" | "carrera" | "test" | "mentorias">,
  ) => void;
};

type NavCardProps = {
  title: string;
  description: string;
  emoji: string;
  color: string;
  onPress: () => void;
};

function NavCard({ title, description, emoji, color, onPress }: NavCardProps) {
  return (
    <Pressable
      style={[styles.navCard, { backgroundColor: color }]}
      onPress={onPress}
    >
      <View style={styles.navIconWrap}>
        <Text style={styles.navIcon}>{emoji}</Text>
      </View>
      <View style={styles.navTextWrap}>
        <Text style={styles.navTitle}>{title}</Text>
        <Text style={styles.navDescription}>{description}</Text>
      </View>
      <Text style={styles.navArrow}>›</Text>
    </Pressable>
  );
}

export function HomeScreen({ onNavigate }: HomeProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerIconWrap}>
          <Text style={styles.headerIcon}>🎓</Text>
        </View>
        <Text style={styles.headerTitle}>Orientacion ICI</Text>
        <Text style={styles.headerSubtitle}>
          Tu guia hacia la Ingenieria en Ciencias Informaticas
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Que es esta aplicacion?</Text>
          <Text style={styles.bodyText}>
            Esta aplicacion esta disenada para orientar a estudiantes de
            ensenanzas precedentes a la universidad sobre la carrera de
            Ingenieria en Ciencias Informaticas en la UCI, Cuba.
          </Text>
        </View>

        <NavCard
          title="Universidad UCI"
          description="Conoce la universidad, vida estudiantil y testimonios"
          emoji="🏛️"
          color="#2563eb"
          onPress={() => onNavigate("universidad")}
        />

        <NavCard
          title="Carrera de ICI"
          description="Informacion sobre asignaturas, cursos y mas"
          emoji="💻"
          color="#4f46e5"
          onPress={() => onNavigate("carrera")}
        />

        <NavCard
          title="Test Vocacional"
          description="Evalua tu aptitud para la carrera"
          emoji="🧠"
          color="#7c3aed"
          onPress={() => onNavigate("test")}
        />

        <NavCard
          title="Mentorias Electronicas"
          description="Conecta con estudiantes universitarios"
          emoji="🤝"
          color="#16a34a"
          onPress={() => onNavigate("mentorias")}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Universidad de las Ciencias Informaticas, Cuba
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "#1d4ed8",
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: "center",
  },
  headerIconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#ffffff33",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },
  headerIcon: { fontSize: 30 },
  headerTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
  },
  headerSubtitle: {
    color: "#dbeafe",
    marginTop: 6,
    textAlign: "center",
    fontSize: 14,
  },
  content: {
    padding: 16,
    gap: 12,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 10,
  },
  bodyText: { fontSize: 15, color: "#4b5563", lineHeight: 22 },
  navCard: {
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  navIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: "#ffffff33",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  navIcon: { fontSize: 20 },
  navTextWrap: { flex: 1 },
  navTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 2,
  },
  navDescription: { color: "#eef2ff", fontSize: 13 },
  navArrow: { color: "white", fontSize: 28, marginLeft: 8 },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    padding: 12,
    backgroundColor: "white",
  },
  footerText: { textAlign: "center", color: "#6b7280", fontSize: 13 },
});
