// Página /estructuras-de-datos — cómo se guardan y organizan los datos.
// Cubre 9 estructuras: Arreglos, objetos, Map, Set, pilas, colas, listas enlazadas, árboles y grafos.
// Cada una con: qué es, cuándo usarla, versión tipada en TypeScript, comparación con JavaScript y mini ejercicio.

"use client";

import { useState } from "react";
import { dataStructures, type DataStructureTopic } from "@/content/estructurasDatos";
import { sectionProgressById } from "@/lib/progress";

export default function EstructurasDatosPage() {
  const progress = sectionProgressById("estructuras-de-datos");

  // Estructura activa seleccionada o "todas"
  const [selectedId, setSelectedId] = useState<string>("todas");

  // Estado para desplegar soluciones de ejercicios
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});

  // Estructuras dominadas
  const [mastered, setMastered] = useState<Record<string, boolean>>({
    arreglos: true,
    objetos: true,
  });

  const toggleSolution = (id: string) => {
    setShowSolution((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleMastered = (id: string) => {
    setMastered((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredStructures =
    selectedId === "todas"
      ? dataStructures
      : dataStructures.filter((d) => d.id === selectedId);

  const masteredCount = Object.values(mastered).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Encabezado */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface-container-low px-6 py-5 shadow-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] text-primary">
              schema
            </span>
            <h1 className="font-display text-2xl font-bold text-on-surface">
              Estructuras de Datos (Data Structures)
            </h1>
          </div>
          <p className="text-sm text-on-surface-variant">
            Cómo se almacenan y relacionan los datos: qué son, cuándo usarlas,
            tipado en TypeScript vs JavaScript y mini ejercicios.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-secondary/15 px-3 py-1 font-mono text-xs text-secondary">
            {masteredCount} de {dataStructures.length} dominadas
          </span>
          {progress && (
            <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-xs text-primary">
              Estado: {progress.status}
            </span>
          )}
        </div>
      </div>

      {/* Selector rápido de estructura */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setSelectedId("todas")}
          className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
            selectedId === "todas"
              ? "bg-primary font-bold text-on-primary"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
          }`}
        >
          Todas ({dataStructures.length})
        </button>
        {dataStructures.map((ds) => (
          <button
            key={ds.id}
            type="button"
            onClick={() => setSelectedId(ds.id)}
            className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
              selectedId === ds.id
                ? "bg-primary font-bold text-on-primary"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            }`}
          >
            {ds.name}
          </button>
        ))}
      </div>

      {/* Lista de estructuras */}
      <div className="flex flex-col gap-6">
        {filteredStructures.map((item) => {
          const isDone = !!mastered[item.id];
          const isSolutionOpen = !!showSolution[item.id];

          return (
            <article
              key={item.id}
              className="flex flex-col gap-5 rounded-xl bg-surface-container-low p-6 shadow-md"
            >
              {/* Cabecera */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-container-high pb-3">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-outline">
                      Estructura
                    </span>
                    <span className="text-outline">•</span>
                    <span className="font-mono text-xs text-primary">
                      {item.englishTerm}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-on-surface">
                    {item.name}
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => toggleMastered(item.id)}
                  className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-mono text-xs transition-colors ${
                    isDone
                      ? "bg-secondary/20 text-secondary"
                      : "bg-surface-container text-outline hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isDone ? "check_circle" : "radio_button_unchecked"}
                  </span>
                  {isDone ? "Comprendida" : "Por repasar"}
                </button>
              </div>

              {/* Qué es y Cuándo usarla */}
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-1.5 rounded-lg bg-surface-container p-4">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-[18px]">
                      info
                    </span>
                    <h3 className="font-display text-base font-semibold text-on-surface">
                      ¿Qué es? (What is it)
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {item.whatIsIt}
                  </p>
                </div>

                <div className="flex flex-col gap-1.5 rounded-lg bg-surface-container p-4">
                  <div className="flex items-center gap-2 text-secondary">
                    <span className="material-symbols-outlined text-[18px]">
                      check_circle
                    </span>
                    <h3 className="font-display text-base font-semibold text-on-surface">
                      ¿Cuándo usarla? (When to use it)
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {item.whenToUse}
                  </p>
                </div>
              </div>

              {/* Versión tipada en TypeScript */}
              <div className="flex flex-col gap-2 rounded-lg bg-surface-container-lowest p-4 font-mono text-xs shadow-inner">
                <div className="flex items-center justify-between pb-1 text-outline">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-error/70" />
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-tertiary-container/70" />
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-secondary/70" />
                    <span className="ml-2 font-mono text-[11px] text-on-surface-variant">
                      Versión tipada en TypeScript (Typed)
                    </span>
                  </span>
                  <span className="font-mono text-[11px] text-primary">
                    TypeScript
                  </span>
                </div>
                <pre className="overflow-x-auto py-1 text-sm leading-relaxed text-on-surface">
                  {item.tsCode}
                </pre>
              </div>

              {/* Comparación con JavaScript */}
              <div className="flex items-start gap-3 rounded-lg bg-surface-container p-4">
                <span className="material-symbols-outlined text-[20px] text-tertiary">
                  compare_arrows
                </span>
                <div className="flex flex-col gap-1">
                  <h4 className="font-display text-sm font-semibold text-on-surface">
                    Comparación con JavaScript (JS vs TS):
                  </h4>
                  <p className="text-sm leading-relaxed text-on-surface-variant">
                    {item.jsComparison}
                  </p>
                </div>
              </div>

              {/* Mini ejercicio */}
              <div className="flex flex-col gap-2 rounded-lg bg-surface-container p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-[18px]">
                      code
                    </span>
                    <h4 className="font-display text-sm font-semibold text-on-surface">
                      Mini Ejercicio:
                    </h4>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSolution(item.id)}
                    className="flex items-center gap-1 font-mono text-xs text-primary hover:underline"
                  >
                    <span>{isSolutionOpen ? "Ocultar solución" : "Ver solución"}</span>
                    <span className="material-symbols-outlined text-[14px]">
                      {isSolutionOpen ? "expand_less" : "expand_more"}
                    </span>
                  </button>
                </div>
                <p className="text-sm font-medium text-on-surface">
                  {item.exercise.prompt}
                </p>
                <p className="text-sm italic text-on-surface-variant">
                  <strong>Pista (Hint):</strong> {item.exercise.hint}
                </p>

                {isSolutionOpen && (
                  <div className="mt-2 rounded bg-surface-container-lowest p-3 font-mono text-xs text-secondary">
                    <span className="text-outline">{"// Solución propuesta:"}</span>
                    <pre className="mt-1 overflow-x-auto text-sm leading-relaxed">
                      {item.exercise.solution}
                    </pre>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
