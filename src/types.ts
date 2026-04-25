export type View =
  | "home"
  | "universidad"
  | "carrera"
  | "test"
  | "mentorias"
  | "faq";

export type UniversityTab = "info" | "vida" | "testimonios";

export type Mentor = {
  nombre: string;
  anno_academico: number;
};

export type Testimonio = {
  nombre_alumno: string;
  anno_academico: number;
  texto: string;
};

export type PreguntaFrecuente = {
  pregunta: string;
  respuesta: string;
  orden: number;
};

export type AppContentData = {
  whatsappLink: string;
  mentores: Mentor[];
  testimonios: Testimonio[];
  preguntasFrecuentes: PreguntaFrecuente[];
  lastSyncedAt: number | null;
};
