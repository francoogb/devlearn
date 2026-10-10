"use client";

// Página /prisma — Prisma ORM en NestJS para desarrolladores Juniors.
// Conceptos clave explicados con analogías cotidianas, diagramas de flujo interactivos,
// ejemplos de código reales y ejercicios de práctica interactivos.

import { useState } from "react";
import Link from "next/link";
import { prismaConcepts } from "@/content/prisma";

export default function PrismaPage() {
  // Estado para la pestaña/concepto seleccionado
  const [selectedConceptId, setSelectedConceptId] = useState<string>(
    prismaConcepts[0].id,
  );

  // Estado para marcar temas como dominados / aprendidos
  const [masteredConcepts, setMasteredConcepts] = useState<Record<string, boolean>>({});

  // Estado para respuestas del ejercicio interactivo por concepto
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});

  const activeConcept =
    prismaConcepts.find((c) => c.id === selectedConceptId) ||
    prismaConcepts[0];

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
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface-container-low px-6 py-5 shadow-md border border-outline-variant/10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] text-primary">
              dataset
            </span>
            <h1 className="font-display text-2xl font-bold text-on-surface">
              Prisma ORM en NestJS
            </h1>
            <span className="rounded-full bg-primary/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-primary">
              Base de Datos & Type-Safety
            </span>
          </div>
          <p className="text-sm text-on-surface-variant max-w-2xl">
            La capa de datos moderna para tu backend NestJS: qué es un ORM, cómo funciona el schema, migraciones automáticas, inyección de PrismaService y consultas con 100% de tipado TypeScript.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-secondary/15 px-3 py-1 font-mono text-xs font-semibold text-secondary">
            {totalMastered} de {prismaConcepts.length} conceptos dominados
          </span>
          <Link
            href="/nestjs"
            className="rounded-full bg-surface-container px-3 py-1 font-mono text-xs text-on-surface hover:bg-surface-container-high transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Ver NestJS
          </Link>
        </div>
      </div>

      {/* ---------- NAVEGACIÓN ENTRE CONCEPTOS (TABS APILABLES) ---------- */}
      <div className="flex flex-col gap-2 rounded-xl bg-surface-container-low p-4 shadow-sm border border-outline-variant/10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-outline">
            Ruta de aprendizaje Prisma:
          </span>
          <span className="font-mono text-xs text-primary font-bold">
            {activeConcept.title}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {prismaConcepts.map((c) => {
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

      {/* ---------- CONTENIDO PRINCIPAL DEL CONCEPTO SELECCIONADO ---------- */}
      <article className="flex flex-col gap-6 rounded-2xl bg-surface-container-low p-6 shadow-md border border-outline-variant/10">
        {/* Cabecera del concepto */}
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-surface-container-high pb-5">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-secondary/15 px-2.5 py-0.5 font-mono text-[11px] font-bold text-secondary">
                {activeConcept.tag}
              </span>
              <span className="font-mono text-xs text-outline">
                {activeConcept.englishTerm}
              </span>
            </div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
              {activeConcept.title}
            </h2>
          </div>

          <button
            type="button"
            onClick={() => toggleMastered(activeConcept.id)}
            className={`flex items-center gap-2 rounded-xl px-4 py-2 font-mono text-xs font-semibold transition-all ${
              masteredConcepts[activeConcept.id]
                ? "bg-secondary text-on-secondary shadow-md"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-sm">
              {masteredConcepts[activeConcept.id] ? "check_circle" : "radio_button_unchecked"}
            </span>
            {masteredConcepts[activeConcept.id] ? "Dominado" : "Marcar como dominado"}
          </button>
        </div>

        {/* 1. ANALOGÍA COTIDIANA */}
        <div className="flex flex-col gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 p-4">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-sm">
            <span className="material-symbols-outlined text-lg">lightbulb</span>
            <span>Analogía de la vida real (Mental Model)</span>
          </div>
          <p className="text-sm text-on-surface leading-relaxed italic">
            "{activeConcept.analogy}"
          </p>
        </div>

        {/* 2. EXPLICACIÓN TÉCNICA CLARA */}
        <div className="flex flex-col gap-2">
          <h3 className="flex items-center gap-2 font-display text-base font-semibold text-on-surface">
            <span className="material-symbols-outlined text-primary text-lg">psychology</span>
            Explicación Técnica para Juniors
          </h3>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {activeConcept.explanation}
          </p>
        </div>

        {/* 3. DIAGRAMA DE FLUJO INTERACTIVO */}
        <div className="flex flex-col gap-3 rounded-xl bg-surface-container p-4">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-outline font-semibold">
              <span className="material-symbols-outlined text-primary text-base">alt_route</span>
              {activeConcept.flowTitle}
            </h3>
            <span className="font-mono text-[11px] text-outline">
              Paso a paso en orden
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-2.5 pt-2">
            {activeConcept.flowSteps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-1.5 rounded-lg bg-surface-container-high p-3 border border-outline-variant/15 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] font-bold text-primary">
                    0{idx + 1}
                  </span>
                  <span className="rounded px-1.5 py-0.2 font-mono text-[9px] uppercase bg-surface-container text-outline">
                    {step.type}
                  </span>
                </div>
                <p className="font-mono text-xs font-semibold text-on-surface">
                  {step.label}
                </p>
                {step.detail && (
                  <p className="font-mono text-[10px] text-on-surface-variant leading-snug">
                    {step.detail}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 4. CÓDIGO REAL Y EXPLICACIÓN */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-base font-semibold text-on-surface">
              <span className="material-symbols-outlined text-secondary text-lg">code</span>
              Código Ejemplo
            </h3>
            <span className="font-mono text-xs text-outline">
              {activeConcept.codeExample.language}
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-surface-container-highest bg-surface-container-lowest">
            <div className="flex items-center justify-between border-b border-surface-container-high px-4 py-2 bg-surface-container-high/40">
              <span className="font-mono text-[11px] text-on-surface-variant">
                Snippet de implementación
              </span>
              <span className="font-mono text-[10px] text-outline">NestJS + Prisma</span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed text-on-surface">
              <code>{activeConcept.codeExample.code}</code>
            </pre>
          </div>
          <p className="text-xs text-on-surface-variant italic">
            💡 {activeConcept.codeExample.description}
          </p>
        </div>

        {/* 5. MINI EJERCICIO INTERACTIVO (QUIZ) */}
        <div className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-sm font-semibold text-primary">
              <span className="material-symbols-outlined text-base">quiz</span>
              Mini Ejercicio: Comprueba lo aprendido
            </h3>
            <span className="font-mono text-[11px] text-outline">
              Pregunta interactiva
            </span>
          </div>

          <p className="text-sm font-medium text-on-surface">
            {activeConcept.exercise.question}
          </p>

          <div className="flex flex-col gap-2 pt-1">
            {activeConcept.exercise.options.map((opt, optIdx) => {
              const selectedAnswer = quizAnswers[activeConcept.id];
              const isSelected = selectedAnswer === optIdx;
              const isCorrect = optIdx === activeConcept.exercise.correctIndex;
              const hasAnswered = selectedAnswer !== undefined && selectedAnswer !== null;

              let btnStyle =
                "bg-surface-container hover:bg-surface-container-high text-on-surface border-transparent";
              if (hasAnswered) {
                if (isCorrect) {
                  btnStyle = "bg-secondary/20 border-secondary text-secondary font-semibold";
                } else if (isSelected) {
                  btnStyle = "bg-error/20 border-error text-error";
                } else {
                  btnStyle = "opacity-50 bg-surface-container text-outline";
                }
              }

              return (
                <button
                  key={optIdx}
                  type="button"
                  onClick={() => handleSelectAnswer(activeConcept.id, optIdx)}
                  className={`flex items-start gap-3 rounded-lg border p-3 text-left font-mono text-xs transition-all ${btnStyle}`}
                >
                  <span className="font-bold shrink-0">{String.fromCharCode(65 + optIdx)})</span>
                  <span className="flex-1">{opt}</span>
                  {hasAnswered && isCorrect && (
                    <span className="material-symbols-outlined text-sm text-secondary shrink-0">
                      check_circle
                    </span>
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <span className="material-symbols-outlined text-sm text-error shrink-0">
                      cancel
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {quizAnswers[activeConcept.id] !== undefined && quizAnswers[activeConcept.id] !== null && (
            <div className="mt-2 rounded-lg bg-surface-container-high p-3 text-xs text-on-surface border border-outline-variant/20">
              <span className="font-bold text-primary">Explicación: </span>
              {activeConcept.exercise.explanation}
            </div>
          )}
        </div>

        {/* 6. BANNER DE NAVEGACIÓN RÁPIDA */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-surface-container-high">
          <Link
            href="/nestjs"
            className="flex items-center gap-2 font-mono text-xs text-primary hover:underline"
          >
            <span className="material-symbols-outlined text-sm">dns</span>
            Volver al módulo NestJS
          </Link>

          <Link
            href="/arquitectura"
            className="flex items-center gap-2 font-mono text-xs text-secondary hover:underline"
          >
            <span className="material-symbols-outlined text-sm">account_tree</span>
            Ver Arquitectura del Proyecto
          </Link>
        </div>
      </article>
    </div>
  );
}
