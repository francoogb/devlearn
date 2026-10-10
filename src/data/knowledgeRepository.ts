// Repositorio y datos semilla de la Biblioteca de Conocimiento de DevLearn.
// Incluye Áreas, Módulos, Temas y Lecciones estructuradas (con objetivos, explicaciones, ejemplos, errores comunes y quizzes).
// Preserva y categoriza el contenido de Inglés, Informática, Backend, Frontend y Fundamentos.

import { KnowledgeArea, Module, StudySession, LoggedMistake } from "@/types/knowledge";

// Áreas de Conocimiento principales
export const knowledgeAreas: KnowledgeArea[] = [
  {
    id: "idiomas",
    name: "Idiomas & Comunicación",
    description: "Inglés técnico para desarrolladores, gramática esencial, vocabulario y lectura de documentación.",
    icon: "translate",
    color: "from-blue-500/20 to-indigo-500/10 text-blue-400 border-blue-500/30",
  },
  {
    id: "desarrollo-web",
    name: "Desarrollo Web & Software",
    description: "JavaScript moderno, TypeScript estricto, React, Next.js 16 y patrones de frontend profesional.",
    icon: "devices",
    color: "from-amber-500/20 to-yellow-500/10 text-amber-400 border-amber-500/30",
  },
  {
    id: "informatica",
    name: "Backend, APIs & Bases de Datos",
    description: "Arquitectura con NestJS, APIs RESTful, persistencia con Prisma ORM, SQL y modelos relacionales.",
    icon: "database",
    color: "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/30",
  },
  {
    id: "cs-fundamentos",
    name: "Computer Science & Fundamentos",
    description: "Lógica algorítmica, complejidad Big O, estructuras de datos clásicas y diagramas de flujo.",
    icon: "psychology",
    color: "from-purple-500/20 to-fuchsia-500/10 text-purple-400 border-purple-500/30",
  },
  {
    id: "certificaciones",
    name: "Certificaciones & Especialidad",
    description: "Preparación para el examen Microsoft Azure AI Fundamentals (AI-901) e IA aplicada.",
    icon: "military_tech",
    color: "from-cyan-500/20 to-sky-500/10 text-cyan-400 border-cyan-500/30",
  },
];

