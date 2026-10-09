// DEMO INTERACTIVO: lista de metas semanales con checkboxes.
// Client Component porque cada checkbox cambia el estado (useState),
// y el contador "X de 3 completadas" se actualiza solo.

"use client";

import { useState } from "react";

interface Meta {
  id: number;
  titulo: string;
  detalle: string;
  xp: number;
}

const metasIniciales: Meta[] = [
  {
    id: 1,
    titulo: "Terminar la lección de rutas dinámicas",
    detalle: "Crear src/app/saludo/[nombre]/page.tsx y probarla.",
    xp: 120,
  },
  {
    id: 2,
    titulo: "Practicar props tipadas con TypeScript",
    detalle: "Modificar PropsDemo para aceptar un segundo prop.",
    xp: 200,
  },
  {
    id: 3,
    titulo: "Leer sobre Server vs Client Components",
    detalle: "Página /aprender/next, sección 2.",
    xp: 90,
  },
];

export default function MetasSemanales() {
  // Guardamos qué metas están completadas: { 1: true, 2: false, ... }
  const [completadas, setCompletadas] = useState<Record<number, boolean>>({
    3: true, // la meta 3 empieza completada
  });

  const total = metasIniciales.length;
  const hechas = Object.values(completadas).filter(Boolean).length;

  function toggle(id: number) {
    setCompletadas((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <section className="flex flex-col gap-4 rounded-xl bg-surface-container p-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[22px] text-secondary">
            checklist
          </span>
          <h3 className="font-display text-xl text-on-surface">
            Metas Semanales de Código
          </h3>
        </div>
        <span className="rounded-full bg-surface-container-highest px-2 py-0.5 font-mono text-xs text-on-surface">
          {hechas} de {total} Completadas
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {metasIniciales.map((meta) => {
          const hecha = completadas[meta.id] ?? false;
          return (
            <label
              key={meta.id}
              className={`flex cursor-pointer items-start gap-4 rounded-lg p-4 transition-colors ${
                hecha
                  ? "bg-surface-container-low/50 opacity-75"
                  : "bg-surface-container-low hover:bg-surface-container-high"
              }`}
            >
              <input
                type="checkbox"
                checked={hecha}
                onChange={() => toggle(meta.id)}
                className="mt-1 h-4 w-4 cursor-pointer accent-secondary"
              />
              <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span
                    className={`text-sm font-medium ${
                      hecha ? "text-outline line-through" : "text-on-surface"
                    }`}
                  >
                    {meta.titulo}
                  </span>
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-xs ${
                      hecha
                        ? "bg-secondary/20 text-secondary"
                        : "bg-secondary/10 text-secondary"
                    }`}
                  >
                    {hecha ? `Completado +${meta.xp} XP` : `+${meta.xp} XP`}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant">{meta.detalle}</p>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
}
