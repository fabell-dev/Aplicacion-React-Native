import {
  Alert,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

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
        <Text style={styles.title}>Mentorias Electronicas</Text>
        <Text style={styles.subtitle}>
          Conecta con estudiantes universitarios
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Que son las Mentorias?</Text>
          <Text style={styles.cardText}>
            Te permiten conectar con estudiantes de ICI para resolver dudas y
            recibir orientacion.
          </Text>
        </View>

        <View style={styles.softCard}>
          <Text style={styles.softTitle}>Que puedes obtener?</Text>
          <Benefit
            title="Respuestas en tiempo real"
            text="Haz preguntas y recibe respuestas de estudiantes actuales."
            emoji="💬"
          />
          <Benefit
            title="Experiencias reales"
            text="Conoce la vida universitaria de primera mano."
            emoji="📖"
          />
          <Benefit
            title="Consejos utiles"
            text="Tips para prepararte mejor para la carrera."
            emoji="🎯"
          />
          <Benefit
            title="Red de apoyo"
            text="Conecta con futuros companeros y mentores."
            emoji="🤝"
          />
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Como funciona?</Text>
          <Step
            number={1}
            title="Unete al grupo"
            text="Usa el boton de WhatsApp para entrar a la comunidad."
          />
          <Step
            number={2}
            title="Presentate"
            text="Cuenta quien eres y que te gustaria saber."
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
            year="5to Ano"
            specialty="Desarrollo Web"
            emoji="👨‍💻"
          />
          <Mentor
            name="Laura Diaz"
            year="4to Ano"
            specialty="Inteligencia Artificial"
            emoji="👩‍💻"
          />
          <Mentor
            name="Miguel Torres"
            year="3er Ano"
            specialty="Bases de Datos"
            emoji="👨‍💻"
          />
        </View>

        <View style={styles.ctaCard}>
          <Text style={styles.ctaTitle}>Unete a la Comunidad</Text>
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
          <Text style={styles.rule}>✓ Respeta a todos los miembros</Text>
          <Text style={styles.rule}>
            ✓ Mantener conversaciones relacionadas con la carrera y la UCI
          </Text>
          <Text style={styles.rule}>
            ✓ No compartas informacion personal sensible
          </Text>
          <Text style={styles.rule}>
            ✓ Se paciente, los mentores son voluntarios
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

function Benefit({
  title,
  text,
  emoji,
}: {
  title: string;
  text: string;
  emoji: string;
}) {
  return (
    <View style={styles.itemRow}>
      <Text style={styles.itemEmoji}>{emoji}</Text>
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
  emoji,
}: {
  name: string;
  year: string;
  specialty: string;
  emoji: string;
}) {
  return (
    <View style={styles.mentorCard}>
      <Text style={styles.mentorEmoji}>{emoji}</Text>
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>{name}</Text>
        <Text style={styles.itemText}>
          {year} - {specialty}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "#16a34a",
    paddingHorizontal: 16,
    paddingVertical: 16,
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
  itemEmoji: { fontSize: 24 },
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
  mentorEmoji: { fontSize: 24 },
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
  rule: { color: "#1e3a8a", fontSize: 13, marginBottom: 4 },
});
