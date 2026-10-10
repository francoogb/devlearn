// Contenido de la sección /ai-901 — repaso del examen
// "AI-901: aspectos básicos de la inteligencia artificial de Microsoft Azure".
//
// REGLA DE ORO: solo datos verificados. Si algo no está confirmado, se marca
// como "por verificar" (verified: false) y la página lo muestra como tal.
// Fuentes oficiales:
//   https://learn.microsoft.com/es-es/credentials/certifications/exams/ai-901/
//   https://aka.ms/AI901-StudyGuide
//   https://learn.microsoft.com/es-es/training/paths/ai-concepts/

// Información general del examen
export const examInfo = {
  code: "AI-901",
  officialTitle:
    "Examen AI-901: aspectos básicos de la inteligencia artificial de Microsoft Azure",
  provider: "Microsoft",
  passingScore: 700, // puntuación mínima aprobatoria
  // Idioma: el inglés está confirmado; el español para Chile NO está verificado.
  languageEnglish: true,
  languageSpanishChile: false, // por verificar: no afirmar que existe
};

// Los dos dominios del examen, con su peso en la puntuación
export interface ExamDomain {
  id: number;
  title: string;
  weight: string; // rango oficial, ej. "40-45%"
  summary: string; // resumen en mis palabras, basado en la guía oficial
}

export const domains: ExamDomain[] = [
  {
    id: 1,
    title: "Identificación de los conceptos y las funcionalidades de IA",
    weight: "40-45%",
    summary:
      "Conceptos generales: qué es la IA, los tipos de cargas de trabajo de IA " +
      "(predicción, visión, lenguaje, generación de contenido), las consideraciones " +
      "éticas y los principios fundamentales del machine learning en Azure.",
  },
  {
    id: 2,
    title: "Implementación de soluciones de IA mediante Microsoft Foundry",
    weight: "55-60%",
    summary:
      "La parte práctica: cómo crear y usar soluciones en Microsoft Foundry, " +
      "incluidas las funcionalidades de Computer Vision, procesamiento de lenguaje " +
      "natural (NLP) e IA generativa en Azure.",
  },
];

// Temas que cubre el examen (según la guía de estudio oficial)
export const topics: string[] = [
  "Cargas de trabajo y consideraciones de IA",
  "Principios fundamentales de machine learning en Azure",
  "Computer Vision (visión por computadora) en Azure",
  "Procesamiento de lenguaje natural (NLP) en Azure",
  "IA generativa en Azure",
];

// Conocimientos previos recomendados
export const prerequisites: string[] = [
  "Sintaxis de Python",
  "APIs REST",
  "SDKs",
  "CLI (línea de comandos)",
];

// Lista de repaso con casillas (basada en los temas de la guía oficial)
export interface ReviewItem {
  id: string;
  label: string;
  detail?: string;
}

export const reviewChecklist: ReviewItem[] = [
  { id: "cargas", label: "Cargas de trabajo y consideraciones de IA", detail: "Dominio 1 · 40-45%" },
  { id: "ml", label: "Principios fundamentales de machine learning en Azure", detail: "Dominio 1 · 40-45%" },
  { id: "vision", label: "Computer Vision en Azure", detail: "Dominio 2 · 55-60%" },
  { id: "nlp", label: "Procesamiento de lenguaje natural (NLP) en Azure", detail: "Dominio 2 · 55-60%" },
  { id: "genai", label: "IA generativa en Azure", detail: "Dominio 2 · 55-60%" },
  { id: "foundry", label: "Implementar soluciones en Microsoft Foundry", detail: "Dominio 2 · 55-60%" },
  { id: "practica", label: "Hacer la evaluación de práctica en AI Skills Navigator", detail: "Requiere iniciar sesión" },
];

// Recursos oficiales (solo URLs verificadas)
export interface Resource {
  label: string;
  url: string;
  note?: string;
}

export const resources: Resource[] = [
  {
    label: "Página oficial del examen AI-901",
    url: "https://learn.microsoft.com/es-es/credentials/certifications/exams/ai-901/",
  },
  {
    label: "Guía de estudio oficial (Study Guide)",
    url: "https://aka.ms/AI901-StudyGuide",
  },
  {
    label: "Ruta de aprendizaje: conceptos de IA",
    url: "https://learn.microsoft.com/es-es/training/paths/ai-concepts/",
  },
];

