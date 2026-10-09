// Contenido de la sección /ingles — práctica de gramática y vocabulario técnico.
// Todo es material de práctica creado para el curso (no se copia de exámenes
// ni de documentación con copyright). Para ampliar: añade temas al arreglo
// correspondiente.

// ---------- GRAMÁTICA ----------

export interface FillExercise {
  id: number;
  prompt: string; // frase con el hueco (el verbo entre paréntesis)
  answer: string;
}

export interface ChoiceExercise {
  id: number;
  prompt: string;
  options: string[];
  answerIndex: number;
}

export interface GrammarTopic {
  id: string;
  title: string;
  explanation: string; // explicación corta en español
  fill: FillExercise[]; // ejercicios de completar
  choice: ChoiceExercise[]; // ejercicios de opción múltiple
}

export const grammarTopics: GrammarTopic[] = [
  {
    id: "past-simple",
    title: "Pasado simple (simple past), incluidos los irregulares",
    explanation:
      "Acciones terminadas en un momento puntual del pasado ('yesterday', 'last week', " +
      "'two days ago'). Verbos regulares: +ed (work → worked). Irregulares: hay que " +
      "memorizarlos (see → saw, write → wrote, go → went).",
    fill: [
      { id: 1, prompt: "I ___ (see) the error in the logs yesterday.", answer: "saw" },
      { id: 2, prompt: "She ___ (write) the function last night.", answer: "wrote" },
    ],
    choice: [
      {
        id: 3,
        prompt: "They ___ the API two days ago.",
        options: ["call", "called", "calling"],
        answerIndex: 1,
      },
    ],
  },
  {
    id: "present-perfect",
    title: "Presente perfecto (present perfect) con for y since",
    explanation:
      "have/has + participio: une pasado y presente (algo que empezó antes y sigue " +
      "vigente). 'for' + duración (for three years); 'since' + punto de inicio " +
      "(since 2023).",
    fill: [
      { id: 1, prompt: "I have studied JavaScript ___ 2023.", answer: "since" },
      { id: 2, prompt: "She has worked there ___ three years.", answer: "for" },
    ],
    choice: [
      {
        id: 3,
        prompt: "We ___ just finished the lesson.",
        options: ["have", "has", "had"],
        answerIndex: 0,
      },
    ],
  },
  {
    id: "passive-voice",
    title: "Voz pasiva (passive voice)",
    explanation:
      "be + participio: se usa cuando importa la acción, no quién la hace " +
      "(muy común en documentación: 'the bug was fixed'). El 'be' cambia en el tiempo.",
    fill: [
      { id: 1, prompt: "The bug ___ (fix) yesterday.", answer: "was fixed" },
      { id: 2, prompt: "The code is ___ (write) in TypeScript.", answer: "written" },
    ],
    choice: [
      {
        id: 3,
        prompt: "The tests ___ every night.",
        options: ["run", "are run", "ran"],
        answerIndex: 1,
      },
    ],
  },
  {
    id: "first-conditional",
    title: "Condicional tipo 1 (first conditional)",
    explanation:
      "if + presente simple, ... will + verbo: condiciones reales del futuro. " +
      "Ej.: 'If the build fails, the deploy will stop.'",
    fill: [
      { id: 1, prompt: "If it rains, we ___ (stay) home.", answer: "will stay" },
      { id: 2, prompt: "If the build fails, the deploy ___ (stop).", answer: "will stop" },
    ],
    choice: [
      {
        id: 3,
        prompt: "If you practice every day, you ___ faster.",
        options: ["improve", "will improve", "improved"],
        answerIndex: 1,
      },
    ],
  },
  {
    id: "modals",
    title: "Modales: can, must, should",
    explanation:
      "can: habilidad o posibilidad. must: obligación fuerte (necesaria). " +
      "should: consejo o recomendación.",
    fill: [
      {
        id: 1,
        prompt: "You ___ use \"use client\" only when the component needs interactivity. (consejo)",
        answer: "should",
      },
      {
        id: 2,
        prompt: "A Server Component ___ use useState. (no es posible)",
        answer: "can't",
      },
    ],
    choice: [
      {
        id: 3,
        prompt: "To pass the exam you ___ score at least 700 points.",
        options: ["can", "must", "could"],
        answerIndex: 1,
      },
    ],
  },
];

// ---------- VOCABULARIO TÉCNICO ----------

export interface VocabTerm {
  id: string;
  english: string;
  spanish: string;
}

export const vocabulary: VocabTerm[] = [
  { id: "array", english: "array", spanish: "arreglo" },
  { id: "string", english: "string", spanish: "cadena de texto" },
  { id: "boolean", english: "boolean", spanish: "valor booleano (verdadero/falso)" },
  { id: "loop", english: "loop", spanish: "bucle" },
  { id: "scope", english: "scope", spanish: "ámbito (alcance)" },
  { id: "bug", english: "bug", spanish: "error de código" },
  { id: "framework", english: "framework", spanish: "marco de trabajo" },
  { id: "server", english: "server", spanish: "servidor" },
  { id: "client", english: "client", spanish: "cliente (el navegador)" },
  { id: "deploy", english: "deploy", spanish: "desplegar / despliegue" },
  { id: "commit", english: "commit", spanish: "confirmación de cambios (Git)" },
  { id: "branch", english: "branch", spanish: "rama (Git)" },
];

// ---------- LECTURA ----------

export interface ReadingQuestion {
  id: number;
  question: string;
  options: string[];
  answerIndex: number;
}

export interface ReadingExercise {
  id: string;
  title: string;
  text: string; // fragmento de práctica (material propio del curso)
  questions: ReadingQuestion[];
}

export const readings: ReadingExercise[] = [
  {
    id: "api-basics",
    title: "Reading: what is an API?",
    text: "An API (Application Programming Interface) is a way for two programs to talk to each other. When your application needs data, it sends a request to the API and waits for a response. Most web APIs use HTTP: the client sends a GET request to fetch data, or a POST request to create something new. The server answers with a status code: 200 means success, 404 means the resource was not found, and 500 means the server failed.",
    questions: [
      {
        id: 1,
        question: "What does a 404 status code mean?",
        options: [
          "The request was successful",
          "The resource was not found",
          "The server failed",
        ],
        answerIndex: 1,
      },
      {
        id: 2,
        question: "Which HTTP method is used to fetch data?",
        options: ["GET", "POST", "DELETE"],
        answerIndex: 0,
      },
    ],
  },
];

// ---------- REGISTRO DE SESIONES ----------
// Anota aquí el resultado de cada sesión de práctica.
// Para agregar una: añade un objeto al arreglo.
// area: "grammar" | "vocabulary" | "reading"

export interface PracticeSession {
  date: string; // ISO
  area: "grammar" | "vocabulary" | "reading";
  score: string; // ej. "8/10"
  notes: string;
}

export const sessions: PracticeSession[] = [];
