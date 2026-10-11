// Contenido de la sección /ai-901 — repaso del examen
// "AI-901: aspectos básicos de la inteligencia artificial de Microsoft Azure".
// Fuentes oficiales verificadas:
//   https://learn.microsoft.com/es-es/credentials/certifications/exams/ai-901/
//   https://aka.ms/AI901-StudyGuide
//   https://learn.microsoft.com/es-es/training/modules/get-started-ai-fundamentals/

// Información general del examen
export const examInfo = {
  code: "AI-901",
  officialTitle:
    "Examen AI-901: aspectos básicos de la inteligencia artificial de Microsoft Azure",
  provider: "Microsoft",
  passingScore: 700, // puntuación mínima aprobatoria
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
    label: "Módulo oficial: Introducción a los conceptos de IA (40 min)",
    url: "https://learn.microsoft.com/es-es/training/modules/get-started-ai-fundamentals/",
  },
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

export interface VideoResource {
  id: string;
  title: string;
  url: string;
  channel?: string;
  duration?: string;
  topic?: string;
}

// Videos de referencia y estudio relacionados con AI-901 y Microsoft Azure
export const videoResources: VideoResource[] = [
  {
    id: "vid-ai901-course-ep2",
    title: "Aprende Inteligencia Artificial desde CERO | Curso Completo AI-901",
    url: "https://www.youtube.com/watch?v=WwboyWlJ8FQ&list=PLPhpRpUjvyyc&index=2",
    channel: "Curso Completo AI-901",
    duration: "Lección en Español",
    topic: "Principios de IA Responsable y Fundamentos",
  },
  {
    id: "vid-ai900-real-questions",
    title: "AI-900 / AI-901 Exam: Real Exam Questions & Practice Test",
    url: "https://www.youtube.com/watch?v=FFKIGhPCp8Q",
    channel: "Certification Practice",
    duration: "Simulador de Examen",
    topic: "Cargas de Trabajo, NLP, Visión y Ética",
  },
  {
    id: "vid-azure-openai",
    title: "Introducción a Azure OpenAI Service y Modelos Generativos",
    url: "https://www.youtube.com/results?search_query=azure+openai+service+getting+started",
    channel: "Microsoft Mechanics",
    duration: "25m",
    topic: "LLMs, Prompts y Filtros de Contenido",
  },
];

export const practiceAssessment = {
  tool: "AI Skills Navigator",
  note: "La evaluación de práctica se hace desde AI Skills Navigator y requiere iniciar sesión con una cuenta Microsoft.",
  url: null as string | null,
};

export interface FailedQuestion {
  date: string;
  question: string;
  why: string;
}

export const failedQuestions: FailedQuestion[] = [];

// ---------- MÓDULO 1: OFICIAL DE MICROSOFT LEARN ----------
// Título: Introducción a los conceptos de inteligencia artificial
// Duración estimada: 40 min | 10 Unidades
export interface CourseUnit {
  id: number;
  title: string;
  duration: string; // ej. "2 min", "15 min"
  url?: string;
  summary: string;
  points?: string[];
}

export const module1Info = {
  title: "Introducción a los conceptos de inteligencia artificial",
  officialUrl: "https://learn.microsoft.com/es-es/training/modules/get-started-ai-fundamentals/",
  duration: "40 min.",
  totalUnits: 10,
  description:
    "¿Tiene curiosidad por la inteligencia artificial? ¿Quieres entender de qué trata el revuelo? En este módulo se presenta el mundo de la inteligencia artificial.",
};

