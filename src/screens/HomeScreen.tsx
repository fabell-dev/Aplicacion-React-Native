import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  Building,
  Laptop,
  Brain,
  Handshake,
  CircleHelp,
  ChevronRight,
} from "lucide-react-native";
import type { View as AppView } from "../types";

type HomeProps = {
  onNavigate: (
    view: Extract<
      AppView,
      "universidad" | "carrera" | "test" | "mentorias" | "faq"
    >,
  ) => void;
};

type NavCardProps = {
  title: string;
  description: string;
  icon: "building" | "laptop" | "brain" | "handshake" | "help";
  color: string;
  onPress: () => void;
};

function NavCard({ title, description, icon, color, onPress }: NavCardProps) {
  const iconMap = {
    building: <Building size={20} color="white" strokeWidth={2} />,
    laptop: <Laptop size={20} color="white" strokeWidth={2} />,
    brain: <Brain size={20} color="white" strokeWidth={2} />,
    handshake: <Handshake size={20} color="white" strokeWidth={2} />,
    help: <CircleHelp size={20} color="white" strokeWidth={2} />,
  };

  return (
    <Pressable
      style={[styles.navCard, { backgroundColor: color }]}
      onPress={onPress}
    >
      <View style={styles.navIconWrap}>{iconMap[icon]}</View>
      <View style={styles.navTextWrap}>
        <Text style={styles.navTitle}>{title}</Text>
        <Text style={styles.navDescription}>{description}</Text>
      </View>
      <ChevronRight size={22} color="white" />
    </Pressable>
  );
}

export function HomeScreen({ onNavigate }: HomeProps) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/portada.jpeg")}
        style={styles.header}
        imageStyle={styles.headerImage}
      >
        <View style={styles.headerOverlay} />
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Orientacion ICI</Text>
          <Text style={styles.headerSubtitle}>
            Tu guía hacia la Ingeniería en Ciencias Informáticas
          </Text>
        </View>
      </ImageBackground>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>¿Que es esta aplicación?</Text>
          <Text style={styles.bodyText}>
            Esta aplicación esta diseñada para orientar a estudiantes de
            enseñanzas precedentes a la universidad sobre la carrera de
            Ingeniería en Ciencias Informáticas en la UCI, Cuba.
          </Text>
        </View>

        <NavCard
          title="Universidad UCI"
          description="Conoce la universidad, vida estudiantil y testimonios"
          icon="building"
          color="#2563eb"
          onPress={() => onNavigate("universidad")}
        />

        <NavCard
          title="Carrera de ICI"
          description="Información sobre asignaturas, cursos y más"
          icon="laptop"
          color="#4f46e5"
          onPress={() => onNavigate("carrera")}
        />

        <NavCard
          title="Test Vocacional"
          description="Evalúa tu aptitud para la carrera"
          icon="brain"
          color="#7c3aed"
          onPress={() => onNavigate("test")}
        />

        <NavCard
          title="Mentorias Electrónicas"
          description="Conecta con estudiantes universitarios"
          icon="handshake"
          color="#16a34a"
          onPress={() => onNavigate("mentorias")}
        />

        <NavCard
          title="Preguntas Frecuentes"
          description="Resuelve tus dudas sobre la carrera"
          icon="help"
          color="#ea580c"
          onPress={() => onNavigate("faq")}
        />
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Universidad de las Ciencias Informáticas, Cuba
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    minHeight: 280,
    justifyContent: "center",
  },
  headerImage: {
    resizeMode: "cover",
  },
  headerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(17, 24, 39, 0.45)",
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingVertical: 28,
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
  navTextWrap: { flex: 1 },
  navTitle: {
    color: "white",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 2,
  },
  navDescription: { color: "#eef2ff", fontSize: 13 },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    padding: 12,
    backgroundColor: "white",
  },
  footerText: { textAlign: "center", color: "#6b7280", fontSize: 13 },
});
