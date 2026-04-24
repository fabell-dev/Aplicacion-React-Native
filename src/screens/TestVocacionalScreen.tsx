import { useMemo, useState } from "react";
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

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
};

const questions: Question[] = [
  {
    id: 1,
    question: "¿Que es un algoritmo?",
    options: [
      "Un tipo de computadora",
      "Un conjunto de instrucciones para resolver un problema",
      "Un lenguaje de programación",
      "Un sistema operativo",
    ],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "¿Cual de estos es un lenguaje de programación?",
    options: ["HTML", "Python", "CSS", "MySQL"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "¿Que significa CPU?",
    options: [
      "Computer Personal Unit",
      "Central Processing Unit",
      "Central Program Unit",
      "Computer Program Utility",
    ],
    correctAnswer: 1,
  },
  {
    id: 4,
    question: "¿Que es una base de datos?",
    options: [
      "Un programa de diseno gráfico",
      "Un sistema organizado para almacenar información",
      "Un tipo de red social",
      "Un navegador web",
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "¿Que hace un desarrollador de software?",
    options: [
      "Repara computadoras",
      "Diseña paginas web solamente",
      "Crea programas y aplicaciones",
      "Vende software",
    ],
    correctAnswer: 2,
  },
  {
    id: 6,
    question: "¿Que es un bug en programación?",
    options: [
      "Un insecto en la computadora",
      "Un error en el código",
      "Un tipo de virus",
      "Un comando especial",
    ],
    correctAnswer: 1,
  },
  {
    id: 7,
    question: "¿Que significa open source?",
    options: [
      "Software gratuito",
      "Software con codigo abierto que puede ser modificado",
      "Software cerrado",
      "Software para empresas",
    ],
    correctAnswer: 1,
  },
  {
    id: 8,
    question: "¿Que es la inteligencia artificial?",
    options: [
      "Un tipo de computadora muy rápida",
      "Sistemas que simulan inteligencia humana",
      "Un videojuego",
      "Un lenguaje de programación",
    ],
    correctAnswer: 1,
  },
  {
    id: 9,
    question: "¿Que es Git?",
    options: [
      "Un lenguaje de programación",
      "Un sistema de control de versiones",
      "Un editor de texto",
      "Un sistema operativo",
    ],
    correctAnswer: 1,
  },
  {
    id: 10,
    question: "¿Que es una API?",
    options: [
      "Un tipo de computadora",
      "Una interfaz para que programas se comuniquen",
      "Un lenguaje de programación",
      "Una red social",
    ],
    correctAnswer: 1,
  },
];

export function TestVocacionalScreen({ onBack }: Props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResults, setShowResults] = useState(false);

  const score = useMemo(() => {
    if (!showResults) {
      return 0;
    }
    return answers.reduce((count, answer, index) => {
      return count + (answer === questions[index].correctAnswer ? 1 : 0);
    }, 0);
  }, [answers, showResults]);

  const result = useMemo(() => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 70) {
      return {
        level: "Bien",
        color: "#16a34a",
        icon: "🎉",
        message: "Excelente. Tienes una buena base para ICI.",
        recommendation: "Explora mas sobre proyectos de software en la UCI.",
      };
    }
    if (percentage >= 40) {
      return {
        level: "Regular",
        color: "#ca8a04",
        icon: "📚",
        message: "Tienes bases iniciales. Con estudio puedes avanzar rapido.",
        recommendation:
          "Refuerza programacion y conceptos basicos de informática.",
      };
    }
    return {
      level: "Puede Mejorar",
      color: "#ea580c",
      icon: "💪",
      message: "Aun puedes fortalecer muchas bases antes de iniciar.",
      recommendation:
        "Empieza con fundamentos y usa las mentorías para orientarte.",
    };
  }, [score]);

  const handleNext = () => {
    if (selectedOption === null) {
      return;
    }
    const updated = [...answers, selectedOption];
    setAnswers(updated);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      return;
    }
    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setSelectedOption(null);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={onBack}>
            <Text style={styles.backText}>‹ Volver</Text>
          </Pressable>
          <Text style={styles.headerTitle}>Resultados del Test</Text>
        </View>
        <ScrollView contentContainerStyle={styles.content}>
          <View
            style={[styles.resultTopCard, { backgroundColor: result.color }]}
          >
            <Text style={styles.resultEmoji}>{result.icon}</Text>
            <Text style={styles.resultLevel}>Nivel: {result.level}</Text>
            <Text style={styles.resultScore}>
              {score} / {questions.length}
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Evaluación</Text>
            <Text style={styles.cardText}>{result.message}</Text>
            <View style={styles.recommendBox}>
              <Text style={styles.recommendTitle}>Recomendación</Text>
              <Text style={styles.recommendText}>{result.recommendation}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Detalle de Respuestas</Text>
            {questions.map((q, index) => {
              const correct = answers[index] === q.correctAnswer;
              return (
                <View
                  key={q.id}
                  style={[
                    styles.answerRow,
                    { backgroundColor: correct ? "#dcfce7" : "#fee2e2" },
                  ]}
                >
                  <Text style={styles.answerRowText}>Pregunta {index + 1}</Text>
                  <Text style={{ fontSize: 18 }}>{correct ? "✅" : "❌"}</Text>
                </View>
              );
            })}
          </View>

          <View style={styles.actionsRow}>
            <Pressable
              style={[styles.actionBtn, { backgroundColor: "#7c3aed" }]}
              onPress={handleRestart}
            >
              <Text style={styles.actionBtnText}>Repetir Test</Text>
            </Pressable>
            <Pressable
              style={[styles.actionBtn, { backgroundColor: "#1f2937" }]}
              onPress={onBack}
            >
              <Text style={styles.actionBtnText}>Inicio</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backText}>‹ Volver</Text>
        </Pressable>
        <View style={styles.titleRow}>
          <Text style={styles.headerTitle}>Test Vocacional</Text>
          <Text style={styles.counter}>
            {currentQuestion + 1} / {questions.length}
          </Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.questionLabel}>
            Pregunta {currentQuestion + 1}
          </Text>
          <Text style={styles.questionText}>
            {questions[currentQuestion].question}
          </Text>

          <View style={styles.optionsWrap}>
            {questions[currentQuestion].options.map((option, index) => {
              const selected = selectedOption === index;
              return (
                <Pressable
                  key={option}
                  style={[
                    styles.optionButton,
                    selected && styles.optionButtonSelected,
                  ]}
                  onPress={() => setSelectedOption(index)}
                >
                  <View
                    style={[
                      styles.radioDot,
                      selected && styles.radioDotSelected,
                    ]}
                  >
                    {selected ? <View style={styles.radioInner} /> : null}
                  </View>
                  <Text style={styles.optionText}>{option}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <Pressable
          style={[
            styles.nextButton,
            selectedOption === null && styles.nextButtonDisabled,
          ]}
          onPress={handleNext}
          disabled={selectedOption === null}
        >
          <Text style={styles.nextButtonText}>
            {currentQuestion === questions.length - 1
              ? "Ver Resultados"
              : "Siguiente"}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "#7c3aed",
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 12 : 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  backText: { color: "white", fontSize: 16, fontWeight: "600" },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  headerTitle: { color: "white", fontSize: 22, fontWeight: "700" },
  counter: { color: "#e9d5ff", fontWeight: "600" },
  progressTrack: {
    backgroundColor: "#5b21b6",
    borderRadius: 999,
    height: 8,
    marginTop: 10,
    overflow: "hidden",
  },
  progressBar: { height: 8, backgroundColor: "white" },
  content: { padding: 16, gap: 12 },
  card: { backgroundColor: "white", borderRadius: 16, padding: 16 },
  questionLabel: { color: "#6b7280", fontSize: 13, marginBottom: 6 },
  questionText: {
    color: "#1f2937",
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
  },
  optionsWrap: { gap: 10 },
  optionButton: {
    borderWidth: 2,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  optionButtonSelected: { borderColor: "#7c3aed", backgroundColor: "#f5f3ff" },
  radioDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#9ca3af",
    alignItems: "center",
    justifyContent: "center",
  },
  radioDotSelected: { borderColor: "#7c3aed", backgroundColor: "#7c3aed" },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "white",
  },
  optionText: { flex: 1, color: "#374151" },
  nextButton: {
    backgroundColor: "#7c3aed",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  nextButtonDisabled: { backgroundColor: "#d1d5db" },
  nextButtonText: { color: "white", fontWeight: "700", fontSize: 16 },
  resultTopCard: { borderRadius: 16, padding: 20, alignItems: "center" },
  resultEmoji: { fontSize: 54, marginBottom: 8 },
  resultLevel: { color: "white", fontSize: 22, fontWeight: "700" },
  resultScore: { color: "white", fontSize: 30, fontWeight: "800" },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1f2937",
    marginBottom: 8,
  },
  cardText: { fontSize: 15, color: "#4b5563", lineHeight: 22 },
  recommendBox: {
    backgroundColor: "#f5f3ff",
    borderRadius: 10,
    padding: 12,
    marginTop: 10,
  },
  recommendTitle: { color: "#6d28d9", fontWeight: "700", marginBottom: 4 },
  recommendText: { color: "#374151", lineHeight: 20 },
  answerRow: {
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  answerRowText: { color: "#1f2937", fontWeight: "600" },
  actionsRow: { flexDirection: "row", gap: 10 },
  actionBtn: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },
  actionBtnText: { color: "white", fontWeight: "700" },
});
