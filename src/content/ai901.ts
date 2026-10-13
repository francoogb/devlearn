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

// Resumen del Módulo 1 (Conceptos Fundamentales de IA)
export const module1Summary = {
  title: "Resumen del Módulo 1: Introducción a los conceptos de inteligencia artificial",
  sections: [
    {
      title: "Fundamentos de la IA",
      content:
        "La inteligencia artificial permite que los sistemas informáticos simulen capacidades humanas para resolver problemas, automatizar procesos y realizar tareas que tradicionalmente requerían la intervención de una persona (como entender texto, reconocer imágenes o conversar).",
    },
    {
      title: "Tipos de cargas de trabajo de IA (Concepto clave para el examen)",
      content:
        "1. Predicción / Machine Learning: Análisis de datos para predecir tendencias o resultados futuros.\n2. Visión (Computer Vision): Procesamiento e interpretación de imágenes y videos.\n3. Lenguaje (NLP): Comprensión y análisis del lenguaje escrito y hablado.\n4. Generación de contenido (IA Generativa): Creación de material nuevo a partir de instrucciones.",
    },
    {
      title: "IA Generativa y Agentes",
      content:
        "Introducción al concepto de sistemas capaces de generar contenido nuevo (texto, código o imágenes) en lugar de limitarse a clasificar información existente, sirviendo como asistentes y agentes conversacionales.",
    },
    {
      title: "Procesamiento de Lenguaje Natural, Discurso y Visión (Visión General)",
      content:
        "Primer vistazo a cómo las aplicaciones interpretan el lenguaje natural, procesan audio/voz y realizan análisis visuales de elementos gráficos.",
    },
    {
      title: "Extracción de información",
      content:
        "Capacidad preliminar de los sistemas para extraer datos y valores específicos de distintos orígenes.",
    },
    {
      title: "IA Generativa Responsable",
      content:
        "Los principios éticos fundamentales de Microsoft para garantizar un desarrollo y uso seguro de la tecnología (enfocados en la equidad, fiabilidad, seguridad, privacidad, inclusión, transparencia y responsabilidad).",
    },
  ],
};

// ---------- MÓDULO 2: OFICIAL DE MICROSOFT LEARN ----------
// Título: Introducción a la inteligencia artificial y los agentes generativos
// Duración estimada: 35 min | 7 Unidades
export const module2Info = {
  title: "Introducción a la inteligencia artificial y los agentes generativos",
  officialUrl:
    "https://learn.microsoft.com/es-es/training/modules/explore-generative-ai/",
  duration: "35 min.",
  totalUnits: 7,
  description:
    "Exploración profunda de modelos de lenguaje grande (LLM), arquitectura Transformer, mensajes del sistema (prompts), RAG y la anatomía de agentes de IA.",
};

