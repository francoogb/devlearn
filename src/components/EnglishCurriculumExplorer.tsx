"use client";

// Componente interactivo: Programa de Inglés Básico Estructurado (A1 - A2)
// Disposición:
// - Izquierda (lg:col-span-8): Visor amplio de la Lección seleccionada.
// - Derecha (lg:col-span-4): Lista de Lecciones del Módulo con tipografía grande, badges y estados claros.

import { useState } from "react";
import {
  module01PrimerosPasos,
  module02PronombresYToBe,
  allCurriculumModulesOverview,
} from "@/data/englishCurriculumData";
import {
  EnglishLesson,
  EnglishLessonStatus,
  EnglishModule,
  CefrLevel,
} from "@/types/englishCurriculum";

const implementedModulesMap: Record<string, EnglishModule> = {
  "mod-01-primeros-pasos": module01PrimerosPasos,
  "mod-02-pronombres-to-be": module02PronombresYToBe,
};

export default function EnglishCurriculumExplorer() {
  const [selectedLevel, setSelectedLevel] = useState<CefrLevel>("A1");
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
              Programa de Inglés Básico (A1 – A2)
            </h2>
            <span className="rounded-full bg-secondary/15 px-3 py-1 font-mono text-xs font-bold text-secondary">
              MCER Estructurado
            </span>
          </div>
          <p className="text-sm sm:text-base text-on-surface-variant max-w-2xl">
            Secuencia didáctica progresiva de 20 módulos: desde el alfabeto y el verbo To Be hasta pasado simple, comparativos y presente perfecto.
          </p>
        </div>

        {/* Selector de Nivel A1 / A2 */}
        <div className="flex items-center gap-2 bg-surface-container p-1 rounded-xl border border-outline-variant/10">
          <button
            type="button"
            onClick={() => setSelectedLevel("A1")}
            className={`rounded-lg px-4 py-2 font-mono text-xs sm:text-sm font-bold transition-all ${
              selectedLevel === "A1"
                ? "bg-secondary text-on-secondary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Nivel A1 (Módulos 1-12)
          </button>
          <button
            type="button"
            onClick={() => setSelectedLevel("A2")}
            className={`rounded-lg px-4 py-2 font-mono text-xs sm:text-sm font-bold transition-all ${
              selectedLevel === "A2"
                ? "bg-primary text-on-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Nivel A2 (Módulos 13-20)
          </button>
        </div>
      </div>

      {/* ---------- SELECTOR DE MÓDULOS DEL NIVEL ---------- */}
      <div className="flex flex-col gap-2.5">
        <span className="font-mono text-xs uppercase tracking-wider text-outline font-semibold">
          Catálogo secuencial del nivel {selectedLevel}:
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {allCurriculumModulesOverview
            .filter((m) => m.level === selectedLevel)
            .map((m) => {
              const isMod1 = m.number === 1;
              const isMod2 = m.number === 2;
              const isCurrent =
                (isMod1 && selectedModuleId === "mod-01-primeros-pasos") ||
                (isMod2 && selectedModuleId === "mod-02-pronombres-to-be");
              const isImplemented = m.implemented;

              return (
                <button
                  key={m.number}
                  type="button"
                  onClick={() => {
                    if (isMod1) {
                      setSelectedModuleId("mod-01-primeros-pasos");
                      setActiveLesson(module01PrimerosPasos.topics[0].lessons[0]);
                    } else if (isMod2) {
                      setSelectedModuleId("mod-02-pronombres-to-be");
                      setActiveLesson(module02PronombresYToBe.topics[0].lessons[0]);
                    }
                  }}
                  disabled={!isImplemented}
                  className={`flex flex-col gap-1.5 rounded-xl p-3.5 text-left transition-all border ${
                    isCurrent
                      ? "bg-secondary/15 border-secondary text-on-surface shadow-md"
                      : isImplemented
                      ? "bg-surface-container hover:bg-surface-container-high border-outline-variant/15 text-on-surface-variant cursor-pointer"
                      : "bg-surface-container/40 border-outline-variant/5 text-outline opacity-60 cursor-not-allowed"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-secondary">
                      Módulo {m.number < 10 ? `0${m.number}` : m.number}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 font-mono text-[10px] uppercase font-bold ${
                        isImplemented
                          ? "bg-secondary/20 text-secondary"
                          : "bg-surface-container-highest text-outline"
                      }`}
                    >
                      {isImplemented ? "Activo" : "Planificado"}
                    </span>
                  </div>

                  <p className="font-mono text-xs sm:text-sm font-semibold line-clamp-1">{m.title}</p>
                  <span className="text-xs text-outline">{m.lessonsCount} lecciones</span>
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
                  <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
                    {activeLesson.explanation}
                  </p>
                </div>

                {/* 4. Reglas, Fórmulas y Patrones */}
                {activeLesson.rulesAndFormulas.length > 0 && (
                  <div className="flex flex-col gap-2.5 rounded-xl bg-surface-container-high/60 p-5 border border-outline-variant/10">
                    <span className="font-mono text-xs uppercase tracking-wider text-outline font-bold">
                      Fórmulas y Reglas Gramaticales:
                    </span>
                    <ul className="flex flex-col gap-2 pl-2">
                      {activeLesson.rulesAndFormulas.map((rule, idx) => (
                        <li key={idx} className="text-sm font-mono text-on-surface flex items-start gap-2.5 leading-snug">
                          <span className="text-secondary font-bold text-base">➔</span>
                          <span>{rule}</span>
                        </li>
                      ))}
                    </ul>
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
                          <span className="font-mono text-sm sm:text-base font-bold text-primary">
                            &quot;{ex.english}&quot;
                          </span>
                          {ex.context && (
                            <span className="font-mono text-xs text-outline">
                              Contexto: {ex.context}
                            </span>
                          )}
                        </div>
                        <span className="text-xs sm:text-sm text-on-surface-variant italic">
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
                          className="flex flex-col gap-1.5 rounded-lg bg-surface-container/60 p-3 text-xs sm:text-sm"
                        >
                          <p className="text-on-surface font-semibold">❌ {mis.mistake}</p>
                          <p className="text-on-surface-variant text-xs">
                            💡 <span className="font-bold">Por qué pasa:</span> {mis.whyItHappens}
                          </p>
                          <p className="text-secondary font-mono text-xs sm:text-sm">
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
                          className="flex flex-col gap-1 rounded-lg bg-surface-container p-3 text-xs sm:text-sm border border-outline-variant/10"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono font-bold text-primary text-sm sm:text-base">
                              {v.wordOrPhrase}
                            </span>
                            <span className="font-mono text-[10px] uppercase text-outline">
                              {v.partOfSpeech}
                            </span>
                          </div>
                          <span className="text-xs text-on-surface-variant font-medium">{v.translation}</span>
                          <span className="text-xs text-outline italic">{v.example}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 8. Ejercicios de Práctica con Soluciones Explicadas */}
                <div className="flex flex-col gap-3.5 rounded-xl border border-secondary/20 bg-secondary/5 p-5">
                  <span className="font-mono text-xs uppercase tracking-wider text-secondary font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined text-base">quiz</span>
                    Ejercicios de Práctica y Verificación
                  </span>

                  <div className="flex flex-col gap-3">
                    {activeLesson.activities.map((act) => {
                      const currentAns = userAnswers[act.id];
                      const hasAnswered = currentAns !== undefined;
                      const isCorrect = currentAns === act.correctAnswer;

                      return (
                        <div
                          key={act.id}
                          className="flex flex-col gap-2.5 rounded-xl bg-surface-container p-4 border border-outline-variant/15"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-xs sm:text-sm font-semibold text-on-surface">
                              {act.prompt}
                            </span>
                            <span className="rounded px-2 py-0.5 font-mono text-[10px] uppercase bg-surface-container-high text-outline font-bold">
                              {act.type} · {act.difficulty}
                            </span>
                          </div>

                          {act.options && (
                            <div className="flex flex-col gap-2 pt-1">
                              {act.options.map((opt, optIdx) => {
                                const isOptSelected = currentAns === optIdx;
                                const isOptCorrect = optIdx === act.correctAnswer;

                                let optStyle =
                                  "bg-surface-container-high hover:bg-surface-container-highest text-on-surface";
                                if (hasAnswered) {
                                  if (isOptCorrect) {
                                    optStyle =
                                      "bg-secondary/20 border border-secondary text-secondary font-bold";
                                  } else if (isOptSelected) {
                                    optStyle = "bg-error/20 border border-error text-error";
                                  } else {
                                    optStyle = "opacity-50";
                                  }
                                }

                                return (
                                  <button
                                    key={optIdx}
                                    type="button"
                                    onClick={() => handleSelectAnswer(act.id, optIdx)}
                                    className={`flex items-center gap-2.5 rounded-lg p-2.5 text-left font-mono text-xs sm:text-sm transition-all ${optStyle}`}
                                  >
                                    <span className="font-bold">
                                      {String.fromCharCode(65 + optIdx)})
                                    </span>
                                    <span>{opt}</span>
                                  </button>
                                );
                              })}
                            </div>
                          )}

                          {hasAnswered && (
                            <div className="mt-1.5 rounded-lg bg-surface-container-high p-3 text-xs sm:text-sm text-on-surface border border-outline-variant/15">
                              <span className="font-bold text-secondary">Explicación: </span>
                              {act.explanation}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* 9. Actividad de Aplicación y Resumen */}
                <div className="flex flex-col gap-2 rounded-xl bg-surface-container-low p-4 sm:p-5 border border-outline-variant/15">
                  <span className="font-mono text-xs uppercase tracking-wider text-primary font-bold">
                    🎯 Tarea de Aplicación Práctica:
                  </span>
                  <p className="text-xs sm:text-sm text-on-surface">{activeLesson.applicationTask}</p>
                </div>

                <div className="rounded-xl bg-surface-container-high/40 p-4 text-xs sm:text-sm text-on-surface-variant italic">
                  <span className="font-bold font-mono text-secondary not-italic">
                    📌 Resumen:{" "}
                  </span>
                  {activeLesson.summary}
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
