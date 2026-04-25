import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../lib/supabase";
import type {
  AppContentData,
  Mentor,
  PreguntaFrecuente,
  Testimonio,
} from "../types";

const CACHE_KEY = "alessa_content_cache_v1";
const REQUEST_TIMEOUT_MS = 7000;

export const FALLBACK_CONTENT: AppContentData = {
  whatsappLink: "https://chat.whatsapp.com/tu-codigo-de-grupo",
  mentores: [
    { nombre: "Pedro Sanchez", anno_academico: 4 },
    { nombre: "Laura Diaz", anno_academico: 4 },
    { nombre: "Miguel Torres", anno_academico: 3 },
  ],
  testimonios: [
    {
      nombre_alumno: "Maria Gonzalez",
      anno_academico: 3,
      texto: "Experiencia única en proyectos reales.",
    },
    {
      nombre_alumno: "Carlos Rodriguez",
      anno_academico: 4,
      texto: "Ambiente increíble y aprendizaje continuo.",
    },
    {
      nombre_alumno: "Ana Martinez",
      anno_academico: 4,
      texto: "Preparación para retos profesionales.",
    },
    {
      nombre_alumno: "Jorge Lopez",
      anno_academico: 2,
      texto: "Vida en campus activa y enriquecedora.",
    },
  ],
  preguntasFrecuentes: [
    {
      pregunta: "¿Que es la carrera de Ingenieria en Ciencias Informáticas?",
      respuesta:
        "Es una carrera universitaria que forma profesionales en el desarrollo de software, sistemas informáticos y soluciones tecnológicas.",
      orden: 1,
    },
    {
      pregunta: "¿Que asignaturas voy a estudiar?",
      respuesta:
        "Estudiaras matemáticas, programación, bases de datos, redes, ingenieria de software, inteligencia artificial y desarrollo web y móvil.",
      orden: 2,
    },
    {
      pregunta: "¿Necesito saber programar antes de entrar?",
      respuesta:
        "No es necesario. La carrera comienza desde cero y avanza paso a paso.",
      orden: 3,
    },
    {
      pregunta: "¿Cuanto dura la carrera?",
      respuesta:
        "La carrera tiene una duración de 4 años, divididos en 8 semestres.",
      orden: 4,
    },
    {
      pregunta: "¿Como es la vida estudiantil en la UCI?",
      respuesta:
        "La UCI ofrece residencia, actividades deportivas y culturales, e instalaciones para el desarrollo integral.",
      orden: 5,
    },
    {
      pregunta: "¿Que oportunidades laborales tendre al graduarme?",
      respuesta:
        "Podras trabajar en desarrollo de software, seguridad, datos, IA y gestion de proyectos tecnológicos.",
      orden: 6,
    },
    {
      pregunta: "¿La UCI tiene convenios internacionales?",
      respuesta:
        "Si, la UCI mantiene convenios para intercambios y proyectos colaborativos.",
      orden: 7,
    },
    {
      pregunta: "¿Puedo trabajar mientras estudio?",
      respuesta:
        "Desde años avanzados podrás participar en proyectos productivos como parte de tu formacion.",
      orden: 8,
    },
    {
      pregunta: "¿Que requisitos de entrada tiene la carrera?",
      respuesta:
        "Debes aprobar los examenes de ingreso definidos por el MES y cumplir con los requisitos académicos.",
      orden: 9,
    },
    {
      pregunta: "¿La carrera es muy dificil?",
      respuesta:
        "Requiere dedicacion y constancia, pero con disciplina es totalmente alcanzable.",
      orden: 10,
    },
  ],
  lastSyncedAt: null,
};

type WhatsappRow = { link: string };
type MentorRow = { nombre: string; anno_academico: number };
type TestimonioRow = {
  nombre_alumno: string;
  anno_academico: number;
  texto: string;
};
type FaqRow = { pregunta: string; respuesta: string; orden: number };

async function runWithTimeout<T>(
  task: () => Promise<T>,
  timeoutMs: number,
): Promise<T | null> {
  const timeoutPromise = new Promise<null>((resolve) => {
    setTimeout(() => resolve(null), timeoutMs);
  });

  try {
    return await Promise.race([task(), timeoutPromise]);
  } catch {
    return null;
  }
}

function formatListByOrder(items: PreguntaFrecuente[]): PreguntaFrecuente[] {
  return [...items].sort((a, b) => a.orden - b.orden);
}

function normalizeCachedContent(value: unknown): AppContentData | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const candidate = value as Partial<AppContentData>;

  if (
    typeof candidate.whatsappLink !== "string" ||
    !Array.isArray(candidate.mentores) ||
    !Array.isArray(candidate.testimonios) ||
    !Array.isArray(candidate.preguntasFrecuentes)
  ) {
    return null;
  }

  return {
    whatsappLink: candidate.whatsappLink,
    mentores: candidate.mentores,
    testimonios: candidate.testimonios,
    preguntasFrecuentes: formatListByOrder(candidate.preguntasFrecuentes),
    lastSyncedAt:
      typeof candidate.lastSyncedAt === "number"
        ? candidate.lastSyncedAt
        : null,
  };
}