export const module2Units: CourseUnit[] = [
  {
    id: 1,
    title: "Introducción",
    duration: "2 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/explore-generative-ai/1-introduction/",
    summary:
      "Presentación del alcance de los modelos generativos avanzados y los asistentes basados en IA.",
    points: [
      "Evolución desde modelos analíticos tradicionales a modelos generativos de lenguaje y multimodales.",
      "Capacidad de sintetizar y generar contenido contextual con alta fidelidad.",
    ],
  },
  {
    id: 2,
    title: "Modelos de lenguaje grandes (LLM)",
    duration: "6 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/explore-generative-ai/2-large-language-models/",
    summary:
      "Arquitectura y funcionamiento de los LLMs: tokenización, embeddings vectoriales y la capa de atención.",
    points: [
      "Tokenización: división del lenguaje natural en fragmentos mínimos procesables (tokens).",
      "Inserciones (Embeddings): vectores numéricos que capturan el significado semántico profundo.",
      "Capa de atención: conecta lógicamente cada token con las palabras que lo rodean.",
    ],
  },
  {
    id: 3,
    title: "Mensajes (Prompts) y Mensajes del Sistema",
    duration: "5 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/explore-generative-ai/3-prompts/",
    summary:
      "Elaboración de instrucciones efectivas y configuración del aviso del sistema (System Prompt).",
    points: [
      "System Prompt: define el rol, tono, comportamiento y reglas de seguridad del modelo.",
      "Contexto y control de alucinaciones en la generación.",
    ],
  },
  {
    id: 4,
    title: "Agentes de IA y Arquitectura RAG",
    duration: "6 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/explore-generative-ai/4-ai-agents/",
    summary:
      "Sistemas autónomos que ejecutan tareas mediante herramientas y recuperación aumentada (RAG).",
    points: [
      "Los 3 componentes del agente: Modelo (cerebro), Instrucciones (reglas) y Herramientas (acciones/APIs).",
      "RAG (Retrieval-Augmented Generation): consulta a fuentes internas para responder con datos verídicos.",
      "Colaboración en ecosistemas multiagente.",
    ],
  },
  {
    id: 5,
    title: "Ejercicio: Exploración de la inteligencia artificial generativa",
    duration: "10 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/explore-generative-ai/5-exercise/",
    summary:
      "Práctica guiada interactuando con modelos generativos, ajuste de prompts y agentes.",
    points: [
      "Experimentación con prompts de usuario y de sistema.",
      "Observación del comportamiento y respuesta del modelo.",
    ],
  },
  {
    id: 6,
    title: "Evaluación del módulo",
    duration: "4 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/explore-generative-ai/6-knowledge-check/",
    summary:
      "Comprobación de conocimientos oficiales con el cuestionario evaluativo del módulo.",
    points: [
      "Preguntas tipo examen sobre LLMs, tokenización, embeddings, atención y agentes.",
    ],
  },
  {
    id: 7,
    title: "Resumen",
    duration: "2 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/explore-generative-ai/7-summary/",
    summary:
      "Cierre del Módulo 2 recapitulando conceptos clave antes de avanzar al siguiente módulo.",
    points: [
      "Dominio consolidado de LLMs, arquitectura Transformer y agentes autónomos.",
    ],
  },
];

// Resumen oficial y Conceptos Clave del Módulo 2
export const module2Summary = {
  title: "Resumen del Módulo: Introducción a la IA y Agentes Generativos",
  sections: [
    {
      title: "Modelos de Lenguaje Grandes (LLM)",
      content:
        "Modelos de IA entrenados para comprender el lenguaje natural y generar texto similar al humano.",
    },
    {
      title: "Tokenización (Tokenization)",
      content:
        "El proceso de fragmentar el texto en unidades manejables (tokens) para que la IA los procese.",
    },
    {
      title: "Inserciones (Embeddings)",
      content:
        "Vectores matemáticos que representan el significado semántico de las palabras y su relación.",
    },
    {
      title: "Capa de Atención (Attention Layer)",
      content:
        "La parte del modelo transformador que conecta lógicamente cada token con las palabras que lo rodean.",
    },
    {
      title: "Mensajes del Sistema (System Prompts)",
      content:
        "Instrucciones previas que definen el rol, comportamiento y contexto del modelo.",
    },
    {
      title: "RAG (Generación Aumentada por Recuperación)",
      content:
        "Técnica donde una aplicación busca información en bases de datos internas y se la entrega al modelo para responder con datos reales y exactos sin alucinar.",
    },
    {
      title: "Agentes de IA (AI Agents)",
      content:
        "Sistemas autónomos compuestos por un modelo (cerebro), instrucciones (reglas) y herramientas (acciones) para realizar tareas en nombre de un usuario o en sistemas multiagentes.",
    },
  ],
};

// Cuestionario y Respuestas Oficiales del Módulo 2
export interface QuizQA {
  id: number;
  question: string;
  answer: string;
}

