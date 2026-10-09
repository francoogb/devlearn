// Página /ingles — práctica de gramática y vocabulario técnico en inglés.
// Client Component para ejercicios interactivos (completar, opción múltiple,
// casillas de vocabulario y registro de sesión).

"use client";

import { useState } from "react";
import {
  grammarTopics,
  vocabulary,
  readings,
  sessions as initialSessions,
  type PracticeSession,
} from "@/content/ingles";
import { sectionProgressById } from "@/lib/progress";

export default function InglesPage() {
  const progress = sectionProgressById("ingles");

  // Estado para ejercicios de completar huecos
  const [fillAnswers, setFillAnswers] = useState<Record<string, string>>({});
  const [fillFeedback, setFillFeedback] = useState<Record<string, boolean | null>>({});

  // Estado para preguntas de opción múltiple de gramática
  const [choiceAnswers, setChoiceAnswers] = useState<Record<string, number | null>>({});

  // Estado para vocabulario dominado (casillas)
  const [masteredVocab, setMasteredVocab] = useState<Record<string, boolean>>({
    array: true,
    string: true,
    loop: true,
    server: true,
  });

  // Estado para lectura (reading comprehension)
  const [readingAnswers, setReadingAnswers] = useState<Record<string, number | null>>({});

  // Historial de sesiones
  const [sessionList, setSessionList] = useState<PracticeSession[]>(initialSessions);
  const [sessionNote, setSessionNote] = useState("");

  const handleFillCheck = (topicId: string, exerciseId: number, expected: string) => {
    const key = `${topicId}-fill-${exerciseId}`;
    const userVal = (fillAnswers[key] ?? "").trim().toLowerCase();
    const isCorrect = userVal === expected.toLowerCase();
    setFillFeedback((prev) => ({ ...prev, [key]: isCorrect }));
  };

  const handleChoiceSelect = (topicId: string, exerciseId: number, selectedIndex: number) => {
    const key = `${topicId}-choice-${exerciseId}`;
    setChoiceAnswers((prev) => ({ ...prev, [key]: selectedIndex }));
  };

  const toggleVocab = (id: string) => {
    setMasteredVocab((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleReadingSelect = (readingId: string, qId: number, selectedIndex: number) => {
    const key = `${readingId}-q-${qId}`;
    setReadingAnswers((prev) => ({ ...prev, [key]: selectedIndex }));
  };

  const handleSaveSession = (area: "grammar" | "vocabulary" | "reading") => {
    const nueva: PracticeSession = {
      date: new Date().toISOString().split("T")[0],
      area,
      score: "Completada",
      notes: sessionNote.trim() || "Sesión de repaso completada satisfactoriamente.",
    };
    setSessionList((prev) => [nueva, ...prev]);
    setSessionNote("");
  };

  const totalVocabMastered = Object.values(masteredVocab).filter(Boolean).length;

  return (
    <div className="flex flex-col gap-6">
      {/* Encabezado */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface-container-low px-6 py-5 shadow-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] text-primary">
              translate
            </span>
            <h1 className="font-display text-2xl font-bold text-on-surface">
              Inglés Técnico (Technical English)
            </h1>
          </div>
          <p className="text-sm text-on-surface-variant">
            Práctica de gramática, vocabulario para desarrolladores y comprensión de lectura técnica.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-secondary/15 px-3 py-1 font-mono text-xs text-secondary">
            {totalVocabMastered} de {vocabulary.length} términos dominados
          </span>
          {progress && (
            <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-xs text-primary">
              Estado: {progress.status}
            </span>
          )}
        </div>
      </div>

      {/* SECCIÓN 1: GRAMÁTICA TÉCNICA */}
      <section className="flex flex-col gap-5 rounded-xl bg-surface-container-low p-6 shadow-md">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-secondary">
              spellcheck
            </span>
            <h2 className="font-display text-xl text-on-surface">
              Gramática Técnica (Technical Grammar)
            </h2>
          </div>
          <span className="font-mono text-xs text-outline">
            5 Estructuras clave
          </span>
        </div>

        <div className="flex flex-col gap-6">
          {grammarTopics.map((topic) => (
            <div
              key={topic.id}
              className="flex flex-col gap-3 rounded-lg bg-surface-container p-4"
            >
              <div>
                <h3 className="font-display text-base font-semibold text-on-surface">
                  {topic.title}
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-on-surface-variant">
                  {topic.explanation}
                </p>
              </div>

              {/* Ejercicios de completar */}
              <div className="flex flex-col gap-2 pt-1">
                <span className="font-mono text-xs font-medium text-tertiary">
                  Completar (Fill in the blank):
                </span>
                {topic.fill.map((ex) => {
                  const key = `${topic.id}-fill-${ex.id}`;
                  const feedback = fillFeedback[key];
                  return (
                    <div
                      key={ex.id}
                      className="flex flex-wrap items-center gap-2 rounded-lg bg-surface-container-low p-2.5 text-sm text-on-surface"
                    >
                      <span className="font-mono text-xs text-outline">#{ex.id}</span>
                      <span>{ex.prompt}</span>
                      <div className="ml-auto flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Tu respuesta"
                          value={fillAnswers[key] ?? ""}
                          onChange={(e) =>
                            setFillAnswers((prev) => ({
                              ...prev,
                              [key]: e.target.value,
                            }))
                          }
                          className="w-32 rounded bg-surface-container-highest px-2 py-1 font-mono text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            handleFillCheck(topic.id, ex.id, ex.answer)
                          }
                          className="rounded bg-primary-container px-2 py-1 font-mono text-xs text-on-primary-container hover:bg-primary"
                        >
                          Verificar
                        </button>
                        {feedback === true && (
                          <span className="font-mono text-xs text-secondary">
                            ✓ ¡Correcto!
                          </span>
                        )}
                        {feedback === false && (
                          <span className="font-mono text-xs text-error">
                            ✗ Era: {ex.answer}
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Ejercicios de opción múltiple */}
              <div className="flex flex-col gap-2 pt-1">
                <span className="font-mono text-xs font-medium text-primary">
                  Opción múltiple (Multiple choice):
                </span>
                {topic.choice.map((ex) => {
                  const key = `${topic.id}-choice-${ex.id}`;
                  const selected = choiceAnswers[key];
                  return (
                    <div
                      key={ex.id}
                      className="flex flex-col gap-2 rounded-lg bg-surface-container-low p-2.5 text-sm text-on-surface"
                    >
                      <span className="font-medium">{ex.prompt}</span>
                      <div className="flex flex-wrap gap-2">
                        {ex.options.map((opt, idx) => {
                          const isSelected = selected === idx;
                          const isCorrect = idx === ex.answerIndex;
                          let btnStyle =
                            "bg-surface-container-highest text-on-surface hover:bg-surface-bright";

                          if (selected !== undefined && selected !== null) {
                            if (isSelected && isCorrect) {
                              btnStyle = "bg-secondary text-on-secondary font-bold";
                            } else if (isSelected && !isCorrect) {
                              btnStyle = "bg-error text-on-error";
                            } else if (isCorrect) {
                              btnStyle = "bg-secondary/40 text-on-surface";
                            }
                          }

                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() =>
                                handleChoiceSelect(topic.id, ex.id, idx)
                              }
                              className={`rounded px-3 py-1 font-mono text-xs transition-colors ${btnStyle}`}
                            >
                              {opt}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECCIÓN 2: VOCABULARIO TÉCNICO */}
      <section className="flex flex-col gap-4 rounded-xl bg-surface-container-low p-6 shadow-md">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
          <div>
            <h2 className="font-display text-xl text-on-surface">
              Vocabulario Técnico Inglés-Español (Technical Vocabulary)
            </h2>
            <p className="text-xs text-on-surface-variant">
              Marca las casillas de los términos que ya dominas con soltura.
            </p>
          </div>
          <span className="font-mono text-xs text-secondary">
            {totalVocabMastered} / {vocabulary.length} dominados
          </span>
        </div>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
          {vocabulary.map((item) => {
            const isChecked = !!masteredVocab[item.id];
            return (
              <label
                key={item.id}
                onClick={() => toggleVocab(item.id)}
                className={`flex cursor-pointer items-center justify-between rounded-lg p-3 transition-colors ${
                  isChecked
                    ? "bg-surface-container-high/60"
                    : "bg-surface-container hover:bg-surface-container-high"
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
                  <div className="flex flex-col">
                    <span className="font-mono text-xs font-semibold text-primary">
                      {item.english}
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      {item.spanish}
                    </span>
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </section>

      {/* SECCIÓN 3: LECTURA DE DOCUMENTACIÓN TÉCNICA */}
      <section className="flex flex-col gap-4 rounded-xl bg-surface-container-low p-6 shadow-md">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-tertiary">
              menu_book
            </span>
            <h2 className="font-display text-xl text-on-surface">
              Lectura y Comprensión (Technical Reading)
            </h2>
          </div>
          <span className="font-mono text-xs text-outline">
            Documentación en inglés
          </span>
        </div>

        {readings.map((reading) => (
          <div
            key={reading.id}
            className="flex flex-col gap-4 rounded-lg bg-surface-container p-4"
          >
            <h3 className="font-display text-base font-semibold text-on-surface">
              {reading.title}
            </h3>
            <blockquote className="rounded-lg border-l-4 border-primary bg-surface-container-lowest p-3 text-xs leading-relaxed text-on-surface">
              &quot;{reading.text}&quot;
            </blockquote>

            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs font-medium text-tertiary">
                Preguntas de comprensión:
              </span>
              {reading.questions.map((q) => {
                const key = `${reading.id}-q-${q.id}`;
                const selected = readingAnswers[key];
                return (
                  <div
                    key={q.id}
                    className="flex flex-col gap-2 rounded-lg bg-surface-container-low p-3 text-xs text-on-surface"
                  >
                    <p className="font-medium text-on-surface">{q.question}</p>
                    <div className="flex flex-wrap gap-2">
                      {q.options.map((opt, idx) => {
                        const isSelected = selected === idx;
                        const isCorrect = idx === q.answerIndex;
                        let btnStyle =
                          "bg-surface-container-highest text-on-surface hover:bg-surface-bright";

                        if (selected !== undefined && selected !== null) {
                          if (isSelected && isCorrect) {
                            btnStyle = "bg-secondary text-on-secondary font-bold";
                          } else if (isSelected && !isCorrect) {
                            btnStyle = "bg-error text-on-error";
                          } else if (isCorrect) {
                            btnStyle = "bg-secondary/40 text-on-surface";
                          }
                        }

                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() =>
                              handleReadingSelect(reading.id, q.id, idx)
                            }
                            className={`rounded px-3 py-1 font-mono text-xs transition-colors ${btnStyle}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* SECCIÓN 4: REGISTRO DE SESIONES DE PRÁCTICA */}
      <section className="flex flex-col gap-4 rounded-xl bg-surface-container-low p-6 shadow-md">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
          <div>
            <h2 className="font-display text-xl text-on-surface">
              Registro de Resultados de Sesión (Session Log)
            </h2>
            <p className="text-xs text-on-surface-variant">
              Guarda tus notas y observaciones al finalizar la práctica.
            </p>
          </div>
          <span className="font-mono text-xs text-outline">
            {sessionList.length} sesiones guardadas
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Anotaciones de la sesión (ej. 'Repasé verbos irregulares y acerté todas las lecturas')"
            value={sessionNote}
            onChange={(e) => setSessionNote(e.target.value)}
            className="rounded-lg bg-surface-container px-3 py-2 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary"
          />
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => handleSaveSession("grammar")}
              className="rounded bg-primary-container px-3 py-1.5 font-mono text-xs font-semibold text-on-primary-container hover:bg-primary hover:text-on-primary"
            >
              + Registrar Sesión Gramática
            </button>
            <button
              type="button"
              onClick={() => handleSaveSession("vocabulary")}
              className="rounded bg-secondary-container px-3 py-1.5 font-mono text-xs font-semibold text-secondary hover:bg-secondary hover:text-on-secondary"
            >
              + Registrar Sesión Vocabulario
            </button>
            <button
              type="button"
              onClick={() => handleSaveSession("reading")}
              className="rounded bg-tertiary-container/30 px-3 py-1.5 font-mono text-xs font-semibold text-tertiary hover:bg-tertiary hover:text-on-tertiary"
            >
              + Registrar Sesión Lectura
            </button>
          </div>
        </div>

        {sessionList.length > 0 && (
          <div className="flex flex-col gap-2 pt-2">
            {sessionList.map((s, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between rounded-lg bg-surface-container p-3 text-xs"
              >
                <div className="flex items-center gap-2">
                  <span className="rounded bg-surface-container-highest px-2 py-0.5 font-mono text-[11px] uppercase text-primary">
                    {s.area}
                  </span>
                  <span className="text-on-surface">{s.notes}</span>
                </div>
                <span className="font-mono text-xs text-outline">{s.date}</span>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
