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

type Props = { onBack: () => void };

type FAQItem = {
  question: string;
  answer: string;
};

const faqData: FAQItem[] = [
  {
    question: "¿Que es la carrera de Ingenieria en Ciencias Informáticas?",
    answer:
      "Es una carrera universitaria que forma profesionales en el desarrollo de software, sistemas informáticos y soluciones tecnológicas. En la UCI, la carrera tiene un fuerte enfoque práctico con trabajo en proyectos reales desde los primeros años.",
  },
  {
    question: "¿Que asignaturas voy a estudiar?",
    answer:
      "Estudiaras matemáticas, programación, bases de datos, redes, ingeniería de software, inteligencia artificial, desarrollo web y móvil, entre otras. Las asignaturas combinan teoria con práctica en proyectos productivos.",
  },
  {
    question: "¿Necesito saber programar antes de entrar?",
    answer:
      "No es necesario tener conocimientos previos de programación. La carrera comienza desde cero y te enseña todo lo necesario paso a paso. Lo importante es tener interés, lógica y ganas de aprender.",
  },
  {
    question: "¿Cuánto dura la carrera?",
    answer:
      "La carrera tiene una duracion de 4 años, divididos en 8 semestres. Durante este tiempo combinaras clases teóricas con trabajo en proyectos productivos de la universidad.",
  },
  {
    question: "¿Como es la vida estudiantil en la UCI?",
    answer:
      "La UCI ofrece residencia estudiantil, actividades deportivas, culturales y recreativas. Cuenta con instalaciones modernas, comedores, áreas de estudio y espacios para el desarrollo personal y profesional de los estudiantes.",
  },
  {
    question: "¿Que oportunidades laborales tendre al graduarme?",
    answer:
      "Como ingeniero informático podrás trabajar en desarrollo de software, administración de sistemas, seguridad informática, inteligencia artificial, análisis de datos, gestión de proyectos tecnológicos, y muchas otras áreas del sector IT.",
  },
  {
    question:
      "¿La UCI tiene convenios con empresas o universidades internacionales?",
    answer:
      "Si, la UCI mantiene convenios con múltiples empresas tecnológicas e instituciones educativas internacionales. Esto permite intercambios académicos, proyectos colaborativos y oportunidades de certificación internacional.",
  },
  {
    question: "¿Puedo trabajar mientras estudio?",
    answer:
      "A partir del tercer año, los estudiantes participan en proyectos productivos de la universidad como parte de su formación, donde adquieren experiencia práctica real mientras estudian. Además, algunos estudiantes destacados pueden realizar prácticas en empresas.",
  },
  {
    question: "¿Que requisitos de entrada tiene la carrera?",
    answer:
      "Debes aprobar los exámenes de ingreso establecidos por el Ministerio de Educación Superior de Cuba, con enfásis en Matemática, Español e Historia. También se considera tu índice académico de preuniversitario.",
  },
  {
    question: "¿La carrera es muy difícil?",
    answer:
      "Como cualquier carrera universitaria, requiere dedicación y esfuerzo. Las matemáticas y la lógica son fundamentales, pero con disciplina, apoyo de profesores y compañeros, y aprovechando los recursos disponibles, es totalmente alcanzable. La clave esta en la constancia y el ínteres por aprender.",
  },
];

export function FAQScreen({ onBack }: Props) {
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
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <View key={index} style={styles.faqCard}>
                <Pressable
                  onPress={() => toggleQuestion(index)}
                  style={styles.questionButton}
                >
                  <Text style={styles.questionText}>{item.question}</Text>
                  <Text style={[styles.chevron, isOpen && styles.chevronOpen]}>
                    ⌄
                  </Text>
                </Pressable>
                {isOpen ? (
                  <View style={styles.answerWrap}>
                    <Text style={styles.answerText}>{item.answer}</Text>
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
