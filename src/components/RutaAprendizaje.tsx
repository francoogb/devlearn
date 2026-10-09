// Bloque "Ruta de Aprendizaje" (columna derecha del dashboard).
// Server Component: recibe datos ya listos y solo los presenta.
// La lista sale de un arreglo tipado: al añadir un paso al arreglo,
// el contador y la lista se actualizan solos.

import Link from "next/link";
import {
  learningSteps,
  moduleCheats,
  type StepStatus,
} from "@/data/learningPath";

// Icono de Material Symbols según el estado del paso
const statusIcon: Record<StepStatus, string> = {
  completed: "check",
  "in-progress": "play_arrow",
  locked: "lock",
};

export default function RutaAprendizaje() {
  // El contador "X / Y" se calcula solo a partir del arreglo:
  // X = pasos completados, Y = total de pasos.
  const completedCount = learningSteps.filter(
    (step) => step.status === "completed",
  ).length;

  return (
    <section className="flex flex-col gap-4 rounded-xl bg-surface-container p-4 shadow-sm">
      {/* Encabezado + contador calculado */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[20px] text-primary">
            route
          </span>
          <h3 className="font-display text-xl text-on-surface">
            Ruta de Aprendizaje
          </h3>
        </div>
        <span className="rounded bg-surface-container-highest px-1.5 py-0.5 font-mono text-xs text-on-surface">
          {completedCount} / {learningSteps.length} Activo
        </span>
      </div>

      {/* Lista de pasos: un <li> por cada elemento del arreglo */}
      <ol className="flex flex-col">
        {learningSteps.map((step) => (
          <li
            key={step.id}
            className="flex items-start gap-3 border-b border-surface-container-low py-3 last:border-b-0"
          >
            {/* Círculo con icono o número según el estado */}
            <span
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                step.status === "completed"
                  ? "bg-secondary/20 text-secondary"
                  : step.status === "in-progress"
                    ? "bg-primary/20 text-primary"
                    : "bg-surface-container-highest text-outline"
              }`}
            >
              {step.status === "locked" ? (
                <span className="font-mono text-xs">{step.id}</span>
              ) : (
                <span className="material-symbols-outlined text-[16px]">
                  {statusIcon[step.status]}
                </span>
              )}
            </span>

            {/* Título + texto secundario según el estado */}
            <div className="flex flex-col">
              <p
                className={`text-sm ${
                  step.status === "locked"
                    ? "text-on-surface-variant"
                    : "font-medium text-on-surface"
                }`}
              >
                {step.title}
              </p>
              {step.status === "completed" ? (
                <span className="font-mono text-xs text-secondary">
                  Completado • +{step.xp} XP
                </span>
              ) : (
                <span
                  className={`text-xs ${
                    step.status === "in-progress"
                      ? "text-secondary"
                      : "text-outline"
                  }`}
                >
                  {step.detail}
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>

      {/* Chuleta del módulo: también sale del arreglo moduleCheats */}
      <div className="flex flex-col gap-3 rounded-lg bg-surface-container-low p-3">
        <div className="flex items-center gap-2 text-on-surface-variant">
          <span className="material-symbols-outlined text-[18px] text-tertiary">
            sticky_note_2
          </span>
          <span className="font-mono text-xs uppercase tracking-wider">
            Chuleta del Módulo
          </span>
        </div>
        <p className="text-xs text-on-surface-variant">
          Estructuras clave para recordar durante la sesión activa:
        </p>
        <div className="flex flex-col gap-2.5">
          {moduleCheats.map((cheat) => (
            <div key={cheat.term} className="flex flex-col gap-0.5">
              <code className="font-mono text-xs font-medium text-secondary">
                {cheat.term}
              </code>
              <p className="text-xs text-on-surface-variant">
                {cheat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Enlace a la documentación oficial */}
      <Link
        href="https://nextjs.org/docs"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-1 font-mono text-xs text-primary hover:text-primary-fixed"
      >
        Ver doc completa de Next.js
        <span className="material-symbols-outlined text-[14px]">
          open_in_new
        </span>
      </Link>
    </section>
  );
}