// Módulos detallados con temas y lecciones estructuradas
export const knowledgeModules: Module[] = [
  // ==================== ÁREA: IDIOMAS ====================
  {
    id: "ingles-core",
    areaId: "idiomas",
    title: "Inglés Básico y Estructuras Gramaticales",
    description: "Domina las estructuras fundamentales, tiempos verbales y patrones de comunicación esenciales.",
    icon: "translate",
    order: 1,
    badge: "A1 - B1",
    topics: [
      {
        id: "fundamentos-ingles",
        title: "Fundamentos y Verbo To Be",
        description: "Construcción de oraciones afirmativas, negativas y preguntas básicas.",
        order: 1,
        lessons: [
          {
            id: "verbo-to-be-presente",
            title: "Verbo To Be en Presente (am, is, are)",
            order: 1,
            durationMinutes: 20,
            status: "aprendida",
            confidenceLevel: 4,
            lastReviewedAt: "2026-10-08",
            learningObjective: "Construir oraciones afirmativas, negativas e interrogativas usando 'to be' para describir identidad, roles y estados.",
            explanation: "El verbo 'to be' equivale tanto a 'ser' como a 'estar' en español. A diferencia de otros verbos, no requiere el auxiliar 'do/does' para hacer preguntas o negar: se niega añadiendo 'not' y se pregunta invirtiendo el orden (sujeto y verbo).",
            keyConcepts: [
              "I am (I'm) / You are (You're) / He is (He's) / She is (She's) / It is (It's) / We are / They are",
              "Negación: Sujeto + to be + not (He is not / He isn't)",
              "Pregunta: To be + Sujeto + Complemento? (Are you a developer?)",
            ],
            practicalExamples: [
              {
                title: "Identificación profesional",
                description: "Presentarse en una reunión de equipo de desarrollo",
                codeOrText: "I am a junior frontend developer at this startup. (Soy desarrollador frontend junior en esta startup).",
              },
              {
                title: "Estado del sistema / código",
                description: "Reportar el estado de un servidor o componente",
                codeOrText: "The server is offline right now. It is not responding to HTTP requests.",
              },
            ],
            frequentMistakes: [
              {
                mistake: "Decir 'I have 25 years' para indicar la edad.",
                howToAvoid: "En inglés la edad se considera un estado de ser, no una posesión física.",
                correction: "Usa siempre 'I am 25 years old' o simplemente 'I am 25'.",
              },
              {
                mistake: "Omitir el sujeto 'it' al hablar de cosas (ej. 'Is raining' o 'Is a bug').",
                howToAvoid: "En inglés todas las oraciones deben llevar sujeto explícito excepto los imperativos.",
                correction: "Di 'It is raining' o 'It is a critical bug'.",
              },
            ],
            activities: [
              {
                id: "act-tobe-1",
                type: "multiple-choice",
                title: "Elección de conjugación",
                prompt: "Completa: 'The database server _____ ready for production deployment.'",
                options: ["are", "is", "am", "be"],
                correctAnswer: 1,
                explanation: "'The database server' es tercera persona singular (it), por lo tanto corresponde 'is'.",
              },
              {
                id: "act-tobe-2",
                type: "fill-in-blank",
                title: "Pregunta invertida",
                prompt: "Transforma a pregunta: 'You are ready' → '_____ you ready?'",
                correctAnswer: "Are",
                explanation: "Para formular preguntas con 'to be', colocamos el verbo al inicio de la oración.",
              },
            ],
            summary: "El verbo 'to be' (ser/estar) se conjuga como am/is/are en presente. Invierte su posición para preguntas y usa 'not' directamente para negar sin necesidad de auxiliares.",
            personalNotes: "Repasar las contracciones comunes en documentación: it's vs its (posesivo).",
          },
          {
            id: "presente-simple",
            title: "Presente Simple y Hábitos de Programación",
            order: 2,
            durationMinutes: 25,
            status: "en-curso",
            confidenceLevel: 3,
            lastReviewedAt: "2026-10-09",
            learningObjective: "Expresar rutinas diarias, hechos técnicos y verdades permanentes usando el Presente Simple.",
            explanation: "El presente simple describe acciones habituales, rutinas y funcionamientos lógicos. La regla clave es que en tercera persona singular (he, she, it) el verbo agrega una 's' o 'es'. Para negar o preguntar, usamos los auxiliares 'do / does'.",
            keyConcepts: [
              "Tercera persona singular (he/she/it): verbo + s/es (runs, compiles, tests)",
              "Auxiliar negativo: do not (don't) / does not (doesn't)",
              "Auxiliar de pregunta: Do / Does + sujeto + verbo infinitivo?",
            ],
            practicalExamples: [
              {
                title: "Rutina de trabajo dev",
                description: "Describir el proceso diario de integración",
                codeOrText: "Every morning, the CI/CD pipeline builds our Next.js application automatically.",
              },
            ],
            frequentMistakes: [
              {
                mistake: "Ponerle 's' al verbo cuando ya existe el auxiliar 'does': 'Does it works?'",
                howToAvoid: "El auxiliar 'does' ya absorbe la conjugación de tercera persona.",
                correction: "La forma correcta es 'Does it work?'.",
              },
            ],
            activities: [
              {
                id: "act-pres-1",
                type: "multiple-choice",
                title: "Auxiliar negativo",
                prompt: "¿Cuál oración es gramaticalmente correcta para 'El endpoint no retorna un JSON'?",
                options: [
                  "The endpoint not return a JSON.",
                  "The endpoint doesn't return a JSON.",
                  "The endpoint don't returns a JSON.",
                ],
                correctAnswer: 1,
                explanation: "'The endpoint' equivale a 'it', por lo que requiere el auxiliar negativo 'doesn't' seguido del verbo base 'return'.",
              },
            ],
            summary: "Usa el presente simple para rutinas y hechos del código. Recuerda la 's' en tercera persona singular y los auxiliares do/does para preguntas y negaciones.",
          },
        ],
      },
    ],
  },

  // ==================== ÁREA: BACKEND & BASES DE DATOS ====================
  {
    id: "backend-nestjs-prisma",
    areaId: "informatica",
    title: "NestJS & Prisma ORM Profesional",
    description: "Desarrollo de servicios escalables con TypeScript, controladores, inyección de dependencias y consultas seguras a bases de datos.",
    icon: "database",
    order: 2,
    badge: ":3001 & ORM",
    topics: [
      {
        id: "arquitectura-nestjs",
        title: "Arquitectura Modular con NestJS",
        description: "Separación de responsabilidades: Controladores, Servicios y Módulos.",
        order: 1,
        lessons: [
          {
            id: "controladores-y-servicios",
            title: "Controladores vs Servicios (Separación de Capas)",
            order: 1,
            durationMinutes: 30,
            status: "aprendida",
            confidenceLevel: 5,
            lastReviewedAt: "2026-10-10",
            learningObjective: "Separar la lógica HTTP del negocio delegando el trabajo de los controladores en servicios inyectables.",
            explanation: "El controlador solo atiende la puerta: recibe el request HTTP, valida los parámetros y delega la ejecución al servicio. El servicio contiene la lógica de negocio pura (lectura de BD, cálculos, llamadas a terceros). Esto permite reutilizar el servicio y testearlo fácilmente sin simular peticiones HTTP completas.",
            keyConcepts: [
              "@Controller('ruta') para rutas HTTP",
              "@Injectable() para servicios de negocio",
              "Inyección en el constructor: constructor(private readonly service: MyService) {}",
            ],
            practicalExamples: [
              {
                title: "Endpoint de Progreso real",
                description: "Delegación limpia en backend/src/progreso/",
                codeOrText: `@Controller('progreso')
export class ProgresoController {
  constructor(private readonly service: ProgresoService) {}

  @Get()
  obtener() {
    return this.service.getProgreso();
  }
}`,
                language: "TypeScript",
              },
            ],
            frequentMistakes: [
              {
                mistake: "Hacer consultas a la base de datos o lógica pesada dentro del @Get() en el controlador.",
                howToAvoid: "Mantén los controladores 'delgados' (thin controllers) y los servicios 'ricos' en lógica.",
                correction: "Mueve toda la consulta a un método en ProgresoService y llámalo desde el controller.",
              },
            ],
            activities: [
              {
                id: "act-nest-1",
                type: "multiple-choice",
                title: "Rol del Controlador",
                prompt: "¿Cuál es la responsabilidad principal de un Controller en NestJS?",
                options: [
                  "Manejar la conexión TCP con la base de datos.",
                  "Recibir la petición HTTP, extraer parámetros y delegar la lógica al servicio correspondiente.",
                  "Renderizar componentes JSX en el cliente.",
                ],
                correctAnswer: 1,
                explanation: "Los controladores son la capa de entrada HTTP (Routing), encargados de recibir peticiones y devolver respuestas.",
              },
            ],
            summary: "Controlador = tráfico HTTP (@Get, @Post). Servicio = lógica y persistencia (@Injectable). Se comunican mediante inyección de dependencias.",
          },
        ],
      },
      {
        id: "persistencia-prisma",
        title: "Modelado y Consultas con Prisma ORM",
        description: "Definición de modelos relacionales, migraciones y seguridad de tipos total.",
        order: 2,
        lessons: [
          {
            id: "prisma-schema-migraciones",
            title: "El archivo schema.prisma y Migraciones",
            order: 1,
            durationMinutes: 35,
            status: "en-curso",
            confidenceLevel: 4,
            lastReviewedAt: "2026-10-10",
            learningObjective: "Diseñar modelos de base de datos relacionales en schema.prisma y sincronizarlos mediante migraciones SQL automáticas.",
            explanation: "Prisma usa un lenguaje declarativo en 'prisma/schema.prisma'. Con 'npx prisma migrate dev', Prisma genera archivos SQL fechados con el historial de cambios y actualiza la base de datos de desarrollo de forma predecible.",
            keyConcepts: [
              "model Nombre { id Int @id @default(autoincrement()) }",
              "Relaciones con @relation(fields: [id], references: [id])",
              "Comando 'npx prisma migrate dev --name <cambio>'",
              "Herramienta visual 'npx prisma studio' en localhost:5555",
            ],
            practicalExamples: [
              {
                title: "Modelo de datos con relación 1 a muchos",
                description: "Usuario con múltiples progresos de estudio",
                codeOrText: `model Usuario {
  id        Int        @id @default(autoincrement())
  email     String     @unique
  nombre    String
  progresos Progreso[]
}

model Progreso {
  id        Int      @id @default(autoincrement())
  modulo    String
  usuarioId Int
  usuario   Usuario  @relation(fields: [usuarioId], references: [id])
}`,
                language: "Prisma",
              },
            ],
            activities: [
              {
                id: "act-pri-1",
                type: "multiple-choice",
                title: "JOINs en Prisma Client",
                prompt: "¿Qué opción se envía a findMany para traer datos de una tabla relacionada sin escribir SQL manual?",
                options: ["join: { usuario: true }", "include: { usuario: true }", "populate: 'usuario'"],
                correctAnswer: 1,
                explanation: "'include' le indica al cliente de Prisma que efectúe el JOIN relacional automáticamente.",
              },
            ],
            summary: "schema.prisma define las tablas como modelos tipados. 'prisma migrate dev' crea el SQL y genera el cliente TypeScript con autocompletado total.",
          },
        ],
      },
    ],
  },

  // ==================== ÁREA: DESARROLLO WEB ====================
  {
    id: "frontend-next-ts",
    areaId: "desarrollo-web",
    title: "Next.js 16, TypeScript & React Moderno",
    description: "Construcción de aplicaciones web interactivas con Server Components, Hooks, Tailwind y tipado estricto.",
    icon: "devices",
    order: 3,
    badge: "Next 16",
    topics: [
      {
        id: "server-vs-client-components",
        title: "Server Components vs Client Components",
        description: "Diferencias fundamentales de ejecución, rendimiento y directiva 'use client'.",
        order: 1,
        lessons: [
          {
            id: "server-client-paradigma",
            title: "Cuándo usar Server Components y cuándo 'use client'",
            order: 1,
            durationMinutes: 25,
            status: "aprendida",
            confidenceLevel: 5,
            lastReviewedAt: "2026-10-10",
            learningObjective: "Identificar cuándo un componente debe ser de servidor (por defecto en Next.js App Router) y cuándo requiere la directiva 'use client'.",
            explanation: "Por defecto, todos los componentes en Next.js son Server Components. Se ejecutan en el servidor, no envían JavaScript al cliente y pueden acceder directamente al sistema de archivos o hacer peticiones seguras. Solo agregas 'use client' si necesitas interactividad en el navegador: useState, useEffect, eventos onClick/onChange o APIs del browser.",
            keyConcepts: [
              "Server Components: por defecto, cero JS en el bundle del cliente, ideales para datos y lectura.",
              "Client Components: declarados con 'use client' al inicio del archivo, necesarios para interactividad y hooks.",
            ],
            practicalExamples: [
              {
                title: "Ejemplo en este proyecto",
                description: "Sidebar.tsx usa 'use client' porque lee usePathname(), mientras el layout principal puede ser Server Component.",
                codeOrText: `"use client";
import { usePathname } from "next/navigation";

export default function Sidebar() {
  const pathname = usePathname(); // Hook de navegación interactiva
  ...
}`,
                language: "TypeScript (React)",
              },
            ],
            activities: [
              {
                id: "act-rsc-1",
                type: "multiple-choice",
                title: "Directiva 'use client'",
                prompt: "¿En cuál de los siguientes casos es OBLIGATORIO colocar 'use client'?",
                options: [
                  "Cuando el componente solo recibe texto y lo muestra en un <h1>.",
                  "Cuando el componente utiliza useState() para abrir y cerrar un modal.",
                  "Cuando el componente lee un archivo JSON estático en el servidor.",
                ],
                correctAnswer: 1,
                explanation: "useState() es un hook interactivo que solo se ejecuta en el navegador, por lo que requiere 'use client'.",
              },
            ],
            summary: "Por defecto usa Server Components para mayor velocidad y menor peso de JS. Añade 'use client' únicamente cuando requieras hooks o interactividad del usuario.",
          },
        ],
      },
    ],
  },

  // ==================== ÁREA: COMPUTER SCIENCE & FUNDAMENTOS ====================
  {
    id: "cs-algoritmos-datos",
    areaId: "cs-fundamentos",
    title: "Estructuras de Datos y Algoritmos",
    description: "Análisis de complejidad temporal y espacial Big O, grafos, árboles, pilas, colas y algoritmos esenciales.",
    icon: "psychology",
    order: 4,
    badge: "Big O & Data",
    topics: [
      {
        id: "complejidad-algoritmica",
        title: "Complejidad Temporal y Notación Big O",
        description: "Cómo medir la eficiencia de un algoritmo independientemente del hardware.",
        order: 1,
        lessons: [
          {
            id: "introduccion-big-o",
            title: "Fundamentos de Big O: O(1), O(n) y O(n²)",
            order: 1,
            durationMinutes: 30,
            status: "pendiente-repaso",
            confidenceLevel: 3,
            lastReviewedAt: "2026-10-06",
            learningObjective: "Calcular el orden de magnitud de crecimiento de un algoritmo respecto al tamaño de los datos de entrada (n).",
            explanation: "Big O describe el peor de los casos (worst-case scenario) del tiempo que tardará un algoritmo en completarse a medida que la entrada 'n' crece hacia el infinito. O(1) es tiempo constante (acceso directo a un array), O(n) es lineal (recorrer una lista), y O(n²) es cuadrático (bucles anidados).",
            keyConcepts: [
              "O(1): Constante — el tiempo no varía según el tamaño de la lista.",
              "O(n): Lineal — si hay 1000 elementos, hace 1000 iteraciones.",
              "O(n²): Cuadrático — peligroso para listas grandes (ej. bucle dentro de bucle).",
            ],
            practicalExamples: [
              {
                title: "Comparación de búsqueda",
                description: "Array indexOf vs Set has()",
                codeOrText: `// O(n) lineal: tiene que revisar uno por uno
const existeEnArray = [1, 2, 3, 4, 5].includes(5);

// O(1) constante: acceso directo por hash table
const miSet = new Set([1, 2, 3, 4, 5]);
const existeEnSet = miSet.has(5);`,
                language: "JavaScript",
              },
            ],
            activities: [
              {
                id: "act-bigo-1",
                type: "multiple-choice",
                title: "Identificar complejidad",
                prompt: "Si tienes dos bucles for anidados iterando ambos sobre la misma lista de tamaño n, ¿cuál es su complejidad?",
                options: ["O(1)", "O(n)", "O(n²)", "O(log n)"],
                correctAnswer: 2,
                explanation: "Dos bucles anidados donde cada uno itera hasta n realizan aproximadamente n * n operaciones, dando O(n²).",
              },
            ],
            summary: "Big O mide cómo escala el código al crecer los datos. Prioriza siempre soluciones O(1) u O(n) por encima de O(n²).",
          },
        ],
      },
    ],
  },
];

