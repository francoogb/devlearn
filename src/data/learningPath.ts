// Datos de la "Ruta de Aprendizaje" del dashboard.
// Al añadir, quitar o editar pasos en estos arreglos, el bloque
// de la derecha se actualiza solo: no hay que tocar el componente.

// Los únicos estados posibles de un paso (union type):
// solo puede ser uno de estos tres valores, nada más.
export type StepStatus = "completed" | "in-progress" | "locked";

// La "ficha" que debe tener cada paso de la ruta.
export interface LearningStep {
  id: number; // número que se muestra cuando el paso está bloqueado
  title: string; // título de la lección
  detail: string; // texto secundario (tipo de actividad)
  xp?: number; // puntos ganados al completar (solo aplica a completados)
  status: StepStatus;
}

// La ruta: 2 completadas, 1 en progreso, 2 bloqueadas.
export const learningSteps: LearningStep[] = [
  {
    id: 1,
    title: "¿Qué es el App Router?",
    detail: "",
    xp: 30,
    status: "completed",
  },
  {
    id: 2,
    title: "Rutas = carpetas",
    detail: "",
    xp: 40,
    status: "completed",
  },
  {
    id: 3,
    title: "Server vs Client Components",
    detail: "En progreso actual",
    status: "in-progress",
  },
  {
    id: 4,
    title: "Reto Práctico: Contador",
    detail: "Ejercicio interactivo",
    status: "locked",
  },
  {
    id: 5,
    title: "Autoevaluación Final",
    detail: "3 preguntas de control",
    status: "locked",
  },
];

// La "chuleta": estructuras clave para recordar durante la sesión.
export interface ModuleCheat {
  term: string; // el código o concepto, en monospace
  description: string;
}

export const moduleCheats: ModuleCheat[] = [
  {
    term: '"use client"',
    description: "Primera línea: habilita estado y eventos en el navegador.",
  },
  {
    term: "await fetch(...)",
    description: "Solo en el servidor: trae datos antes de renderizar.",
  },
  {
    term: "carpeta/page.tsx",
    description: "La carpeta define la URL; page.tsx es la página.",
  },
];
