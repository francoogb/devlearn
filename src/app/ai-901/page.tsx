// Página /ai-901 — espacio para repasar el examen
// "Microsoft Azure AI Fundamentals (AI-901)".
// Disposición de 2 columnas:
// - Izquierda (lg:col-span-8): Avance cronológico del curso (Unidades 1 a 7) + Resumen integral consolidado.
// - Derecha (lg:col-span-4): Lista de repaso (Study Checklist), Evaluación de práctica y Recursos oficiales verificados.
// Se eliminó la sección de "Registro de Preguntas Falladas" para mantener la vista limpia.

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  examInfo,
  prerequisites,
  reviewChecklist,
  resources,
  practiceAssessment,
  courseUnits,
  nextCourseUnit,
  module1Info,
  module1Summary,
} from "@/content/ai901";
import { sectionProgressById } from "@/lib/progress";

export default function AI901Page() {
  const progress = sectionProgressById("ai-901");

  // Estado local para marcar temas repasados en el checklist
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    cargas: true,
    ml: true,
    nlp: true,
    genai: true,
  });

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-6">
      {/* ---------- ENCABEZADO PRINCIPAL ---------- */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface-container-low px-6 py-5 shadow-md border border-outline-variant/10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] text-primary">
              smart_toy
            </span>
            <h1 className="font-display text-2xl font-bold text-on-surface">
              {examInfo.officialTitle}
            </h1>
          </div>
          <p className="text-sm text-on-surface-variant">
            Preparación para la certificación {examInfo.code} · Proveedor:{" "}
            {examInfo.provider}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-secondary/15 px-3 py-1 font-mono text-xs text-secondary font-semibold">
            Puntaje mínimo: {examInfo.passingScore} / 1000 pts
          </span>
          {progress && (
            <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-xs text-primary font-semibold">
              Estado: {progress.status} ({completedCount}/{reviewChecklist.length} repasados)
            </span>
          )}
        </div>
      </div>

      {/* ---------- TARJETA DE ADVERTENCIAS Y REQUISITOS (2 COLUMNAS) ---------- */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Idioma y datos */}
        <div className="flex flex-col gap-2 rounded-xl bg-surface-container-low p-4 shadow-sm border border-outline-variant/10">
          <div className="flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-[20px] text-tertiary">
              language
            </span>
            <h2 className="font-display text-base font-semibold">
              Disponibilidad de Idioma
            </h2>
          </div>
          <ul className="flex flex-col gap-1.5 text-xs text-on-surface-variant">
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-secondary">
                check_circle
              </span>
              <span>
                <strong>Inglés (English):</strong> Confirmado disponible para rendir el examen.
              </span>
            </li>
            <li className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[16px] text-outline">
                help
              </span>
              <span>
                <strong>Español (Chile):</strong>{" "}
                <span className="rounded bg-surface-container-highest px-1.5 py-0.5 font-mono text-[11px] text-tertiary">
                  Por verificar
                </span>{" "}
                (no confirmado oficialmente para esta versión).
              </span>
            </li>
          </ul>
        </div>

        {/* Conocimientos previos recomendados */}
        <div className="flex flex-col gap-2 rounded-xl bg-surface-container-low p-4 shadow-sm border border-outline-variant/10">
          <div className="flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-[20px] text-primary">
              school
            </span>
            <h2 className="font-display text-base font-semibold">
              Conocimientos Previos Recomendados
            </h2>
          </div>
          <div className="flex flex-wrap gap-2 pt-1">
            {prerequisites.map((req) => (
              <span
                key={req}
                className="rounded-lg bg-surface-container px-2.5 py-1 font-mono text-xs text-on-surface"
              >
                {req}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ---------- DISTRIBUCIÓN PRINCIPAL (COLUMNA IZQUIERDA Y DERECHA) ---------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* ========================================================================= */}
        {/* COLUMNA IZQUIERDA (8 COLS): AVANCE DEL CURSO Y RESUMEN INTEGRAL           */}
        {/* ========================================================================= */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <section className="flex flex-col gap-5 rounded-xl bg-surface-container-low p-6 shadow-md border border-outline-variant/10">
            {/* Cabecera del Módulo 1 */}
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-surface-container-high pb-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-primary/20 px-2.5 py-0.5 font-mono text-xs font-bold text-primary">
                    Módulo · {module1Info.totalUnits} Unidades
                  </span>
                  <span className="rounded bg-secondary/15 px-2.5 py-0.5 font-mono text-xs font-bold text-secondary">
                    ⏱️ {module1Info.duration}
                  </span>
                </div>
                <h2 className="font-display text-xl sm:text-2xl font-bold text-on-surface">
                  <a
                    href={module1Info.officialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline flex items-center gap-1.5"
                  >
                    {module1Info.title}
                    <span className="material-symbols-outlined text-[18px] text-primary">
                      open_in_new
                    </span>
                  </a>
                </h2>
                <p className="text-xs sm:text-sm text-on-surface-variant max-w-2xl">
                  {module1Info.description}
                </p>
              </div>
            </div>

            {/* Línea de avance vertical: las 10 unidades oficiales */}
            <ol className="relative ml-4 flex flex-col gap-5 border-l-2 border-surface-container-high pl-6 pt-2">
              {courseUnits.map((unit) => (
                <li key={unit.id} className="relative flex flex-col gap-1.5">
                  {/* Número de unidad sobre la línea */}
                  <span className="absolute -left-[35px] flex h-7 w-7 items-center justify-center rounded-full bg-primary font-mono text-xs font-bold text-on-primary shadow-sm">
                    {unit.id}
                  </span>

                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-display text-base font-bold text-on-surface">
                      {unit.url ? (
                        <a
                          href={unit.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline text-on-surface hover:text-primary flex items-center gap-1.5"
                        >
                          {unit.title}
                          <span className="material-symbols-outlined text-[15px] opacity-70">
                            open_in_new
                          </span>
                        </a>
                      ) : (
                        unit.title
                      )}
                    </h3>
                    <span className="rounded-full bg-surface-container-high px-2 py-0.5 font-mono text-[11px] text-outline font-semibold">
                      {unit.duration}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm leading-relaxed text-on-surface-variant">
                    {unit.summary}
                  </p>

                  {unit.points && (
                    <ul className="flex flex-col gap-1.5 pt-1">
                      {unit.points.map((p, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-xs sm:text-sm leading-relaxed text-on-surface-variant"
                        >
                          <span className="material-symbols-outlined mt-0.5 text-[16px] text-secondary shrink-0">
                            check
                          </span>
                          <span>{p}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}

              {/* Próximo paso */}
              <li className="relative flex items-center gap-2.5 pt-2">
                <span className="absolute -left-[35px] flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-tertiary bg-surface-container-low">
                  <span className="material-symbols-outlined text-[16px] text-tertiary">
                    schedule
                  </span>
                </span>
                <span className="text-xs sm:text-sm text-on-surface-variant">
                  <strong className="text-on-surface">Próximo paso:</strong>{" "}
                  {nextCourseUnit}.
                </span>
              </li>
            </ol>

            {/* Resumen oficial del Módulo 1 */}
            <div className="mt-4 flex flex-col gap-4 rounded-xl border border-secondary/30 bg-secondary/5 p-5 sm:p-6 shadow-inner">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[26px] text-secondary">
                  fact_check
                </span>
                <h3 className="font-display text-lg sm:text-xl font-bold text-on-surface">
                  {module1Summary.title}
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                {module1Summary.sections.map((sec, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col gap-1 rounded-lg bg-surface-container p-3.5 border border-outline-variant/15"
                  >
                    <span className="font-mono font-bold text-xs sm:text-sm text-primary">
                      📌 {sec.title}
                    </span>
                    <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed whitespace-pre-line">
                      {sec.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* ========================================================================= */}
        {/* COLUMNA DERECHA (4 COLS): CHECKLIST, EVALUACIÓN Y RECURSOS OFICIALES     */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 flex flex-col gap-5 sticky top-4">
          {/* 1. Lista de repaso con casillas */}
          <section className="flex flex-col gap-3 rounded-xl bg-surface-container-low p-5 shadow-md border border-outline-variant/10">
            <div className="flex items-center justify-between border-b border-surface-container-high pb-2">
              <div>
                <h2 className="font-display text-base font-bold text-on-surface">
                  Lista de Repaso (Study Checklist)
                </h2>
                <p className="text-[11px] text-on-surface-variant">
                  Marca los tópicos que ya dominas.
                </p>
              </div>
              <span className="font-mono text-xs text-secondary font-bold">
                {completedCount} de {reviewChecklist.length}
              </span>
            </div>

            <div className="flex flex-col gap-1.5 pt-1">
              {reviewChecklist.map((item) => {
                const isChecked = !!checkedItems[item.id];
                return (
                  <label
                    key={item.id}
                    onClick={() => toggleCheck(item.id)}
                    className={`flex cursor-pointer items-center justify-between gap-2.5 rounded-lg p-2.5 text-xs transition-colors select-none ${
                      isChecked
                        ? "bg-surface-container-high/60 border border-secondary/20"
                        : "bg-surface-container hover:bg-surface-container-high border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <span
                        className={`material-symbols-outlined text-[18px] ${
                          isChecked ? "text-secondary" : "text-outline"
                        }`}
                      >
                        {isChecked ? "check_box" : "check_box_outline_blank"}
                      </span>
                      <span
                        className={`${
                          isChecked
                            ? "text-on-surface-variant line-through"
                            : "text-on-surface font-medium"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                    {item.detail && (
                      <span className="font-mono text-[10px] text-outline shrink-0">
                        {item.detail}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </section>

          {/* 2. Evaluación de práctica */}
          <div className="flex flex-col gap-3 rounded-xl bg-surface-container-low p-5 shadow-md border border-outline-variant/10">
            <div className="flex items-center gap-2 text-on-surface">
              <span className="material-symbols-outlined text-[20px] text-tertiary">
                assignment_turned_in
              </span>
              <h2 className="font-display text-base font-bold">
                Evaluación de Práctica
              </h2>
            </div>
            <p className="text-xs leading-relaxed text-on-surface-variant">
              {practiceAssessment.note}
            </p>
            <div className="rounded-lg bg-surface-container p-3 text-xs text-on-surface-variant border border-outline-variant/10">
              <p>
                <strong>Plataforma:</strong> {practiceAssessment.tool}
              </p>
              <p className="mt-1">
                <strong>Enlace directo al simulador:</strong>{" "}
                <span className="rounded bg-surface-container-highest px-1.5 py-0.5 font-mono text-[10px] text-tertiary font-bold">
                  Por verificar
                </span>{" "}
                (accede tras iniciar sesión en Microsoft Learn).
              </p>
            </div>
            <Link
              href="https://learn.microsoft.com/es-es/credentials/certifications/exams/ai-901/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1.5 rounded-lg bg-primary-container px-4 py-2 font-mono text-xs font-semibold text-on-primary-container transition-colors hover:bg-primary hover:text-on-primary"
            >
              Ir a Microsoft Learn para acceder
              <span className="material-symbols-outlined text-[14px]">
                open_in_new
              </span>
            </Link>
          </div>

          {/* 3. Recursos oficiales verificados */}
          <div className="flex flex-col gap-3 rounded-xl bg-surface-container-low p-5 shadow-md border border-outline-variant/10">
            <div className="flex items-center gap-2 text-on-surface">
              <span className="material-symbols-outlined text-[20px] text-secondary">
                verified
              </span>
              <h2 className="font-display text-base font-bold">
                Recursos Oficiales Verificados
              </h2>
            </div>
            <div className="flex flex-col gap-2">
              {resources.map((res) => (
                <a
                  key={res.url}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 rounded-lg bg-surface-container p-3 transition-colors hover:bg-surface-container-high border border-outline-variant/10"
                >
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-on-surface truncate">
                      {res.label}
                    </span>
                    <span className="truncate font-mono text-[10px] text-primary">
                      {res.url}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[16px] text-outline shrink-0">
                    open_in_new
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
