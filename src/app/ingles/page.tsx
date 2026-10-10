// Página /ingles — Práctica y estudio de inglés organizado por secciones claras:
//   1. Inglés Técnico: vocabulario técnico informático con casillas de dominio.
//   2. Lectura Técnica: textos de documentación en inglés y comprensión lectora.
//   3. Inglés Básico: lectura continua hacia abajo de cada estructura gramatical (sin tarjetas apiñadas) y frases útiles.
//   4. Verbos Irregulares: tabla / lista completa de verbos (base → past → participle) con buscador.
//   5. Inglés Intermedio: phrasal verbs, conectores y textos de refactorización.
//
// Los botones se apilan limpiamente hacia abajo si la pantalla es reducida.

"use client";

import { useState } from "react";
import {
  technicalVocabulary,
  technicalReadings,
  basicStructures,
  phrases,
  irregularVerbs,
  texts,
  phrasalVerbs,
  connectors,
  intermediateTexts,
  sessions as initialSessions,
  type PracticeSession,
  type ReadingExercise,
  type GrammarTopic,
  type Phrase,
  type PhrasalVerb,
  type IrregularVerb,
} from "@/content/ingles";
import { sectionProgressById } from "@/lib/progress";

// Secciones disponibles
type SectionTab = "basico" | "frases" | "tecnico" | "lectura" | "verbos" | "intermedio";

const sectionLabels: Record<SectionTab, string> = {
  basico: "Inglés Básico",
  frases: "Frases en Inglés",
  tecnico: "Inglés Técnico",
  lectura: "Lectura Técnica",
  verbos: "Verbos Irregulares",
  intermedio: "Inglés Intermedio",
};

