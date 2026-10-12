"use client";

// Componente interactivo: Programa de Inglés Básico Estructurado (A1)
// Muestra solo los módulos implementados; el catálogo completo A1-A2 se ocultó para no saturar la página.
// Disposición:
// - Izquierda (lg:col-span-8): Visor amplio de la Lección seleccionada.
// - Derecha (lg:col-span-4): Lista de Lecciones del Módulo con tipografía grande, badges y estados claros.

import { useState } from "react";
import {
  module01PrimerosPasos,
  module02PronombresYToBe,
  module03SustantivosPlural,
} from "@/data/englishCurriculumData";
import {
  EnglishLesson,
  EnglishLessonStatus,
  EnglishModule,
} from "@/types/englishCurriculum";

const implementedModulesMap: Record<string, EnglishModule> = {
  "mod-01-primeros-pasos": module01PrimerosPasos,
  "mod-02-pronombres-to-be": module02PronombresYToBe,
  "mod-03-sustantivos-plural": module03SustantivosPlural,
};

export default function EnglishCurriculumExplorer() {
  const [selectedModuleId, setSelectedModuleId] = useState<string>("mod-01-primeros-pasos");
  const [activeLesson, setActiveLesson] = useState<EnglishLesson | null>(
    module01PrimerosPasos.topics[0].lessons[0],
  );

  // Respuestas del estudiante por actividad: { [activityId]: selectedAnswer }
  const [userAnswers, setUserAnswers] = useState<Record<string, number | string>>({});

  // Estados de progreso de cada lección
  const [lessonStatuses, setLessonStatuses] = useState<Record<string, EnglishLessonStatus>>({
    "a1-m1-l1-alfabeto": "completada",
    "a1-m1-l2-saludos-despedidas": "completada",
    "a1-m1-l3-presentarse": "en-curso",
  });

  const currentModule = implementedModulesMap[selectedModuleId];

  // Lista plana de lecciones del módulo activo (para el paginador)
  const moduleLessons = currentModule
    ? currentModule.topics.flatMap((topic) => topic.lessons)
    : [];
  const activeLessonIndex = activeLesson
    ? moduleLessons.findIndex((l) => l.id === activeLesson.id)
    : -1;
  const completedLessonsCount = moduleLessons.filter(
    (l) => (lessonStatuses[l.id] || l.status) === "completada",
  ).length;
  const moduleProgressPercent = moduleLessons.length
    ? Math.round((completedLessonsCount / moduleLessons.length) * 100)
    : 0;

  const handleSelectAnswer = (activityId: string, answer: number | string) => {
    setUserAnswers((prev) => ({ ...prev, [activityId]: answer }));
  };

  const handleUpdateStatus = (lessonId: string, newStatus: EnglishLessonStatus) => {
    setLessonStatuses((prev) => ({ ...prev, [lessonId]: newStatus }));
  };

  return (
    <div className="flex flex-col gap-6 rounded-2xl bg-surface-container-low p-6 border border-outline-variant/10 shadow-md">
      {/* ---------- CABECERA DEL PROGRAMA PEDAGÓGICO ---------- */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-surface-container-high pb-5">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[32px] text-secondary">
              school
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-on-surface">
              Programa de Inglés Básico (A1)
            </h2>
            <span className="rounded-full bg-secondary/15 px-3 py-1 font-mono text-xs font-bold text-secondary">
              MCER Estructurado
            </span>
          </div>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl">
            Secuencia didáctica progresiva: desde el alfabeto y el verbo To Be hasta los sustantivos y su plural. Más módulos se irán añadiendo conforme avances.
          </p>
        </div>

        <span className="rounded-full bg-surface-container px-4 py-2 font-mono text-xs font-bold text-on-surface-variant border border-outline-variant/10">
          Nivel A1 · Módulos 1-3 disponibles
        </span>
      </div>

      {/* ---------- SELECTOR DE MÓDULOS DISPONIBLES ---------- */}
      <div className="flex flex-col gap-2.5">
        <span className="font-mono text-xs uppercase tracking-wider text-outline font-semibold">
          Módulos disponibles:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {[
            {
              id: "mod-01-primeros-pasos" as const,
              number: 1,
              title: "Primeros pasos y comunicación básica",
              lessons: module01PrimerosPasos.topics.reduce((acc, t) => acc + t.lessons.length, 0),
              module: module01PrimerosPasos,
            },
            {
              id: "mod-02-pronombres-to-be" as const,
              number: 2,
              title: "Pronombres y verbo to be",
              lessons: module02PronombresYToBe.topics.reduce((acc, t) => acc + t.lessons.length, 0),
              module: module02PronombresYToBe,
            },
            {
              id: "mod-03-sustantivos-plural" as const,
              number: 3,
              title: "Sustantivos y plural básico",
              lessons: module03SustantivosPlural.topics.reduce((acc, t) => acc + t.lessons.length, 0),
              module: module03SustantivosPlural,
            },
          ].map((m) => {
            const isCurrent = selectedModuleId === m.id;

            return (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setSelectedModuleId(m.id);
                  setActiveLesson(m.module.topics[0].lessons[0]);
                }}
                className={`flex flex-col gap-1.5 rounded-xl p-3.5 text-left transition-all border ${
                  isCurrent
                    ? "bg-secondary/15 border-secondary text-on-surface shadow-md"
                    : "bg-surface-container hover:bg-surface-container-high border-outline-variant/15 text-on-surface-variant cursor-pointer"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-secondary">
                    Módulo {m.number < 10 ? `0${m.number}` : m.number}
                  </span>
                  <span className="rounded px-2 py-0.5 font-mono text-[10px] uppercase font-bold bg-secondary/20 text-secondary">
                    Activo
                  </span>
                </div>

                <p className="font-mono text-xs sm:text-sm font-semibold line-clamp-1">{m.title}</p>
                <span className="text-xs text-outline">{m.lessons} lecciones</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------- ÁREA DE ESTUDIO DEL MÓDULO ACTIVO ---------- */}
      {currentModule ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start pt-2">
          {/* ========================================================================= */}
          {/* COLUMNA IZQUIERDA: CONTENIDO COMPLETO DE LA LECCIÓN (8 COLS)              */}
          {/* ========================================================================= */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            {activeLesson ? (
              <article className="flex flex-col gap-6 rounded-2xl bg-surface-container p-6 sm:p-7 shadow-sm border border-outline-variant/15">
                {/* 1. Encabezado de la Lección y Estado */}
                <div className="flex flex-wrap items-start justify-between gap-4 border-b border-surface-container-high pb-5">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-secondary/15 px-2.5 py-0.5 font-mono text-xs font-bold text-secondary">
                        Nivel {activeLesson.level} · Lección #{activeLesson.order}
                      </span>
                      <span className="font-mono text-xs text-outline">
                        ⏱️ ~{activeLesson.durationMinutes} min de práctica
                      </span>
                    </div>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-on-surface">
                      {activeLesson.title}
                    </h3>
                  </div>

                  {/* Selector de estado de aprendizaje */}
                  <div className="flex items-center gap-1.5 bg-surface-container-low p-1.5 rounded-xl border border-outline-variant/10">
                    {(["no-iniciada", "en-curso", "completada", "necesita-repaso"] as EnglishLessonStatus[]).map(
                      (st) => {
                        const cur = lessonStatuses[activeLesson.id] || activeLesson.status;
                        const isCur = cur === st;
                        return (
                          <button
                            key={st}
                            type="button"
                            onClick={() => handleUpdateStatus(activeLesson.id, st)}
                            className={`rounded-lg px-3 py-1 font-mono text-xs font-bold uppercase transition-all ${
                              isCur
                                ? st === "completada"
                                  ? "bg-secondary text-on-secondary shadow-sm"
                                  : st === "en-curso"
                                  ? "bg-amber-500 text-black shadow-sm"
                                  : st === "necesita-repaso"
                                  ? "bg-primary text-on-primary shadow-sm"
                                  : "bg-outline text-white"
                                : "text-outline hover:text-on-surface"
                            }`}
                          >
                            {st}
                          </button>
                        );
                      },
                    )}
                  </div>
                </div>

                {/* 2. Objetivo de Aprendizaje */}
                <div className="flex items-start gap-3.5 rounded-xl bg-secondary/10 border border-secondary/20 p-4 sm:p-5">
                  <span className="material-symbols-outlined text-secondary text-2xl shrink-0 mt-0.5">
                    flag
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="font-mono text-xs uppercase tracking-wider text-secondary font-bold">
                      Objetivo de la Lección
                    </span>
                    <p className="text-sm sm:text-base text-on-surface leading-relaxed">
                      {activeLesson.learningObjective}
                    </p>
                  </div>
                </div>

                {/* 3. Explicación Clara en Español */}
                <div className="flex flex-col gap-2">
                  <h4 className="font-display text-base sm:text-lg font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-xl">
                      menu_book
                    </span>
                    Explicación Pedagógica
                  </h4>
                  <div className="flex flex-col gap-3">
                    {activeLesson.explanation.split(/\n\n+/).map((paragraph, idx) => (
                      <p
                        key={idx}
                        className="text-base sm:text-lg text-on-surface-variant leading-relaxed"
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </div>

                {/* 4. Reglas, Fórmulas y Patrones */}
                {activeLesson.rulesAndFormulas.length > 0 && (
                  <div className="flex flex-col gap-2.5 rounded-xl bg-surface-container-high/60 p-5 border border-outline-variant/10">
                    <span className="font-mono text-xs uppercase tracking-wider text-outline font-bold">
                      Fórmulas y Reglas Gramaticales:
                    </span>
                    <ul className="flex flex-col gap-2 pl-2">
                      {activeLesson.rulesAndFormulas.map((rule, idx) => (
                        <li key={idx} className="text-sm sm:text-base font-mono text-on-surface flex items-start gap-2.5 leading-snug">
                          <span className="text-secondary font-bold text-base">➔</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* 4b. Tablas de referencia (renderizadas como tabla real) */}
                {activeLesson.tables && activeLesson.tables.length > 0 && (
                  <div className="flex flex-col gap-4">
                    {activeLesson.tables.map((table, tIdx) => (
                      <div
                        key={tIdx}
                        className="flex flex-col gap-2.5 rounded-xl bg-surface-container-high/60 p-5 border border-outline-variant/10"
                      >
                        <span className="font-mono text-xs uppercase tracking-wider text-outline font-bold">
                          {table.title}
                        </span>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left font-mono text-sm sm:text-base">
                            <thead>
                              <tr className="border-b border-outline-variant/25">
                                {table.headers.map((h, hIdx) => (
                                  <th
                                    key={hIdx}
                                    className="py-2 pr-4 font-bold text-secondary whitespace-nowrap"
                                  >
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {table.rows.map((row, rIdx) => (
                                <tr
                                  key={rIdx}
                                  className="border-b border-outline-variant/10 last:border-0"
                                >
                                  {row.map((cell, cIdx) => (
                                    <td key={cIdx} className="py-2 pr-4 text-on-surface align-top">
                                      {cell}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 5. Ejemplos Prácticos en Contexto */}
                <div className="flex flex-col gap-3">
                  <h4 className="font-display text-base sm:text-lg font-bold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary text-xl">
                      forum
                    </span>
                    Ejemplos en Inglés con Traducción
                  </h4>

                  <div className="grid grid-cols-1 gap-2.5">
                    {activeLesson.examples.map((ex, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col gap-1.5 rounded-xl bg-surface-container-low p-4 border border-outline-variant/10"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-base sm:text-lg font-bold text-primary">
                            &quot;{ex.english}&quot;
                          </span>
                          {ex.context && (
                            <span className="font-mono text-xs text-outline">
                              Contexto: {ex.context}
                            </span>
                          )}
                        </div>
                        <span className="text-sm sm:text-base text-on-surface-variant italic">
                          Traducción: {ex.spanish}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 6. Errores Frecuentes y Cómo Evitarlos */}
                {activeLesson.frequentMistakes.length > 0 && (
                  <div className="flex flex-col gap-3 rounded-xl bg-error/10 border border-error/20 p-5">
                    <span className="font-mono text-xs uppercase tracking-wider text-error font-bold flex items-center gap-2">
                      <span className="material-symbols-outlined text-base">warning</span>
                      Errores Frecuentes de Hispanohablantes:
                    </span>

                    <div className="flex flex-col gap-2.5">
                      {activeLesson.frequentMistakes.map((mis, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col gap-1.5 rounded-lg bg-surface-container/60 p-3 text-sm sm:text-base"
                        >
                          <p className="text-on-surface font-semibold">❌ {mis.mistake}</p>
                          <p className="text-on-surface-variant text-sm">
                            💡 <span className="font-bold">Por qué pasa:</span> {mis.whyItHappens}
                          </p>
                          <p className="text-secondary font-mono text-sm sm:text-base">
                            ✅ Corrección: {mis.correction}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 7. Vocabulario Clave */}
                {activeLesson.relevantVocabulary.length > 0 && (
                  <div className="flex flex-col gap-2.5 rounded-xl bg-surface-container-high/40 p-5">
                    <span className="font-mono text-xs uppercase tracking-wider text-outline font-bold">
                      Vocabulario y Expresiones Clave:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                      {activeLesson.relevantVocabulary.map((v, idx) => (
                        <div
                          key={idx}
                          className="flex flex-col gap-1 rounded-lg bg-surface-container p-3 text-sm sm:text-base border border-outline-variant/10"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-primary text-base sm:text-lg">
                              {v.wordOrPhrase}
                            </span>
                            <span className="font-mono text-[10px] uppercase text-outline">
                              {v.partOfSpeech}
                            </span>
                          </div>
                          <span className="text-sm text-on-surface-variant font-medium">{v.translation}</span>
                          <span className="text-sm text-outline italic">{v.example}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}



                {/* 9. Actividad de Aplicación y Resumen */}
                <div className="flex flex-col gap-2 rounded-xl bg-surface-container-low p-4 sm:p-5 border border-outline-variant/15">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
                    🎯 Tarea de Aplicación Práctica:
                  </span>
                  <p className="text-sm sm:text-base text-on-surface">{activeLesson.applicationTask}</p>
                </div>

                <div className="rounded-xl bg-surface-container-high/40 p-4 text-sm sm:text-base text-on-surface-variant italic">
                  <span className="font-bold font-mono text-secondary not-italic">
                    📌 Resumen:{" "}
                  </span>
                  {activeLesson.summary}
                </div>

                {/* 10. Paginador de progreso: navega entre lecciones y muestra el avance del módulo */}
                <div className="flex flex-col gap-3 rounded-xl bg-surface-container-low p-4 sm:p-5 border border-outline-variant/15">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="font-mono text-xs uppercase tracking-wider text-outline font-bold">
                      Tu progreso en el módulo:
                    </span>
                    <span className="font-mono text-xs font-bold text-secondary">
                      Lección {activeLessonIndex + 1} de {moduleLessons.length} · {completedLessonsCount} completadas · {moduleProgressPercent}%
                    </span>
                  </div>

                  {/* Barra de progreso que se va llenando al marcar lecciones como completadas */}
                  <div
                    className="h-2.5 w-full overflow-hidden rounded-full bg-surface-container-highest"
                    role="progressbar"
                    aria-valuenow={moduleProgressPercent}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  >
                    <div
                      className="h-full rounded-full bg-secondary transition-all duration-500"
                      style={{ width: `${moduleProgressPercent}%` }}
                    />
                  </div>

                  {/* Botones anterior / siguiente lección */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                    <button
                      type="button"
                      disabled={activeLessonIndex <= 0}
                      onClick={() => setActiveLesson(moduleLessons[activeLessonIndex - 1])}
                      className="flex items-center gap-1.5 rounded-xl border border-surface-container-high bg-surface-container px-4 py-2 font-mono text-xs font-medium text-on-surface transition-colors hover:bg-surface-container-high disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                      <span>Lección anterior</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      {moduleLessons.map((lesson, idx) => {
                        const status = lessonStatuses[lesson.id] || lesson.status;
                        const isCurrent = idx === activeLessonIndex;
                        return (
                          <button
                            key={lesson.id}
                            type="button"
                            title={lesson.title}
                            onClick={() => setActiveLesson(lesson)}
                            className={`h-2.5 rounded-full transition-all ${
                              isCurrent
                                ? "w-6 bg-secondary"
                                : status === "completada"
                                ? "w-2.5 bg-secondary/60 hover:bg-secondary"
                                : "w-2.5 bg-surface-container-highest hover:bg-outline"
                            }`}
                          />
                        );
                      })}
                    </div>

                    <button
                      type="button"
                      disabled={activeLessonIndex < 0 || activeLessonIndex >= moduleLessons.length - 1}
                      onClick={() => setActiveLesson(moduleLessons[activeLessonIndex + 1])}
                      className="flex items-center gap-1.5 rounded-xl bg-secondary px-4 py-2 font-mono text-xs font-bold text-on-secondary shadow-md transition-colors hover:bg-secondary/90 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      <span>Siguiente lección</span>
                      <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                    </button>
                  </div>
                </div>
              </article>
            ) : (
              <div className="flex items-center justify-center p-12 text-sm text-on-surface-variant">
                Selecciona una lección para comenzar
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* COLUMNA DERECHA: LECCIONES DEL MÓDULO (4 COLS) — TEXTO MÁS GRANDE Y CLARO */}
          {/* ========================================================================= */}
          <div className="lg:col-span-4 order-1 lg:order-2 flex flex-col gap-3.5 sticky top-4">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
              <span className="font-display text-sm sm:text-base font-bold text-on-surface">
                Lecciones del Módulo:
              </span>
              <span className="rounded bg-secondary/15 px-2.5 py-1 font-mono text-xs text-secondary font-bold">
                {currentModule.badge}
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {currentModule.topics.map((topic) => (
                <div key={topic.id} className="flex flex-col gap-2">
                  <span className="text-xs sm:text-sm font-display font-bold text-secondary flex items-center gap-1.5 pl-1">
                    <span className="material-symbols-outlined text-base">auto_stories</span>
                    {topic.title}
                  </span>

                  <div className="flex flex-col gap-2">
                    {topic.lessons.map((lesson) => {
                      const isSelected = activeLesson?.id === lesson.id;
                      const status = lessonStatuses[lesson.id] || lesson.status;

                      let statusBadge = "bg-surface-container-highest text-outline";
                      if (status === "completada") statusBadge = "bg-secondary text-on-secondary font-bold";
                      else if (status === "en-curso") statusBadge = "bg-amber-400 text-black font-bold";
                      else if (status === "necesita-repaso") statusBadge = "bg-primary text-on-primary font-bold";

                      return (
                        <button
                          key={lesson.id}
                          type="button"
                          onClick={() => setActiveLesson(lesson)}
                          className={`flex flex-col gap-2 rounded-xl p-3.5 sm:p-4 text-left transition-all border ${
                            isSelected
                              ? "bg-secondary/20 border-secondary text-on-surface shadow-md ring-2 ring-secondary/40"
                              : "bg-surface-container hover:bg-surface-container-high border-outline-variant/10 text-on-surface-variant hover:text-on-surface"
                          }`}
                        >
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-mono text-xs sm:text-sm font-bold text-secondary">
                              0{lesson.order}.
                            </span>
                            <span
                              className={`rounded-md px-2 py-0.5 font-mono text-[10px] sm:text-xs uppercase shadow-sm ${statusBadge}`}
                            >
                              {status}
                            </span>
                          </div>

                          <span className="text-sm sm:text-base font-semibold leading-snug">
                            {lesson.title}
                          </span>

                          <span className="text-xs text-outline font-mono">
                            ⏱️ ~{lesson.durationMinutes} minutos
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl bg-surface-container p-8 text-center text-sm text-on-surface-variant">
          Selecciona un módulo activo para ver su contenido.
        </div>
      )}
    </div>
  );
}