export const module2QuizQA: QuizQA[] = [
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

// ---------- MÓDULO 3: OFICIAL DE MICROSOFT LEARN ----------
// Título: Introducción a los conceptos de procesamiento de lenguaje natural
// Duración estimada: 33 min | 7 Unidades
export const module3Info = {
  title: "Introducción a los conceptos de procesamiento de lenguaje natural",
  officialUrl:
    "https://learn.microsoft.com/es-es/training/modules/introduction-language/",
  duration: "33 min.",
  totalUnits: 7,
  description:
    "El procesamiento de lenguaje natural (NLP) admite aplicaciones que pueden analizar texto para deducir el significado semántico, normalizar texto, extraer n-gramas, lematizar y etiquetar categorías gramaticales (POS).",
};

export const module3Units: CourseUnit[] = [
  {
    id: 1,
    title: "Introducción",
    duration: "3 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/introduction-language/1-introduction/",
    summary:
      "Conceptos fundamentales de NLP y su capacidad para procesar texto no estructurado.",
    points: [
      "Subconjunto de la IA enfocado en extraer significado, estructura e información de texto libre.",
      "Casos de uso: detección de idioma, extracción de términos clave, entidades, PII, clasificación, análisis de sentimiento y resumen.",
    ],
  },
  {
    id: 2,
    title: "Tokenización",
    duration: "5 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/introduction-language/2-how-it-works/",
    summary:
      "Segmentación y normalización del texto en unidades procesables.",
    points: [
      "División del texto en tokens individuales para el procesamiento de modelos de IA.",
      "Normalización: conversión a minúsculas y eliminación de palabras vacías (stop words).",
      "Reducción del volumen de datos enfocándose en las palabras con mayor carga de significado.",
    ],
  },
  {
    id: 3,
    title: "Análisis estadístico de texto.",
    duration: "7 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/introduction-language/3-statistical-techniques/",
    summary:
      "Técnicas lingüísticas y estadísticas: N-gramas, derivación (stemming), lematización y etiquetado POS.",
    points: [
      "N-gramas (bigramas, trigramas): captura de expresiones compuestas y frases hechas.",
      "Derivación: recorte mecánico de terminaciones para agrupar bajo una misma raíz.",
      "Lematización: reducción lingüística a la forma base oficial (lema) mediante reglas y diccionarios.",
      "Etiquetado POS: asignación de la categoría gramatical (sustantivo, verbo, adjetivo, etc.).",
    ],
  },
  {
    id: 4,
    title: "Modelos de lenguaje semántico",
    duration: "5 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/introduction-language/4-semantic-models/",
    summary:
      "Representación vectorial y captura de relaciones semánticas complejas entre palabras y conceptos.",
    points: [
      "Embeddings y vectores numéricos en espacios multidimensionales.",
      "Captura del significado contextual y proximidad conceptual de los términos.",
    ],
  },
  {
    id: 5,
    title: "Ejercicio: Exploración del análisis de texto",
    duration: "10 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/introduction-language/4b-exercise/",
    summary:
      "Práctica interactiva aplicando procesamiento de lenguaje natural y análisis de texto.",
    points: [
      "Experimentación guiada con análisis de sentimientos y extracción de entidades.",
      "Comprobación práctica de los conceptos de tokenización y análisis semántico.",
    ],
  },
  {
    id: 6,
    title: "Evaluación del módulo",
    duration: "3 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/introduction-language/5-knowledge-check/",
    summary:
      "Comprobación de conocimientos con preguntas tipo examen sobre NLP y análisis de texto.",
    points: [
      "Validación de conceptos clave: tokenización, normalización, n-gramas, lematización y POS tagging.",
    ],
  },
  {
    id: 7,
    title: "Resumen",
    duration: "2 min.",
    url: "https://learn.microsoft.com/es-es/training/modules/introduction-language/6-summary/",
    summary:
      "Recapitulación del módulo de Procesamiento de Lenguaje Natural (PLN).",
    points: [
      "Consolidación de las técnicas estadísticas, semánticas y de análisis de texto en IA.",
    ],
  },
];

// Resumen y Conceptos Clave del Módulo 3
export const module3Summary = {
  title:
    "Resumen General del Módulo: Procesamiento de Lenguaje Natural (NLP)",
  overview:
    "Este módulo enseña cómo los sistemas de inteligencia artificial y computación leen, procesan y entienden el texto humano. Se divide en el recorrido de cómo pasar de letras sueltas a significados profundos.",
  stages: [
    {
      id: "stage-1",
      title: "1. Limpieza y Preparación (Tokenización y Normalización)",
      badge: "Preprocesamiento",
      items: [
        {
          concept: "Tokenización",
          definition: "Cortar el texto en pedazos pequeños (tokens o palabras manejables).",
        },
        {
          concept: "Normalización",
          definition: "Limpiar y estandarizar el texto (convertir a minúsculas, eliminar signos y stop words).",
        },
        {
          concept: "Derivación (Stemming)",
          definition: "Recorta extremos y sufijos mecánicamente (rápido, pero a veces genera palabras inexistentes).",
        },
        {
          concept: "Lematización (Lemmatization)",
          definition: "Usa diccionarios y reglas gramaticales para buscar la palabra base real (más precisa y válida).",
        },
        {
          concept: "POS Tagging (Etiquetado gramatical)",
          definition: "Identifica si cada palabra es verbo, sustantivo o adjetivo para aportar contexto y desambiguar.",
        },
        {
          concept: "N-gramas (N-grams)",
          definition: "Agrupa palabras consecutivas (bigramas, trigramas) para capturar frases hechas o compuestas (ej. 'inteligencia artificial').",
        },
      ],
    },
    {
      id: "stage-2",
      title: "2. Estadística y Conteo Rápido (El filtro previo)",
      badge: "Optimización y Ahorro",
      items: [
        {
          concept: "Objetivo y Propósito",
          definition: "Técnicas puramente matemáticas que ayudan a ahorrar tokens y costos antes de llamar a modelos avanzados como OpenAI.",
        },
        {
          concept: "Frecuencia simple",
          definition: "Cuenta qué palabra se repite más dentro del texto analizado.",
        },
        {
          concept: "TF-IDF (Term Frequency - Inverse Document Frequency)",
          definition: "Compara un documento con una biblioteca entera para premiar las palabras verdaderamente únicas de ese texto y castigar a las que se repiten en todos lados.",
        },
        {
          concept: "Bag-of-Words (Bolsa de palabras)",
          definition: "Metes todo a un saco sin importar el orden ni la gramática (ideal para clasificación rápida y detección de spam).",
        },
        {
          concept: "TextRank",
          definition: "Crea un mapa de conexiones entre oraciones para hacer resúmenes automáticos extrayendo las frases más populares e interconectadas.",
        },
      ],
    },
    {
      id: "stage-3",
      title: "3. Modelos Semánticos (El significado profundo)",
      badge: "Embeddings y Vectores",
      items: [
        {
          concept: "Representación Vectorial",
          definition: "Convierten las palabras en vectores (coordenadas numéricas) ubicados en un espacio multidimensional.",
        },
        {
          concept: "Proximidad y Distancias Semánticas",
          definition: "Permiten que la IA entienda que palabras sinónimas o conceptualmente relacionadas (como 'perro' y 'cachorro') están cerca mediante cálculos de distancia o Similitud de Coseno.",
        },
      ],
    },
    {
      id: "stage-4",
      title: "4. Práctica Real (Playgrounds)",
      badge: "Entorno de Pruebas",
      items: [
        {
          concept: "Resumen de Textos",
          definition: "Uso de herramientas en entorno de pruebas para sintetizar textos con modelos compactos como Phi 3.5.",
        },
        {
          concept: "Detección de Idioma",
          definition: "Identificación automática de la lengua en la que está redactado un documento o mensaje.",
        },
        {
          concept: "Extracción de PII",
          definition: "Detección y anonimización de datos privados y confidenciales (nombres, direcciones, correos y números telefónicos).",
        },
      ],
    },
  ],
  examTips: [
    {
      condition: "Si la pregunta habla de 'dividir' o 'partes más pequeñas' para analizar:",
      keyword: "Tokenización",
      explanation: "La respuesta correcta siempre va orientada a trocear el texto en unidades o fragmentos procesables.",
    },
    {
      condition: "Si la pregunta menciona 'comparar un documento específico dentro de una colección mayor' o 'importancia de las palabras según su rareza en varios textos':",
      keyword: "TF-IDF",
      explanation: "Recuerda: si evalúa frecuencia contra una colección grande de documentos (biblioteca), la respuesta es TF-IDF.",
    },
    {
      condition: "Si la pregunta menciona 'vectores', 'espacio multidimensional' o 'relaciones semánticas':",
      keyword: "Insertar vectores (Embeddings) / Modelos semánticos",
      explanation: "Toda referencia a coordenadas matemáticas numéricas y significados relacionales apunta a embeddings.",
    },
    {
      condition: "Si la pregunta se refiere a ocultar o encontrar nombres, correos o teléfonos por privacidad:",
      keyword: "Extracción de PII (Personally Identifiable Information)",
      explanation: "Cualquier proceso para resguardar o detectar información confidencial o identificable de usuarios corresponde a PII.",
    },
  ],
};

export const nextCourseUnit = "Módulo 4: Exploración de la visión por computadora y Azure Foundry";