// Las 10 Unidades oficiales exactas del Módulo 1 de Microsoft Learn:
export const courseUnits: CourseUnit[] = [
  {
    id: 1,
    title: "Introducción a la inteligencia artificial",
    duration: "2 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/get-started-ai-fundamentals/1-introduction/?ns-enrollment-type=learningpath&ns-enrollment-id=learn.ai-technical-concepts",
    summary:
      "Fundamentos sobre qué es la inteligencia artificial y cómo simula capacidades humanas para resolver problemas y automatizar procesos.",
    points: [
      "Permite a los sistemas informáticos simular capacidades humanas para resolver problemas complejos y automatizar tareas repetitivas.",
      "Tareas tradicionales que antes requerían personas: entender texto, reconocer imágenes, conversar y predecir resultados.",
      "Concepto clave de examen: 4 tipos de cargas de trabajo (Predicción/Machine Learning, Visión, Lenguaje/NLP y Generación de contenido).",
    ],
  },
  {
    id: 2,
    title: "Inteligencia artificial y agentes generativos",
    duration: "3 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/get-started-ai-fundamentals/2-generative-ai/?ns-enrollment-type=learningpath&ns-enrollment-id=learn.ai-technical-concepts",
    summary:
      "Sistemas capaces de generar contenido nuevo (texto, código, imágenes) a partir de instrucciones en lugar de solo clasificar datos existentes.",
    points: [
      "Modelos generativos (Generative AI) que crean material original a partir de prompts.",
      "Agentes conversacionales y asistentes inteligentes que asisten en la redacción, razonamiento y programación.",
    ],
  },
  {
    id: 3,
    title: "Texto y lenguaje natural",
    duration: "3 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/get-started-ai-fundamentals/5-natural-language-processing/?ns-enrollment-type=learningpath&ns-enrollment-id=learn.ai-technical-concepts",
    summary:
      "Procesamiento del lenguaje humano tanto en texto como en contexto conversacional.",
    points: [
      "Comprensión, análisis y síntesis de lenguaje humano por parte de computadoras.",
      "Análisis de sentimiento (tono positivo, negativo, neutro) y extracción de términos clave.",
      "Reconocimiento de entidades nombradas (NER) y censura de información personal identificable (PII).",
    ],
  },
  {
    id: 4,
    title: "Discurso",
    duration: "3 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/get-started-ai-fundamentals/4-speech/?ns-enrollment-type=learningpath&ns-enrollment-id=learn.ai-technical-concepts",
    summary:
      "Capacidad para procesar, transcribir y sintetizar audio y voz humana.",
    points: [
      "Voz a texto (Speech-to-Text): transcripción de audio humano a texto digital estructurado.",
      "Texto a voz (Text-to-Speech): síntesis de audio con voces naturales moduladas.",
      "Habilita accesibilidad universal, subtitulado en tiempo real e interfaces de voz.",
    ],
  },
  {
    id: 5,
    title: "Visión por ordenador",
    duration: "3 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/get-started-ai-fundamentals/3-computer-vision/?ns-enrollment-type=learningpath&ns-enrollment-id=learn.ai-technical-concepts",
    summary:
      "Procesamiento e interpretación visual de imágenes y videos del mundo real.",
    points: [
      "Clasificación de imágenes: predicción de la categoría o etiqueta general de una fotografía.",
      "Detección de objetos: ubicación de múltiples elementos específicos marcados con bounding boxes.",
      "Segmentación semántica: detección precisa a nivel de píxeles individuales.",
      "Modelos multimodales: combinación de razonamiento visual con texto.",
    ],
  },
  {
    id: 6,
    title: "Extracción de información",
    duration: "3 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/get-started-ai-fundamentals/6-extract-insights/?ns-enrollment-type=learningpath&ns-enrollment-id=learn.ai-technical-concepts",
    summary:
      "Capacidad preliminar de los sistemas para extraer datos y valores específicos de distintos orígenes de información.",
    points: [
      "Extracción de insights, pares clave-valor y tablas a partir de documentos no estructurados.",
      "Integración de OCR (reconocimiento óptico de caracteres) para digitalizar formularios y facturas.",
    ],
  },
  {
    id: 7,
    title: "Inteligencia artificial responsable",
    duration: "3 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/get-started-ai-fundamentals/7-responsible-ai/?ns-enrollment-type=learningpath&ns-enrollment-id=learn.ai-technical-concepts",
    summary:
      "Principios éticos de Microsoft para garantizar el desarrollo y uso seguro de la tecnología.",
    points: [
      "Los 6 principios éticos clave de Microsoft: Equidad, Fiabilidad y Seguridad, Privacidad y Seguridad, Inclusión, Transparencia y Responsabilidad.",
      "Mitigación activa de sesgos, protección de datos y establecimiento de barandillas de seguridad (Content Filters).",
    ],
  },
  {
    id: 8,
    title: "Ejercicio: Exploración de las cargas de trabajo de IA",
    duration: "15 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/get-started-ai-fundamentals/7b-exercise/?ns-enrollment-type=learningpath&ns-enrollment-id=learn.ai-technical-concepts",
    summary:
      "Práctica guiada para explorar y probar directamente los diferentes tipos de cargas de trabajo de IA en un entorno interactivo.",
    points: [
      "Interacción práctica con predicción, visión por computadora, lenguaje y generación de contenido.",
      "Fijación de los conceptos teóricos mediante experimentación directa.",
    ],
  },
  {
    id: 9,
    title: "Evaluación del módulo",
    duration: "3 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/get-started-ai-fundamentals/8-knowledge-check/?ns-enrollment-type=learningpath&ns-enrollment-id=learn.ai-technical-concepts",
    summary:
      "Comprobación de conocimientos (Knowledge Check) con preguntas tipo examen sobre los conceptos del módulo.",
    points: [
      "Preguntas de autoevaluación para validar la comprensión de cargas de trabajo, agentes e IA responsable.",
      "Preparación directa para el formato de preguntas del examen oficial AI-901.",
    ],
  },
  {
    id: 10,
    title: "Resumen",
    duration: "2 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/get-started-ai-fundamentals/9-summary/?ns-enrollment-type=learningpath&ns-enrollment-id=learn.ai-technical-concepts",
    summary:
      "Cierre del Módulo 1 recapitulando los aprendizajes esenciales antes de avanzar al siguiente módulo.",
    points: [
      "Síntesis de fundamentos, capacidades generativas y consideraciones éticas.",
      "Conexión con los siguientes módulos de la ruta de certificación oficial.",
    ],
  },
];

