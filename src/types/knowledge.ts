// Contratos de tipos para la Plataforma Personal de Aprendizaje y Repaso (DevLearn Knowledge Hub).
// Arquitectura jerárquica: Área de Conocimiento → Módulo → Tema → Lección → Actividades/Ejercicios.
// Soporta registro de sesiones, tracking de errores frecuentes y repaso activo.

export type KnowledgeAreaId =
  | "idiomas"
  | "informatica"
  | "desarrollo-web"
  | "cs-fundamentos"
  | "certificaciones";

export type LessonStatus = "pendiente" | "en-curso" | "aprendida" | "pendiente-repaso";

export type ActivityType =
  | "multiple-choice"
  | "fill-in-blank"
  | "code-challenge"
  | "reading-comprehension"
  | "flashcard";

// Actividad / Ejercicio interactivo dentro de una lección
export interface LessonActivity {
  id: string;
  type: ActivityType;
  title: string;
  prompt: string; // La pregunta o desafío
  options?: string[]; // Para opción múltiple
  correctAnswer: string | number; // Índice o string esperado
  explanation: string; // Explicación razonada de la solución
  codeSnippet?: string; // Código para ejercicios de programación
  userAnswer?: string | number | null;
}

// Estructura completa y consistente de una Lección (según Especificación sección 3)
export interface Lesson {
  id: string;
  title: string;
  order: number;
  durationMinutes?: number;
  status: LessonStatus;
  confidenceLevel?: 1 | 2 | 3 | 4 | 5; // 1: bajo, 5: dominado con soltura
  lastReviewedAt?: string; // Fecha ISO
  nextReviewAt?: string; // Para repetición espaciada

  // 10 componentes del modelo pedagógico:
  learningObjective: string; // Qué debería comprender o ser capaz de hacer
  explanation: string; // Definición clara, progresiva y comprensible
  keyConcepts: string[]; // Términos, reglas o propiedades importantes
  practicalExamples: Array<{
    title: string;
    description: string;
    codeOrText: string;
    language?: string;
  }>;
  frequentMistakes?: Array<{
    mistake: string;
    howToAvoid: string;
    correction: string;
  }>;
  activities: LessonActivity[];
  summary: string; // Síntesis breve de puntos fundamentales
  personalNotes?: string; // Espacio editable para notas y apuntes del estudiante
}

// Tema que agrupa lecciones
export interface Topic {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

// Módulo que agrupa temas
export interface Module {
  id: string;
  areaId: KnowledgeAreaId;
  title: string;
  description: string;
  icon: string;
  order: number;
  badge?: string;
  topics: Topic[];
}

// Área de Conocimiento general (Nivel superior)
export interface KnowledgeArea {
  id: KnowledgeAreaId;
  name: string;
  description: string;
  icon: string;
  color: string; // Clases tailwind de color o acento
  modulesCount?: number;
  lessonsCount?: number;
}

// Registro de sesión de estudio (Sección 6)
export interface StudySession {
  id: string;
  date: string; // Fecha ISO
  durationMinutes: number;
  areaId: KnowledgeAreaId;
  areaName: string;
  moduleId: string;
  moduleName: string;
  lessonsReviewed: string[]; // Títulos o IDs de lecciones
  exercisesCount: number;
  correctCount: number;
  incorrectCount: number;
  difficultiesFound?: string;
  personalNotes?: string;
  nextRecommendedTopic?: string;
}

// Error frecuente registrado en la bitácora
export interface LoggedMistake {
  id: string;
  areaId: KnowledgeAreaId;
  topicTitle: string;
  conceptOrRule: string;
  mistakeDescription: string;
  howToCorrect: string;
  date: string;
  resolved: boolean;
}
