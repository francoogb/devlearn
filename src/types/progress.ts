// Tipos del "recordatorio de aprendizaje".
// Aquí se define LA FORMA que deben tener los datos. En JavaScript este
// archivo no existiría: los datos viajan sin contrato y los errores saltan
// en ejecución. En TypeScript, si el JSON no cumple estas interfaces,
// el compilador lo detecta ANTES de ejecutar (ver src/lib/progress.ts).

// Los únicos estados posibles de un concepto (union type).
// Escribir "en-proceso" en vez de "en-curso" sería un error de compilación.
export type ConceptStatus = "pendiente" | "en-curso" | "terminado";

// Un concepto de programación que estoy estudiando.
export interface Concept {
  id: string; // identificador corto, ej. "variables" (se usa para relacionar)
  name: string; // nombre visible, ej. "Variables"
  status: ConceptStatus;
}

// Un ejercicio resuelto, anotado en la bitácora.
export interface Exercise {
  id: number;
  title: string; // título del ejercicio
  conceptId: string; // a qué concepto pertenece (el "id" del concepto)
  category?: "js" | "react" | "ts" | "algoritmos" | "estructuras"; // categoría temática
  language?: string; // ej. "JavaScript", "TypeScript", "React / Next.js"
  date: string; // fecha en formato ISO, ej. "2026-10-08"
  codePath: string; // ruta del archivo con el código, ej. "src/components/Contador.tsx"
  whatChanged: string; // qué cambié yo en el ejercicio
  whatWasHard: string; // qué me costó o qué aprendí de ello
  codeSnippet?: string; // código JS/TS que se vio en el ejercicio
}

// Progreso general de las secciones temáticas de la barra lateral
export interface SectionProgress {
  id: string; // ej. "ai-901", "ingles", "algoritmos", "estructuras-de-datos"
  name: string;
  status: ConceptStatus;
  completedItems: number;
  totalItems: number;
  lastReview: string;
}
