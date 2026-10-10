// Contenido de la sección /ingles — práctica de inglés dividida en dos bloques:
//
//   1. INGLÉS TÉCNICO (para informática): vocabulario y lectura técnica.
//   2. INGLÉS BÁSICO: estructuras gramaticales, frases para aprender,
//      verbos irregulares y textos en inglés.
//
// Todo es material de práctica creado para el curso (no se copia de exámenes
// ni de documentación con copyright). Para ampliar: añade temas al arreglo
// correspondiente.

// ---------- TIPOS COMPARTIDOS ----------

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

export interface VocabTerm {
  id: string;
  english: string;
  spanish: string;
  category?: string; // Ej: "Fundamentos y Tipos", "Flujo y Lógica", "Git y Control de Versiones", "Web y Servidores"
  definition?: string; // Breve explicación de qué significa en programación
  example?: string; // Ejemplo práctico o de código
}

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

export interface Phrase {
  id: string;
  english: string;
  spanish: string;
  context?: string; // Situación o contexto de uso (ej: "Reuniones de equipo / Sincronización")
  videoTimestamp?: string; // Marca de tiempo del video o película (ej: "01:31", "07:00")
  category?: string; // Ej: "Películas y Conversación", "Trabajo y Tech"
}

export interface IrregularVerb {
  id: string;
  base: string; // infinitivo, ej. "go"
  past: string; // pasado simple, ej. "went"
  participle: string; // participio, ej. "gone"
  spanish: string;
}

// ---------- 1. INGLÉS TÉCNICO (para informática) ----------

export const technicalVocabulary: VocabTerm[] = [
  // 1. Datos y Variables
  {
    id: "array",
    english: "array",
    spanish: "arreglo / matriz ordenada",
    category: "Datos y Variables",
    definition: "Estructura de datos ordenada donde cada elemento tiene un índice (index) numérico que empieza en 0.",
    example: "const list = ['item1', 'item2']; // array de strings",
  },
  {
    id: "string",
    english: "string",
    spanish: "cadena de texto",
    category: "Datos y Variables",
    definition: "Secuencia inmutable de caracteres encerrada entre comillas simples, dobles o backticks.",
    example: "const greeting: string = 'Hello World';",
  },
  {
    id: "boolean",
    english: "boolean",
    spanish: "valor booleano (verdadero/falso)",
    category: "Datos y Variables",
    definition: "Tipo de dato que solo puede tener uno de dos estados: true o false.",
    example: "let isActive: boolean = false;",
  },
  {
    id: "scope",
    english: "scope",
    spanish: "ámbito / alcance de variables",
    category: "Datos y Variables",
    definition: "Contexto o región del código donde una variable es visible y accesible (global, bloque o función).",
    example: "let x = 10; // block scope dentro de un { }",
  },

  // 2. Control de Flujo y Lógica
  {
    id: "loop",
    english: "loop",
    spanish: "bucle / ciclo repetitivo",
    category: "Flujo y Lógica",
    definition: "Estructura de control que repite un bloque de código mientras se cumpla una condición específica.",
    example: "for (let i = 0; i < items.length; i++) { ... }",
  },
  {
    id: "bug",
    english: "bug",
    spanish: "error o fallo en el código",
    category: "Flujo y Lógica",
    definition: "Defecto o comportamiento imprevisto en un programa que produce un resultado incorrecto.",
    example: "We fixed the bug caused by an undefined variable.",
  },
  {
    id: "framework",
    english: "framework",
    spanish: "marco de trabajo preconfigurado",
    category: "Flujo y Lógica",
    definition: "Conjunto estandarizado de herramientas, librerías y reglas que define la arquitectura de una aplicación.",
    example: "Next.js is a React framework for production.",
  },

  // 3. Arquitectura Web y Red
  {
    id: "server",
    english: "server",
    spanish: "servidor (backend)",
    category: "Red y Arquitectura Web",
    definition: "Computadora o proceso que escucha peticiones de red y responde con recursos, datos o HTML.",
    example: "The server responds with HTTP status 200.",
  },
  {
    id: "client",
    english: "client",
    spanish: "cliente (frontend / navegador)",
    category: "Red y Arquitectura Web",
    definition: "Dispositivo o aplicación que solicita datos al servidor e interactúa directamente con el usuario.",
    example: "The client sends a GET request to the API.",
  },

  // 4. Git y Despliegue
  {
    id: "commit",
    english: "commit",
    spanish: "confirmación de cambios en Git",
    category: "Git y Despliegue",
    definition: "Instantánea (snapshot) de los cambios guardados en el historial del repositorio con un mensaje descriptivo.",
    example: "git commit -m 'feat: add technical vocabulary'",
  },
  {
    id: "branch",
    english: "branch",
    spanish: "rama independiente en Git",
    category: "Git y Despliegue",
    definition: "Línea de desarrollo independiente que permite trabajar en features sin afectar la rama principal (main).",
    example: "git checkout -b feature/login-page",
  },
  {
    id: "deploy",
    english: "deploy",
    spanish: "desplegar / puesta en producción",
    category: "Git y Despliegue",
    definition: "Proceso de compilar, empaquetar y transferir la aplicación a un servidor para que esté disponible a los usuarios.",
    example: "Automatic deploy triggered after merging to main.",
  },
];

