// Página /ai-901 — espacio para repasar el examen
// "Microsoft Azure AI Fundamentals (AI-901)".
// Client Component para permitir interactividad con casillas de verificación
// y registro de preguntas falladas en la sesión.

"use client";

import { useState } from "react";
import Link from "next/link";
import {
  examInfo,
  prerequisites,
  reviewChecklist,
  resources,
  practiceAssessment,
  failedQuestions as initialFailed,
  courseUnits,
  nextCourseUnit,
  type FailedQuestion,
} from "@/content/ai901";
import { sectionProgressById } from "@/lib/progress";

export default function AI901Page() {
  const progress = sectionProgressById("ai-901");

  // Estado local para marcar temas repasados
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({
    cargas: true,
    ml: true,
  });

  // Estado local para registrar preguntas falladas
  const [failedList, setFailedList] = useState<FailedQuestion[]>(initialFailed);
  const [newQuestion, setNewQuestion] = useState("");
  const [newWhy, setNewWhy] = useState("");

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;

  const handleAddFailed = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newWhy.trim()) return;

    const nueva: FailedQuestion = {
      date: new Date().toISOString().split("T")[0],
      question: newQuestion.trim(),
      why: newWhy.trim(),
    };

    setFailedList((prev) => [nueva, ...prev]);
    setNewQuestion("");
    setNewWhy("");
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Encabezado */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface-container-low px-6 py-5 shadow-md">
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
          <span className="rounded-full bg-secondary/15 px-3 py-1 font-mono text-xs text-secondary">
            Puntaje mínimo: {examInfo.passingScore} / 1000 pts
          </span>
          {progress && (
            <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-xs text-primary">
              Estado: {progress.status} ({completedCount}/{reviewChecklist.length} repasados)
            </span>
          )}
        </div>
      </div>

      {/* Tarjeta de advertencias y contexto verificado */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Idioma y datos */}
        <div className="flex flex-col gap-2 rounded-xl bg-surface-container-low p-4 shadow-sm">
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
                <strong>Inglés (English):</strong> Confirmado disponible para
                rendir el examen.
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
        <div className="flex flex-col gap-2 rounded-xl bg-surface-container-low p-4 shadow-sm">
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

      {/* Avance del curso: unidades vistas hasta ahora */}
      <section className="flex flex-col gap-3 rounded-xl bg-surface-container-low p-5 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-primary">
              menu_book
            </span>
            <h2 className="font-display text-xl text-on-surface">
              Avance del Curso (Course Progress)
            </h2>
          </div>
          <span className="font-mono text-xs text-outline">
            {courseUnits.length} unidades completadas
          </span>
        </div>
        <p className="text-sm text-on-surface-variant">
          Ruta de aprendizaje &quot;Introducción a los conceptos de IA&quot;
          (Microsoft Learn). Se actualiza conforme avanza el curso.
        </p>

        {/* Línea de avance vertical: se lee hacia abajo, unidad por unidad */}
        <ol className="relative ml-3 flex flex-col gap-6 border-l-2 border-surface-container-high pl-6">
          {courseUnits.map((unit) => (
            <li key={unit.id} className="relative flex flex-col gap-2">
              {/* Número de unidad sobre la línea */}
              <span className="absolute -left-[35px] flex h-7 w-7 items-center justify-center rounded-full bg-primary font-mono text-sm font-bold text-on-primary">
                {unit.id}
              </span>
              <h3 className="font-display text-lg font-semibold text-on-surface">
                {unit.title}
              </h3>
              <p className="text-base leading-relaxed text-on-surface-variant">
                {unit.summary}
              </p>
              {unit.points && (
                <ul className="flex flex-col gap-2 pt-0.5">
                  {unit.points.map((p, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-base leading-relaxed text-on-surface-variant"
                    >
                      <span className="material-symbols-outlined mt-0.5 text-[18px] text-secondary">
                        check
                      </span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          {/* Próxima unidad pendiente */}
          <li className="relative flex items-center gap-2.5">
            <span className="absolute -left-[35px] flex h-7 w-7 items-center justify-center rounded-full border border-dashed border-tertiary bg-surface-container-low">
              <span className="material-symbols-outlined text-[16px] text-tertiary">
                schedule
              </span>
            </span>
            <span className="text-base text-on-surface-variant">
              <strong className="text-on-surface">Próxima unidad:</strong>{" "}
              {nextCourseUnit} (pendiente).
            </span>
          </li>
        </ol>
      </section>

      {/* Lista de repaso con casillas */}
      <section className="flex flex-col gap-3 rounded-xl bg-surface-container-low p-5 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl text-on-surface">
              Lista de Repaso (Study Checklist)
            </h2>
            <p className="text-xs text-on-surface-variant">
              Marca los tópicos que ya has repasado y comprendido a fondo.
            </p>
          </div>
          <span className="font-mono text-xs text-secondary">
            {completedCount} de {reviewChecklist.length} completados
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {reviewChecklist.map((item) => {
            const isChecked = !!checkedItems[item.id];
            return (
              <label
                key={item.id}
                onClick={() => toggleCheck(item.id)}
                className={`flex cursor-pointer items-center justify-between gap-3 rounded-lg p-3 transition-colors ${
                  isChecked
                    ? "bg-surface-container-high/60"
                    : "bg-surface-container hover:bg-surface-container-high"
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      isChecked ? "text-secondary" : "text-outline"
                    }`}
                  >
                    {isChecked ? "check_box" : "check_box_outline_blank"}
                  </span>
                  <span
                    className={`text-sm ${
                      isChecked
                        ? "text-on-surface-variant line-through"
                        : "text-on-surface"
                    }`}
                  >
                    {item.label}
                  </span>
                </div>
                {item.detail && (
                  <span className="font-mono text-xs text-outline">
                    {item.detail}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </section>

      {/* Evaluación de práctica y recursos oficiales */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Evaluación de práctica */}
        <div className="flex flex-col justify-between gap-3 rounded-xl bg-surface-container-low p-5 shadow-md">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-on-surface">
              <span className="material-symbols-outlined text-[20px] text-tertiary">
                assignment_turned_in
              </span>
              <h2 className="font-display text-lg">
                Evaluación de Práctica (Practice Assessment)
              </h2>
            </div>
            <p className="text-xs leading-relaxed text-on-surface-variant">
              {practiceAssessment.note}
            </p>
            <div className="mt-2 rounded-lg bg-surface-container p-3 text-xs text-on-surface-variant">
              <p>
                <strong>Plataforma:</strong> {practiceAssessment.tool}
              </p>
              <p className="mt-1">
                <strong>Enlace directo al simulador:</strong>{" "}
                <span className="rounded bg-surface-container-highest px-1.5 py-0.5 font-mono text-[11px] text-tertiary">
                  Por verificar
                </span>{" "}
                (accede desde la página oficial tras iniciar sesión en Microsoft Learn).
              </p>
            </div>
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

        {/* Recursos oficiales verificados */}
        <div className="flex flex-col gap-3 rounded-xl bg-surface-container-low p-5 shadow-md">
          <div className="flex items-center gap-2 text-on-surface">
            <span className="material-symbols-outlined text-[20px] text-secondary">
              verified
            </span>
            <h2 className="font-display text-lg">
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
                className="flex items-center justify-between gap-2 rounded-lg bg-surface-container p-3 transition-colors hover:bg-surface-container-high"
              >
                <div className="flex flex-col">
                  <span className="text-xs font-medium text-on-surface">
                    {res.label}
                  </span>
                  <span className="truncate font-mono text-[11px] text-primary">
                    {res.url}
                  </span>
                </div>
                <span className="material-symbols-outlined text-[16px] text-outline">
                  open_in_new
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Espacio para anotar preguntas falladas */}
      <section className="flex flex-col gap-4 rounded-xl bg-surface-container-low p-5 shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-xl text-on-surface">
              Registro de Preguntas Falladas (Error Log)
            </h2>
            <p className="text-xs text-on-surface-variant">
              Anota las preguntas que fallaste en la práctica y qué concepto no
              dominabas para repasarlo.
            </p>
          </div>
          <span className="font-mono text-xs text-tertiary">
            {failedList.length} registradas
          </span>
        </div>

        {/* Formulario de registro */}
        <form onSubmit={handleAddFailed} className="flex flex-col gap-3">
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              type="text"
              placeholder="¿De qué trataba la pregunta? (ej. Reconocimiento de caras en Vision)"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              className="rounded-lg bg-surface-container px-3 py-2 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <input
              type="text"
              placeholder="¿Por qué la fallé? (ej. Confundí detección de objetos con clasificación)"
              value={newWhy}
              onChange={(e) => setNewWhy(e.target.value)}
              className="rounded-lg bg-surface-container px-3 py-2 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="self-end rounded-lg bg-secondary px-4 py-1.5 font-mono text-xs font-semibold text-on-secondary transition-colors hover:bg-secondary-fixed active:scale-95"
          >
            Anotar Fallo
          </button>
        </form>

        {/* Lista de fallos anotados */}
        {failedList.length === 0 ? (
          <div className="rounded-lg bg-surface-container p-4 text-center text-xs text-outline">
            Aún no has anotado preguntas falladas. Cuando practiques en el simulador, anótalas aquí.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {failedList.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-1 rounded-lg bg-surface-container p-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-on-surface">
                    {item.question}
                  </span>
                  <span className="font-mono text-[11px] text-outline">
                    {item.date}
                  </span>
                </div>
                <p className="text-secondary">
                  <strong>Motivo / Concepto:</strong> {item.why}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
