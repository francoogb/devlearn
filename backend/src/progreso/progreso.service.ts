// Servicio: la "cocina" del backend. Antes leía src/data/progreso.json;
// ahora consulta Postgres via Prisma. El shape de respuesta se mantiene
// idéntico al JSON original para no romper el frontend.

import { Injectable } from "@nestjs/common";
import { ConceptStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

// Prisma devuelve el nombre TS del enum ("en_curso") pero el frontend
// espera el valor del JSON original ("en-curso"). Traducimos de ida.
const STATUS_API: Record<ConceptStatus, string> = {
  pendiente: "pendiente",
  en_curso: "en-curso",
  terminado: "terminado",
};

@Injectable()
export class ProgresoService {
  constructor(private readonly prisma: PrismaService) {}

  async getProgreso() {
    // Promise.all para disparar las 3 queries en paralelo
    // en vez de esperar una tras otra. Más rápido.
    const [concepts, exercises, sections] = await Promise.all([
      this.prisma.concept.findMany(),
      this.prisma.exercise.findMany({ orderBy: { id: "asc" } }),
      this.prisma.sectionProgress.findMany(),
    ]);

    return {
      concepts: concepts.map((c) => ({
        id: c.id,
        name: c.name,
        status: STATUS_API[c.status],
      })),
      exercises: exercises.map((e) => ({
        id: e.id,
        title: e.title,
        conceptId: e.conceptId,
        // undefined se omite al serializar JSON, igualando el shape
        // original (donde las keys faltan cuando no hay valor).
        category: e.category ?? undefined,
        language: e.language ?? undefined,
        date: e.date,
        codePath: e.codePath,
        whatChanged: e.whatChanged,
        whatWasHard: e.whatWasHard,
        codeSnippet: e.codeSnippet ?? undefined,
      })),
      sectionsProgress: sections.map((s) => ({
        id: s.id,
        name: s.name,
        status: STATUS_API[s.status],
        completedItems: s.completedItems,
        totalItems: s.totalItems,
        lastReview: s.lastReview,
      })),
    };
  }
}