export const technicalReadings: ReadingExercise[] = [
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

// ---------- 2. INGLÉS BÁSICO ----------

// 2.1 Estructuras gramaticales
export const basicStructures: GrammarTopic[] = [
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

// 2.2 Frases para aprender (Phrases to Learn)
export const phrases: Phrase[] = [
  // Frase clave para reuniones técnicas
  {
    id: "same-page",
    english: "Are we on the same page?",
    spanish: "¿Estamos en la misma sintonía? / ¿Estamos de acuerdo?",
    context: "Reuniones de equipo / Daily Standup (para confirmar si todos entendieron la misma idea o requerimiento)",
    category: "Trabajo y Tech",
  },

  // Apuntes de Frases de Películas y Conversación Cotidiana
  {
    id: "from-this-area",
    english: "Are you from this area?",
    spanish: "¿Eres de esta zona?",
    context: "Preguntar si alguien vive o es originario de un lugar específico.",
    videoTimestamp: "01:31",
    category: "Películas y Conversación",
  },
  {
    id: "ignoring-me",
    english: "Are you ignoring me?",
    spanish: "¿Me estás ignorando?",
    context: "Indagar si la otra persona está evitando responder o prestar atención deliberadamente.",
    videoTimestamp: "01:52",
    category: "Películas y Conversación",
  },
  {
    id: "upset-about-something",
    english: "Are you upset about something?",
    spanish: "¿Estás molesto por algo?",
    context: "Preguntar si alguien se siente enfadado o preocupado por alguna razón. ('Upset' se traduce como molesto o disgustado).",
    videoTimestamp: "02:33",
    category: "Películas y Conversación",
  },
  {
    id: "are-you-wasted",
    english: "Are you wasted?",
    spanish: "¿Estás borracho?",
    context: "Preguntar de forma coloquial si alguien ha consumido demasiado alcohol ('Wasted' indica ebriedad extrema).",
    videoTimestamp: "02:59",
    category: "Películas y Conversación",
  },
  {
    id: "be-brave",
    english: "Be brave.",
    spanish: "Sé valiente.",
    context: "Animar a alguien a enfrentar una situación difícil con coraje.",
    videoTimestamp: "03:26",
    category: "Películas y Conversación",
  },
  {
    id: "can-we-talk-now",
    english: "Can we talk now?",
    spanish: "¿Podemos hablar ahora?",
    context: "Preguntar si es un buen momento para conversar de algo importante.",
    videoTimestamp: "03:55",
    category: "Películas y Conversación",
  },
  {
    id: "did-i-do-wrong",
    english: "Did I do something wrong?",
    spanish: "¿Hice algo mal?",
    context: "Preguntar si cometiste un error o causaste un problema sin darte cuenta ('Wrong' significa incorrecto o mal).",
    videoTimestamp: "04:26",
    category: "Películas y Conversación",
  },
  {
    id: "get-what-needed",
    english: "Did you get what you needed?",
    spanish: "¿Conseguiste lo que necesitabas?",
    context: "Preguntar si otra persona obtuvo o encontró lo que estaba buscando.",
    videoTimestamp: "04:55",
    category: "Películas y Conversación",
  },
  {
    id: "follow-what-saying",
    english: "Do you follow what I'm saying?",
    spanish: "¿Me sigues? / ¿Me entiendes?",
    context: "Confirmar si la otra persona comprende la explicación o el hilo del argumento.",
    videoTimestamp: "05:24",
    category: "Películas y Conversación",
  },
  {
    id: "something-on-mind",
    english: "Do you have something on your mind?",
    spanish: "¿Tienes algo en mente?",
    context: "Preguntar si alguien está pensando en algo en particular o si tiene una preocupación.",
    videoTimestamp: "06:02",
    category: "Películas y Conversación",
  },
  {
    id: "live-around-here",
    english: "Do you live around here?",
    spanish: "¿Vives por aquí?",
    context: "Preguntar de manera amigable si alguien reside en una zona cercana.",
    videoTimestamp: "07:00",
    category: "Películas y Conversación",
  },
  {
    id: "owner-this-place",
    english: "Are you the owner of this place?",
    spanish: "¿Eres el dueño de este lugar?",
    context: "Preguntar si la persona es dueña o propietaria del sitio o establecimiento.",
    videoTimestamp: "07:30",
    category: "Películas y Conversación",
  },
  {
    id: "do-you-understand-me",
    english: "Do you understand me?",
    spanish: "¿Me entiendes?",
    context: "Confirmar de manera directa si la otra persona comprende el mensaje.",
    videoTimestamp: "07:59",
    category: "Películas y Conversación",
  },
  {
    id: "want-a-seat",
    english: "Do you want a seat?",
    spanish: "¿Quieres un asiento? / ¿Te quieres sentar?",
    context: "Ofrecerle amablemente un lugar a alguien para que se siente.",
    videoTimestamp: "08:29",
    category: "Películas y Conversación",
  },
  {
    id: "want-to-sit-here",
    english: "Do you want to sit here?",
    spanish: "¿Quieres sentarte aquí?",
    context: "Preguntar si la otra persona desea ocupar un asiento específico junto a ti.",
    videoTimestamp: "08:55",
    category: "Películas y Conversación",
  },
  {
    id: "talk-about-it",
    english: "Do you want to talk about it?",
    spanish: "¿Quieres hablar de ello?",
    context: "Proponer conversar sobre un tema sensible o que preocupa a la otra persona.",
    videoTimestamp: "09:29",
    category: "Películas y Conversación",
  },
  {
    id: "does-this-belong-you",
    english: "Does this belong to you?",
    spanish: "¿Esto te pertenece? / ¿Esto es tuyo?",
    context: "Preguntar si un objeto encontrado es propiedad de la otra persona ('Belong to' = pertenecer a).",
    videoTimestamp: "10:02",
    category: "Películas y Conversación",
  },

  // Frases de comunicación general
  {
    id: "repeat",
    english: "Could you repeat that, please?",
    spanish: "¿Podrías repetir eso, por favor?",
    context: "Llamadas técnicas o reuniones en inglés",
    category: "Trabajo y Tech",
  },
  {
    id: "understand",
    english: "I don't understand.",
    spanish: "No entiendo.",
    context: "Comunicar dudas a compañeros o mentores",
    category: "Trabajo y Tech",
  },
  {
    id: "how-say",
    english: "How do you say ... in English?",
    spanish: "¿Cómo se dice ... en inglés?",
    context: "Preguntar vocabulario en tiempo real",
    category: "Trabajo y Tech",
  },
  {
    id: "what-mean",
    english: "What does ... mean?",
    spanish: "¿Qué significa ...?",
    context: "Consultar términos técnicos desconocidos",
    category: "Trabajo y Tech",
  },
  {
    id: "learning",
    english: "I'm learning to code.",
    spanish: "Estoy aprendiendo a programar.",
    context: "Presentación personal en comunidades tech",
    category: "Trabajo y Tech",
  },
  {
    id: "help",
    english: "Let me know if you need help.",
    spanish: "Avísame si necesitas ayuda.",
    context: "Colaboración en equipo / Pair programming",
    category: "Trabajo y Tech",
  },
  {
    id: "thanks",
    english: "Thank you for your help.",
    spanish: "Gracias por tu ayuda.",
    context: "Agradecer a un compañero tras resolver un bug",
    category: "Trabajo y Tech",
  },
  {
    id: "practice",
    english: "Practice makes perfect.",
    spanish: "La práctica hace al maestro.",
    context: "Motivación para el estudio diario",
    category: "Trabajo y Tech",
  },
];

// 2.3 Verbos irregulares
export const irregularVerbs: IrregularVerb[] = [
  { id: "go", base: "go", past: "went", participle: "gone", spanish: "ir" },
  { id: "see", base: "see", past: "saw", participle: "seen", spanish: "ver" },
  { id: "write", base: "write", past: "wrote", participle: "written", spanish: "escribir" },
  { id: "eat", base: "eat", past: "ate", participle: "eaten", spanish: "comer" },
  { id: "take", base: "take", past: "took", participle: "taken", spanish: "tomar / llevar" },
  { id: "make", base: "make", past: "made", participle: "made", spanish: "hacer" },
  { id: "read", base: "read", past: "read", participle: "read", spanish: "leer" },
  { id: "run", base: "run", past: "ran", participle: "run", spanish: "correr" },
  { id: "speak", base: "speak", past: "spoke", participle: "spoken", spanish: "hablar" },
  { id: "know", base: "know", past: "knew", participle: "known", spanish: "saber / conocer" },
  { id: "come", base: "come", past: "came", participle: "come", spanish: "venir" },
  { id: "think", base: "think", past: "thought", participle: "thought", spanish: "pensar" },
  { id: "buy", base: "buy", past: "bought", participle: "bought", spanish: "comprar" },
  { id: "find", base: "find", past: "found", participle: "found", spanish: "encontrar" },
  { id: "give", base: "give", past: "gave", participle: "given", spanish: "dar" },
];

// 2.4 Textos en inglés
export const texts: ReadingExercise[] = [
  {
    id: "daily-routine",
    title: "Text: my daily routine",
    text: "Hi! My name is Fran and I am a software development student. I wake up at seven o'clock and I study English for thirty minutes before class. In the afternoon, I practice JavaScript and read technical documentation in English. It is difficult sometimes, but I do not give up. On weekends, I review my notes and watch videos in English to improve my listening.",
    questions: [
      {
        id: 1,
        question: "What does Fran do before class?",
        options: [
          "He watches videos",
          "He studies English for thirty minutes",
          "He reviews his notes",
        ],
        answerIndex: 1,
      },
      {
        id: 2,
        question: "When does Fran review his notes?",
        options: ["Every morning", "On weekends", "At seven o'clock"],
        answerIndex: 1,
      },
    ],
  },
];

// ---------- 3. INGLÉS INTERMEDIO ----------

export interface PhrasalVerb {
  id: string;
  phrasal: string; // el phrasal verb, ej. "look up"
  meaning: string; // significado en español
  example: string; // ejemplo en inglés
}

// 3.1 Phrasal verbs
export const phrasalVerbs: PhrasalVerb[] = [
  {
    id: "look-up",
    phrasal: "look up",
    meaning: "buscar información",
    example: "I looked up the error in the documentation.",
  },
  {
    id: "figure-out",
    phrasal: "figure out",
    meaning: "entender / resolver",
    example: "It took me an hour to figure out the bug.",
  },
  {
    id: "break-down",
    phrasal: "break down",
    meaning: "dejar de funcionar / desglosar",
    example: "The system broke down after the update.",
  },
  {
    id: "catch-up",
    phrasal: "catch up",
    meaning: "ponerse al día",
    example: "I need to catch up with the lessons I missed.",
  },
  {
    id: "give-up",
    phrasal: "give up",
    meaning: "rendirse",
    example: "Don't give up if the test fails.",
  },
  {
    id: "point-out",
    phrasal: "point out",
    meaning: "señalar / indicar",
    example: "She pointed out a mistake in my code.",
  },
];

// 3.2 Conectores (linking words)
export const connectors: Phrase[] = [
  { id: "however", english: "however", spanish: "sin embargo" },
  { id: "therefore", english: "therefore", spanish: "por lo tanto" },
  { id: "moreover", english: "moreover", spanish: "además" },
  { id: "although", english: "although", spanish: "aunque" },
  { id: "in-addition", english: "in addition", spanish: "además" },
  { id: "as-a-result", english: "as a result", spanish: "como resultado" },
];

// 3.3 Textos de nivel intermedio
export const intermediateTexts: ReadingExercise[] = [
  {
    id: "team-refactor",
    title: "Text: refactoring our login module",
    text: "Last month, our team decided to refactor the login module. Although the code worked, it was difficult to maintain. First, we wrote tests to make sure nothing would break. Then, we split the code into smaller functions. However, we found a problem: the old tests were too slow. As a result, we rewrote them, and now the whole test suite runs in two minutes. In the end, the new module is easier to read and safer to change.",
    questions: [
      {
        id: 1,
        question: "Why did the team refactor the login module?",
        options: [
          "Because the code did not work",
          "Because the code worked but was difficult to maintain",
          "Because the tests were too fast",
        ],
        answerIndex: 1,
      },
      {
        id: 2,
        question: "What happened as a result of the slow tests?",
        options: [
          "They deleted the test suite",
          "They rewrote the tests",
          "They stopped the refactor",
        ],
        answerIndex: 1,
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
