"use client";

// Biblioteca de Conocimiento Personal — DevLearn Knowledge Hub
// Permite explorar Áreas → Módulos → Temas → Lecciones interactivas.
// Incluye buscador global en tiempo real, filtros por estado, vista completa
// de los 10 componentes pedagógicos de cada lección y registro de sesiones/errores.

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  knowledgeAreas,
  knowledgeModules,
  initialStudySessions,
  initialLoggedMistakes,
} from "@/data/knowledgeRepository";
import {
  KnowledgeAreaId,
  Lesson,
  LessonStatus,
  Module,
  StudySession,
  LoggedMistake,
} from "@/types/knowledge";

export default function BibliotecaPage() {
  // Filtros principales
  const [selectedAreaId, setSelectedAreaId] = useState<KnowledgeAreaId | "todas">("todas");
  const [selectedModuleId, setSelectedModuleId] = useState<string | null>(null);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<LessonStatus | "todos">("todos");
  const [searchQuery, setSearchQuery] = useState("");

  // Lección actualmente abierta para estudio detallado
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  // Estados interactivos para lecciones y quizzes
  const [lessonProgress, setLessonProgress] = useState<Record<string, LessonStatus>>({
    "verbo-to-be-presente": "aprendida",
    "controladores-y-servicios": "aprendida",
    "server-client-paradigma": "aprendida",
    "presente-simple": "en-curso",
    "prisma-schema-migraciones": "en-curso",
    "introduccion-big-o": "pendiente-repaso",
  });

  const [personalNotes, setPersonalNotes] = useState<Record<string, string>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<string, Record<string, string | number>>>({});

  // Pestaña superior: "Biblioteca" o "Sesiones & Errores"
  const [viewTab, setViewTab] = useState<"biblioteca" | "sesiones" | "errores">("biblioteca");

  // Historial de sesiones y errores
  const [sessions, setSessions] = useState<StudySession[]>(initialStudySessions);
  const [mistakes, setMistakes] = useState<LoggedMistake[]>(initialLoggedMistakes);

  // Recuento de métricas reales
  const allLessons = useMemo(() => {
    const list: { lesson: Lesson; module: Module; areaId: KnowledgeAreaId }[] = [];
    knowledgeModules.forEach((mod) => {
      mod.topics.forEach((top) => {
        top.lessons.forEach((les) => {
          list.push({ lesson: les, module: mod, areaId: mod.areaId });
        });
      });
    });
    return list;
  }, []);

  const stats = useMemo(() => {
    let aprendidas = 0;
    let enCurso = 0;
    let pendientesRepaso = 0;
    let pendientes = 0;

    allLessons.forEach(({ lesson }) => {
      const status = lessonProgress[lesson.id] || lesson.status;
      if (status === "aprendida") aprendidas++;
      else if (status === "en-curso") enCurso++;
      else if (status === "pendiente-repaso") pendientesRepaso++;
      else pendientes++;
    });

    return {
      total: allLessons.length,
      aprendidas,
      enCurso,
      pendientesRepaso,
      pendientes,
    };
  }, [allLessons, lessonProgress]);

  // Filtrado de módulos según área y búsqueda
  const filteredModules = useMemo(() => {
    return knowledgeModules.filter((mod) => {
      const matchArea = selectedAreaId === "todas" || mod.areaId === selectedAreaId;
      if (!matchArea) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();

      const matchModTitle = mod.title.toLowerCase().includes(q);
      const matchModDesc = mod.description.toLowerCase().includes(q);
      const matchInLessons = mod.topics.some((top) =>
        top.lessons.some(
          (les) =>
            les.title.toLowerCase().includes(q) ||
            les.learningObjective.toLowerCase().includes(q) ||
            les.keyConcepts.some((k) => k.toLowerCase().includes(q)),
        ),
      );

      return matchModTitle || matchModDesc || matchInLessons;
    });
  }, [selectedAreaId, searchQuery]);

  // Cambiar estado de una lección
  const handleUpdateStatus = (lessonId: string, newStatus: LessonStatus) => {
    setLessonProgress((prev) => ({ ...prev, [lessonId]: newStatus }));
  };

  // Responder actividad
  const handleAnswerActivity = (lessonId: string, actId: string, answer: string | number) => {
    setQuizAnswers((prev) => ({
      ...prev,
      [lessonId]: {
        ...(prev[lessonId] || {}),
        [actId]: answer,
      },
    }));
  };

  return (
    <div className="flex flex-col gap-6">
      {/* ---------- HEADER DE LA BIBLIOTECA ---------- */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-surface-container-low p-6 shadow-md border border-outline-variant/10">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[30px] text-primary">
              local_library
            </span>
            <h1 className="font-display text-2xl font-bold text-on-surface">
              Biblioteca Personal de Aprendizaje
            </h1>
            <span className="rounded-full bg-primary/20 px-3 py-0.5 font-mono text-xs font-bold text-primary">
              Knowledge Hub
            </span>
          </div>
          <p className="text-sm text-on-surface-variant max-w-2xl">
            Centro unificado de conocimientos organizado jerárquicamente:{" "}
            <span className="font-semibold text-on-surface">Área → Módulo → Tema → Lección</span>. Diseñado para estudiar progresivamente y repasar sin olvidar.
          </p>
        </div>

        {/* Métricas reales de estudio */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 rounded-xl bg-surface-container px-3.5 py-2 border border-outline-variant/10">
            <span className="material-symbols-outlined text-secondary text-sm">check_circle</span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono text-outline">Aprendidas</span>
              <span className="text-xs font-mono font-bold text-on-surface">
                {stats.aprendidas} / {stats.total}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-surface-container px-3.5 py-2 border border-outline-variant/10">
            <span className="material-symbols-outlined text-amber-400 text-sm">sync</span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono text-outline">En Curso</span>
              <span className="text-xs font-mono font-bold text-on-surface">
                {stats.enCurso}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl bg-surface-container px-3.5 py-2 border border-outline-variant/10">
            <span className="material-symbols-outlined text-primary text-sm">alarm</span>
            <div className="flex flex-col">
              <span className="text-[10px] uppercase font-mono text-outline">Por Repasar</span>
              <span className="text-xs font-mono font-bold text-primary">
                {stats.pendientesRepaso}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ---------- TABS DE VISTA PRINCIPAL ---------- */}
      <div className="flex items-center gap-2 border-b border-surface-container-high pb-2">
        <button
          type="button"
          onClick={() => setViewTab("biblioteca")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-colors ${
            viewTab === "biblioteca"
              ? "bg-primary text-on-primary shadow-sm"
              : "bg-surface-container text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">menu_book</span>
          Áreas & Lecciones
        </button>

        <button
          type="button"
          onClick={() => setViewTab("sesiones")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-colors ${
            viewTab === "sesiones"
              ? "bg-primary text-on-primary shadow-sm"
              : "bg-surface-container text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">history_edu</span>
          Sesiones de Estudio ({sessions.length})
        </button>

        <button
          type="button"
          onClick={() => setViewTab("errores")}
          className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-colors ${
            viewTab === "errores"
              ? "bg-primary text-on-primary shadow-sm"
              : "bg-surface-container text-on-surface-variant hover:text-on-surface"
          }`}
        >
          <span className="material-symbols-outlined text-[18px]">report_problem</span>
          Bitácora de Errores ({mistakes.length})
        </button>
      </div>

      {/* ============================================================== */}
      {/* VISTA 1: ÁREAS, MÓDULOS Y LECCIONES                           */}
      {/* ============================================================== */}
      {viewTab === "biblioteca" && (
        <div className="flex flex-col gap-6">
          {/* BARRA DE FILTROS Y BÚSQUEDA */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 rounded-xl bg-surface-container-low p-4 border border-outline-variant/10">
            {/* Buscador global */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-outline text-[20px]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por concepto, regla, lección o palabra clave..."
                className="w-full rounded-xl bg-surface-container pl-10 pr-4 py-2 text-xs font-mono text-on-surface placeholder:text-outline focus:outline-none focus:ring-2 focus:ring-primary/40 border border-transparent"
              />
            </div>

            {/* Selector de estado */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-outline uppercase">Estado:</span>
              <select
                value={selectedStatusFilter}
                onChange={(e) => setSelectedStatusFilter(e.target.value as any)}
                className="rounded-xl bg-surface-container px-3 py-2 text-xs font-mono text-on-surface focus:outline-none border border-outline-variant/15"
              >
                <option value="todos">Todos los estados</option>
                <option value="aprendida">Aprendidas</option>
                <option value="en-curso">En Curso</option>
                <option value="pendiente-repaso">Pendiente de Repaso</option>
                <option value="pendiente">Pendientes</option>
              </select>
            </div>
          </div>

          {/* FILTRO DE ÁREAS (BOTONES ESTILO PILL) */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedAreaId("todas")}
              className={`flex items-center gap-2 rounded-xl px-3.5 py-2 font-mono text-xs transition-all ${
                selectedAreaId === "todas"
                  ? "bg-on-surface text-surface font-bold shadow-sm"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              }`}
            >
              <span className="material-symbols-outlined text-[17px]">apps</span>
              Todas las Áreas
            </button>

            {knowledgeAreas.map((area) => {
              const isSelected = selectedAreaId === area.id;
              return (
                <button
                  key={area.id}
                  type="button"
                  onClick={() => setSelectedAreaId(area.id)}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 font-mono text-xs transition-all ${
                    isSelected
                      ? "bg-primary text-on-primary font-bold shadow-sm"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  <span className="material-symbols-outlined text-[17px]">{area.icon}</span>
                  {area.name}
                </button>
              );
            })}
          </div>

          {/* CUADRÍCULA DE MÓDULOS Y LECCIONES */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* COLUMNA IZQUIERDA: MÓDULOS Y TEMAS (5 COLS) */}
            <div className="lg:col-span-5 flex flex-col gap-4">
              <h2 className="font-mono text-xs uppercase tracking-wider text-outline font-semibold">
                Módulos disponibles ({filteredModules.length}):
              </h2>

              {filteredModules.length === 0 ? (
                <div className="rounded-xl bg-surface-container p-6 text-center text-xs text-on-surface-variant">
                  No se encontraron módulos con los filtros aplicados.
                </div>
              ) : (
                filteredModules.map((module) => (
                  <div
                    key={module.id}
                    className="flex flex-col rounded-2xl bg-surface-container-low p-4 border border-outline-variant/10 shadow-sm"
                  >
                    {/* Header del Módulo */}
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2.5">
                        <span className="material-symbols-outlined text-primary text-2xl">
                          {module.icon}
                        </span>
                        <div>
                          <h3 className="font-display text-sm font-bold text-on-surface">
                            {module.title}
                          </h3>
                          <span className="text-[11px] text-on-surface-variant line-clamp-1">
                            {module.description}
                          </span>
                        </div>
                      </div>
                      {module.badge && (
                        <span className="rounded-md bg-secondary/15 px-2 py-0.5 font-mono text-[10px] font-bold text-secondary shrink-0">
                          {module.badge}
                        </span>
                      )}
                    </div>

                    {/* Temas del Módulo */}
                    <div className="flex flex-col gap-2 pt-2 border-t border-surface-container-high/60">
                      {module.topics.map((topic) => (
                        <div key={topic.id} className="flex flex-col gap-1.5 pl-2">
                          <span className="text-[11px] font-mono font-bold text-outline">
                            📁 {topic.title}
                          </span>

                          <div className="flex flex-col gap-1 pl-2">
                            {topic.lessons.map((lesson) => {
                              const status = lessonProgress[lesson.id] || lesson.status;
                              if (
                                selectedStatusFilter !== "todos" &&
                                status !== selectedStatusFilter
                              ) {
                                return null;
                              }

                              const isSelected = activeLesson?.id === lesson.id;

                              let statusBadge = "bg-surface-container text-outline";
                              let statusIcon = "radio_button_unchecked";
                              if (status === "aprendida") {
                                statusBadge = "bg-secondary/15 text-secondary";
                                statusIcon = "check_circle";
                              } else if (status === "en-curso") {
                                statusBadge = "bg-amber-500/15 text-amber-400";
                                statusIcon = "sync";
                              } else if (status === "pendiente-repaso") {
                                statusBadge = "bg-primary/20 text-primary";
                                statusIcon = "alarm";
                              }

                              return (
                                <button
                                  key={lesson.id}
                                  type="button"
                                  onClick={() => setActiveLesson(lesson)}
                                  className={`flex items-center justify-between rounded-xl px-3 py-2 text-left transition-all ${
                                    isSelected
                                      ? "bg-primary/15 border border-primary/30 text-on-surface font-semibold"
                                      : "bg-surface-container hover:bg-surface-container-high text-on-surface-variant"
                                  }`}
                                >
                                  <div className="flex items-center gap-2 min-w-0">
                                    <span
                                      className={`material-symbols-outlined text-[16px] ${
                                        status === "aprendida"
                                          ? "text-secondary"
                                          : status === "en-curso"
                                          ? "text-amber-400"
                                          : "text-outline"
                                      }`}
                                    >
                                      {statusIcon}
                                    </span>
                                    <span className="text-xs truncate">{lesson.title}</span>
                                  </div>

                                  <div className="flex items-center gap-1.5 shrink-0 ml-2">
                                    <span className="font-mono text-[10px] text-outline">
                                      {lesson.durationMinutes} min
                                    </span>
                                    <span
                                      className={`rounded px-1.5 py-0.2 font-mono text-[9px] uppercase ${statusBadge}`}
                                    >
                                      {status}
                                    </span>
                                  </div>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* COLUMNA DERECHA: VISOR DE LECCIÓN ESTRUCTURADA (7 COLS) */}
            <div className="lg:col-span-7">
              {activeLesson ? (
                <div className="flex flex-col gap-6 rounded-2xl bg-surface-container-low p-6 shadow-md border border-outline-variant/10">
                  {/* Cabecera de la Lección */}
                  <div className="flex flex-wrap items-start justify-between gap-4 border-b border-surface-container-high pb-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-primary/20 px-2 py-0.5 font-mono text-[10px] font-bold text-primary">
                          Lección #{activeLesson.order}
                        </span>
                        <span className="font-mono text-xs text-outline">
                          ⏱️ ~{activeLesson.durationMinutes} minutos de estudio
                        </span>
                      </div>
                      <h2 className="font-display text-xl font-bold text-on-surface">
                        {activeLesson.title}
                      </h2>
                    </div>

                    {/* Selector de Estado de la Lección */}
                    <div className="flex items-center gap-1.5 bg-surface-container p-1 rounded-xl border border-outline-variant/10">
                      {(["pendiente", "en-curso", "aprendida", "pendiente-repaso"] as LessonStatus[]).map(
                        (st) => {
                          const current = lessonProgress[activeLesson.id] || activeLesson.status;
                          const isCur = current === st;
                          return (
                            <button
                              key={st}
                              type="button"
                              onClick={() => handleUpdateStatus(activeLesson.id, st)}
                              className={`rounded-lg px-2.5 py-1 font-mono text-[10px] font-bold uppercase transition-all ${
                                isCur
                                  ? st === "aprendida"
                                    ? "bg-secondary text-on-secondary"
                                    : st === "en-curso"
                                    ? "bg-amber-500 text-black"
                                    : st === "pendiente-repaso"
                                    ? "bg-primary text-on-primary"
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

                  {/* 1. OBJETIVO DE APRENDIZAJE */}
                  <div className="flex items-start gap-3 rounded-xl bg-primary/10 border border-primary/20 p-4">
                    <span className="material-symbols-outlined text-primary text-xl shrink-0 mt-0.5">
                      target
                    </span>
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-primary font-bold">
                        Objetivo de Aprendizaje
                      </span>
                      <p className="text-xs text-on-surface leading-relaxed">
                        {activeLesson.learningObjective}
                      </p>
                    </div>
                  </div>

                  {/* 2. EXPLICACIÓN TEÓRICA CLARA */}
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-sm font-bold text-on-surface flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-base">
                        menu_book
                      </span>
                      Explicación y Fundamentos
                    </h3>
                    <p className="text-xs text-on-surface-variant leading-relaxed">
                      {activeLesson.explanation}
                    </p>
                  </div>

                  {/* 3. CONCEPTOS CLAVE */}
                  {activeLesson.keyConcepts.length > 0 && (
                    <div className="flex flex-col gap-2 rounded-xl bg-surface-container p-4">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-outline font-bold">
                        Conceptos y Reglas Clave:
                      </span>
                      <ul className="flex flex-col gap-1.5 pl-2">
                        {activeLesson.keyConcepts.map((item, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-on-surface font-mono flex items-start gap-2"
                          >
                            <span className="text-secondary font-bold">✓</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 4. EJEMPLOS PRÁCTICOS */}
                  {activeLesson.practicalExamples.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h3 className="font-display text-sm font-bold text-on-surface flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary text-base">
                          terminal
                        </span>
                        Ejemplos Prácticos
                      </h3>

                      <div className="flex flex-col gap-2.5">
                        {activeLesson.practicalExamples.map((ex, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col gap-1.5 rounded-xl border border-outline-variant/15 bg-surface-container-lowest p-3.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-xs font-bold text-primary">
                                {ex.title}
                              </span>
                              {ex.language && (
                                <span className="font-mono text-[10px] text-outline">
                                  {ex.language}
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-on-surface-variant">{ex.description}</p>
                            <pre className="overflow-x-auto rounded-lg bg-surface-container-high/60 p-2.5 font-mono text-xs text-on-surface">
                              <code>{ex.codeOrText}</code>
                            </pre>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 5. ERRORES FRECUENTES Y CÓMO EVITARLOS */}
                  {activeLesson.frequentMistakes && activeLesson.frequentMistakes.length > 0 && (
                    <div className="flex flex-col gap-2.5 rounded-xl bg-error/10 border border-error/20 p-4">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-error font-bold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">warning</span>
                        Errores Frecuentes a Evitar:
                      </span>

                      <div className="flex flex-col gap-2">
                        {activeLesson.frequentMistakes.map((mis, idx) => (
                          <div
                            key={idx}
                            className="flex flex-col gap-1 rounded-lg bg-surface-container/60 p-2.5 text-xs"
                          >
                            <p className="text-on-surface font-semibold">❌ Error: {mis.mistake}</p>
                            <p className="text-on-surface-variant text-[11px]">
                              💡 <span className="font-bold">Por qué pasa:</span> {mis.howToAvoid}
                            </p>
                            <p className="text-secondary text-[11px] font-mono">
                              ✅ Corrección: {mis.correction}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* 6. ACTIVIDADES Y RETOS INTERACTIVOS */}
                  {activeLesson.activities.length > 0 && (
                    <div className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-primary font-bold flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-sm">quiz</span>
                        Actividades de Práctica y Autoevaluación
                      </span>

                      <div className="flex flex-col gap-3">
                        {activeLesson.activities.map((act) => {
                          const currentAnswer = quizAnswers[activeLesson.id]?.[act.id];
                          const hasAnswered = currentAnswer !== undefined;
                          const isCorrect = currentAnswer === act.correctAnswer;

                          return (
                            <div
                              key={act.id}
                              className="flex flex-col gap-2 rounded-xl bg-surface-container p-3 border border-outline-variant/15"
                            >
                              <div className="flex items-center justify-between">
                                <span className="font-mono text-xs font-semibold text-on-surface">
                                  {act.title}
                                </span>
                                <span className="rounded px-1.5 py-0.2 font-mono text-[9px] uppercase bg-surface-container-high text-outline">
                                  {act.type}
                                </span>
                              </div>

                              <p className="text-xs text-on-surface-variant">{act.prompt}</p>

                              {act.type === "multiple-choice" && act.options && (
                                <div className="flex flex-col gap-1.5 pt-1">
                                  {act.options.map((opt, optIdx) => {
                                    const isOptSelected = currentAnswer === optIdx;
                                    const isOptCorrect = optIdx === act.correctAnswer;

                                    let optStyle =
                                      "bg-surface-container-high hover:bg-surface-container-highest text-on-surface";
                                    if (hasAnswered) {
                                      if (isOptCorrect) {
                                        optStyle =
                                          "bg-secondary/20 border border-secondary text-secondary font-bold";
                                      } else if (isOptSelected) {
                                        optStyle =
                                          "bg-error/20 border border-error text-error";
                                      } else {
                                        optStyle = "opacity-50";
                                      }
                                    }

                                    return (
                                      <button
                                        key={optIdx}
                                        type="button"
                                        onClick={() =>
                                          handleAnswerActivity(activeLesson.id, act.id, optIdx)
                                        }
                                        className={`flex items-center gap-2 rounded-lg p-2 text-left font-mono text-xs transition-all ${optStyle}`}
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
                                <div className="mt-1 rounded-lg bg-surface-container-high p-2 text-[11px] text-on-surface border border-outline-variant/15">
                                  <span className="font-bold text-primary">Solución: </span>
                                  {act.explanation}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 7. RESUMEN SINTÉTICO */}
                  <div className="rounded-xl bg-surface-container p-3 text-xs text-on-surface-variant italic">
                    <span className="font-bold font-mono text-primary not-italic">
                      📌 Resumen:{" "}
                    </span>
                    {activeLesson.summary}
                  </div>

                  {/* 8. NOTAS PERSONALES EDITABLES */}
                  <div className="flex flex-col gap-2 rounded-xl bg-surface-container-low border border-outline-variant/20 p-3.5">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-outline font-bold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">edit_note</span>
                      Tus Notas y Apuntes Personales:
                    </span>
                    <textarea
                      value={personalNotes[activeLesson.id] ?? (activeLesson.personalNotes || "")}
                      onChange={(e) =>
                        setPersonalNotes((prev) => ({
                          ...prev,
                          [activeLesson.id]: e.target.value,
                        }))
                      }
                      placeholder="Agrega tus propias observaciones, mnemotécnicas o dudas para la próxima sesión..."
                      rows={3}
                      className="w-full rounded-lg bg-surface-container p-2.5 text-xs font-mono text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary/40 border border-outline-variant/10"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center rounded-2xl bg-surface-container-low p-12 text-center border border-dashed border-outline-variant/20">
                  <span className="material-symbols-outlined text-5xl text-outline mb-3">
                    menu_book
                  </span>
                  <h3 className="font-display text-base font-bold text-on-surface">
                    Selecciona una lección para comenzar
                  </h3>
                  <p className="text-xs text-on-surface-variant max-w-sm mt-1">
                    Elige cualquier tema de la columna izquierda para ver sus objetivos, conceptos clave, ejemplos y ejercicios de autoevaluación.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VISTA 2: REGISTRO HISTÓRICO DE SESIONES DE ESTUDIO             */}
      {/* ============================================================== */}
      {viewTab === "sesiones" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-on-surface">
              Historial de Sesiones de Estudio
            </h2>
            <span className="font-mono text-xs text-outline">
              Registro de tiempo, aciertos y temas recomendados
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sessions.map((sess) => (
              <div
                key={sess.id}
                className="flex flex-col gap-3 rounded-2xl bg-surface-container-low p-5 border border-outline-variant/10 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-outline">{sess.date}</span>
                    <h3 className="font-display text-sm font-bold text-on-surface">
                      {sess.moduleName}
                    </h3>
                  </div>
                  <span className="rounded-full bg-primary/20 px-2.5 py-0.5 font-mono text-xs font-bold text-primary">
                    ⏱️ {sess.durationMinutes} min
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="rounded bg-surface-container px-2 py-0.5 font-mono text-[10px] text-on-surface-variant">
                    {sess.areaName}
                  </span>
                  <span className="font-mono text-[11px] text-secondary font-bold">
                    🎯 {sess.correctCount} / {sess.exercisesCount} aciertos
                  </span>
                </div>

                <div className="flex flex-col gap-1 border-t border-surface-container-high/60 pt-2 text-xs">
                  <span className="font-mono text-[10px] uppercase text-outline">
                    Lecciones revisadas:
                  </span>
                  <p className="text-on-surface-variant text-[11px]">
                    {sess.lessonsReviewed.join(" • ")}
                  </p>
                </div>

                {sess.difficultiesFound && (
                  <div className="rounded-lg bg-amber-500/10 p-2 text-[11px] text-amber-300">
                    <span className="font-bold">Dificultad encontrada: </span>
                    {sess.difficultiesFound}
                  </div>
                )}

                {sess.nextRecommendedTopic && (
                  <div className="flex items-center gap-2 rounded-lg bg-surface-container p-2 text-[11px] text-on-surface">
                    <span className="material-symbols-outlined text-secondary text-sm">
                      trending_up
                    </span>
                    <span>
                      <span className="font-bold text-secondary">Próximo tema: </span>
                      {sess.nextRecommendedTopic}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================== */}
      {/* VISTA 3: BITÁCORA DE ERRORES FRECUENTES Y REFUERZO            */}
      {/* ============================================================== */}
      {viewTab === "errores" && (
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-on-surface">
              Bitácora de Errores Frecuentes
            </h2>
            <span className="font-mono text-xs text-outline">
              Identifica patrones para no repetir confusiones habituales
            </span>
          </div>

          <div className="flex flex-col gap-3">
            {mistakes.map((mis) => (
              <div
                key={mis.id}
                className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 rounded-xl bg-surface-container-low p-4 border border-outline-variant/10 shadow-sm"
              >
                <div className="flex flex-col gap-1 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-primary">
                      {mis.topicTitle}
                    </span>
                    <span className="rounded bg-surface-container px-2 py-0.2 font-mono text-[10px] text-outline">
                      {mis.conceptOrRule}
                    </span>
                    <span className="font-mono text-[10px] text-outline">{mis.date}</span>
                  </div>
                  <p className="text-xs font-medium text-error">❌ {mis.mistakeDescription}</p>
                  <p className="text-xs text-secondary font-mono">✅ {mis.howToCorrect}</p>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setMistakes((prev) =>
                      prev.map((m) => (m.id === mis.id ? { ...m, resolved: !m.resolved } : m)),
                    )
                  }
                  className={`rounded-xl px-3.5 py-1.5 font-mono text-xs font-bold transition-all shrink-0 ${
                    mis.resolved
                      ? "bg-secondary/20 text-secondary border border-secondary/30"
                      : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                  }`}
                >
                  {mis.resolved ? "Superado ✓" : "Pendiente de refuerzo"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