// Evaluación de práctica: el acceso es a través de AI Skills Navigator
// (requiere iniciar sesión). El enlace directo NO está verificado:
// por eso url es null y la página lo muestra como "por verificar".
export const practiceAssessment = {
  tool: "AI Skills Navigator",
  note: "La evaluación de práctica se hace desde AI Skills Navigator y requiere iniciar sesión con una cuenta Microsoft.",
  url: null as string | null, // por verificar: no inventar el enlace directo
};

// Espacio para anotar las preguntas que fallé en la práctica y por qué.
// Para agregar una: añade un objeto { date, question, why } a este arreglo.
export interface FailedQuestion {
  date: string; // ISO, ej. "2026-10-15"
  question: string; // de qué trataba la pregunta (sin copiar texto del examen)
  why: string; // por qué la fallé: qué concepto no dominaba
}

export const failedQuestions: FailedQuestion[] = [];

// ---------- AVANCE DEL CURSO ----------
// Ruta de aprendizaje "Introducción a los conceptos de IA" (Microsoft Learn).
// Se actualiza conforme avanza Fran en el curso.

export interface CourseUnit {
  id: number; // número de unidad
  title: string;
  summary: string; // de qué trata la unidad, en mis palabras
  points?: string[]; // detalles o subtemas vistos
}

export const courseUnits: CourseUnit[] = [
  {
    id: 1,
    title: "Introducción a la Inteligencia Artificial",
    summary:
      "Fundamentos sobre qué es la inteligencia artificial y cómo simula " +
      "capacidades humanas para resolver problemas y automatizar procesos.",
    points: [
      "La IA permite a la computadora hacer tareas que antes requerían una persona: entender texto, reconocer imágenes, conversar y predecir resultados.",
      "Tipos de cargas de trabajo de IA (clave para el examen): predicción (machine learning), visión (Computer Vision), lenguaje (NLP) y generación de contenido (IA generativa).",
    ],
  },
  {
    id: 2,
    title: "Inteligencia artificial y agentes generativos",
    summary:
      "Modelos capaces de generar contenido nuevo (texto, código, imágenes) " +
      "a partir de instrucciones, sirviendo como asistentes y agentes conversacionales.",
    points: [
      "También se le llama IA generativa (generative AI): crea contenido nuevo, no solo clasifica lo que existe.",
      "Ejemplos cotidianos: chatbots, asistentes que escriben código y generadores de imágenes.",
    ],
  },
  {
    id: 3,
    title: "Texto y lenguaje natural (NLP)",
    summary: "Técnicas clave de procesamiento de lenguaje natural (NLP).",
    points: [
      "Detección de idioma: identificación automática del idioma base.",
      "Clasificación de texto y análisis de sentimiento: clasificación de documentos y evaluación de opiniones (positivas, negativas, neutras).",
      "Extracción de términos clave y entidades: localización de palabras clave y menciones (nombres, lugares); incluye la censura de información de identificación personal (PII).",
      "Resumen de texto: síntesis de documentos manteniendo los puntos principales.",
    ],
  },
  {
    id: 4,
    title: "Discurso (Speech)",
    summary: "Componentes principales del procesamiento de voz.",
    points: [
      "Voz a texto (Speech-to-Text): transcripción de audio humano a texto escrito.",
      "Texto a voz (Text-to-Speech): conversión de texto escrito en voz natural sintetizada.",
    ],
  },
  {
    id: 5,
    title: "Visión por ordenador (Computer Vision)",
    summary: "Modelos principales de visión artificial.",
    points: [
      "Clasificación de imágenes: predicción de la etiqueta o asunto principal de una imagen.",
      "Detección de objetos: localización de elementos específicos marcándolos con cuadros (bounding boxes).",
      "Segmentación semántica: identificación precisa a nivel de píxeles de los objetos detectados.",
      "Modelos multimodales: combinación de elementos visuales y texto para generar explicaciones completas.",
    ],
  },
];

// Próxima unidad pendiente del curso.
export const nextCourseUnit = "Unidad 6: Extracción de información";