// Sesiones de estudio registradas (Historial inicial)
export const initialStudySessions: StudySession[] = [
  {
    id: "session-20261010-01",
    date: "2026-10-10",
    durationMinutes: 45,
    areaId: "informatica",
    areaName: "Backend, APIs & Bases de Datos",
    moduleId: "backend-nestjs-prisma",
    moduleName: "NestJS & Prisma ORM Profesional",
    lessonsReviewed: ["Controladores vs Servicios", "El archivo schema.prisma y Migraciones"],
    exercisesCount: 5,
    correctCount: 5,
    incorrectCount: 0,
    difficultiesFound: "Entender el hook OnModuleInit y cómo @Global() comparte el provider.",
    personalNotes: "Prisma agiliza enormemente las relaciones entre tablas comparado con SQL plano.",
    nextRecommendedTopic: "Operaciones CRUD avanzadas con 'include' y transacciones $transaction.",
  },
  {
    id: "session-20261009-01",
    date: "2026-10-09",
    durationMinutes: 35,
    areaId: "idiomas",
    areaName: "Idiomas & Comunicación",
    moduleId: "ingles-core",
    moduleName: "Inglés Básico y Estructuras Gramaticales",
    lessonsReviewed: ["Verbo To Be en Presente", "Presente Simple"],
    exercisesCount: 8,
    correctCount: 7,
    incorrectCount: 1,
    difficultiesFound: "No olvidar agregar la 's' al verbo principal cuando se habla de tercera persona singular.",
    personalNotes: "Hacer tarjetas con oraciones contextualizadas en código dev.",
    nextRecommendedTopic: "Pasado simple regular e irregular con 'did'.",
  },
];

