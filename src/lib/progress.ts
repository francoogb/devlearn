// Capa de acceso a los datos de progreso.
// Importa el JSON (gracias a "resolveJsonModule": true en tsconfig.json).
//
// OJO, detalle honesto de TypeScript: un JSON importado llega SIN TIPOS
// (el campo "status" se infiere como string genérico). La afirmación "as"
// fija aquí el contrato: confiamos en que el archivo cumple las interfaces.
// A partir de esta línea, TODO el código que use concepts o exercises
// tiene autocompletado y chequeo reales. Si quisiéramos VALIDACIÓN
// estricta del contenido habría que usar un validador en runtime
// (p. ej. zod) — tema de una lección futura.

import data from "@/data/progreso.json";
import type { Concept, Exercise, SectionProgress } from "@/types/progress";

// La frontera: el JSON anónimo adopta nuestros tipos.
export const concepts = data.concepts as Concept[];
export const exercises = data.exercises as Exercise[];
export const sections = (data.sectionsProgress ?? []) as SectionProgress[];

// Nombre visible de un concepto dado su id; si no existe, devuelve el id.
export function conceptNameById(conceptId: string): string {
  return concepts.find((c) => c.id === conceptId)?.name ?? conceptId;
}

// Ejercicios resueltos que pertenecen a un concepto.
export function exercisesFor(conceptId: string): Exercise[] {
  return exercises.filter((e) => e.conceptId === conceptId);
}

// Progreso de una sección específica de la barra lateral.
export function sectionProgressById(sectionId: string): SectionProgress | undefined {
  return sections.find((s) => s.id === sectionId);
}
