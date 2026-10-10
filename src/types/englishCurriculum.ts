// Tipos del Programa de Inglés Básico (A1 - A2)
// Jerarquía estricta: Inglés Básico → Nivel (A1 / A2) → Módulo → Tema → Lección → Actividades

export type CefrLevel = "A1" | "A2";

export type EnglishActivityType =
  | "multiple-choice"
  | "fill-in-blank"
  | "word-order"
  | "error-correction"
  | "short-translation"
  | "dialogue-comprehension"
  | "reading-comprehension";

export type EnglishLessonStatus = "no-iniciada" | "en-curso" | "completada" | "necesita-repaso";

export interface EnglishActivity {
  id: string;
  type: EnglishActivityType;
  concept: string; // Qué regla o concepto se evalúa
  difficulty: "facil" | "medio" | "desafiante";
  prompt: string; // Instrucción o enunciado
  options?: string[]; // Para selección múltiple
  correctAnswer: string | number;
  explanation: string; // Razonamiento pedagógico de la solución
  studentAnswer?: string | number | null;
}

export interface EnglishExample {
  english: string;
  spanish: string;
  context?: string;
  notes?: string;
}

export interface EnglishFrequentMistake {
  mistake: string; // El error típico del hispanohablante
  whyItHappens: string; // Explicación de la confusión
  correction: string; // La forma correcta
}

export interface EnglishVocabItem {
  wordOrPhrase: string;
  translation: string;
  partOfSpeech: "noun" | "verb" | "adjective" | "adverb" | "pronoun" | "preposition" | "phrase";
  phoneticRef?: string;
  example: string;
  exampleTranslation: string;
}

export interface EnglishLesson {
  id: string;
  title: string;
  level: CefrLevel;
  moduleId: string;
  order: number;
  durationMinutes: number;
  status: EnglishLessonStatus;

  // 16 campos de la plantilla pedagógica obligatoria:
  learningObjective: string; // 3. Objetivo de aprendizaje
  prerequisites?: string[]; // 4. Requisitos previos
  explanation: string; // 5. Explicación clara en español
  rulesAndFormulas: string[]; // 6. Estructuras o reglas fundamentales (fórmulas)
  examples: EnglishExample[]; // 7. Ejemplos en inglés con traducción
  frequentMistakes: EnglishFrequentMistake[]; // 8. Errores frecuentes
  relevantVocabulary: EnglishVocabItem[]; // 9. Vocabulario relevante
  activities: EnglishActivity[]; // 10. Ejercicios de práctica variados
  applicationTask: string; // 12. Actividad de aplicación práctica personal
  summary: string; // 13. Resumen final
  personalNotes?: string; // 14. Notas del estudiante
  confidenceScore?: number; // 15. Evaluación de dominio (1-5)
  reviewRecommendation: string; // 16. Recomendación de repaso
}

export interface EnglishTopic {
  id: string;
  title: string;
  order: number;
  lessons: EnglishLesson[];
}

export interface EnglishModule {
  id: string;
  number: number;
  level: CefrLevel;
  title: string;
  description: string;
  badge?: string;
  icon: string;
  topics: EnglishTopic[];
}

export interface EnglishCurriculum {
  a1Modules: EnglishModule[];
  a2Modules: EnglishModule[];
}
