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
    title: "Procesamiento de Lenguaje Natural (PLN / NLP)",
    summary: "Permite a las computadoras entender, analizar y generar lenguaje humano.",
    points: [
      "Comprensión y generación de lenguaje natural a escala computacional.",
      "Análisis de sentimientos: evaluación de opiniones y tono emocional (positivo, negativo, neutro).",
      "Extracción de frases y términos clave (Key Phrase Extraction) para sintetizar ideas centrales.",
      "Reconocimiento de entidades nombradas (NER - Named Entity Recognition): personas, lugares, organizaciones y fechas.",
      "Detección y censura de información de identificación personal (PII) para privacidad y seguridad de datos.",
    ],
  },
  {
    id: 4,
    title: "Traducción de Idiomas y Speech (Discurso)",
    summary: "Herramientas de traducción automática multilingüe y procesamiento de voz para accesibilidad y asistentes virtuales.",
    points: [
      "Traducción automática de texto y documentos entre decenas de idiomas conservando el significado contextual.",
      "Voz a texto (Speech-to-Text): transcripción rápida y precisa de audio humano a texto digital.",
      "Texto a voz (Text-to-Speech): síntesis de audio con voces naturales, modulación y entonación humana.",
      "Aplicaciones directas: subtitulado en tiempo real, accesibilidad universal y agentes virtuales conversacionales.",
    ],
  },
  {
    id: 5,
    title: "Visión por Computadora (Computer Vision)",
    summary: "Modelos principales para la percepción, clasificación e interpretación visual de imágenes y video.",
    points: [
      "Clasificación de imágenes: predicción de la etiqueta o categoría principal de la imagen.",
      "Detección de objetos: localización de elementos específicos mediante cuadros delimitadores (bounding boxes).",
      "Segmentación semántica: clasificación y etiquetado exacto a nivel de píxeles individuales.",
      "Modelos multimodales: análisis simultáneo de texto e imágenes para generar descripciones y razonamiento visual.",
    ],
  },
  {
    id: 6,
    title: "Modelos de Lenguaje Grande (LLMs) y Azure OpenAI",
    summary: "Modelos fundacionales generativos de escala masiva para redacción, análisis, generación de código y razonamiento.",
    points: [
      "Introducción a modelos avanzados (GPT-4o, Codex) capaces de redactar, resumir documentos, escribir/depurar código y mantener diálogos complejos.",
      "Diseño e ingeniería de prompts: instrucciones claras, contexto del sistema (system prompt) y ejemplos (few-shot learning).",
      "Control de hiperparámetros de generación: temperatura (creatividad vs determinismo), top_p y límites de tokens.",
      "Integración empresarial con Azure OpenAI: seguridad de grado corporativo, redes virtuales y SLA garantizado.",
    ],
  },
  {
    id: 7,
    title: "IA Generativa Responsable y Mejores Prácticas",
    summary: "Principios éticos de Microsoft y mecanismos de salvaguarda para desplegar IA confiable y segura.",
    points: [
      "Los 6 principios éticos de Microsoft: Equidad, Confiabilidad y Seguridad, Privacidad y Seguridad, Inclusión, Transparencia y Responsabilidad (Accountability).",
      "Gestión de riesgos en IA generativa: alucinaciones, fuga de información confidencial e inyección de prompts.",
      "Mitigación activa de sesgos (fairness) y evaluación imparcial de respuestas generadas.",
      "Barandillas de seguridad (Content Filters / Azure AI Content Safety): bloqueo de contenido dañino, odio, violencia, autolesiones y protección de propiedad intelectual.",
    ],
  },
];

// Resumen integral y consolidado de todo lo aprendido en la ruta Microsoft AI-901
export const aiCourseComprehensiveSummary = {
  title: "Resumen Consolidado de la Ruta de IA (Microsoft AI-901)",
  overview:
    "La Inteligencia Artificial moderna en Azure abarca desde el aprendizaje automático clásico hasta la IA generativa de última generación. Los sistemas combinan la comprensión perceptiva (visión artificial con Computer Vision y procesamiento de voz con Speech) con el análisis semántico y cognitivo (PLN / NLP y LLMs con Azure OpenAI).",
  pillars: [
    {
      name: "Percepción & Lenguaje",
      desc: "Modelos multimodales, OCR, transcripción Speech-to-Text y procesamiento PLN con análisis de sentimientos y NER.",
    },
    {
      name: "Generación & Razonamiento",
      desc: "LLMs en Azure OpenAI gestionados mediante ingeniería de prompts y ajuste fino de parámetros de respuesta.",
    },
    {
      name: "Gobernanza Ética",
      desc: "Adopción estricta de filtros de contenido (Content Filters), mitigación de sesgos, protección de PII y cumplimiento de los 6 principios de IA Responsable.",
    },
  ],
};

// Próxima unidad o fase del curso
export const nextCourseUnit = "Laboratorios Prácticos en Microsoft Foundry y Simulador de Examen";

