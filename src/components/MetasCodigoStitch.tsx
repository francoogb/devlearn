"use client";

// Metas de Código interactivas - Basadas en el diseño Stitch
import { useState } from "react";

interface MetaItem {
  id: number;
  titulo: string;
  xp: number;
  completada: boolean;
}

const METAS_INICIALES: MetaItem[] = [
  { id: 1, titulo: "Módulo Concurrencia en Go", xp: 120, completada: false },
  { id: 2, titulo: "5 Algoritmos NeetCode", xp: 200, completada: false },
  { id: 3, titulo: "Revisar PR OpenSource", xp: 90, completada: true },
];

export default function MetasCodigoStitch() {
  const [metas, setMetas] = useState<MetaItem[]>(METAS_INICIALES);

  const toggle = (id: number) => {
    setMetas((prev) =>
      prev.map((m) => (m.id === id ? { ...m, completada: !m.completada } : m))
    );
  };

  const completadasCount = metas.filter((m) => m.completada).length;

  return (
    <section className="rounded-xl bg-surface-container p-5 md:p-6 flex flex-col gap-4 shadow-sm border border-surface-container-high">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-secondary text-[22px]">
            checklist
          </span>
          <h3 className="font-display text-lg font-semibold text-on-surface">
            Metas de Código
          </h3>
        </div>
        <span className="font-mono text-xs px-2.5 py-0.5 rounded-full bg-surface-container-highest text-on-surface font-medium">
          {completadasCount} de {metas.length} Completadas
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {metas.map((meta) => {
          return (
            <label
              key={meta.id}
              onClick={() => toggle(meta.id)}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer gap-3 border border-surface-container-high/40 ${
                meta.completada
                  ? "bg-surface-container-low/50 opacity-80"
                  : "bg-surface-container-low hover:bg-surface-container-high"
              }`}
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={meta.completada}
                  onChange={() => {}} // controlado por onClick del label
                  className="w-4 h-4 rounded bg-surface-container-highest accent-secondary cursor-pointer"
                />
                <span
                  className={`text-sm font-medium ${
                    meta.completada
                      ? "line-through text-outline"
                      : "text-on-surface"
                  }`}
                >
                  {meta.titulo}
                </span>
              </div>
              <span
                className={`font-mono text-xs px-2 py-0.5 rounded font-semibold ${
                  meta.completada
                    ? "text-secondary bg-secondary/20"
                    : "text-secondary bg-secondary/10"
                }`}
              >
                +{meta.xp} XP
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}
