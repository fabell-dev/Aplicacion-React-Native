import { useState } from "react";
import {
  ImageBackground,
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import type { UniversityTab } from "../types";
import {
  MapPin,
  Building,
  Home,
  Zap,
  Music,
  UtensilsCrossed,
} from "lucide-react-native";

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
          La Universidad de las Ciencias Informáticas (UCI) es una institución
          educativa cubana especializada en la formación de profesionales en
          técnologias de la información y comunicaciones.
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
        <InfoItem label="Especialidad" value="Ciencias Informáticas" />
      </View>

      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: "#1f2937" }]}>
          Modelo Universidad-Empresa
        </Text>
        <Text style={styles.cardText}>
          Combina estudio con producción de software en proyectos reales desde
          los primeros años.
        </Text>
      </View>
    </>
  );
}

function VidaContent() {
  const [selectedSection, setSelectedSection] = useState<CampusSection | null>(
    null,
  );

  const handleOpenMaps = async () => {
    const url = "https://maps.app.goo.gl/wPHrmM27sqoiM9cx5";
    const canOpen = await Linking.canOpenURL(url);
    if (canOpen) {
      await Linking.openURL(url);
    }
  };

  if (selectedSection !== null) {
    return (
      <CampusDetail
        section={selectedSection}
        onBack={() => setSelectedSection(null)}
      />
    );
  }

  return (
    <>
      <View style={styles.card}>
        <Text style={[styles.cardTitle, { color: "#4f46e5" }]}>
          Vida en el Campus
        </Text>
        <Text style={styles.cardText}>
          Descubre todo lo que nuestra universidad tiene para ofrecer. Toca cada
          seccion para conocer mas detalles.
        </Text>
      </View>

      <Pressable style={styles.mapsButton} onPress={handleOpenMaps}>
        <MapPin size={20} color="white" strokeWidth={2} />
        <Text style={styles.mapsButtonText}>Ver UCI en Google Maps</Text>
      </Pressable>

      <SectionCard
        title="Vida en el Campus"
        description="Conoce nuestra ciudad tecnologica de avanzada con mas de 268 hectareas."
        icon="building"
        onPress={() => setSelectedSection("campus")}
      />
      <SectionCard
        title="Residencia Estudiantil"
        description="Un espacio educativo y socializante para estudiantes y profesores."
        icon="home"
        onPress={() => setSelectedSection("residencia")}
      />
      <SectionCard
        title="Deportes y Recreacion"
        description="Instalaciones y actividades para promover estilos de vida saludable."
        icon="zap"
        onPress={() => setSelectedSection("deportes")}
      />
      <SectionCard
        title="Actividades Culturales"
        description="Fuerte movimiento artistico con reconocimientos a nivel nacional."
        icon="music"
        onPress={() => setSelectedSection("cultura")}
      />
      <SectionCard
        title="Comedores"
        description="Servicios de alimentacion con menus variados y nutritivos."
        icon="utensils"
        onPress={() => setSelectedSection("comedores")}
      />
    </>
  );
}

type CampusSection =
  | "campus"
  | "residencia"
  | "deportes"
  | "cultura"
  | "comedores";

const sectionImages: Record<CampusSection, any> = {
  campus: require("../../assets/vida.jpg"),
  residencia: require("../../assets/residencia.jpg"),
  deportes: require("../../assets/deporte.jpg"),
  cultura: require("../../assets/cultura.jpg"),
  comedores: require("../../assets/comedor.jpg"),
};

