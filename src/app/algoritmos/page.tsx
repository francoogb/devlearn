// Página /algoritmos — procedimientos básicos de programación.
// Cubre: Búsqueda lineal y binaria; Ordenamiento (burbuja, selección, inserción);
// Recursión (factorial, Fibonacci, suma de arreglo); y Complejidad básica (Big O).
// Cada tema incluye código en JavaScript, explicación paso a paso y un ejercicio interactivo.

"use client";

import { useState } from "react";
import { algorithmTopics, type AlgorithmTopic } from "@/content/algoritmos";
import { sectionProgressById } from "@/lib/progress";

export default function AlgoritmosPage() {
  const progress = sectionProgressById("algoritmos");

  // Filtro por categoría
  const [selectedCategory, setSelectedCategory] = useState<string>("todos");

  // Estado para desplegar soluciones de ejercicios
  const [showSolution, setShowSolution] = useState<Record<string, boolean>>({});

  // Temas completados / entendidos
  const [completedTopics, setCompletedTopics] = useState<Record<string, boolean>>({
    "busqueda-lineal": true,
  });

  const toggleSolution = (id: string) => {
    setShowSolution((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleCompleted = (id: string) => {
    setCompletedTopics((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredTopics =
    selectedCategory === "todos"
      ? algorithmTopics
      : algorithmTopics.filter((t) => t.category === selectedCategory);

  const completedCount = Object.values(completedTopics).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Encabezado */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface-container-low px-6 py-5 shadow-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] text-primary">
              reorder
            </span>
            <h1 className="font-display text-2xl font-bold text-on-surface">
              Algoritmos Fundamentales (Algorithms)
            </h1>
          </div>
          <p className="text-sm text-on-surface-variant">
            Procedimientos esenciales explicados paso a paso con código en
            JavaScript y análisis de complejidad (Big O).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-secondary/15 px-3 py-1 font-mono text-xs text-secondary">
            {completedCount} de {algorithmTopics.length} dominados
          </span>
          {progress && (
            <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-xs text-primary">
              Estado: {progress.status}
            </span>
          )}
        </div>
      </div>

      {/* Filtros de categoría */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={() => setSelectedCategory("todos")}
          className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
            selectedCategory === "todos"
              ? "bg-primary font-bold text-on-primary"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
          }`}
        >
          Todos ({algorithmTopics.length})
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory("busqueda")}
          className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
            selectedCategory === "busqueda"
              ? "bg-primary font-bold text-on-primary"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
          }`}
        >
          Búsqueda (Searching)
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory("ordenamiento")}
          className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
            selectedCategory === "ordenamiento"
              ? "bg-primary font-bold text-on-primary"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
          }`}
        >
          Ordenamiento (Sorting)
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory("recursion")}
          className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
            selectedCategory === "recursion"
              ? "bg-primary font-bold text-on-primary"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
          }`}
        >
          Recursión (Recursion)
        </button>
        <button
          type="button"
          onClick={() => setSelectedCategory("complejidad")}
          className={`rounded-lg px-3 py-1.5 font-mono text-xs transition-colors ${
            selectedCategory === "complejidad"
              ? "bg-primary font-bold text-on-primary"
              : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
          }`}
        >
          Complejidad (Big O)
        </button>
      </div>

      {/* Lista de temas */}
      <div className="flex flex-col gap-6">
        {filteredTopics.map((topic) => {
          const isDone = !!completedTopics[topic.id];
          const isSolutionOpen = !!showSolution[topic.id];

          return (
            <article
              key={topic.id}
              className="flex flex-col gap-4 rounded-xl bg-surface-container-low p-6 shadow-md"
            >
              {/* Encabezado del tema */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-container-high pb-3">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-outline">
                      {topic.categoryLabel}
                    </span>
                    <span className="text-outline">•</span>
                    <span className="font-mono text-xs text-primary">
                      {topic.englishTerm}
                    </span>
                  </div>
                  <h2 className="font-display text-xl font-bold text-on-surface">
                    {topic.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    <span className="rounded bg-surface-container px-2 py-0.5 text-secondary">
                      Tiempo: {topic.bigO.time}
                    </span>
                    <span className="rounded bg-surface-container px-2 py-0.5 text-tertiary">
                      Espacio: {topic.bigO.space}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleCompleted(topic.id)}
                    className={`flex items-center gap-1 rounded-lg px-2.5 py-1 font-mono text-xs transition-colors ${
                      isDone
                        ? "bg-secondary/20 text-secondary"
                        : "bg-surface-container text-outline hover:text-on-surface"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {isDone ? "check_circle" : "radio_button_unchecked"}
                    </span>
                    {isDone ? "Dominado" : "Pendiente"}
                  </button>
                </div>
              </div>

              {/* Resumen */}
              <p className="text-base leading-relaxed text-on-surface-variant">
                {topic.summary}
              </p>

              {/* Paso a paso */}
              <div className="flex flex-col gap-2 rounded-lg bg-surface-container p-4">
                <div className="flex items-center gap-2 text-on-surface">
                  <span className="material-symbols-outlined text-[18px] text-tertiary">
                    format_list_numbered
                  </span>
                  <h3 className="font-display text-sm font-semibold">
                    Procedimiento Paso a Paso (Step by Step):
                  </h3>
                </div>
                <ol className="flex flex-col gap-1.5 pl-6 text-sm text-on-surface-variant list-decimal">
                  {topic.steps.map((st, i) => (
                    <li key={i} className="leading-relaxed">
                      {st}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Código en JavaScript */}
              <div className="flex flex-col gap-2 rounded-lg bg-surface-container-lowest p-4 font-mono text-xs shadow-inner">
                <div className="flex items-center justify-between pb-1 text-outline">
                  <span className="flex items-center gap-1.5">
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-error/70" />
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-tertiary-container/70" />
                    <span className="inline-block h-2.5 w-2.5 rounded-full bg-secondary/70" />
                    <span className="ml-2 font-mono text-[11px] text-on-surface-variant">
                      Código en JavaScript
                    </span>
                  </span>
                  <span className="font-mono text-[11px] text-secondary">
                    {topic.englishTerm}
                  </span>
                </div>
                <pre className="overflow-x-auto py-1 text-sm leading-relaxed text-on-surface">
                  {topic.jsCode}
                </pre>
              </div>

              {/* Ejercicio interactivo */}
              <div className="flex flex-col gap-2 rounded-lg bg-surface-container p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined text-[18px]">
                      fitness_center
                    </span>
                    <h3 className="font-display text-sm font-semibold text-on-surface">
                      Ejercicio Práctico:
                    </h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleSolution(topic.id)}
                    className="flex items-center gap-1 font-mono text-xs text-primary hover:underline"
                  >
                    <span>{isSolutionOpen ? "Ocultar solución" : "Ver solución"}</span>
                    <span className="material-symbols-outlined text-[14px]">
                      {isSolutionOpen ? "expand_less" : "expand_more"}
                    </span>
                  </button>
                </div>
                <p className="text-sm font-medium text-on-surface">
                  {topic.exercise.question}
                </p>
                <p className="text-sm italic text-on-surface-variant">
                  <strong>Pista (Hint):</strong> {topic.exercise.hint}
                </p>

                {isSolutionOpen && (
                  <div className="mt-2 rounded bg-surface-container-lowest p-3 font-mono text-xs text-secondary">
                    <span className="text-outline">{"// Solución propuesta:"}</span>
                    <pre className="mt-1 overflow-x-auto text-sm leading-relaxed">
                      {topic.exercise.solution}
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
