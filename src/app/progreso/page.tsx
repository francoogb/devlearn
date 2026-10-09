// Página /progreso — el "recordatorio" de qué conceptos estoy estudiando,
// en qué estado está cada uno y cuántos ejercicios he resuelto de cada uno.
// Server Component: lee el JSON a través de src/lib/progress.ts y lo presenta.
// El conteo de ejercicios se CALCULA filtrando el arreglo, no se guarda a mano.

import Link from "next/link";
import { concepts, exercises, exercisesFor } from "@/lib/progress";
import type { ConceptStatus } from "@/types/progress";

// Aspecto del badge según el estado del concepto
const statusBadge: Record<
  ConceptStatus,
  { label: string; icon: string; className: string }
> = {
  terminado: {
    label: "Terminado",
    icon: "check_circle",
    className: "bg-secondary/15 text-secondary",
  },
  "en-curso": {
    label: "En curso",
    icon: "play_circle",
    className: "bg-primary/15 text-primary",
  },
  pendiente: {
    label: "Pendiente",
    icon: "radio_button_unchecked",
    className: "bg-surface-container-highest text-outline",
  },
};

export default function ProgresoPage() {
  // Los contadores del resumen se calculan solos a partir del arreglo
  const terminados = concepts.filter((c) => c.status === "terminado").length;
  const enCurso = concepts.filter((c) => c.status === "en-curso").length;
  const pendientes = concepts.filter((c) => c.status === "pendiente").length;

  return (
    <div className="flex flex-col gap-4">
      {/* Encabezado */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-surface-container-low px-6 py-4 shadow-md">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-2xl text-on-surface">
            Progreso de Aprendizaje
          </h1>
          <p className="text-sm text-on-surface-variant">
            Mapa de conceptos de programación y su estado actual.
          </p>
        </div>
        <span className="rounded-full bg-tertiary-container/30 px-1.5 py-0.5 font-mono text-xs uppercase tracking-wider text-tertiary">
          Recordatorio personal
        </span>
      </div>

      {/* Resumen calculado */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="flex flex-col gap-1 rounded-xl bg-surface-container-low p-4">
          <span className="font-mono text-2xl font-bold text-secondary">
            {terminados}
          </span>
          <span className="text-xs text-on-surface-variant">Terminados</span>
        </div>
        <div className="flex flex-col gap-1 rounded-xl bg-surface-container-low p-4">
          <span className="font-mono text-2xl font-bold text-primary">
            {enCurso}
          </span>
          <span className="text-xs text-on-surface-variant">En curso</span>
        </div>
        <div className="flex flex-col gap-1 rounded-xl bg-surface-container-low p-4">
          <span className="font-mono text-2xl font-bold text-on-surface-variant">
            {pendientes}
          </span>
          <span className="text-xs text-on-surface-variant">Pendientes</span>
        </div>
        <div className="flex flex-col gap-1 rounded-xl bg-surface-container-low p-4">
          <span className="font-mono text-2xl font-bold text-tertiary">
            {exercises.length}
          </span>
          <span className="text-xs text-on-surface-variant">
            Ejercicios resueltos
          </span>
        </div>
      </div>

      {/* Lista de conceptos */}
      <section className="flex flex-col rounded-xl bg-surface-container-low p-4 shadow-md">
        <div className="flex items-center justify-between px-2 pb-2">
          <span className="font-mono text-xs uppercase tracking-wider text-on-surface-variant">
            Conceptos
          </span>
          <Link
            href="/ejercicios"
            className="flex items-center gap-0.5 text-xs text-primary hover:text-primary-fixed"
          >
            Ver ejercicios
            <span className="material-symbols-outlined text-[14px]">
              chevron_right
            </span>
          </Link>
        </div>

        {concepts.map((concept) => {
          const badge = statusBadge[concept.status];
          const count = exercisesFor(concept.id).length;
          return (
            <div
              key={concept.id}
              className="flex items-center justify-between gap-3 border-t border-surface-container-high px-2 py-3 first:border-t-0"
            >
              <div className="flex min-w-0 items-center gap-3">
                <span
                  className={`material-symbols-outlined rounded-full p-1 text-[18px] ${badge.className}`}
                >
                  {badge.icon}
                </span>
                <div className="flex min-w-0 flex-col">
                  <span className="truncate text-sm font-medium text-on-surface">
                    {concept.name}
                  </span>
                  <span className="font-mono text-xs text-outline">
                    {concept.id}
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <span className="font-mono text-xs text-on-surface-variant">
                  {count === 0
                    ? "Sin ejercicios"
                    : `${count} ejercicio${count === 1 ? "" : "s"}`}
                </span>
                <span
                  className={`rounded-full px-2 py-0.5 font-mono text-xs ${badge.className}`}
                >
                  {badge.label}
                </span>
              </div>
            </div>
          );
        })}
      </section>

      {/* Aviso de dónde se editan los datos */}
      <div className="flex items-center gap-3 rounded-xl bg-surface-container-high p-4">
        <span className="material-symbols-outlined text-[20px] text-tertiary">
          edit_note
        </span>
        <p className="text-xs text-on-surface">
          <strong>Cómo actualizarlo:</strong> edita{" "}
          <code className="rounded bg-surface-container-highest px-1 py-0.5 font-mono text-secondary">
            src/data/progreso.json
          </code>{" "}
          y cambia el{" "}
          <code className="rounded bg-surface-container-highest px-1 py-0.5 font-mono text-secondary">
            status
          </code>{" "}
          o añade ejercicios. TypeScript valida que no te equivoques al escribir.
        </p>
      </div>
    </div>
  );
}