function SectionCard({
  title,
  description,
  icon,
  onPress,
}: {
  title: string;
  description: string;
  icon: "building" | "home" | "zap" | "music" | "utensils";
  onPress: () => void;
}) {
  const iconMap = {
    building: <Building size={26} color="#111827" strokeWidth={1.5} />,
    home: <Home size={26} color="#111827" strokeWidth={1.5} />,
    zap: <Zap size={26} color="#111827" strokeWidth={1.5} />,
    music: <Music size={26} color="#111827" strokeWidth={1.5} />,
    utensils: <UtensilsCrossed size={26} color="#111827" strokeWidth={1.5} />,
  };

  return (
    <Pressable style={styles.sectionCard} onPress={onPress}>
      <View style={styles.sectionIconContainer}>{iconMap[icon]}</View>
      <View style={styles.sectionTextWrap}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <Text style={styles.sectionDescription}>{description}</Text>
      </View>
      <Text style={styles.sectionArrow}>›</Text>
    </Pressable>
  );
}

function CampusDetail({
  section,
  onBack,
}: {
  section: CampusSection;
  onBack: () => void;
}) {
  const detail = getCampusDetail(section);

  return (
    <View style={styles.detailScreen}>
      <ImageBackground
        source={sectionImages[section]}
        style={styles.detailHero}
        imageStyle={styles.detailHeroImage}
      >
        <View style={styles.detailHeroOverlay} />
        <Pressable onPress={onBack} style={styles.detailHeroBackButton}>
          <Text style={styles.detailHeroBackText}>‹ Volver</Text>
        </Pressable>
        <Text style={styles.detailHeroTitle}>{detail.title}</Text>
      </ImageBackground>

      <View style={styles.detailDescriptionCard}>
        {detail.paragraphs.map((paragraph) => (
          <Text key={paragraph} style={styles.detailParagraph}>
            {paragraph}
          </Text>
        ))}
        {detail.extra !== undefined ? (
          <View style={styles.detailExtraBox}>{detail.extra}</View>
        ) : null}
      </View>
    </View>
  );
}

function getCampusDetail(section: CampusSection) {
  switch (section) {
    case "campus":
      return {
        title: "Vida en el Campus",
        paragraphs: [
          "Nuestro campus constituye una ciudad tecnologica de avanzada distribuida en 268 hectareas, con una potente red de datos y una amplia infraestructura que garantiza la realizacion de todos los procesos sustantivos de la Universidad.",
          "Contamos con 6 edificios que acogen 150 aulas, 30 salones de conferencia y mas de 200 laboratorios destinados a las actividades docente-productivas de las diferentes facultades.",
          "Todos los espacios cuentan con puntos de acceso a la red de datos, sistema de television por cable, climatizacion mediante aire acondicionado o ventiladores, comunicacion telefonica y agua potable.",
        ],
      };
    case "residencia":
      return {
        title: "Residencia Estudiantil",
        paragraphs: [
          "La residencia ocupa un lugar importante dentro del area de la Universidad. Sus edificios y apartamentos dan la bienvenida a estudiantes y profesores, y funcionan como un espacio socialmente educativo y socializante.",
          "Dentro del campus se ofrecen otros servicios como cafeterias, pizzerias, correos, bancos, barberia, peluqueria, salon de belleza, areas deportivas, tienda y lavanderia.",
          "La labor educativa en este contexto incluye a profesores, lideres estudiantiles y academicos para contribuir a la formacion integral de los alumnos.",
        ],
      };
    case "deportes":
      return {
        title: "Deportes y Recreacion",
        paragraphs: [
          "El deporte permite promover acciones practicas para consolidar el desarrollo integral de estudiantes, profesores y trabajadores, fomentando estilos de vida saludable.",
          "La Universidad dispone de infraestructura para futsal, balonmano, baloncesto, voleibol, beisbol, atletismo, futbol, taekwondo, karate, kenpo, judo y lucha libre entre otras disciplinas.",
          "Uno de los momentos mas esperados son los Juegos Deportivos Mella, ademas de eventos como Marhabana, Maracuba, la Carrera Terry Fox, Dia Olimpico y el Maraton 10 de Octubre.",
        ],
      };
    case "cultura":
      return {
        title: "Actividades Culturales",
        paragraphs: [
          "La institucion se caracteriza por un fuerte movimiento artistico integrado por estudiantes y trabajadores, con reconocimientos a nivel nacional.",
          "La actividad cultural se organiza desde la Vicerrectoria de Extension Universitaria, con apoyo de organizaciones juveniles y estudiantiles.",
          "El Centro Cultural Wifredo Lam dispone de aulas para teatro, danza, musica y artes plasticas, ademas de sala de video, galeria, libreria, complejo recreativo, plazas y teatro.",
        ],
      };
    case "comedores":
      return {
        title: "Comedores",
        paragraphs: [
          "La UCI cuenta con tres complejos comedor que brindan desayuno, almuerzo y comida a estudiantes y profesores.",
        ],
        extra: (
          <View style={styles.scheduleBox}>
            <Text style={styles.scheduleTitle}>Horarios</Text>
            <ScheduleRow label="Desayuno" value="8:00 am - 8:50 am" />
            <ScheduleRow label="Almuerzo" value="12:00 pm - 1:50 pm" />
            <ScheduleRow label="Comida" value="6:00 pm - 7:30 pm" />
          </View>
        ),
      };
  }
}

function ScheduleRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.scheduleRow}>
      <Text style={styles.scheduleLabel}>{label}:</Text>
      <Text style={styles.scheduleValue}>{value}</Text>
    </View>
  );
}

function TestimoniosContent() {
  const data = [
    [
      "Maria Gonzalez",
      "3er Año",
      "Experiencia única en proyectos reales.",
      "#3b82f6",
    ],
    [
      "Carlos Rodriguez",
      "4to Año",
      "Ambiente increible y aprendizaje continuo.",
      "#4f46e5",
    ],
    [
      "Ana Martinez",
      "4to Año",
      "Preparación para retos profesionales.",
      "#7c3aed",
    ],
    [
      "Jorge Lopez",
      "2do Año",
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
    paddingTop:
      Platform.OS === "android" ? (StatusBar.currentHeight ?? 0) + 12 : 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 0,
    gap: 12,
    flexGrow: 1,
  },
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
  sectionCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  sectionIconContainer: { justifyContent: "center", alignItems: "center" },
  sectionTextWrap: { flex: 1 },
  sectionTitle: { color: "#111827", fontSize: 16, fontWeight: "700" },
  sectionDescription: { color: "#4b5563", fontSize: 13, marginTop: 2 },
  sectionArrow: { color: "#9ca3af", fontSize: 28 },
  mapsButton: {
    backgroundColor: "#10b981",
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  mapsButtonText: { color: "white", fontSize: 15, fontWeight: "700" },
  detailScreen: {
    marginHorizontal: -16,
    marginTop: -16,
    flexGrow: 1,
  },
  detailHero: {
    minHeight: 220,
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 20,
  },
  detailHeroImage: {
    resizeMode: "cover",
  },
  detailHeroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(17, 24, 39, 0.5)",
  },
  detailHeroBackButton: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },
  detailHeroBackText: { color: "white", fontSize: 15, fontWeight: "600" },
  detailHeroTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
  },
  detailDescriptionCard: {
    marginTop: -12,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    backgroundColor: "#fff",
    paddingVertical: 16,
    paddingHorizontal: 22,
    gap: 12,
    flex: 1,
  },
  detailParagraph: {
    color: "#4b5563",
    lineHeight: 22,
    marginHorizontal: 6,
  },
  detailExtraBox: {
    backgroundColor: "#eef2ff",
    borderRadius: 14,
    padding: 14,
    marginTop: 6,
  },
  scheduleBox: {
    backgroundColor: "#eef2ff",
    borderRadius: 14,
    padding: 14,
    marginTop: 6,
  },
  scheduleTitle: { color: "#1e3a8a", fontWeight: "700", marginBottom: 8 },
  scheduleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#c7d2fe",
  },
  scheduleLabel: { color: "#374151" },
  scheduleValue: { color: "#4338ca", fontWeight: "600" },
});