export default function InglesPage() {
  const progress = sectionProgressById("ingles");

  // Sección activa seleccionada (inicia en basico según el orden pedido)
  const [activeTab, setActiveTab] = useState<SectionTab>("basico");

  // Estado para vocabulario dominado (casillas)
  const [masteredVocab, setMasteredVocab] = useState<Record<string, boolean>>({
    array: true,
    string: true,
    loop: true,
    server: true,
  });

  // Buscador y categoría para vocabulario técnico
  const [vocabSearch, setVocabSearch] = useState<string>("");
  const [selectedVocabCategory, setSelectedVocabCategory] = useState<string>("todos");

  // Buscador para frases en inglés
  const [phraseSearch, setPhraseSearch] = useState<string>("");

  // Modal interactivo de frases (índice de la frase abierta)
  const [activePhraseModalIndex, setActivePhraseModalIndex] = useState<number | null>(null);

  // Buscador para verbos irregulares
  const [verbSearch, setVerbSearch] = useState<string>("");

  // Respuestas interactivas para preguntas de lectura
  const [readingAnswers, setReadingAnswers] = useState<Record<string, number | null>>({});

  // Historial de sesiones
  const [sessionList, setSessionList] = useState<PracticeSession[]>(initialSessions);
  const [sessionNote, setSessionNote] = useState("");

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
      notes: sessionNote.trim() || "Sesión de estudio completada satisfactoriamente.",
    };
    setSessionList((prev) => [nueva, ...prev]);
    setSessionNote("");
  };

  const totalVocabMastered = Object.values(masteredVocab).filter(Boolean).length;

  // Filtrado de vocabulario técnico
  const vocabCategories = [
    "todos",
    ...Array.from(new Set(technicalVocabulary.map((v) => v.category || "General"))),
  ];

  const filteredVocab = technicalVocabulary.filter((item) => {
    const matchesCat =
      selectedVocabCategory === "todos" || item.category === selectedVocabCategory;
    if (!matchesCat) return false;
    if (!vocabSearch.trim()) return true;
    const q = vocabSearch.toLowerCase();
    return (
      item.english.toLowerCase().includes(q) ||
      item.spanish.toLowerCase().includes(q) ||
      (item.definition && item.definition.toLowerCase().includes(q))
    );
  });

  // Filtrado de frases en inglés
  const filteredPhrases = phrases.filter((p) => {
    if (!phraseSearch.trim()) return true;
    const q = phraseSearch.toLowerCase();
    return (
      p.english.toLowerCase().includes(q) ||
      p.spanish.toLowerCase().includes(q) ||
      (p.context && p.context.toLowerCase().includes(q))
    );
  });

  // Filtrado de verbos irregulares
  const filteredVerbs = irregularVerbs.filter((v) => {
    if (!verbSearch.trim()) return true;
    const q = verbSearch.toLowerCase();
    return (
      v.base.toLowerCase().includes(q) ||
      v.past.toLowerCase().includes(q) ||
      v.participle.toLowerCase().includes(q) ||
      v.spanish.toLowerCase().includes(q)
    );
  });

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
              Inglés (English Workspace)
            </h1>
          </div>
          <p className="text-sm text-on-surface-variant">
            Aprende a tu ritmo: vocabulario técnico, lecturas, gramática explicada de corrido, verbos irregulares e intermedio.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-secondary/15 px-3 py-1 font-mono text-xs text-secondary">
            {totalVocabMastered} de {technicalVocabulary.length} términos dominados
          </span>
          {progress && (
            <span className="rounded-full bg-primary/15 px-3 py-1 font-mono text-xs text-primary">
              Estado: {progress.status}
            </span>
          )}
        </div>
      </div>

      {/* Botones de navegación / Pestañas principales */}
      <div className="flex flex-col gap-3 rounded-xl bg-surface-container-low p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-outline">
            Sección activa:
          </span>
          <span className="font-mono text-xs font-semibold text-secondary">
            {sectionLabels[activeTab]}
          </span>
        </div>

        {/* Botones apilables responsivamente hacia abajo */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* 1. Inglés Básico */}
          <button
            type="button"
            onClick={() => setActiveTab("basico")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 font-mono text-xs font-medium transition-all ${
              activeTab === "basico"
                ? "bg-secondary font-bold text-on-secondary shadow-md ring-2 ring-secondary/40"
                : "bg-surface-container text-secondary hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">school</span>
            <span>Inglés Básico</span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                activeTab === "basico"
                  ? "bg-on-secondary/20 text-on-secondary"
                  : "bg-surface-container-highest text-outline"
              }`}
            >
              {basicStructures.length} estructuras
            </span>
          </button>

          {/* 2. Frases en Inglés (Botón dedicado) */}
          <button
            type="button"
            onClick={() => setActiveTab("frases")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 font-mono text-xs font-medium transition-all ${
              activeTab === "frases"
                ? "bg-violet-600 font-bold text-white shadow-md ring-2 ring-violet-500/40"
                : "bg-surface-container text-violet-300 hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">chat_bubble</span>
            <span>Frases en Inglés</span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                activeTab === "frases"
                  ? "bg-white/20 text-white"
                  : "bg-surface-container-highest text-outline"
              }`}
            >
              {phrases.length} frases
            </span>
          </button>

          {/* 3. Inglés Técnico */}
          <button
            type="button"
            onClick={() => setActiveTab("tecnico")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 font-mono text-xs font-medium transition-all ${
              activeTab === "tecnico"
                ? "bg-primary font-bold text-on-primary shadow-md ring-2 ring-primary/40"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">terminal</span>
            <span>Inglés Técnico</span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                activeTab === "tecnico"
                  ? "bg-on-primary/20 text-on-primary"
                  : "bg-surface-container-highest text-outline"
              }`}
            >
              {technicalVocabulary.length} términos
            </span>
          </button>

          {/* 4. Lectura Técnica */}
          <button
            type="button"
            onClick={() => setActiveTab("lectura")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 font-mono text-xs font-medium transition-all ${
              activeTab === "lectura"
                ? "bg-cyan-600 font-bold text-white shadow-md ring-2 ring-cyan-500/40"
                : "bg-surface-container text-cyan-300 hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">menu_book</span>
            <span>Lectura Técnica</span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                activeTab === "lectura"
                  ? "bg-white/20 text-white"
                  : "bg-surface-container-highest text-outline"
              }`}
            >
              {technicalReadings.length} lectura
            </span>
          </button>

          {/* 5. Verbos Irregulares */}
          <button
            type="button"
            onClick={() => setActiveTab("verbos")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 font-mono text-xs font-medium transition-all ${
              activeTab === "verbos"
                ? "bg-amber-500 font-bold text-black shadow-md ring-2 ring-amber-400/50"
                : "bg-surface-container text-amber-300 hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">table_chart</span>
            <span>Verbos Irregulares</span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                activeTab === "verbos"
                  ? "bg-black/20 text-black"
                  : "bg-surface-container-highest text-outline"
              }`}
            >
              {irregularVerbs.length} verbos
            </span>
          </button>

          {/* 6. Inglés Intermedio */}
          <button
            type="button"
            onClick={() => setActiveTab("intermedio")}
            className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 font-mono text-xs font-medium transition-all ${
              activeTab === "intermedio"
                ? "bg-tertiary font-bold text-on-tertiary shadow-md ring-2 ring-tertiary/40"
                : "bg-surface-container text-tertiary hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-[18px]">trending_up</span>
            <span>Inglés Intermedio</span>
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                activeTab === "intermedio"
                  ? "bg-on-tertiary/20 text-on-tertiary"
                  : "bg-surface-container-highest text-outline"
              }`}
            >
              {phrasalVerbs.length} phrasal · {connectors.length} conectores
            </span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 1. SECCIÓN: INGLÉS TÉCNICO (Solo vocabulario informático) */}
      {/* ======================================================== */}
      {/* ======================================================== */}
      {/* 1. SECCIÓN: INGLÉS TÉCNICO (Vocabulario informático ordenado) */}
      {/* ======================================================== */}
      {activeTab === "tecnico" && (
        <section className="flex flex-col gap-6 rounded-xl bg-surface-container-low p-6 shadow-md">
          {/* Cabecera de la sección */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-surface-container-high pb-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[28px] text-primary">
                terminal
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-on-surface">
                  Vocabulario Técnico para Informática
                </h2>
                <p className="text-sm text-on-surface-variant">
                  Glosario esencial con pronunciación/significado en español, explicación conceptual y ejemplos de código reales.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full bg-secondary/15 px-3 py-1 font-mono text-xs font-semibold text-secondary">
                {totalVocabMastered} / {technicalVocabulary.length} dominados
              </span>
            </div>
          </div>

          {/* Barra de herramientas: Buscador y Filtro por Categoría */}
          <div className="flex flex-col gap-3 rounded-xl border border-surface-container-high bg-surface-container p-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Buscador */}
            <div className="relative flex-1">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[18px] text-outline">
                search
              </span>
              <input
                type="text"
                placeholder="Buscar término en inglés, español o concepto..."
                value={vocabSearch}
                onChange={(e) => setVocabSearch(e.target.value)}
                className="w-full rounded-lg border border-surface-container-high bg-surface-container-lowest py-2 pl-9 pr-8 font-mono text-sm text-on-surface placeholder-outline focus:border-primary focus:outline-none"
              />
              {vocabSearch && (
                <button
                  type="button"
                  onClick={() => setVocabSearch("")}
                  className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-[16px] text-outline hover:text-on-surface"
                >
                  close
                </button>
              )}
            </div>

            {/* Categorías (Pills / Botones) */}
            <div className="flex flex-wrap items-center gap-1.5">
              {vocabCategories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedVocabCategory(cat)}
                  className={`rounded-lg px-2.5 py-1 font-mono text-xs font-medium transition-all ${
                    selectedVocabCategory === cat
                      ? "bg-primary font-bold text-on-primary shadow-sm"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface"
                  }`}
                >
                  {cat === "todos" ? "Todos" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de términos en flujo vertical leyendo hacia abajo */}
          <div className="flex flex-col gap-3.5">
            {filteredVocab.length === 0 ? (
              <div className="rounded-xl border border-dashed border-outline/30 p-8 text-center">
                <span className="material-symbols-outlined text-[32px] text-outline">
                  search_off
                </span>
                <p className="mt-2 text-sm text-on-surface-variant">
                  No se encontraron términos técnicos que coincidan con &quot;{vocabSearch}&quot;.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setVocabSearch("");
                    setSelectedVocabCategory("todos");
                  }}
                  className="mt-3 font-mono text-xs text-primary underline"
                >
                  Limpiar filtros
                </button>
              </div>
            ) : (
              filteredVocab.map((item) => {
                const isChecked = !!masteredVocab[item.id];
                return (
                  <article
                    key={item.id}
                    className={`flex flex-col gap-2.5 rounded-xl border p-4 transition-all sm:p-5 ${
                      isChecked
                        ? "border-secondary/40 bg-surface-container/60 shadow-sm"
                        : "border-surface-container-high bg-surface-container hover:border-outline/40 hover:bg-surface-container-high/60"
                    }`}
                  >
                    {/* Fila superior: Checkbox + Término + Traducción + Categoría */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <label
                        onClick={() => toggleVocab(item.id)}
                        className="flex cursor-pointer items-center gap-3 select-none"
                      >
                        <span
                          className={`material-symbols-outlined text-[24px] transition-colors ${
                            isChecked ? "text-secondary" : "text-outline hover:text-primary"
                          }`}
                        >
                          {isChecked ? "check_box" : "check_box_outline_blank"}
                        </span>
                        <div className="flex flex-wrap items-baseline gap-2">
                          <span className="font-mono text-lg font-bold text-primary">
                            {item.english}
                          </span>
                          <span className="text-sm font-medium text-on-surface-variant">
                            — {item.spanish}
                          </span>
                        </div>
                      </label>

                      {item.category && (
                        <span className="rounded-full bg-surface-container-highest px-2.5 py-0.5 font-mono text-[11px] font-semibold text-outline">
                          {item.category}
                        </span>
                      )}
                    </div>

                    {/* Explicación conceptual en español (con términos técnicos en inglés) */}
                    {item.definition && (
                      <p className="pl-9 text-base leading-relaxed text-on-surface">
                        {item.definition}
                      </p>
                    )}

                    {/* Ejemplo de código práctico */}
                    {item.example && (
                      <div className="ml-9 mt-1 rounded-lg border border-surface-container-high bg-surface-container-lowest p-2.5 font-mono text-xs text-on-surface-variant">
                        <span className="mr-2 text-primary font-bold">Ejemplo:</span>
                        <code>{item.example}</code>
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 2. SECCIÓN: LECTURA TÉCNICA (Pestaña propia)              */}
      {/* ======================================================== */}
      {activeTab === "lectura" && (
        <section className="flex flex-col gap-6 rounded-xl bg-surface-container-low p-6 shadow-md">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[24px] text-cyan-400">
                menu_book
              </span>
              <div>
                <h2 className="font-display text-xl font-bold text-on-surface">
                  Lectura Técnica (Technical Reading)
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Fragmentos de documentación técnica real en inglés para entrenar comprensión lectora.
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-outline">
              {technicalReadings.length} texto de práctica
            </span>
          </div>

          {technicalReadings.map((reading) => (
            <article
              key={reading.id}
              className="flex flex-col gap-5 rounded-xl border border-surface-container-high bg-surface-container p-6 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-bold text-on-surface">
                  {reading.title}
                </h3>
                <span className="rounded-full bg-cyan-500/15 px-2.5 py-0.5 font-mono text-xs font-semibold text-cyan-300">
                  Documentación Web
                </span>
              </div>

              {/* Fragmento de lectura amplio y legible */}
              <blockquote className="rounded-xl border-l-4 border-cyan-500 bg-surface-container-lowest p-5 text-base leading-relaxed text-on-surface shadow-inner">
                &quot;{reading.text}&quot;
              </blockquote>

              {/* Preguntas de comprensión */}
              <div className="flex flex-col gap-4 border-t border-surface-container-high pt-4">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-300">
                  Preguntas de comprensión lectora:
                </span>

                {reading.questions.map((q) => {
                  const key = `${reading.id}-q-${q.id}`;
                  const selected = readingAnswers[key];
                  return (
                    <div
                      key={q.id}
                      className="flex flex-col gap-2.5 rounded-lg bg-surface-container-low p-4 text-sm text-on-surface"
                    >
                      <p className="font-semibold text-on-surface">
                        #{q.id} {q.question}
                      </p>
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
                              btnStyle = "bg-secondary/40 text-on-surface font-semibold";
                            }
                          }

                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleReadingSelect(reading.id, q.id, idx)}
                              className={`rounded-lg px-3.5 py-1.5 font-mono text-xs transition-colors ${btnStyle}`}
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
            </article>
          ))}
        </section>
      )}

      {/* ======================================================== */}
      {/* 3. SECCIÓN: INGLÉS BÁSICO (Leyendo hacia abajo continuo) */}
      {/* ======================================================== */}
      {activeTab === "basico" && (
        <section className="flex flex-col gap-8 rounded-xl bg-surface-container-low p-6 shadow-md">
          {/* Cabecera */}
          <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[26px] text-secondary">
                school
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold text-on-surface">
                  Inglés Básico (Guía de Estudio)
                </h2>
                <p className="text-sm text-on-surface-variant">
                  Estructuras gramaticales explicadas en orden, leyendo de corrido hacia abajo.
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-outline">
              {basicStructures.length} Estructuras gramaticales
            </span>
          </div>

          {/* LECTURA CONTINUA HACIA ABAJO DE CADA ESTRUCTURA GRAMATICAL */}
          <div className="flex flex-col gap-8">
            {basicStructures.map((structure, index) => (
              <article
                key={structure.id}
                className="flex flex-col gap-4 rounded-xl border border-surface-container-high bg-surface-container p-6 shadow-sm"
              >
                {/* Encabezado de la estructura */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-surface-container-high pb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary/20 font-mono text-xs font-bold text-secondary">
                      0{index + 1}
                    </span>
                    <h3 className="font-display text-xl font-bold text-on-surface">
                      {structure.title}
                    </h3>
                  </div>
                  <span className="rounded-full bg-secondary/15 px-2.5 py-0.5 font-mono text-xs font-semibold text-secondary">
                    Estructura #{index + 1}
                  </span>
                </div>

                {/* Explicación en texto amplio y cómodo */}
                <div className="flex flex-col gap-1.5">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-outline">
                    ¿Qué es y cómo funciona?
                  </span>
                  <p className="text-base leading-relaxed text-on-surface">
                    {structure.explanation}
                  </p>
                </div>

                {/* Ejemplos prácticos destacados para esta estructura */}
                <div className="flex flex-col gap-2 rounded-xl bg-surface-container-lowest p-4">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-secondary">
                    Frases de ejemplo para practicar:
                  </span>
                  <div className="flex flex-col gap-2">
                    {structure.fill.map((f) => (
                      <div
                        key={f.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm text-on-surface border-b border-surface-container-high/40 pb-1.5 last:border-b-0"
                      >
                        <span className="font-mono text-primary font-medium">
                          &quot;{f.prompt.replace("___", f.answer)}&quot;
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          Respuesta clave: <strong className="text-secondary">{f.answer}</strong>
                        </span>
                      </div>
                    ))}
                    {structure.choice.map((c) => (
                      <div
                        key={c.id}
                        className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-sm text-on-surface border-b border-surface-container-high/40 pb-1.5 last:border-b-0"
                      >
                        <span className="font-mono text-primary font-medium">
                          &quot;{c.prompt.replace("___", c.options[c.answerIndex])}&quot;
                        </span>
                        <span className="text-xs text-on-surface-variant">
                          Opción correcta:{" "}
                          <strong className="text-secondary">
                            {c.options[c.answerIndex]}
                          </strong>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>



          {/* TEXTO DE PRÁCTICA BÁSICO */}
          {texts.length > 0 && (
            <div className="flex flex-col gap-4 border-t border-surface-container-high pt-6">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-secondary">
                  auto_stories
                </span>
                <h3 className="font-display text-xl font-bold text-on-surface">
                  Texto de Práctica (Lectura Básica)
                </h3>
              </div>

              {texts.map((reading) => (
                <div
                  key={reading.id}
                  className="rounded-xl border border-surface-container-high bg-surface-container p-5"
                >
                  <h4 className="font-display text-base font-bold text-on-surface">
                    {reading.title}
                  </h4>
                  <p className="mt-2 text-base leading-relaxed text-on-surface">
                    {reading.text}
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* ======================================================== */}
      {/* 2. SECCIÓN: FRASES EN INGLÉS (Pestaña propia dedicada)   */}
      {/* ======================================================== */}
      {activeTab === "frases" && (
        <section className="flex flex-col gap-6 rounded-xl bg-surface-container-low p-6 shadow-md">
          {/* Cabecera */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-surface-container-high pb-4">
            <div className="flex items-center gap-3">
              <span className="material-symbols-outlined text-[28px] text-violet-400">
                chat_bubble
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold text-on-surface">
                  Frases Clave en Inglés (Phrases to Learn)
                </h2>
                <p className="text-sm text-on-surface-variant">
                  Frases indispensables para reuniones de equipo (daily standups), pair programming y comunicación técnica.
                </p>
              </div>
            </div>
            <span className="rounded-full bg-violet-500/15 px-3 py-1 font-mono text-xs font-semibold text-violet-300">
              {phrases.length} frases esenciales
            </span>
          </div>

          {/* Buscador de frases */}
          <div className="relative">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-2.5 text-[18px] text-outline">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar frase en inglés, significado en español o contexto (ej. same page, help, standup)..."
              value={phraseSearch}
              onChange={(e) => setPhraseSearch(e.target.value)}
              className="w-full rounded-xl bg-surface-container py-2 pl-10 pr-4 font-mono text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-violet-400"
            />
          </div>

          {/* Listado de tarjetas de frases leyendo hacia abajo */}
          <div className="flex flex-col gap-3.5">
            {filteredPhrases.length === 0 ? (
              <div className="rounded-xl border border-dashed border-outline/30 p-8 text-center">
                <span className="material-symbols-outlined text-[32px] text-outline">
                  search_off
                </span>
                <p className="mt-2 text-sm text-on-surface-variant">
                  No se encontraron frases que coincidan con &quot;{phraseSearch}&quot;.
                </p>
                <button
                  type="button"
                  onClick={() => setPhraseSearch("")}
                  className="mt-3 font-mono text-xs text-violet-400 underline"
                >
                  Limpiar búsqueda
                </button>
              </div>
            ) : (
              filteredPhrases.map((p, idx) => (
                <article
                  key={p.id}
                  onClick={() => setActivePhraseModalIndex(idx)}
                  className={`group flex cursor-pointer flex-col gap-2 rounded-xl border p-4 transition-all sm:p-5 ${
                    p.id === "same-page"
                      ? "border-violet-500/50 bg-surface-container/90 shadow-md ring-1 ring-violet-500/30 hover:bg-surface-container-high"
                      : "border-surface-container-high bg-surface-container hover:border-violet-500/50 hover:bg-surface-container-high/60"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-violet-500/15 font-mono text-xs font-bold text-violet-300">
                        0{idx + 1}
                      </span>
                      <h3 className="font-mono text-lg font-bold text-primary group-hover:text-violet-300 transition-colors">
                        &quot;{p.english}&quot;
                      </h3>
                    </div>

                    <div className="flex items-center gap-2">
                      {p.id === "same-page" && (
                        <span className="rounded-full bg-violet-500/20 px-2.5 py-0.5 font-mono text-[11px] font-bold text-violet-300">
                          ⭐ Frase Destacada
                        </span>
                      )}
                      {p.videoTimestamp && (
                        <span className="flex items-center gap-1 rounded-full bg-surface-container-highest px-2 py-0.5 font-mono text-[11px] text-outline">
                          <span className="material-symbols-outlined text-[13px] text-red-400">
                            play_circle
                          </span>
                          {p.videoTimestamp}
                        </span>
                      )}
                      <span className="hidden sm:inline-flex items-center gap-1 font-mono text-[11px] text-outline group-hover:text-violet-300 transition-colors">
                        <span>Ver detalle</span>
                        <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                      </span>
                    </div>
                  </div>

                  <p className="pl-10 text-base font-semibold text-on-surface">
                    👉 {p.spanish}
                  </p>

                  {p.context && (
                    <div className="ml-10 mt-1 flex items-center gap-2 rounded-lg border border-surface-container-high bg-surface-container-lowest p-2.5 font-mono text-xs text-on-surface-variant">
                      <span className="material-symbols-outlined text-[16px] text-amber-400 shrink-0">
                        lightbulb
                      </span>
                      <span>
                        <strong className="text-on-surface">Cuándo usarla:</strong> {p.context}
                      </span>
                    </div>
                  )}
                </article>
              ))
            )}
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 5. SECCIÓN: VERBOS IRREGULARES (Pestaña propia con tabla)*/}
      {/* ======================================================== */}
      {activeTab === "verbos" && (
        <section className="flex flex-col gap-5 rounded-xl bg-surface-container-low p-6 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-container-high pb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[26px] text-amber-400">
                table_chart
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold text-on-surface">
                  Tabla de Verbos Irregulares (Irregular Verbs)
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Los 15 verbos que cambian en pasado y participio: base → past → participle.
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-amber-300">
              {filteredVerbs.length} de {irregularVerbs.length} verbos
            </span>
          </div>

          {/* Buscador de verbos */}
          <div className="relative">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-2.5 text-[18px] text-outline">
              search
            </span>
            <input
              type="text"
              placeholder="Buscar verbo en inglés o español (ej. go, saw, escribir, eat)..."
              value={verbSearch}
              onChange={(e) => setVerbSearch(e.target.value)}
              className="w-full rounded-xl bg-surface-container py-2 pl-10 pr-4 font-mono text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-amber-400"
            />
          </div>

          {/* Tabla clara y legible de verbos */}
          <div className="overflow-x-auto rounded-xl border border-surface-container-high bg-surface-container">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-surface-container-high bg-surface-container-high/60 font-mono text-xs uppercase tracking-wider text-outline">
                <tr>
                  <th className="px-4 py-3 text-primary">Forma Base (Infinitive)</th>
                  <th className="px-4 py-3 text-secondary">Pasado Simple (Past)</th>
                  <th className="px-4 py-3 text-tertiary">Participio (Participle)</th>
                  <th className="px-4 py-3 text-on-surface">Significado (Español)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-container-high">
                {filteredVerbs.map((v) => (
                  <tr
                    key={v.id}
                    className="transition-colors hover:bg-surface-container-high/40"
                  >
                    <td className="px-4 py-3 font-mono font-bold text-primary">
                      {v.base}
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold text-secondary">
                      {v.past}
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold text-tertiary">
                      {v.participle}
                    </td>
                    <td className="px-4 py-3 text-on-surface-variant font-medium">
                      {v.spanish}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ======================================================== */}
      {/* 5. SECCIÓN: INGLÉS INTERMEDIO                             */}
      {/* ======================================================== */}
      {activeTab === "intermedio" && (
        <section className="flex flex-col gap-6 rounded-xl bg-surface-container-low p-6 shadow-md">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[26px] text-tertiary">
                trending_up
              </span>
              <div>
                <h2 className="font-display text-2xl font-bold text-on-surface">
                  Inglés Intermedio (Intermediate English)
                </h2>
                <p className="text-xs text-on-surface-variant">
                  Phrasal verbs, conectores discursivos y textos técnicos de nivel intermedio.
                </p>
              </div>
            </div>
            <span className="font-mono text-xs text-outline">
              {phrasalVerbs.length} phrasal verbs · {connectors.length} conectores
            </span>
          </div>

          {/* Phrasal verbs */}
          <div className="flex flex-col gap-3">
            <h3 className="font-display text-lg font-bold text-on-surface">
              Phrasal Verbs Comunes en Desarrollo
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
              {phrasalVerbs.map((v) => (
                <div
                  key={v.id}
                  className="flex flex-col gap-1.5 rounded-xl border border-surface-container-high bg-surface-container p-4 shadow-sm"
                >
                  <span className="font-mono text-sm font-bold text-primary">
                    {v.phrasal}
                  </span>
                  <span className="text-xs font-semibold text-on-surface">
                    {v.meaning}
                  </span>
                  <span className="text-xs italic leading-relaxed text-on-surface-variant">
                    &quot;{v.example}&quot;
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Conectores */}
          <div className="flex flex-col gap-3 border-t border-surface-container-high pt-5">
            <h3 className="font-display text-lg font-bold text-on-surface">
              Conectores (Linking Words)
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
              {connectors.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 rounded-xl border border-surface-container-high bg-surface-container p-3.5 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    link
                  </span>
                  <div className="flex flex-col">
                    <span className="font-mono text-sm font-bold text-primary">
                      {c.english}
                    </span>
                    <span className="text-xs text-on-surface-variant">{c.spanish}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Texto intermedio */}
          {intermediateTexts.length > 0 && (
            <div className="flex flex-col gap-3 border-t border-surface-container-high pt-5">
              <h3 className="font-display text-lg font-bold text-on-surface">
                Texto de Práctica Intermedio
              </h3>
              {intermediateTexts.map((text) => (
                <article
                  key={text.id}
                  className="rounded-xl border border-surface-container-high bg-surface-container p-5"
                >
                  <h4 className="font-display text-base font-bold text-on-surface">
                    {text.title}
                  </h4>
                  <p className="mt-2 text-base leading-relaxed text-on-surface">
                    {text.text}
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      )}

      {/* SECCIÓN: REGISTRO DE SESIONES DE PRÁCTICA */}
      <section className="flex flex-col gap-4 rounded-xl bg-surface-container-low p-6 shadow-md">
        <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
          <div>
            <h2 className="font-display text-xl text-on-surface">
              Registro de Resultados de Sesión (Session Log)
            </h2>
            <p className="text-xs text-on-surface-variant">
              Sección actual: <strong>{sectionLabels[activeTab]}</strong>. Guarda tus notas y observaciones al finalizar el repaso.
            </p>
          </div>
          <span className="font-mono text-xs text-outline">
            {sessionList.length} sesiones guardadas
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Anotaciones de la sesión (ej. 'Repasé verbos irregulares y leí el texto de API')..."
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
              className="rounded bg-secondary-container px-3 py-1.5 font-mono text-xs font-semibold text-on-secondary hover:bg-secondary"
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

      {/* ======================================================== */}
      {/* MODAL INTERACTIVO DE FRASES (Siguiente / Anterior)       */}
      {/* ======================================================== */}
      {activePhraseModalIndex !== null && filteredPhrases[activePhraseModalIndex] && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm animate-in fade-in"
          onClick={() => setActivePhraseModalIndex(null)}
        >
          <div
            className="relative flex w-full max-w-xl flex-col gap-6 rounded-2xl border border-violet-500/40 bg-surface-container-low p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header del Modal */}
            <div className="flex items-center justify-between border-b border-surface-container-high pb-4">
              <div className="flex items-center gap-2.5">
                <span className="material-symbols-outlined text-[24px] text-violet-400">
                  chat_bubble
                </span>
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-violet-300">
                  Frase #{activePhraseModalIndex + 1} de {filteredPhrases.length}
                </span>
                {filteredPhrases[activePhraseModalIndex].videoTimestamp && (
                  <span className="flex items-center gap-1 rounded-full bg-surface-container-highest px-2 py-0.5 font-mono text-[11px] text-outline">
                    <span className="material-symbols-outlined text-[13px] text-red-400">
                      play_circle
                    </span>
                    Película: {filteredPhrases[activePhraseModalIndex].videoTimestamp}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={() => setActivePhraseModalIndex(null)}
                className="flex h-8 w-8 items-center justify-center rounded-lg bg-surface-container text-on-surface-variant transition-colors hover:bg-surface-container-highest hover:text-on-surface"
                title="Cerrar modal (Esc)"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            {/* Contenido Central de la Frase */}
            <div className="flex flex-col gap-4 py-2">
              <div className="rounded-xl border border-violet-500/30 bg-surface-container p-6 shadow-inner text-center sm:text-left">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-outline">
                  En Inglés:
                </span>
                <h3 className="mt-1 font-mono text-2xl font-bold text-primary sm:text-3xl leading-snug">
                  &quot;{filteredPhrases[activePhraseModalIndex].english}&quot;
                </h3>
              </div>

              <div className="rounded-xl border border-surface-container-high bg-surface-container p-5">
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-secondary">
                  Traducción y Significado en Español:
                </span>
                <p className="mt-1 text-lg font-bold text-on-surface leading-relaxed">
                  👉 {filteredPhrases[activePhraseModalIndex].spanish}
                </p>
              </div>

              {filteredPhrases[activePhraseModalIndex].context && (
                <div className="flex items-start gap-3 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4">
                  <span className="material-symbols-outlined mt-0.5 text-[20px] text-amber-400 shrink-0">
                    lightbulb
                  </span>
                  <div className="flex flex-col gap-0.5">
                    <span className="font-mono text-xs font-bold text-amber-300 uppercase tracking-wide">
                      Situación / Cuándo usarla:
                    </span>
                    <p className="text-sm text-on-surface leading-relaxed">
                      {filteredPhrases[activePhraseModalIndex].context}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Footer con Botones Anterior / Siguiente / Cerrar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-surface-container-high pt-4">
              <button
                type="button"
                onClick={() =>
                  setActivePhraseModalIndex((prev) =>
                    prev !== null && prev > 0 ? prev - 1 : filteredPhrases.length - 1,
                  )
                }
                className="flex items-center gap-1.5 rounded-xl border border-surface-container-high bg-surface-container px-4 py-2 font-mono text-xs font-medium text-on-surface transition-colors hover:bg-surface-container-high hover:border-violet-500/50"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_back</span>
                <span>Anterior</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActivePhraseModalIndex(null)}
                  className="rounded-xl px-3 py-2 font-mono text-xs text-outline hover:text-on-surface transition-colors"
                >
                  Cerrar
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setActivePhraseModalIndex((prev) =>
                      prev !== null && prev < filteredPhrases.length - 1 ? prev + 1 : 0,
                    )
                  }
                  className="flex items-center gap-1.5 rounded-xl bg-violet-600 px-5 py-2 font-mono text-xs font-bold text-white shadow-md transition-all hover:bg-violet-500 ring-2 ring-violet-500/40"
                >
                  <span>Siguiente frase</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
