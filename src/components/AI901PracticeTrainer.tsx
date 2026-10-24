"use client";

import { useState } from "react";
import { trainerQuestions, type TrainerQuestion } from "@/data/ai901TrainerData";

type CategoryFilter = "Todas" | "NLP" | "Voz" | "Visión" | "Documentos" | "RAG";

export default function AI901PracticeTrainer() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>("Todas");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showKeywordHint, setShowKeywordHint] = useState<Record<number, boolean>>({});

  const filteredQuestions =
    selectedCategory === "Todas"
      ? trainerQuestions
      : trainerQuestions.filter((q) => q.category === selectedCategory);

  const currentQ: TrainerQuestion | undefined = filteredQuestions[currentIndex] || filteredQuestions[0];
  const userSelected = currentQ ? selectedAnswers[currentQ.id] : undefined;
  const isAnswered = !!userSelected;
  const isCorrect = userSelected === currentQ?.correctId;

  const totalAnswered = Object.keys(selectedAnswers).length;
  const totalCorrect = Object.entries(selectedAnswers).filter(([qId, ans]) => {
    const q = trainerQuestions.find((item) => item.id === Number(qId));
    return q && q.correctId === ans;
  }).length;

  const handleSelectAnswer = (optionId: string) => {
    if (!currentQ || isAnswered) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentQ.id]: optionId }));
  };

  const handleNext = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowKeywordHint({});
    setCurrentIndex(0);
  };

  const categories: CategoryFilter[] = ["Todas", "NLP", "Voz", "Visión", "Documentos", "RAG"];

  return (
    <section className="flex flex-col gap-5 rounded-2xl border-2 border-primary/30 bg-surface-container-low p-5 sm:p-6 shadow-xl">
      {/* Cabecera del Entrenador */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-container-high pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary">
            <span className="material-symbols-outlined text-[24px]">model_training</span>
          </div>
          <div>
            <h2 className="font-display text-lg sm:text-xl font-bold text-on-surface">
              Entrenador de Asociación de Conceptos (AI-901)
            </h2>
            <p className="text-xs text-on-surface-variant">
              Preguntas situacionales con revelador de palabras clave (Keywords) y explicaciones oficiales.
            </p>
          </div>
        </div>

        {/* Marcador de Aciertos */}
        <div className="flex items-center gap-2">
          <div className="rounded-xl bg-surface-container px-3 py-1.5 font-mono text-xs border border-outline-variant/15">
            <span className="text-on-surface-variant">Aciertos: </span>
            <strong className="text-emerald-400 font-bold">{totalCorrect}</strong>
            <span className="text-outline"> / {trainerQuestions.length}</span>
          </div>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-xl px-2.5 py-1.5 font-mono text-xs text-outline hover:text-on-surface hover:bg-surface-container transition-colors"
            title="Reiniciar simulador"
          >
            Reiniciar
          </button>
        </div>
      </div>

      {/* Filtros por Categoría */}
      <div className="flex flex-wrap gap-1.5">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
            }}
            className={`rounded-lg px-3 py-1 font-mono text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {currentQ ? (
        <div className="flex flex-col gap-4">
          {/* Barra de progreso de la pregunta */}
          <div className="flex items-center justify-between text-xs font-mono text-outline">
            <span className="rounded-full bg-secondary/15 px-2.5 py-0.5 text-secondary font-bold">
              {currentQ.module} · {currentQ.category}
            </span>
            <span>
              Pregunta {currentIndex + 1} de {filteredQuestions.length}
            </span>
          </div>

          {/* Enunciado de la Pregunta */}
          <div className="rounded-xl bg-surface-container p-4 sm:p-5 border border-outline-variant/15">
            <p className="text-sm sm:text-base font-semibold text-on-surface leading-relaxed">
              {currentQ.question}
            </p>
          </div>

          {/* Botón de Pista / Palabra Clave */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() =>
                setShowKeywordHint((prev) => ({ ...prev, [currentQ.id]: !prev[currentQ.id] }))
              }
              className="flex items-center gap-1.5 text-xs font-mono text-amber-300 hover:text-amber-200 transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">key</span>
              <span>
                {showKeywordHint[currentQ.id] ? "Ocultar gatillo clave" : "Ver gatillo / palabra clave de examen"}
              </span>
            </button>

            {showKeywordHint[currentQ.id] && (
              <span className="animate-in fade-in rounded-lg bg-amber-500/15 border border-amber-500/30 px-3 py-1 font-mono text-xs font-bold text-amber-300">
                🎯 {currentQ.keywordHint}
              </span>
            )}
          </div>

          {/* Opciones de Respuesta */}
          <div className="flex flex-col gap-2.5">
            {currentQ.options.map((opt) => {
              const isThisSelected = userSelected === opt.id;
              const isThisCorrect = opt.id === currentQ.correctId;

              let btnStyle = "bg-surface-container border-outline-variant/15 hover:border-primary/40 text-on-surface";
              if (isAnswered) {
                if (isThisCorrect) {
                  btnStyle = "bg-emerald-500/20 border-emerald-500 text-emerald-200 font-bold";
                } else if (isThisSelected && !isThisCorrect) {
                  btnStyle = "bg-red-500/20 border-red-500 text-red-200";
                } else {
                  btnStyle = "bg-surface-container-low border-outline-variant/10 text-outline opacity-60";
                }
              }

              return (
                <button
                  key={opt.id}
                  type="button"
                  disabled={isAnswered}
                  onClick={() => handleSelectAnswer(opt.id)}
                  className={`flex items-start gap-3 rounded-xl border p-3.5 sm:p-4 text-left transition-all ${btnStyle}`}
                >
                  <span
                    className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold ${
                      isAnswered && isThisCorrect
                        ? "bg-emerald-500 text-white"
                        : isAnswered && isThisSelected && !isThisCorrect
                        ? "bg-red-500 text-white"
                        : "bg-surface-container-high text-primary"
                    }`}
                  >
                    {opt.id}
                  </span>
                  <span className="text-xs sm:text-sm leading-relaxed">{opt.text}</span>
                </button>
              );
            })}
          </div>

          {/* Explicación y Justificación al responder */}
          {isAnswered && (
            <div
              className={`flex flex-col gap-2 rounded-xl p-4 sm:p-5 border animate-in fade-in duration-200 ${
                isCorrect
                  ? "border-emerald-500/40 bg-emerald-500/10"
                  : "border-red-500/40 bg-red-500/10"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px]">
                  {isCorrect ? "check_circle" : "cancel"}
                </span>
                <span className="font-display font-bold text-sm sm:text-base">
                  {isCorrect ? "¡Excelente! Respuesta Correcta" : "Incorrecto. Repasemos el concepto:"}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-on-surface leading-relaxed">
                {currentQ.explanation}
              </p>
            </div>
          )}

          {/* Navegación Anterior / Siguiente */}
          <div className="flex items-center justify-between border-t border-surface-container-high pt-4">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={handlePrev}
              className="flex items-center gap-1 rounded-xl bg-surface-container px-4 py-2 font-mono text-xs text-on-surface disabled:opacity-40 hover:bg-surface-container-high transition-colors"
            >
              <span className="material-symbols-outlined text-[16px]">arrow_back</span>
              <span>Anterior</span>
            </button>

            <button
              type="button"
              disabled={currentIndex === filteredQuestions.length - 1}
              onClick={handleNext}
              className="flex items-center gap-1 rounded-xl bg-primary px-4 py-2 font-mono text-xs font-bold text-on-primary disabled:opacity-40 hover:bg-primary/90 transition-colors shadow-sm"
            >
              <span>Siguiente</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        </div>
      ) : (
        <p className="text-xs text-on-surface-variant">No hay preguntas para esta categoría.</p>
      )}
    </section>
  );
}