async function saveContentToCache(content: AppContentData) {
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(content));
  } catch (error) {
    console.warn("No se pudo guardar cache de contenido:", error);
  }
}

export async function loadContentFromCacheOrFallback(): Promise<AppContentData> {
  try {
    const raw = await AsyncStorage.getItem(CACHE_KEY);
    if (!raw) {
      return FALLBACK_CONTENT;
    }

    const parsed = JSON.parse(raw) as unknown;
    const normalized = normalizeCachedContent(parsed);
    return normalized ?? FALLBACK_CONTENT;
  } catch (error) {
    console.warn("No se pudo leer cache de contenido:", error);
    return FALLBACK_CONTENT;
  }
}

export async function refreshContentFromRemote(
  baseContent: AppContentData,
): Promise<AppContentData> {
  const client = supabase;
  if (!client) {
    return baseContent;
  }

  const next: AppContentData = { ...baseContent };
  let changed = false;

  const whatsappQuery = runWithTimeout(
    async () =>
      await client
        .from("whatsapp_link")
        .select("link")
        .order("id", { ascending: true })
        .limit(1)
        .maybeSingle<WhatsappRow>(),
    REQUEST_TIMEOUT_MS,
  );

  const mentoresQuery = runWithTimeout(
    async () =>
      await client
        .from("mentores")
        .select("nombre, anno_academico")
        .order("id", { ascending: true })
        .limit(5),
    REQUEST_TIMEOUT_MS,
  );

  const testimoniosQuery = runWithTimeout(
    async () =>
      await client
        .from("testimonios")
        .select("nombre_alumno, anno_academico, texto")
        .order("id", { ascending: true })
        .limit(5),
    REQUEST_TIMEOUT_MS,
  );

  const faqQuery = runWithTimeout(
    async () =>
      await client
        .from("preguntas_frecuentes")
        .select("pregunta, respuesta, orden")
        .order("orden", { ascending: true }),
    REQUEST_TIMEOUT_MS,
  );

  const [whatsappResponse, mentoresResponse, testimoniosResponse, faqResponse] =
    await Promise.all([
      whatsappQuery,
      mentoresQuery,
      testimoniosQuery,
      faqQuery,
    ]);

  if (
    whatsappResponse &&
    !whatsappResponse.error &&
    whatsappResponse.data?.link
  ) {
    if (next.whatsappLink !== whatsappResponse.data.link) {
      next.whatsappLink = whatsappResponse.data.link;
      changed = true;
    }
  }

  if (
    mentoresResponse &&
    !mentoresResponse.error &&
    mentoresResponse.data &&
    mentoresResponse.data.length > 0
  ) {
    const mentoresRows = mentoresResponse.data as MentorRow[];
    const mappedMentores: Mentor[] = mentoresRows.map((item) => ({
      nombre: item.nombre,
      anno_academico: item.anno_academico,
    }));

    if (JSON.stringify(next.mentores) !== JSON.stringify(mappedMentores)) {
      next.mentores = mappedMentores;
      changed = true;
    }
  }

  if (
    testimoniosResponse &&
    !testimoniosResponse.error &&
    testimoniosResponse.data &&
    testimoniosResponse.data.length > 0
  ) {
    const testimoniosRows = testimoniosResponse.data as TestimonioRow[];
    const mappedTestimonios: Testimonio[] = testimoniosRows.map((item) => ({
      nombre_alumno: item.nombre_alumno,
      anno_academico: item.anno_academico,
      texto: item.texto,
    }));

    if (
      JSON.stringify(next.testimonios) !== JSON.stringify(mappedTestimonios)
    ) {
      next.testimonios = mappedTestimonios;
      changed = true;
    }
  }

  if (
    faqResponse &&
    !faqResponse.error &&
    faqResponse.data &&
    faqResponse.data.length > 0
  ) {
    const faqRows = faqResponse.data as FaqRow[];
    const mappedFaq: PreguntaFrecuente[] = faqRows.map((item) => ({
      pregunta: item.pregunta,
      respuesta: item.respuesta,
      orden: item.orden,
    }));
    const orderedFaq = formatListByOrder(mappedFaq);

    if (
      JSON.stringify(next.preguntasFrecuentes) !== JSON.stringify(orderedFaq)
    ) {
      next.preguntasFrecuentes = orderedFaq;
      changed = true;
    }
  }

  if (changed) {
    next.lastSyncedAt = Date.now();
    await saveContentToCache(next);
    return next;
  }

  return baseContent;
}