// Registro inicial de errores frecuentes para refuerzo activo
export const initialLoggedMistakes: LoggedMistake[] = [
  {
    id: "mistake-01",
    areaId: "idiomas",
    topicTitle: "Presente Simple",
    conceptOrRule: "Tercera persona singular (he, she, it)",
    mistakeDescription: "Escribir 'The server run on port 3001' sin la s en el verbo.",
    howToCorrect: "Como 'The server' es 'it', el verbo en presente simple requiere 's': 'The server runs on port 3001'.",
    date: "2026-10-09",
    resolved: false,
  },
  {
    id: "mistake-02",
    areaId: "informatica",
    topicTitle: "NestJS Dependency Injection",
    conceptOrRule: "Uso del decorador @Injectable()",
    mistakeDescription: "Intentar instanciar el servicio con 'new ProgresoService()' en vez de inyectarlo en el constructor.",
    howToCorrect: "Declarar 'constructor(private readonly service: ProgresoService)' y dejar que NestJS gestione la instancia.",
    date: "2026-10-08",
    resolved: true,
  },
  {
    id: "mistake-03",
    areaId: "desarrollo-web",
    topicTitle: "Next.js React Server Components",
    conceptOrRule: "Uso de hooks en Server Components",
    mistakeDescription: "Usar useState() en un Server Component sin poner 'use client' en la primera línea.",
    howToCorrect: "Cualquier archivo que utilice useState, useEffect o usePathname debe comenzar con 'use client';",
    date: "2026-10-07",
    resolved: true,
  },
];
