import {
  Alert,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import {
  MessageCircle,
  BookOpen,
  Target,
  Handshake,
  User,
  Check,
} from "lucide-react-native";

type Props = { onBack: () => void };

const whatsappGroupLink = "https://chat.whatsapp.com/tu-codigo-de-grupo";

export function MentoriasScreen({ onBack }: Props) {
  const handleJoinWhatsApp = async () => {
    const canOpen = await Linking.canOpenURL(whatsappGroupLink);
    if (!canOpen) {
      Alert.alert(
        "No se pudo abrir el enlace",
        "Actualiza el enlace del grupo de WhatsApp.",
      );
      return;
    }
    await Linking.openURL(whatsappGroupLink);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backText}>‹ Volver</Text>
        </Pressable>
        <Text style={styles.title}>Mentorias Electrónicas</Text>
        <Text style={styles.subtitle}>
          Conecta con estudiantes universitarios
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Que son las Mentorías?</Text>
          <Text style={styles.cardText}>
            Te permiten conectar con estudiantes de ICI para resolver dudas y
            recibir orientación.
          </Text>
        </View>

        <View style={styles.softCard}>
          <Text style={styles.softTitle}>Que puedes obtener?</Text>
          <Benefit
            title="Respuestas en tiempo real"
            text="Haz preguntas y recibe respuestas de estudiantes actuales."
            icon="chat"
          />
          <Benefit
            title="Experiencias reales"
            text="Conoce la vida universitaria de primera mano."
            icon="book"
          />
          <Benefit
            title="Consejos utiles"
            text="Tips para prepararte mejor para la carrera."
            icon="target"
          />
          <Benefit
            title="Red de apoyo"
            text="Conecta con futuros compañeros y mentores."
            icon="network"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Como funciona?</Text>
          <Step
            number={1}
            title="Unete al grupo"
            text="Usa el botón de WhatsApp para entrar a la comunidad."
          />
          <Step
            number={2}
            title="Preséntate"
            text="Cuenta quien eres y que te gustaría saber."
          />
          <Step
            number={3}
            title="Interactua"
            text="Participa, pregunta y aprende."
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Mentores</Text>
          <Mentor
            name="Pedro Sanchez"
            year="4to Año"
            specialty="Desarrollo Web"
            icon="user"
          />
          <Mentor
            name="Laura Diaz"
            year="4to Año"
            specialty="Inteligencia Artificial"
            icon="user"
          />
          <Mentor
            name="Miguel Torres"
            year="3er Año"
            specialty="Bases de Datos"
            icon="user"
          />
        </View>

        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Únete a la Comunidad</Text>
          <Text style={styles.ctaText}>
            Accede al grupo y comienza a resolver tus dudas.
          </Text>
          <Pressable style={styles.ctaButton} onPress={handleJoinWhatsApp}>
            <Text style={styles.ctaButtonText}>
              Unirse al Grupo de WhatsApp
            </Text>
          </Pressable>
        </View>

        <View style={styles.rulesCard}>
          <Text style={styles.rulesTitle}>Normas de la Comunidad</Text>
          <RuleItem text="Respeta a todos los miembros" />
          <RuleItem text="Mantener conversaciones relacionadas con la carrera y la UCI" />
          <RuleItem text="No compartas información personal sensible" />
          <RuleItem text="Sé paciente, los mentores son voluntarios" />
        </View>
      </ScrollView>
    </View>
  );
}

function Benefit({
  title,
  text,
  icon,
}: {
  title: string;
  text: string;
  icon: "chat" | "book" | "target" | "network";
}) {
  const iconMap = {
    chat: <MessageCircle size={20} color="#166534" strokeWidth={2} />,
    book: <BookOpen size={20} color="#166534" strokeWidth={2} />,
    target: <Target size={20} color="#166534" strokeWidth={2} />,
    network: <Handshake size={20} color="#166534" strokeWidth={2} />,
  };

  return (
    <View style={styles.itemRow}>
      <View style={styles.itemIconWrap}>{iconMap[icon]}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemText}>{text}</Text>
      </View>
    </View>
  );
}

function Step({
  number,
  title,
  text,
}: {
  number: number;
  title: string;
  text: string;
}) {
  return (
    <View style={styles.stepRow}>
      <View style={styles.stepCircle}>
        <Text style={styles.stepNumber}>{number}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>{title}</Text>
        <Text style={styles.itemText}>{text}</Text>
      </View>
    </View>
  );
}

function Mentor({
  name,
  year,
  specialty,
  icon,
}: {
  name: string;
  year: string;
  specialty: string;
  icon: "user";
}) {
  const iconMap = {
    user: <User size={20} color="#166534" strokeWidth={2} />,
  };

  return (
    <View style={styles.mentorCard}>
      <View style={styles.mentorIconWrap}>{iconMap[icon]}</View>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>{name}</Text>
        <Text style={styles.itemText}>
          {year} - {specialty}
        </Text>
      </View>
    </View>
  );
}

function RuleItem({ text }: { text: string }) {
  return (
    <View style={styles.ruleRow}>
      <Check size={16} color="#1e3a8a" strokeWidth={2.5} />
      <Text style={styles.rule}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "#16a34a",
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 12 : 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backText: { color: "white", fontSize: 16, fontWeight: "600" },
  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 6,
  },
  subtitle: { color: "#dcfce7", textAlign: "center", marginTop: 4 },
  content: { padding: 16, gap: 12 },
  card: { backgroundColor: "white", borderRadius: 16, padding: 16 },
  cardTitle: {
    color: "#15803d",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  cardText: { color: "#4b5563", lineHeight: 22 },
  softCard: { backgroundColor: "#ecfdf5", borderRadius: 16, padding: 16 },
  softTitle: {
    color: "#166534",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 8,
  },
  itemRow: { flexDirection: "row", gap: 10, marginBottom: 10 },
  itemIconWrap: {
    width: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  itemTitle: { color: "#1f2937", fontWeight: "700" },
  itemText: { color: "#4b5563", fontSize: 13, marginTop: 2 },
  stepRow: { flexDirection: "row", gap: 10, marginBottom: 10 },
  stepCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#16a34a",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumber: { color: "white", fontWeight: "700" },
  mentorCard: {
    backgroundColor: "#f0fdf4",
    borderWidth: 1,
    borderColor: "#bbf7d0",
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  mentorIconWrap: {
    width: 28,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaCard: {
    backgroundColor: "#16a34a",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  ctaTitle: { color: "white", fontSize: 20, fontWeight: "700" },
  ctaText: {
    color: "#dcfce7",
    marginTop: 6,
    marginBottom: 12,
    textAlign: "center",
  },
  ctaButton: {
    backgroundColor: "white",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    width: "100%",
    alignItems: "center",
  },
  ctaButtonText: { color: "#166534", fontWeight: "700" },
  rulesCard: {
    backgroundColor: "#eff6ff",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#bfdbfe",
  },
  rulesTitle: { color: "#1e40af", fontWeight: "700", marginBottom: 6 },
  ruleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 6,
    marginBottom: 4,
  },
  rule: { color: "#1e3a8a", fontSize: 13, flex: 1 },
});