// Resumen del Módulo 1 según especificación oficial completada
export const module1Summary = {
  title: "Resumen del Módulo: Introducción a la IA y Agentes Generativos",
  sections: [
    {
      title: "Modelos de Lenguaje Grandes (LLM)",
      content:
        "Modelos avanzados de IA entrenados con volúmenes masivos de datos para comprender el lenguaje natural y generar texto coherente similar al humano.",
    },
    {
      title: "Tokenización (Tokenization)",
      content:
        "El proceso fundamental de fragmentar el texto de entrada en unidades manejables (tokens: palabras, sílabas o caracteres) para que el modelo pueda procesarlos matemáticamente.",
    },
    {
      title: "Inserciones (Embeddings)",
      content:
        "Vectores matemáticos numéricos en espacios multidimensionales que representan el significado semántico profundo de las palabras y su cercanía conceptual con otros términos.",
    },
    {
      title: "Capa de Atención (Attention Layer)",
      content:
        "El componente esencial de la arquitectura Transformer que evalúa y conecta lógicamente las relaciones contextuales entre cada token y las palabras que lo rodean en la oración.",
    },
    {
      title: "Mensajes del Sistema (System Prompts)",
      content:
        "Instrucciones y directrices previas que definen el rol, tono, límites de comportamiento y contexto operativo del modelo de IA antes de que interactúe con el usuario.",
    },
    {
      title: "RAG (Generación Aumentada por Recuperación)",
      content:
        "Técnica en la que una aplicación busca datos actualizados en fuentes o bases de datos internas y se los proporciona como contexto al modelo para responder con datos reales y exactos sin alucinar.",
    },
    {
      title: "Agentes de IA (AI Agents)",
      content:
        "Sistemas autónomos estructurados en tres pilares: Modelo (cerebro), Instrucciones (reglas de negocio) y Herramientas (acciones y llamadas a APIs) para resolver tareas complejas en nombre de un usuario o colaborar en sistemas multiagente.",
    },
  ],
};

// Cuestionario y Respuestas Oficiales completadas del Módulo
export interface QuizQA {
  id: number;
  question: string;
  answer: string;
}

export const module1QuizQA: QuizQA[] = [
  {
    id: 1,
    question: "¿Qué es un modelo de lenguaje grande (LLM)?",
    answer: "Un tipo de modelo de IA diseñado para generar texto similar al humano.",
  },
  {
    id: 2,
    question: "¿Cuál es el propósito de la tokenización?",
    answer: "Para dividir el texto en unidades más pequeñas.",
  },
  {
    id: 3,
    question: "¿Qué son las inserciones?",
    answer:
      "Representaciones basadas en vectores de tokens que capturan su significado semántico.",
  },
  {
    id: 4,
    question: "¿Qué hace una capa de atención en un modelo de transformador?",
    answer: "Examina las relaciones entre cada token y los tokens alrededor de él.",
  },
  {
    id: 5,
    question: "¿Cuál es el propósito de un aviso del sistema?",
    answer: "Para proporcionar contexto e instrucciones al modelo de IA.",
  },
  {
    id: 6,
    question: "¿Qué es un agente en el contexto de la inteligencia artificial?",
    answer: "Un sistema de inteligencia artificial que puede realizar tareas en nombre de un usuario.",
  },
];

export const nextCourseUnit = "Módulo 2: Exploración de la visión por computadora y Azure Foundry";
