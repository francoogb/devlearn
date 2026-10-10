// Carga los datos iniciales desde src/data/progreso.json a Postgres via Prisma.
// Se ejecuta con: npx prisma db seed
// Es idempotente: borra y vuelve a insertar, se puede correr varias veces.

import { PrismaClient, ConceptStatus, ExerciseCategory } from "@prisma/client";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const prisma = new PrismaClient();

// El JSON todavía vive en el frontend. Ruta relativa desde backend/prisma/.
const DATA_PATH = resolve(__dirname, "../../src/data/progreso.json");

interface RawConcept {
  id: string;
  name: string;
  status: string;
}

interface RawExercise {
  id: number;
  title: string;
  conceptId: string;
  category?: string;
  language?: string;
  date: string;
  codePath: string;
  whatChanged: string;
  whatWasHard: string;
  codeSnippet?: string;
}

interface RawSection {
  id: string;
  name: string;
  status: string;
  completedItems: number;
  totalItems: number;
  lastReview: string;
}

interface RawData {
  concepts: RawConcept[];
  exercises: RawExercise[];
  sectionsProgress: RawSection[];
}

// El JSON usa "en-curso" (con guión) pero el enum de Prisma no lo permite,
// así que traducimos al nombre TypeScript del enum.
function toStatus(s: string): ConceptStatus {
  switch (s) {
    case "pendiente":
      return ConceptStatus.pendiente;
    case "en-curso":
      return ConceptStatus.en_curso;
    case "terminado":
      return ConceptStatus.terminado;
    default:
      throw new Error(`ConceptStatus desconocido: "${s}"`);
  }
}

function toCategory(c: string | undefined): ExerciseCategory | null {
  if (!c) return null;
  const valid = ["js", "react", "ts", "algoritmos", "estructuras"] as const;
  if ((valid as readonly string[]).includes(c)) {
    return c as ExerciseCategory;
  }
  throw new Error(`ExerciseCategory desconocida: "${c}"`);
}

async function main() {
  const raw = readFileSync(DATA_PATH, "utf-8");
  const data = JSON.parse(raw) as RawData;

  console.log(
    `→ Leyendo datos: ${data.concepts.length} concepts, ${data.exercises.length} exercises, ${data.sectionsProgress.length} sections`
  );

  // Orden FK-safe: exercises depende de concepts, así que va primero.
  await prisma.exercise.deleteMany();
  await prisma.concept.deleteMany();
  await prisma.sectionProgress.deleteMany();
  console.log("→ Tablas limpiadas");

  await prisma.concept.createMany({
    data: data.concepts.map((c) => ({
      id: c.id,
      name: c.name,
      status: toStatus(c.status),
    })),
  });
  console.log(`✓ Insertados ${data.concepts.length} concepts`);

  await prisma.exercise.createMany({
    data: data.exercises.map((e) => ({
      id: e.id,
      title: e.title,
      conceptId: e.conceptId,
      category: toCategory(e.category),
      language: e.language ?? null,
      date: e.date,
      codePath: e.codePath,
      whatChanged: e.whatChanged,
      whatWasHard: e.whatWasHard,
      codeSnippet: e.codeSnippet ?? null,
    })),
  });
  console.log(`✓ Insertados ${data.exercises.length} exercises`);

  await prisma.sectionProgress.createMany({
    data: data.sectionsProgress.map((s) => ({
      id: s.id,
      name: s.name,
      status: toStatus(s.status),
      completedItems: s.completedItems,
      totalItems: s.totalItems,
      lastReview: s.lastReview,
    })),
  });
  console.log(`✓ Insertados ${data.sectionsProgress.length} sections`);

  console.log("\nSeed completo");
}

main()
  .catch((e) => {
    console.error("Error en seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
