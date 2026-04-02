import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

type Props = { onBack: () => void };

const areas = [
  "Desarrollo de Software",
  "Ingenieria de Software",
  "Bases de Datos",
  "Redes y Telecomunicaciones",
  "Inteligencia Artificial",
  "Seguridad Informatica",
  "Arquitectura de Software",
];

const opportunities = [
  [
    "Desarrollador de Software",
    "Creacion de aplicaciones web, moviles y de escritorio",
  ],
  ["Arquitecto de Software", "Diseno de soluciones tecnologicas escalables"],
  ["Ingeniero de Datos", "Gestion y analisis de informacion"],
  ["Especialista en Seguridad", "Proteccion de sistemas y datos empresariales"],
  ["Consultor TI", "Asesoramiento en transformacion digital"],
];

export function CarreraScreen({ onBack }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={onBack}>
          <Text style={styles.backText}>‹ Volver</Text>
        </Pressable>
        <Text style={styles.title}>Carrera de ICI</Text>
        <Text style={styles.subtitle}>Ingenieria en Ciencias Informaticas</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Sobre la Carrera</Text>
          <Text style={styles.cardText}>
            Forma profesionales capaces de disenar, desarrollar e implementar
            soluciones informaticas para problemas reales.
          </Text>
        </View>

        <View style={styles.softCard}>
          <Text style={styles.softTitle}>Duracion</Text>
          <Text style={styles.softText}>
            5 anos de formacion intensiva combinando teoria y practica.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Areas de Formacion</Text>
          {areas.map((area) => (
            <View key={area} style={styles.rowItem}>
              <Text style={styles.dot}>•</Text>
              <Text style={styles.rowText}>{area}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Asignaturas por Ano</Text>
          <SubjectCard
            year="1er Ano"
            subjects={[
              "Matematica",
              "Programacion",
              "Introduccion a la Ingenieria",
              "Ingles Tecnico",
            ]}
            color="#dbeafe"
          />
          <SubjectCard
            year="2do Ano"
            subjects={[
              "Estructuras de Datos",
              "POO",
              "Bases de Datos I",
              "Matematica Computacional",
            ]}
            color="#e0e7ff"
          />
          <SubjectCard
            year="3er Ano"
            subjects={[
              "Ingenieria de Software",
              "Desarrollo Web",
              "Sistemas Operativos",
              "Redes",
            ]}
            color="#ede9fe"
          />
          <SubjectCard
            year="4to-5to Ano"
            subjects={[
              "Arquitectura de Software",
              "IA",
              "Seguridad Informatica",
              "Proyecto de Desarrollo",
            ]}
            color="#f3e8ff"
          />
        </View>

        <View style={styles.softCard}>
          <Text style={styles.softTitle}>Habilidades</Text>
          {[
            "Programacion en multiples lenguajes",
            "Diseno de sistemas complejos",
            "Trabajo en equipo",
            "Resolucion de problemas",
            "Gestion de proyectos",
            "Pensamiento analitico",
          ].map((skill) => (
            <View key={skill} style={styles.skillItem}>
              <Text style={styles.skillDot}>•</Text>
              <Text style={styles.skillText}>{skill}</Text>
            </View>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Oportunidades Profesionales</Text>
          {opportunities.map(([title, description]) => (
            <View key={title} style={styles.opportunityItem}>
              <Text style={styles.opTitle}>{title}</Text>
              <Text style={styles.opDescription}>{description}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function SubjectCard({
  year,
  subjects,
  color,
}: {
  year: string;
  subjects: string[];
  color: string;
}) {
  return (
    <View style={[styles.subjectCard, { backgroundColor: color }]}>
      <Text style={styles.subjectYear}>{year}</Text>
      {subjects.map((subject) => (
        <Text key={subject} style={styles.subjectText}>
          • {subject}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    backgroundColor: "#4f46e5",
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
  subtitle: { color: "#e0e7ff", textAlign: "center", marginTop: 4 },
  content: { padding: 16, gap: 12 },
  card: { backgroundColor: "white", borderRadius: 16, padding: 16 },
  cardTitle: {
    color: "#4338ca",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  cardText: { color: "#4b5563", lineHeight: 22 },
  softCard: { backgroundColor: "#eef2ff", borderRadius: 16, padding: 16 },
  softTitle: {
    color: "#3730a3",
    fontSize: 17,
    fontWeight: "700",
    marginBottom: 6,
  },
  softText: { color: "#374151" },
  rowItem: { flexDirection: "row", alignItems: "center", marginBottom: 6 },
  dot: { color: "#7c3aed", marginRight: 8, fontSize: 18 },
  rowText: { color: "#374151" },
  subjectCard: { borderRadius: 12, padding: 12, marginBottom: 10 },
  subjectYear: { color: "#1f2937", fontWeight: "700", marginBottom: 6 },
  subjectText: { color: "#4b5563", marginBottom: 3 },
  skillItem: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    marginBottom: 8,
  },
  skillDot: { color: "#7c3aed", marginRight: 8 },
  skillText: { color: "#374151" },
  opportunityItem: {
    borderLeftWidth: 4,
    borderLeftColor: "#6366f1",
    paddingLeft: 10,
    marginBottom: 10,
  },
  opTitle: { color: "#1f2937", fontWeight: "700" },
  opDescription: { color: "#4b5563", fontSize: 13, marginTop: 3 },
});
