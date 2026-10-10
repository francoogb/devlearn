"use client";

// Página /aprender/react — Fundamentos modernos de React basados en react.dev (Inicio Rápido)
// Incluye explicación técnica, comparativa, código, quiz por concepto y 3 Playgrounds interactivos en vivo:
// 1. Contador independiente (estado local aislado).
// 2. Contadores sincronizados (levantamiento de estado / Lifting state up).
// 3. Renderizado de lista interactiva con filtro y keys.

import { useState } from "react";
import Link from "next/link";
import { reactLessons } from "@/content/react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export default function AprenderReactPage() {
  const [selectedLessonId, setSelectedLessonId] = useState<string>(reactLessons[0].id);
  const [masteredLessons, setMasteredLessons] = useState<Record<string, boolean>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});

  // Estados para el Playground 1: Estado aislado vs compartido
  const [isolatedCountA, setIsolatedCountA] = useState(0);
  const [isolatedCountB, setIsolatedCountB] = useState(0);

  // Estados para el Playground 2: Levantamiento de estado (sincronizados)
  const [syncedCount, setSyncedCount] = useState(0);

  // Estados para el Playground 3: Lista y filtros
  const [filterFruitOnly, setFilterFruitOnly] = useState(false);
  const [products, setProducts] = useState([
    { id: "p1", title: "Manzana Fuji", isFruit: true, price: "$1.20" },
    { id: "p2", title: "Ajo Chilote", isFruit: false, price: "$0.80" },
    { id: "p3", title: "Naranja Valencia", isFruit: true, price: "$1.50" },
    { id: "p4", title: "Coliflor Orgánica", isFruit: false, price: "$2.10" },
  ]);

  const activeLesson =
    reactLessons.find((l) => l.id === selectedLessonId) || reactLessons[0];

  const toggleMastered = (id: string) => {
    setMasteredLessons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSelectAnswer = (lessonId: string, optionIndex: number) => {
    setQuizAnswers((prev) => ({ ...prev, [lessonId]: optionIndex }));
  };

  const totalMastered = Object.values(masteredLessons).filter(Boolean).length;
  const filteredProducts = filterFruitOnly
    ? products.filter((p) => p.isFruit)
    : products;

  return (
    <div className="flex flex-col gap-6">
      {/* ---------- ENCABEZADO ---------- */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface-container-low px-6 py-5 shadow-md border border-outline-variant/10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[30px] text-cyan-400">
              flutter
            </span>
            <h1 className="font-display text-3xl font-bold text-on-surface">
              React: Fundamentos & Guía Oficial
            </h1>
            <span className="rounded-full bg-cyan-500/20 px-2.5 py-0.5 font-mono text-xs font-bold text-cyan-400 border border-cyan-500/30">
              react.dev (Oficial)
            </span>
          </div>
          <p className="text-base text-on-surface-variant max-w-3xl leading-relaxed">
            Domina el 80% de los conceptos que usarás a diario: componentes funcionales, JSX estricto,
            propiedades (props), renderizado condicional, listas con llaves únicas y el manejo de estado con{" "}
            <code className="text-cyan-400 font-mono">useState</code>.
          </p>
        </div>

        {/* Progreso del estudiante */}
        <div className="flex items-center gap-3 bg-surface-container-high px-4 py-2.5 rounded-xl border border-outline-variant/15">
          <span className="material-symbols-outlined text-primary text-[22px]">
            verified
          </span>
          <div className="flex flex-col">
            <span className="text-xs text-on-surface-variant font-medium">
              Progreso del Módulo
            </span>
            <span className="text-sm font-bold font-mono text-on-surface">
              {totalMastered} de {reactLessons.length} lecciones
            </span>
          </div>
        </div>
      </div>

      {/* ---------- NAVEGADOR DE LECCIONES (HORIZONTAL TABS) ---------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {reactLessons.map((lesson) => {
          const isSelected = lesson.id === activeLesson.id;
          const isDone = !!masteredLessons[lesson.id];

          return (
            <button
              key={lesson.id}
              onClick={() => setSelectedLessonId(lesson.id)}
              className={cn(
                "flex flex-col gap-1.5 p-3.5 rounded-xl border text-left transition-all duration-200 relative overflow-hidden",
                isSelected
                  ? "bg-surface-container-high border-cyan-500/50 shadow-md ring-1 ring-cyan-500/20"
                  : "bg-surface-container-low border-outline-variant/10 hover:bg-surface-container-high/60 hover:border-outline-variant/30"
              )}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-[11px] font-bold text-cyan-400">
                  LECCIÓN {lesson.number}
                </span>
                {isDone && (
                  <span className="material-symbols-outlined text-[16px] text-green-400">
                    check_circle
                  </span>
                )}
              </div>
              <span className="text-xs font-semibold text-on-surface line-clamp-2">
                {lesson.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* ---------- DETALLE DE LA LECCIÓN ACTIVA ---------- */}
      <Card className="border-outline-variant/15 bg-surface-container-low">
        <CardHeader className="border-b border-outline-variant/10 pb-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="rounded-md bg-cyan-500/10 px-2 py-0.5 font-mono text-xs font-semibold text-cyan-400">
                  Lección {activeLesson.number}
                </span>
                <a
                  href={activeLesson.officialRefUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-on-surface-variant hover:text-cyan-400 transition-colors"
                >
                  <span>Doc oficial (es.react.dev)</span>
                  <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                </a>
              </div>
              <CardTitle className="text-2xl text-on-surface">
                {activeLesson.title}
              </CardTitle>
              <CardDescription className="text-sm text-on-surface-variant mt-1.5 leading-relaxed max-w-4xl">
                {activeLesson.summary}
              </CardDescription>
            </div>

            <Button
              variant={masteredLessons[activeLesson.id] ? "default" : "outline"}
              size="sm"
              onClick={() => toggleMastered(activeLesson.id)}
              className={cn(
                "gap-1.5 transition-colors",
                masteredLessons[activeLesson.id]
                  ? "bg-green-600 hover:bg-green-700 text-white"
                  : "border-outline-variant/30 text-on-surface hover:bg-surface-container-high"
              )}
            >
              <span className="material-symbols-outlined text-[18px]">
                {masteredLessons[activeLesson.id] ? "check_circle" : "check"}
              </span>
              {masteredLessons[activeLesson.id]
                ? "Lección Dominada"
                : "Marcar como Dominada"}
            </Button>
          </div>
        </CardHeader>

        <CardContent className="pt-6 space-y-6">
          {/* Conceptos clave explicados */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {activeLesson.concepts.map((concept, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 rounded-xl bg-surface-container-high/40 p-4 border border-outline-variant/10"
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-cyan-400 text-[20px]">
                    lightbulb
                  </span>
                  <h3 className="text-base font-bold text-on-surface">
                    {concept.name}
                  </h3>
                </div>

                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {concept.description}
                </p>

                {concept.practicalRule && (
                  <div className="rounded-lg bg-surface-container-lowest p-3 border-l-2 border-cyan-400 text-xs text-on-surface-variant">
                    <span className="font-bold text-cyan-400">Regla práctica: </span>
                    {concept.practicalRule}
                  </div>
                )}

                {concept.codeExample && (
                  <div className="rounded-lg bg-[#0d1117] p-3 font-mono text-xs text-gray-200 overflow-x-auto border border-outline-variant/10">
                    <pre>
                      <code>{concept.codeExample}</code>
                    </pre>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mini Quiz de Auto-evaluación */}
          <div className="rounded-xl bg-surface-container-high/70 p-5 border border-outline-variant/15 space-y-3">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-[20px]">quiz</span>
              <h4 className="text-sm font-bold uppercase tracking-wider">
                Verifica lo aprendido
              </h4>
            </div>

            <p className="text-sm font-semibold text-on-surface">
              {activeLesson.quiz.question}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {activeLesson.quiz.options.map((option, oIdx) => {
                const selected = quizAnswers[activeLesson.id] === oIdx;
                const isCorrect = oIdx === activeLesson.quiz.correctIndex;
                const hasAnswered = quizAnswers[activeLesson.id] !== undefined;

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectAnswer(activeLesson.id, oIdx)}
                    className={cn(
                      "p-3 rounded-lg text-left text-xs transition-all border",
                      !hasAnswered &&
                        "bg-surface-container-lowest hover:bg-surface-container border-outline-variant/20 text-on-surface",
                      hasAnswered &&
                        selected &&
                        isCorrect &&
                        "bg-green-950/40 border-green-500 text-green-200 font-medium",
                      hasAnswered &&
                        selected &&
                        !isCorrect &&
                        "bg-red-950/40 border-red-500 text-red-200",
                      hasAnswered &&
                        !selected &&
                        isCorrect &&
                        "bg-green-950/20 border-green-600/40 text-green-300",
                      hasAnswered &&
                        !selected &&
                        !isCorrect &&
                        "bg-surface-container-lowest/50 border-outline-variant/10 text-on-surface-variant opacity-60"
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>

            {quizAnswers[activeLesson.id] !== undefined && (
              <div
                className={cn(
                  "p-3 rounded-lg text-xs mt-2 border",
                  quizAnswers[activeLesson.id] === activeLesson.quiz.correctIndex
                    ? "bg-green-950/30 border-green-500/40 text-green-200"
                    : "bg-amber-950/30 border-amber-500/40 text-amber-200"
                )}
              >
                <span className="font-bold">
                  {quizAnswers[activeLesson.id] === activeLesson.quiz.correctIndex
                    ? "¡Correcto! "
                    : "Punto a revisar: "}
                </span>
                {activeLesson.quiz.explanation}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* ---------- PLAYGROUNDS INTERACTIVOS EN VIVO ---------- */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[26px] text-cyan-400">
            terminal
          </span>
          <h2 className="font-display text-2xl font-bold text-on-surface">
            Playground Interactivo: Conceptos en Acción
          </h2>
        </div>
        <p className="text-sm text-on-surface-variant max-w-3xl">
          Experimenta los tres comportamientos clave de React explicados en la documentación oficial:
          aislamiento de estado, levantamiento de estado (componentes sincronizados) y renderizado reactivo de listas.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* PLAYGROUND 1: Estado Aislado */}
          <Card className="border-outline-variant/15 bg-surface-container-low flex flex-col justify-between">
            <CardHeader className="pb-3">
              <span className="text-[11px] font-mono font-bold text-cyan-400">
                PATRÓN 1
              </span>
              <CardTitle className="text-lg text-on-surface">
                Estados Aislados (Independientes)
              </CardTitle>
              <CardDescription className="text-xs text-on-surface-variant">
                Cada botón tiene su propio <code className="font-mono text-cyan-400">useState(0)</code>.
                Hacer clic en uno no afecta al otro.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="rounded-lg bg-surface-container-high p-4 flex flex-col gap-3 items-center text-center">
                <Button
                  onClick={() => setIsolatedCountA((c) => c + 1)}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs"
                >
                  Botón 1: Clickeado {isolatedCountA} veces
                </Button>
                <Button
                  onClick={() => setIsolatedCountB((c) => c + 1)}
                  className="w-full bg-cyan-600 hover:bg-cyan-700 text-white text-xs"
                >
                  Botón 2: Clickeado {isolatedCountB} veces
                </Button>
              </div>
            </CardContent>

            <CardFooter className="pt-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setIsolatedCountA(0);
                  setIsolatedCountB(0);
                }}
                className="w-full text-xs text-on-surface-variant hover:text-on-surface"
              >
                Reiniciar Contadores
              </Button>
            </CardFooter>
          </Card>

          {/* PLAYGROUND 2: Levantamiento de Estado */}
          <Card className="border-outline-variant/15 bg-surface-container-low flex flex-col justify-between">
            <CardHeader className="pb-3">
              <span className="text-[11px] font-mono font-bold text-green-400">
                PATRÓN 2
              </span>
              <CardTitle className="text-lg text-on-surface">
                Levantar el Estado (Sincronizados)
              </CardTitle>
              <CardDescription className="text-xs text-on-surface-variant">
                El estado se movió al padre. Ambos botones reciben el mismo <code className="font-mono text-green-400">count</code> y se actualizan al unísono.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="rounded-lg bg-surface-container-high p-4 flex flex-col gap-3 items-center text-center">
                <div className="text-xs text-on-surface-variant font-mono">
                  Estado Compartido: <span className="font-bold text-green-400">{syncedCount}</span>
                </div>
                <Button
                  onClick={() => setSyncedCount((c) => c + 1)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-xs"
                >
                  Botón A (Sincronizado): {syncedCount}
                </Button>
                <Button
                  onClick={() => setSyncedCount((c) => c + 1)}
                  className="w-full bg-green-600 hover:bg-green-700 text-white text-xs"
                >
                  Botón B (Sincronizado): {syncedCount}
                </Button>
              </div>
            </CardContent>

            <CardFooter className="pt-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSyncedCount(0)}
                className="w-full text-xs text-on-surface-variant hover:text-on-surface"
              >
                Reiniciar Sincronizados
              </Button>
            </CardFooter>
          </Card>

          {/* PLAYGROUND 3: Renderizado de Listas con Key */}
          <Card className="border-outline-variant/15 bg-surface-container-low flex flex-col justify-between">
            <CardHeader className="pb-3">
              <span className="text-[11px] font-mono font-bold text-amber-400">
                PATRÓN 3
              </span>
              <CardTitle className="text-lg text-on-surface">
                Listas con .map() y Filtros
              </CardTitle>
              <CardDescription className="text-xs text-on-surface-variant">
                Transformación declarativa de datos a elementos DOM con su atributo <code className="font-mono text-amber-400">key</code> único.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-on-surface-variant">Mostrar solo frutas:</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFilterFruitOnly((prev) => !prev)}
                  className={cn(
                    "text-xs h-7 px-2.5",
                    filterFruitOnly && "bg-amber-500/20 text-amber-300 border-amber-500/40"
                  )}
                >
                  {filterFruitOnly ? "Solo Frutas (Activo)" : "Ver Todos"}
                </Button>
              </div>

              <div className="rounded-lg bg-surface-container-high p-3 space-y-1.5 max-h-40 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-2 rounded bg-surface-container-lowest text-xs"
                  >
                    <span
                      className={cn(
                        "font-medium",
                        product.isFruit ? "text-magenta-400 text-pink-400" : "text-emerald-400"
                      )}
                    >
                      {product.title}
                    </span>
                    <span className="font-mono text-on-surface-variant">
                      {product.price}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>

            <CardFooter className="pt-0">
              <span className="text-[11px] text-on-surface-variant">
                Renderizando {filteredProducts.length} de {products.length} productos
              </span>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* ---------- SIGUIENTE PASO PEDAGÓGICO ---------- */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface-container-high/40 p-5 border border-outline-variant/15">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs uppercase tracking-wider text-cyan-400 font-bold">
            Ruta de Aprendizaje Frontend
          </span>
          <h3 className="text-lg font-bold text-on-surface">
            ¿Comprendiste el flujo de datos y el estado en React?
          </h3>
          <p className="text-xs text-on-surface-variant max-w-2xl">
            El siguiente escalón es llevar estos componentes al ecosistema de producción con Server Components en Next.js
            o acelerar el diseño de interfaces accesibles con componentes listos para copiar de shadcn/ui.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/aprender/next"
            className="flex items-center gap-1.5 rounded-lg bg-surface-container-high px-3.5 py-2 text-xs font-semibold text-on-surface hover:text-cyan-400 transition-colors border border-outline-variant/20"
          >
            <span className="material-symbols-outlined text-[16px]">hub</span>
            Ir a Next.js
          </Link>
          <Link
            href="/shadcn"
            className="flex items-center gap-1.5 rounded-lg bg-cyan-600 px-3.5 py-2 text-xs font-semibold text-white hover:bg-cyan-700 transition-colors shadow-sm"
          >
            <span className="material-symbols-outlined text-[16px]">widgets</span>
            Ir a shadcn/ui
          </Link>
        </div>
      </div>
    </div>
  );
}
