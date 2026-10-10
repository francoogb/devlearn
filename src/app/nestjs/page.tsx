"use client";

// Página /nestjs — Fundamentos de NestJS explicados visualmente.
// Para Fran JR: analogías de la vida real, módulos, controladores, servicios,
// inyección de dependencias y el backend real de este proyecto (carpeta backend/).

import { useState } from "react";
import Link from "next/link";
import { nestjsConcepts } from "@/content/nestjs";

export default function NestjsPage() {
  // Estado para la pestaña/concepto seleccionado
  const [selectedConceptId, setSelectedConceptId] = useState<string>(
    nestjsConcepts[0].id,
  );

  // Estado para marcar temas como dominados / aprendidos
  const [masteredConcepts, setMasteredConcepts] = useState<Record<string, boolean>>({});

  // Estado para respuestas del ejercicio interactivo por concepto
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});

  const activeConcept =
    nestjsConcepts.find((c) => c.id === selectedConceptId) ||
    nestjsConcepts[0];

  const toggleMastered = (id: string) => {
    setMasteredConcepts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectAnswer = (conceptId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [conceptId]: optionIndex }));
  };

  const totalMastered = Object.values(masteredConcepts).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-6">
      {/* ---------- ENCABEZADO ---------- */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface-container-low px-6 py-5 shadow-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] text-primary">
              layers
            </span>
            <h1 className="font-display text-2xl font-bold text-on-surface">
              NestJS — Backend con TypeScript
            </h1>
          </div>
          <p className="text-sm text-on-surface-variant">
            El framework del backend de este proyecto: módulos, controladores, servicios e inyección de dependencias, explicados con el código real de la carpeta backend/.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-secondary/15 px-3 py-1 font-mono text-xs font-semibold text-secondary">
            {totalMastered} de {nestjsConcepts.length} conceptos dominados
          </span>
          <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-xs text-primary">
            API real: :3001/api
          </span>
        </div>
      </div>

      {/* ---------- NAVEGACIÓN ENTRE CONCEPTOS (TABS APILABLES) ---------- */}
      <div className="flex flex-col gap-2 rounded-xl bg-surface-container-low p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-outline">
            Selecciona un concepto de NestJS:
          </span>
          <span className="font-mono text-xs text-primary font-bold">
            {activeConcept.title}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {nestjsConcepts.map((c) => {
            const isSelected = c.id === selectedConceptId;
            const isDone = !!masteredConcepts[c.id];
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedConceptId(c.id)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 font-mono text-xs font-medium transition-all ${
                  isSelected
                    ? "bg-primary font-bold text-on-primary shadow-md ring-2 ring-primary/40"
                    : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {c.icon}
                </span>
                <span>{c.title.split("(")[0].trim()}</span>
                {isDone && (
                  <span
                    className={`material-symbols-outlined text-[16px] ${
                      isSelected ? "text-on-primary" : "text-secondary"
                    }`}
                  >
                    check_circle
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------- DETALLE DEL CONCEPTO ACTIVO ---------- */}
      <div className="flex flex-col gap-6 rounded-xl bg-surface-container-low p-6 shadow-md">
        {/* Cabecera del concepto */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-container-high pb-4">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-[32px] text-primary">
              {activeConcept.icon}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-secondary">
                  {activeConcept.tag}
                </span>
                <span className="text-outline">·</span>
                <span className="font-mono text-xs text-outline">
                  {activeConcept.englishTerm}
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold text-on-surface">
                {activeConcept.title}
              </h2>
            </div>
          </div>

          {/* Botón para marcar concepto como dominado */}
          <button
            type="button"
            onClick={() => toggleMastered(activeConcept.id)}
            className={`flex items-center gap-2 rounded-xl border px-3.5 py-2 font-mono text-xs font-semibold transition-all ${
              masteredConcepts[activeConcept.id]
                ? "border-secondary/50 bg-secondary/15 text-secondary"
                : "border-surface-container-high bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">
              {masteredConcepts[activeConcept.id]
                ? "check_box"
                : "check_box_outline_blank"}
            </span>
            <span>
              {masteredConcepts[activeConcept.id]
                ? "Concepto Dominado"
                : "Marcar como Dominado"}
            </span>
          </button>
        </div>

        {/* 1. ANALOGÍA COTIDIANA (La vida real) */}
        <div className="flex items-start gap-3.5 rounded-xl border border-secondary/30 bg-secondary/10 p-5 shadow-sm">
          <span className="material-symbols-outlined mt-0.5 text-[24px] text-secondary">
            emoji_objects
          </span>
          <div className="flex flex-col gap-1">
            <h3 className="font-display text-base font-bold text-on-surface">
              Analogía para entenderlo en la vida real:
            </h3>
            <p className="text-base leading-relaxed text-on-surface">
              {activeConcept.analogy}
            </p>
          </div>
        </div>

        {/* 2. EXPLICACIÓN CONCEPTUAL */}
        <div className="flex flex-col gap-2">
          <h3 className="flex items-center gap-2 font-display text-lg font-bold text-on-surface">
            <span className="material-symbols-outlined text-[20px] text-primary">
              menu_book
            </span>
            ¿Qué es y para qué sirve en el backend?
          </h3>
          <p className="text-base leading-relaxed text-on-surface">
            {activeConcept.explanation}
          </p>
        </div>

        {/* 3. DIAGRAMA DE FLUJO VISUAL (PASO A PASO) */}
        <div className="flex flex-col gap-3 rounded-xl border border-surface-container-high bg-surface-container p-5">
          <div className="flex items-center gap-2 border-b border-surface-container-high pb-3">
            <span className="material-symbols-outlined text-[20px] text-tertiary">
              account_tree
            </span>
            <h3 className="font-display text-base font-bold text-on-surface">
              {activeConcept.flowTitle}
            </h3>
          </div>

          <p className="text-xs text-on-surface-variant">
            Así es como el backend procesa este concepto paso a paso:
          </p>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {activeConcept.flowSteps.map((step, idx) => {
              let badgeColor = "bg-primary/15 text-primary border-primary/30";
              let badgeIcon = "play_arrow";

              if (step.type === "decision") {
                badgeColor = "bg-amber-500/15 text-amber-300 border-amber-500/30";
                badgeIcon = "help_outline";
              } else if (step.type === "end") {
                badgeColor = "bg-secondary/15 text-secondary border-secondary/30";
                badgeIcon = "task_alt";
              } else if (step.type === "api_req") {
                badgeColor = "bg-cyan-500/15 text-cyan-300 border-cyan-500/30";
                badgeIcon = "cloud_upload";
              } else if (step.type === "api_res") {
                badgeColor = "bg-emerald-500/15 text-emerald-300 border-emerald-500/30";
                badgeIcon = "cloud_download";
              }

              return (
                <div
                  key={idx}
                  className="relative flex flex-col justify-between rounded-xl border border-surface-container-high bg-surface-container-lowest p-3.5 shadow-sm"
                >
                  <div className="flex items-center justify-between pb-2">
                    <span className="font-mono text-[10px] font-bold text-outline">
                      PASO 0{idx + 1}
                    </span>
                    <span
                      className={`flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] font-bold ${badgeColor}`}
                    >
                      <span className="material-symbols-outlined text-[12px]">
                        {badgeIcon}
                      </span>
                      {step.type.toUpperCase()}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-on-surface">
                    {step.label}
                  </p>

                  {step.detail && (
                    <div className="mt-2 rounded bg-surface-container p-1.5 font-mono text-[11px] text-outline break-words">
                      <code>{step.detail}</code>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. EJEMPLO DE CÓDIGO REAL */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-lg font-bold text-on-surface">
              <span className="material-symbols-outlined text-[20px] text-secondary">
                code
              </span>
              Código en {activeConcept.codeExample.language}
            </h3>
            <span className="font-mono text-xs text-outline">
              Del backend real de este proyecto
            </span>
          </div>

          <div className="rounded-xl border border-surface-container-high bg-surface-container-lowest p-4">
            <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-primary">
              <code>{activeConcept.codeExample.code}</code>
            </pre>
          </div>
          <p className="text-xs text-on-surface-variant">
            {activeConcept.codeExample.description}
          </p>
        </div>

        {/* 5. MINI EJERCICIO DE COMPRENSIÓN (INTERACTIVO) */}
        <div className="flex flex-col gap-3 rounded-xl border border-surface-container-high bg-surface-container p-5">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[20px] text-amber-400">
              quiz
            </span>
            <h3 className="font-display text-base font-bold text-on-surface">
              Mini Pregunta de Comprensión (Comprueba lo que entendiste)
            </h3>
          </div>

          <p className="text-sm font-medium text-on-surface">
            {activeConcept.exercise.question}
          </p>

          <div className="flex flex-col gap-2 pt-1">
            {activeConcept.exercise.options.map((option, optIdx) => {
              const selected = quizAnswers[activeConcept.id] === optIdx;
              const isCorrect = optIdx === activeConcept.exercise.correctIndex;

              let btnStyle =
                "border-surface-container-high bg-surface-container-lowest hover:bg-surface-container-high text-on-surface";
              if (selected) {
                btnStyle = isCorrect
                  ? "border-secondary bg-secondary/20 text-secondary font-bold"
                  : "border-red-500 bg-red-500/20 text-red-300 font-bold";
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectAnswer(activeConcept.id, optIdx)}
                  className={`flex items-center justify-between rounded-lg border p-3 text-left font-mono text-xs transition-all ${btnStyle}`}
                >
                  <span>{option}</span>
                  {selected && (
                    <span className="material-symbols-outlined text-[18px]">
                      {isCorrect ? "check_circle" : "cancel"}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {quizAnswers[activeConcept.id] !== undefined && (
            <div className="mt-2 rounded-lg border border-surface-container-high bg-surface-container-lowest p-3 text-xs text-on-surface-variant">
              <strong className="text-on-surface">Explicación: </strong>
              {activeConcept.exercise.explanation}
            </div>
          )}
        </div>

        {/* Footer con enlace a la página que usa el backend */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-surface-container-high pt-4">
          <span className="text-xs text-outline">
            ¿Quieres ver esta API en acción? La página /progreso consume este backend.
          </span>
          <Link
            href="/progreso"
            className="flex items-center gap-1.5 rounded-lg bg-surface-container px-3.5 py-2 font-mono text-xs font-semibold text-primary transition-colors hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[16px]">
              arrow_forward
            </span>
            Ir a Progreso (consume la API)
          </Link>
        </div>
      </div>
    </div>
  );
}
