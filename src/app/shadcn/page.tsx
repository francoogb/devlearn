"use client";

// Página /shadcn — shadcn/ui + Tailwind + Radix + CVA para desarrolladores Juniors.
// Mismo formato pedagógico que /prisma y /nestjs: analogía cotidiana,
// explicación técnica, diagrama de flujo, código real y quiz interactivo.
// Usa el <Button> de shadcn (meta: la página sobre shadcn está construida con shadcn).

import { useState } from "react";
import Link from "next/link";
import { shadcnConcepts } from "@/content/shadcn";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export default function ShadcnPage() {
  const [selectedConceptId, setSelectedConceptId] = useState<string>(
    shadcnConcepts[0].id,
  );

  const [masteredConcepts, setMasteredConcepts] = useState<Record<string, boolean>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number | null>>({});

  // Estado del Playground (sección de ejemplos vivos al final de la página)
  const [buttonClicks, setButtonClicks] = useState<Record<string, number>>({});
  const incrementClick = (variant: string) =>
    setButtonClicks((prev) => ({ ...prev, [variant]: (prev[variant] ?? 0) + 1 }));

  const activeConcept =
    shadcnConcepts.find((c) => c.id === selectedConceptId) || shadcnConcepts[0];

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
              widgets
            </span>
            <h1 className="font-display text-3xl font-bold text-on-surface">
              shadcn/ui en Next.js
            </h1>
            <span className="rounded-full bg-primary/20 px-2.5 py-0.5 font-mono text-xs font-bold text-primary">
              UI + Accesibilidad + Tipos
            </span>
          </div>
          <p className="text-base text-on-surface-variant max-w-2xl leading-relaxed">
            La biblioteca de componentes estándar del ecosistema Next.js: no es un paquete tradicional,
            es código tuyo. Entendé la filosofía, la trinidad Tailwind+Radix+CVA, el helper cn(),
            variants tipadas, el patrón asChild y cómo adaptarlo a tu tema.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="rounded-full bg-secondary/15 px-3 py-1 font-mono text-xs font-semibold text-secondary">
            {totalMastered} de {shadcnConcepts.length} conceptos dominados
          </span>
          <Button asChild variant="ghost" size="sm">
            <Link href="/prisma">
              <span className="material-symbols-outlined text-sm">arrow_back</span>
              Ver Prisma
            </Link>
          </Button>
        </div>
      </div>

      {/* ---------- NAVEGACIÓN ENTRE CONCEPTOS ---------- */}
      <div className="flex flex-col gap-2 rounded-xl bg-surface-container-low p-4 shadow-sm border border-outline-variant/10">
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-wider text-outline">
            Ruta de aprendizaje shadcn/ui:
          </span>
          <span className="font-mono text-xs text-primary font-bold">
            {activeConcept.title}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 pt-1">
          {shadcnConcepts.map((c) => {
            const isSelected = c.id === selectedConceptId;
            const isDone = !!masteredConcepts[c.id];
            return (
              <Button
                key={c.id}
                type="button"
                variant={isSelected ? "default" : "ghost"}
                size="default"
                onClick={() => setSelectedConceptId(c.id)}
                className={cn(
                  "h-auto py-2.5",
                  isSelected && "ring-2 ring-primary/40"
                )}
              >
                <span className="material-symbols-outlined text-[20px]">
                  {c.icon}
                </span>
                <span>{c.title.split(":")[0].split("(")[0].trim()}</span>
                {isDone && (
                  <span
                    className={cn(
                      "material-symbols-outlined text-[16px]",
                      isSelected ? "text-on-primary" : "text-secondary"
                    )}
                  >
                    check_circle
                  </span>
                )}
              </Button>
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
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-on-surface">
              {activeConcept.title}
            </h2>
          </div>

          <Button
            type="button"
            variant={masteredConcepts[activeConcept.id] ? "secondary" : "outline"}
            size="default"
            onClick={() => toggleMastered(activeConcept.id)}
          >
            <span className="material-symbols-outlined text-base">
              {masteredConcepts[activeConcept.id] ? "check_circle" : "radio_button_unchecked"}
            </span>
            {masteredConcepts[activeConcept.id] ? "Dominado" : "Marcar como dominado"}
          </Button>
        </div>

        {/* 1. ANALOGÍA COTIDIANA */}
        <div className="flex flex-col gap-2 rounded-xl bg-amber-500/10 border border-amber-500/20 p-5">
          <div className="flex items-center gap-2 text-amber-400 font-semibold text-base">
            <span className="material-symbols-outlined text-xl">lightbulb</span>
            <span>Analogía de la vida real (Mental Model)</span>
          </div>
          <p className="text-base text-on-surface leading-relaxed italic">
            &quot;{activeConcept.analogy}&quot;
          </p>
        </div>

        {/* 2. EXPLICACIÓN TÉCNICA CLARA */}
        <div className="flex flex-col gap-2">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-on-surface">
            <span className="material-symbols-outlined text-primary text-xl">psychology</span>
            Explicación Técnica para Juniors
          </h3>
          <p className="text-base text-on-surface-variant leading-relaxed">
            {activeConcept.explanation}
          </p>
        </div>

        {/* 3. DIAGRAMA DE FLUJO INTERACTIVO */}
        <div className="flex flex-col gap-3 rounded-xl bg-surface-container p-5">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-mono text-sm uppercase tracking-wider text-outline font-semibold">
              <span className="material-symbols-outlined text-primary text-lg">alt_route</span>
              {activeConcept.flowTitle}
            </h3>
            <span className="font-mono text-xs text-outline">
              Paso a paso en orden
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-3 pt-2">
            {activeConcept.flowSteps.map((step, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-2 rounded-lg bg-surface-container-high p-4 border border-outline-variant/15 relative"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-primary">
                    0{idx + 1}
                  </span>
                  <span className="rounded px-1.5 py-0.5 font-mono text-[10px] uppercase bg-surface-container text-outline">
                    {step.type}
                  </span>
                </div>
                <p className="font-mono text-sm font-semibold text-on-surface">
                  {step.label}
                </p>
                {step.detail && (
                  <p className="font-mono text-xs text-on-surface-variant leading-snug">
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
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-on-surface">
              <span className="material-symbols-outlined text-secondary text-xl">code</span>
              Código Ejemplo
            </h3>
            <span className="font-mono text-sm text-outline">
              {activeConcept.codeExample.language}
            </span>
          </div>

          <div className="overflow-hidden rounded-xl border border-surface-container-highest bg-surface-container-lowest">
            <div className="flex items-center justify-between border-b border-surface-container-high px-4 py-2.5 bg-surface-container-high/40">
              <span className="font-mono text-xs text-on-surface-variant">
                Snippet de implementación
              </span>
              <span className="font-mono text-[11px] text-outline">
                shadcn/ui + Tailwind
              </span>
            </div>
            <pre className="overflow-x-auto p-4 font-mono text-sm leading-relaxed text-on-surface">
              <code>{activeConcept.codeExample.code}</code>
            </pre>
          </div>
          <p className="text-sm text-on-surface-variant italic leading-relaxed">
            💡 {activeConcept.codeExample.description}
          </p>
        </div>

        {/* 5. MINI EJERCICIO INTERACTIVO (QUIZ) */}
        <div className="flex flex-col gap-3 rounded-xl border border-primary/20 bg-primary/5 p-5">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-primary">
              <span className="material-symbols-outlined text-xl">quiz</span>
              Mini Ejercicio: Comprueba lo aprendido
            </h3>
            <span className="font-mono text-xs text-outline">
              Pregunta interactiva
            </span>
          </div>

          <p className="text-base font-medium text-on-surface leading-relaxed">
            {activeConcept.exercise.question}
          </p>

          <div className="flex flex-col gap-2 pt-1">
            {activeConcept.exercise.options.map((opt, optIdx) => {
              const selectedAnswer = quizAnswers[activeConcept.id];
              const isSelected = selectedAnswer === optIdx;
              const isCorrect = optIdx === activeConcept.exercise.correctIndex;
              const hasAnswered = selectedAnswer !== undefined && selectedAnswer !== null;

              let stateClasses =
                "border-outline-variant/30 bg-surface-container hover:bg-surface-container-high";
              if (hasAnswered) {
                if (isCorrect) {
                  stateClasses =
                    "bg-secondary/20 border-secondary text-secondary font-semibold hover:bg-secondary/20";
                } else if (isSelected) {
                  stateClasses =
                    "bg-error/20 border-error text-error hover:bg-error/20";
                } else {
                  stateClasses =
                    "opacity-50 bg-surface-container text-outline hover:bg-surface-container";
                }
              }

              return (
                <Button
                  key={optIdx}
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => handleSelectAnswer(activeConcept.id, optIdx)}
                  className={cn(
                    "h-auto justify-start items-start text-left py-4 whitespace-normal",
                    stateClasses
                  )}
                >
                  <span className="font-bold shrink-0">{String.fromCharCode(65 + optIdx)})</span>
                  <span className="flex-1">{opt}</span>
                  {hasAnswered && isCorrect && (
                    <span className="material-symbols-outlined text-base text-secondary shrink-0">
                      check_circle
                    </span>
                  )}
                  {hasAnswered && isSelected && !isCorrect && (
                    <span className="material-symbols-outlined text-base text-error shrink-0">
                      cancel
                    </span>
                  )}
                </Button>
              );
            })}
          </div>

          {quizAnswers[activeConcept.id] !== undefined && quizAnswers[activeConcept.id] !== null && (
            <div className="mt-2 rounded-lg bg-surface-container-high p-4 text-sm text-on-surface border border-outline-variant/20 leading-relaxed">
              <span className="font-bold text-primary">Explicación: </span>
              {activeConcept.exercise.explanation}
            </div>
          )}
        </div>

        {/* 6. BANNER DE NAVEGACIÓN RÁPIDA */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-5 border-t border-surface-container-high">
          <Button asChild variant="link" size="sm">
            <Link href="/prisma">
              <span className="material-symbols-outlined text-base">dataset</span>
              Ver módulo Prisma ORM
            </Link>
          </Button>

          <Button asChild variant="link" size="sm" className="text-secondary">
            <Link href="/arquitectura">
              <span className="material-symbols-outlined text-base">account_tree</span>
              Ver Arquitectura del Proyecto
            </Link>
          </Button>
        </div>
      </article>

      {/* ============================================================= */}
      {/* PLAYGROUND: COMPONENTES SHADCN EN VIVO (click, interactúa)   */}
      {/* ============================================================= */}
      <section className="flex flex-col gap-6 rounded-2xl bg-surface-container-low p-6 shadow-md border border-outline-variant/10">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-container-high pb-4">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-tertiary text-[28px]">
                stadia_controller
              </span>
              <h2 className="font-display text-2xl font-bold text-on-surface">
                Playground: los 4 componentes en vivo
              </h2>
            </div>
            <p className="text-base text-on-surface-variant max-w-2xl leading-relaxed">
              Esto no es un screenshot — es shadcn/ui corriendo de verdad en esta página.
              Hacé click, abrí el modal, cambiá de pestaña y mirá cómo los componentes
              responden con los tokens Electric Slate aplicados.
            </p>
          </div>
          <span className="font-mono text-xs text-tertiary bg-tertiary/15 px-3 py-1 rounded-full font-bold">
            Vivos & interactivos
          </span>
        </div>

        {/* ---------- BLOQUE 1: BUTTON (todos los variants + sizes) ---------- */}
        <div className="flex flex-col gap-3 rounded-xl bg-surface-container p-5">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-on-surface">
              <span className="material-symbols-outlined text-primary text-xl">
                smart_button
              </span>
              Button — todas las variants
            </h3>
            <span className="font-mono text-xs text-outline">
              Click para ver el contador
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Button variant="default" onClick={() => incrementClick("default")}>
              default ({buttonClicks.default ?? 0})
            </Button>
            <Button variant="secondary" onClick={() => incrementClick("secondary")}>
              secondary ({buttonClicks.secondary ?? 0})
            </Button>
            <Button variant="tertiary" onClick={() => incrementClick("tertiary")}>
              tertiary ({buttonClicks.tertiary ?? 0})
            </Button>
            <Button variant="destructive" onClick={() => incrementClick("destructive")}>
              destructive ({buttonClicks.destructive ?? 0})
            </Button>
            <Button variant="outline" onClick={() => incrementClick("outline")}>
              outline ({buttonClicks.outline ?? 0})
            </Button>
            <Button variant="ghost" onClick={() => incrementClick("ghost")}>
              ghost ({buttonClicks.ghost ?? 0})
            </Button>
            <Button variant="link" onClick={() => incrementClick("link")}>
              link ({buttonClicks.link ?? 0})
            </Button>
          </div>

          <div className="pt-3 border-t border-surface-container-high/50 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-outline mr-1">Sizes:</span>
            <Button size="sm">sm</Button>
            <Button size="default">default</Button>
            <Button size="lg">lg</Button>
            <Button size="xl">xl</Button>
            <Button size="icon" aria-label="Buscar">
              <span className="material-symbols-outlined text-base">search</span>
            </Button>
          </div>

          <div className="pt-3 border-t border-surface-container-high/50 flex flex-wrap items-center gap-3">
            <span className="font-mono text-xs text-outline mr-1">asChild (Link):</span>
            <Button asChild variant="secondary">
              <Link href="/prisma">
                <span className="material-symbols-outlined text-base">dataset</span>
                Soy un &lt;Link&gt; con pinta de Button
              </Link>
            </Button>
            <span className="font-mono text-[11px] text-on-surface-variant italic">
              HTML real: &lt;a href=&quot;/prisma&quot;&gt;...&lt;/a&gt; (no &lt;button&gt;)
            </span>
          </div>
        </div>

        {/* ---------- BLOQUE 2: CARD ---------- */}
        <div className="flex flex-col gap-3 rounded-xl bg-surface-container p-5">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-on-surface">
            <span className="material-symbols-outlined text-secondary text-xl">
              dashboard
            </span>
            Card — contenedor con partes nombradas
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <Card>
              <CardHeader>
                <CardTitle>Ejemplo mínimo</CardTitle>
                <CardDescription>
                  Card + CardHeader + CardTitle + CardDescription + CardContent.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Las partes son opcionales — podés usar solo Card + CardContent si
                  no necesitás header. La idea es tener bloques nombrados en vez
                  de un div genérico con 5 classes.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Con footer y acción</CardTitle>
                <CardDescription>
                  Las cards aceptan Button adentro sin pelearse de estilos.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Todo respeta los tokens Electric Slate: fondo
                  <code className="font-mono text-[11px] text-tertiary px-1">
                    surface-container-low
                  </code>
                  , borde outline sutil, texto on-surface.
                </p>
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="ghost" size="sm">
                  Cancelar
                </Button>
                <Button variant="default" size="sm">
                  Confirmar
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        {/* ---------- BLOQUE 3: TABS ---------- */}
        <div className="flex flex-col gap-3 rounded-xl bg-surface-container p-5">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-on-surface">
            <span className="material-symbols-outlined text-primary text-xl">
              tab
            </span>
            Tabs — con teclado (←/→) y accesibilidad por Radix
          </h3>

          <Tabs defaultValue="js" className="w-full pt-1">
            <TabsList>
              <TabsTrigger value="js">JavaScript</TabsTrigger>
              <TabsTrigger value="ts">TypeScript</TabsTrigger>
              <TabsTrigger value="prisma">Prisma</TabsTrigger>
            </TabsList>

            <TabsContent value="js">
              <Card>
                <CardContent className="pt-5">
                  <p className="text-base text-on-surface leading-relaxed">
                    <strong>JavaScript</strong> es el lenguaje. No tipa en tiempo
                    de compilación — los errores de tipeo saltan en runtime, con el
                    código ya corriendo en el navegador.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="ts">
              <Card>
                <CardContent className="pt-5">
                  <p className="text-base text-on-surface leading-relaxed">
                    <strong>TypeScript</strong> es JavaScript + un sistema de tipos
                    que detecta errores antes de ejecutar. Se compila a JS plano
                    para que lo entienda el navegador.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prisma">
              <Card>
                <CardContent className="pt-5">
                  <p className="text-base text-on-surface leading-relaxed">
                    <strong>Prisma</strong> es el ORM: traduce TypeScript ↔ SQL con
                    cliente tipado. Reemplazó el &quot;SELECT * FROM users&quot;
                    como string plano por{" "}
                    <code className="font-mono text-sm text-primary">
                      prisma.user.findMany()
                    </code>
                    .
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <p className="text-xs text-on-surface-variant italic">
            💡 Tip: hacé click en una pestaña y después usá ← / → en el teclado —
            Radix maneja la navegación automática.
          </p>
        </div>

        {/* ---------- BLOQUE 4: DIALOG (MODAL) ---------- */}
        <div className="flex flex-col gap-3 rounded-xl bg-surface-container p-5">
          <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-on-surface">
            <span className="material-symbols-outlined text-tertiary text-xl">
              dynamic_form
            </span>
            Dialog (modal) — focus trap, ESC para cerrar, overlay con blur
          </h3>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="default">
                  <span className="material-symbols-outlined text-base">
                    open_in_full
                  </span>
                  Abrir modal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>¡Hola desde el Dialog de Radix!</DialogTitle>
                  <DialogDescription>
                    Este modal está montado en un portal al{" "}
                    <code className="font-mono text-xs">&lt;body&gt;</code> — por
                    eso aparece por encima de todo sin problemas de z-index.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-2 text-sm text-on-surface-variant leading-relaxed">
                  <p>
                    Probá apretar <kbd className="font-mono text-xs bg-surface-container-high px-1.5 py-0.5 rounded">Esc</kbd>{" "}
                    o hacer click fuera para cerrarlo. El foco vuelve
                    automáticamente al botón que lo abrió.
                  </p>
                  <p>
                    También probá <kbd className="font-mono text-xs bg-surface-container-high px-1.5 py-0.5 rounded">Tab</kbd>:
                    el foco queda atrapado adentro del modal (focus trap), no se escapa a
                    elementos de la página de atrás. Todo gratis con Radix.
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="ghost">Cancelar</Button>
                  <Button variant="default">Entendido</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="destructive">
                  <span className="material-symbols-outlined text-base">
                    delete
                  </span>
                  Borrar algo
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>¿Estás seguro?</DialogTitle>
                  <DialogDescription>
                    Esta acción no se puede deshacer. (Tranquilo, acá no borramos
                    nada de verdad — es solo una demo.)
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <Button variant="outline">Cancelar</Button>
                  <Button variant="destructive">Sí, borrar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <p className="text-xs text-on-surface-variant italic">
            💡 Patrón típico: Dialog para confirmaciones destructivas (verificar
            intención antes de borrar) o para forms que no justifican una ruta
            propia.
          </p>
        </div>
      </section>
    </div>
  );
}
