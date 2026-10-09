// Página /ejercicios — Bitácora y Espacio de Progreso de Fran.
// Client Component:
// 1. Catálogo interactivo de tarjetas diferenciadas por tecnología (JS, TS, React, etc.).
// 2. Filtro rápido de JavaScript para revisar todos los ejercicios de JS vistos.
// 3. Espacio para que Fran agregue sus propios ejercicios y ejemplos con código JS.
// 4. Sección de notas y comentarios por ejercicio para registrar mejoras y reflexiones.
// 5. Persistencia automática en el navegador (localStorage).

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { conceptNameById, exercises as baseExercises, concepts } from "@/lib/progress";
import type { Exercise } from "@/types/progress";

// Formateo de fecha legible en español
function formatDate(isoDate: string): string {
  try {
    return new Date(isoDate).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return isoDate;
  }
}

// Estilos visuales diferenciados por categoría
interface CategoryTheme {
  border: string;
  badgeBg: string;
  badgeText: string;
  icon: string;
  iconColor: string;
  label: string;
}

const categoryThemes: Record<string, CategoryTheme> = {
  js: {
    border: "border-amber-500/40 hover:border-amber-400",
    badgeBg: "bg-amber-500/15",
    badgeText: "text-amber-300",
    icon: "javascript",
    iconColor: "text-amber-400",
    label: "JavaScript",
  },
  react: {
    border: "border-cyan-500/40 hover:border-cyan-400",
    badgeBg: "bg-cyan-500/15",
    badgeText: "text-cyan-300",
    icon: "hub",
    iconColor: "text-cyan-400",
    label: "React & Next.js",
  },
  ts: {
    border: "border-blue-500/40 hover:border-blue-400",
    badgeBg: "bg-blue-500/15",
    badgeText: "text-blue-300",
    icon: "code_blocks",
    iconColor: "text-blue-400",
    label: "TypeScript",
  },
  algoritmos: {
    border: "border-purple-500/40 hover:border-purple-400",
    badgeBg: "bg-purple-500/15",
    badgeText: "text-purple-300",
    icon: "reorder",
    iconColor: "text-purple-400",
    label: "Algoritmos",
  },
  estructuras: {
    border: "border-emerald-500/40 hover:border-emerald-400",
    badgeBg: "bg-emerald-500/15",
    badgeText: "text-emerald-300",
    icon: "schema",
    iconColor: "text-emerald-400",
    label: "Estructuras",
  },
};

interface UserComment {
  id: string;
  text: string;
  date: string;
}

export default function EjerciciosPage() {
  // Estado de ejercicios personalizados creados por Fran
  const [customExercises, setCustomExercises] = useState<Exercise[]>([]);
  // Comentarios / notas por ejercicio (indexado por ID de ejercicio)
  const [commentsMap, setCommentsMap] = useState<Record<number, UserComment[]>>({});

  // Filtros y búsqueda
  const [filterCategory, setFilterCategory] = useState<string>("todos");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [expandAll, setExpandAll] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);

  // Modal / Formulario para añadir ejercicio nuevo
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<"js" | "react" | "ts" | "algoritmos" | "estructuras">("js");
  const [newConceptId, setNewConceptId] = useState(concepts[0]?.id ?? "variables");
  const [newCodeSnippet, setNewCodeSnippet] = useState("");
  const [newWhatChanged, setNewWhatChanged] = useState("");
  const [newWhatWasHard, setNewWhatWasHard] = useState("");
  const [newCodePath, setNewCodePath] = useState("mis-ejercicios/mi-script.js");

  // Estado para input de nuevo comentario en la tarjeta activa
  const [commentInputs, setCommentInputs] = useState<Record<number, string>>({});

  // Carga inicial desde localStorage al montar en el cliente
  useEffect(() => {
    try {
      const savedExercises = localStorage.getItem("fran_custom_exercises");
      if (savedExercises) {
        setCustomExercises(JSON.parse(savedExercises));
      }
      const savedComments = localStorage.getItem("fran_exercise_comments");
      if (savedComments) {
        setCommentsMap(JSON.parse(savedComments));
      }
    } catch {
      // Ignorar fallos de parseo
    }
  }, []);

  // Guardar ejercicios de Fran en localStorage
  const saveCustomExercises = (newCustomList: Exercise[]) => {
    setCustomExercises(newCustomList);
    try {
      localStorage.setItem("fran_custom_exercises", JSON.stringify(newCustomList));
    } catch (e) {
      console.error("Error guardando ejercicios en localStorage", e);
    }
  };

  // Guardar comentarios en localStorage
  const saveComments = (newCommentsMap: Record<number, UserComment[]>) => {
    setCommentsMap(newCommentsMap);
    try {
      localStorage.setItem("fran_exercise_comments", JSON.stringify(newCommentsMap));
    } catch (e) {
      console.error("Error guardando comentarios en localStorage", e);
    }
  };

  // Handler para crear ejercicio nuevo de Fran
  const handleCreateExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const nuevo: Exercise = {
      id: Date.now(), // ID único basado en timestamp
      title: newTitle.trim(),
      conceptId: newConceptId,
      category: newCategory,
      language:
        newCategory === "js"
          ? "JavaScript"
          : newCategory === "ts"
            ? "TypeScript"
            : newCategory === "react"
              ? "React / Next.js"
              : newCategory === "algoritmos"
                ? "Algoritmos (JS)"
                : "Estructuras de Datos",
      date: new Date().toISOString().split("T")[0],
      codePath: newCodePath.trim() || "mis-ejercicios/script.js",
      whatChanged: newWhatChanged.trim() || "Práctica personal creada en mi entorno.",
      whatWasHard: newWhatWasHard.trim() || "Reflexión y aprendizaje de la práctica.",
      codeSnippet: newCodeSnippet.trim(),
    };

    const updated = [nuevo, ...customExercises];
    saveCustomExercises(updated);

    // Resetear formulario
    setNewTitle("");
    setNewCodeSnippet("");
    setNewWhatChanged("");
    setNewWhatWasHard("");
    setShowAddForm(false);
    setFilterCategory("fran"); // Llevar a ver el ejercicio recién creado
  };

  // Handler para borrar ejercicio de Fran
  const handleDeleteExercise = (id: number) => {
    if (confirm("¿Seguro que deseas eliminar este ejercicio de tu bitácora?")) {
      const updated = customExercises.filter((e) => e.id !== id);
      saveCustomExercises(updated);
    }
  };

  // Handler para agregar comentario a cualquier ejercicio
  const handleAddComment = (exerciseId: number) => {
    const text = (commentInputs[exerciseId] ?? "").trim();
    if (!text) return;

    const newComment: UserComment = {
      id: `${Date.now()}-${Math.random()}`,
      text,
      date: new Date().toISOString().split("T")[0],
    };

    const currentList = commentsMap[exerciseId] ?? [];
    const updatedMap = {
      ...commentsMap,
      [exerciseId]: [...currentList, newComment],
    };

    saveComments(updatedMap);
    setCommentInputs((prev) => ({ ...prev, [exerciseId]: "" }));
  };

  // Combinar ejercicios base con los ejercicios personalizados de Fran
  const allExercises: (Exercise & { isCustom?: boolean })[] = [
    ...customExercises.map((e) => ({ ...e, isCustom: true })),
    ...baseExercises,
  ];

  // Ordenar más recientes primero
  const sorted = [...allExercises].sort((a, b) => b.date.localeCompare(a.date));

  // Conteos
  const jsCount = sorted.filter(
    (e) =>
      e.category === "js" ||
      e.language?.toLowerCase().includes("javascript") ||
      e.language?.toLowerCase().includes("js")
  ).length;

  const franCount = customExercises.length;

  // Filtrado
  const filtered = sorted.filter((e) => {
    if (filterCategory === "fran") {
      if (!e.isCustom) return false;
    } else if (filterCategory === "js") {
      const isJs =
        e.category === "js" ||
        e.language?.toLowerCase().includes("javascript") ||
        e.language?.toLowerCase().includes("js");
      if (!isJs) return false;
    } else if (filterCategory !== "todos" && e.category !== filterCategory) {
      return false;
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = e.title.toLowerCase().includes(q);
      const matchConcept = conceptNameById(e.conceptId).toLowerCase().includes(q);
      const matchWhatChanged = e.whatChanged.toLowerCase().includes(q);
      const matchCodePath = e.codePath.toLowerCase().includes(q);
      const matchCode = (e.codeSnippet ?? "").toLowerCase().includes(q);
      return matchTitle || matchConcept || matchWhatChanged || matchCodePath || matchCode;
    }

    return true;
  });

  const toggleExpand = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const handleCopyCode = (id: number, code?: string) => {
    if (!code) return;
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Encabezado */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface-container-low px-6 py-5 shadow-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[28px] text-primary">
              checklist
            </span>
            <h1 className="font-display text-2xl font-bold text-on-surface">
              Bitácora y Mejora Continua de Fran
            </h1>
          </div>
          <p className="text-sm text-on-surface-variant">
            Espacio personal de práctica: añade tus propios ejercicios de JS, anota tu código, deja comentarios de aprendizaje y observa tu evolución.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 font-mono text-xs font-bold text-on-secondary shadow-md transition-all hover:bg-secondary-fixed active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">add_circle</span>
            + Añadir mi ejercicio de JS
          </button>
        </div>
      </div>

      {/* Métricas rápidas del progreso de Fran */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="flex flex-col rounded-xl bg-surface-container-low p-4 shadow-sm">
          <span className="font-mono text-2xl font-bold text-amber-300">
            {jsCount}
          </span>
          <span className="text-xs text-on-surface-variant">Ejercicios de JavaScript</span>
        </div>
        <div className="flex flex-col rounded-xl bg-surface-container-low p-4 shadow-sm">
          <span className="font-mono text-2xl font-bold text-secondary">
            {franCount}
          </span>
          <span className="text-xs text-on-surface-variant">Creados por Fran</span>
        </div>
        <div className="flex flex-col rounded-xl bg-surface-container-low p-4 shadow-sm">
          <span className="font-mono text-2xl font-bold text-primary">
            {allExercises.length}
          </span>
          <span className="text-xs text-on-surface-variant">Total en Bitácora</span>
        </div>
        <div className="flex flex-col rounded-xl bg-surface-container-low p-4 shadow-sm">
          <span className="font-mono text-2xl font-bold text-tertiary">
            {Object.values(commentsMap).reduce((acc, c) => acc + c.length, 0)}
          </span>
          <span className="text-xs text-on-surface-variant">Notas & Comentarios</span>
        </div>
      </div>

      {/* FORMULARIO MODAL: Agregar nuevo ejercicio de Fran */}
      {showAddForm && (
        <section className="flex flex-col gap-4 rounded-xl border border-secondary/40 bg-surface-container-low p-6 shadow-xl">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-3">
            <div className="flex items-center gap-2 text-secondary">
              <span className="material-symbols-outlined text-[24px]">code</span>
              <h2 className="font-display text-xl font-bold text-on-surface">
                Registrar nuevo ejercicio / ejemplo de JavaScript (Fran)
              </h2>
            </div>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="rounded-lg p-1 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          <form onSubmit={handleCreateExercise} className="flex flex-col gap-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <div className="flex flex-col gap-1 md:col-span-2">
                <label className="font-mono text-xs text-on-surface-variant">
                  Título del ejercicio o desafío:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Filtro de productos con reduce() o Validador de formulario"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="rounded-lg bg-surface-container px-3 py-2 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-mono text-xs text-on-surface-variant">
                  Categoría técnica:
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="rounded-lg bg-surface-container px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
                >
                  <option value="js">JavaScript (Puro / ES6+)</option>
                  <option value="algoritmos">Algoritmos en JS</option>
                  <option value="estructuras">Estructuras de Datos</option>
                  <option value="react">React / Next.js</option>
                  <option value="ts">TypeScript</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="font-mono text-xs text-on-surface-variant">
                  Concepto relacionado:
                </label>
                <select
                  value={newConceptId}
                  onChange={(e) => setNewConceptId(e.target.value)}
                  className="rounded-lg bg-surface-container px-3 py-2 text-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-secondary"
                >
                  {concepts.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.id})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-mono text-xs text-on-surface-variant">
                  Ruta del archivo o apunte (opcional):
                </label>
                <input
                  type="text"
                  placeholder="Ej: mis-ejercicios/filtro.js"
                  value={newCodePath}
                  onChange={(e) => setNewCodePath(e.target.value)}
                  className="rounded-lg bg-surface-container px-3 py-2 text-sm text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>
            </div>

            {/* Código JS */}
            <div className="flex flex-col gap-1">
              <label className="font-mono text-xs text-on-surface-variant">
                Tu código JavaScript / solución:
              </label>
              <textarea
                rows={6}
                placeholder={`function miFuncion(arr) {\n  // Tu código de práctica aquí...\n  return arr.filter(x => x > 0);\n}`}
                value={newCodeSnippet}
                onChange={(e) => setNewCodeSnippet(e.target.value)}
                className="rounded-lg bg-surface-container-lowest p-3 font-mono text-xs leading-relaxed text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1">
                <label className="font-mono text-xs text-secondary">
                  Qué cambié / Qué construí:
                </label>
                <textarea
                  rows={2}
                  placeholder="Ej: Escribí una función que filtra y suma en un solo paso con reduce()."
                  value={newWhatChanged}
                  onChange={(e) => setNewWhatChanged(e.target.value)}
                  className="rounded-lg bg-surface-container p-2.5 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="font-mono text-xs text-tertiary">
                  Qué me costó / Mi aprendizaje / Notas de mejora:
                </label>
                <textarea
                  rows={2}
                  placeholder="Ej: Recordar el valor inicial del acumulador para evitar NaN."
                  value={newWhatWasHard}
                  onChange={(e) => setNewWhatWasHard(e.target.value)}
                  className="rounded-lg bg-surface-container p-2.5 text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-secondary"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="rounded-lg px-4 py-2 font-mono text-xs text-on-surface-variant hover:bg-surface-container"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="rounded-lg bg-secondary px-5 py-2 font-mono text-xs font-bold text-on-secondary shadow-md transition-all hover:bg-secondary-fixed active:scale-95"
              >
                Guardar Ejercicio en mi Bitácora
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Filtros por Categoría, Fran, y Buscador */}
      <div className="flex flex-col gap-3 rounded-xl bg-surface-container-low p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-mono text-xs uppercase tracking-wider text-outline">
            Filtros y Vistas:
          </span>

          <button
            type="button"
            onClick={() => setExpandAll((prev) => !prev)}
            className="flex items-center gap-1 font-mono text-xs text-primary hover:underline"
          >
            <span className="material-symbols-outlined text-[16px]">
              {expandAll ? "unfold_less" : "unfold_more"}
            </span>
            {expandAll ? "Contraer todos los códigos" : "Expandir todos los códigos"}
          </button>
        </div>

        {/* Botones de filtro rápido */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setFilterCategory("todos")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-xs font-medium transition-all ${
              filterCategory === "todos"
                ? "bg-primary font-bold text-on-primary shadow-sm"
                : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">grid_view</span>
            Todos ({allExercises.length})
          </button>

          {/* BOTÓN CLAVE: Ver todos los de JS */}
          <button
            type="button"
            onClick={() => setFilterCategory("js")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-xs font-medium transition-all ${
              filterCategory === "js"
                ? "bg-amber-500 font-bold text-black shadow-md ring-2 ring-amber-400"
                : "bg-surface-container text-amber-300 hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">javascript</span>
            JavaScript ({jsCount}) — Ver todos los de JS
          </button>

          {/* BOTÓN CLAVE: Mis Ejercicios de Fran */}
          <button
            type="button"
            onClick={() => setFilterCategory("fran")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-xs font-medium transition-all ${
              filterCategory === "fran"
                ? "bg-secondary font-bold text-on-secondary shadow-md ring-2 ring-secondary"
                : "bg-surface-container text-secondary hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">star</span>
            Mis Ejercicios / Fran ({franCount})
          </button>

          <button
            type="button"
            onClick={() => setFilterCategory("react")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-xs font-medium transition-all ${
              filterCategory === "react"
                ? "bg-cyan-500 font-bold text-black shadow-md"
                : "bg-surface-container text-cyan-300 hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">hub</span>
            React & Next.js ({sorted.filter((e) => e.category === "react").length})
          </button>

          <button
            type="button"
            onClick={() => setFilterCategory("ts")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-xs font-medium transition-all ${
              filterCategory === "ts"
                ? "bg-blue-600 font-bold text-white shadow-md"
                : "bg-surface-container text-blue-300 hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">code_blocks</span>
            TypeScript ({sorted.filter((e) => e.category === "ts").length})
          </button>

          <button
            type="button"
            onClick={() => setFilterCategory("algoritmos")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-xs font-medium transition-all ${
              filterCategory === "algoritmos"
                ? "bg-purple-600 font-bold text-white shadow-md"
                : "bg-surface-container text-purple-300 hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">reorder</span>
            Algoritmos ({sorted.filter((e) => e.category === "algoritmos").length})
          </button>

          <button
            type="button"
            onClick={() => setFilterCategory("estructuras")}
            className={`flex items-center gap-1.5 rounded-lg px-3 py-2 font-mono text-xs font-medium transition-all ${
              filterCategory === "estructuras"
                ? "bg-emerald-600 font-bold text-white shadow-md"
                : "bg-surface-container text-emerald-300 hover:bg-surface-container-high"
            }`}
          >
            <span className="material-symbols-outlined text-[16px]">schema</span>
            Estructuras ({sorted.filter((e) => e.category === "estructuras").length})
          </button>
        </div>

        {/* Buscador */}
        <div className="relative mt-1">
          <span className="material-symbols-outlined pointer-events-none absolute left-3 top-2.5 text-[18px] text-outline">
            search
          </span>
          <input
            type="text"
            placeholder="Buscar por título, concepto, qué cambié o texto de código..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg bg-surface-container py-2 pl-10 pr-4 font-mono text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
      </div>

      {/* Grid de Tarjetas Diferenciadas */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl bg-surface-container-low p-10 text-center shadow-md">
          <span className="material-symbols-outlined text-[48px] text-outline">
            search_off
          </span>
          <p className="text-base text-on-surface-variant">
            {filterCategory === "fran"
              ? "Aún no has registrado ejercicios propios. ¡Haz clic en '+ Añadir mi ejercicio de JS' para empezar tu bitácora!"
              : "No se encontraron ejercicios con el filtro seleccionado."}
          </p>
          {filterCategory === "fran" && (
            <button
              type="button"
              onClick={() => setShowAddForm(true)}
              className="mt-2 rounded-lg bg-secondary px-4 py-2 font-mono text-xs font-bold text-on-secondary"
            >
              + Crear mi primer ejercicio
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((exercise) => {
            const theme =
              categoryThemes[exercise.category ?? "js"] ?? categoryThemes.js;
            const isExpanded = expandAll || expandedId === exercise.id;
            const comments = commentsMap[exercise.id] ?? [];
            const isCustom = exercise.isCustom;

            return (
              <article
                key={exercise.id}
                onClick={() => toggleExpand(exercise.id)}
                className={`group flex cursor-pointer flex-col justify-between rounded-xl border bg-surface-container-low p-5 shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg ${
                  isCustom
                    ? "border-secondary/60 ring-1 ring-secondary/20"
                    : theme.border
                }`}
              >
                <div className="flex flex-col gap-3">
                  {/* Cabecera de la tarjeta */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span
                        className={`material-symbols-outlined rounded-lg p-1.5 text-[20px] bg-surface-container ${
                          isCustom ? "text-secondary" : theme.iconColor
                        }`}
                      >
                        {isCustom ? "star" : theme.icon}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 font-mono text-[11px] font-semibold ${
                          isCustom
                            ? "bg-secondary/20 text-secondary"
                            : `${theme.badgeBg} ${theme.badgeText}`
                        }`}
                      >
                        {isCustom ? "⭐ Ejercicio de Fran" : exercise.language ?? theme.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-outline">
                        {formatDate(exercise.date)}
                      </span>
                      {isCustom && (
                        <button
                          type="button"
                          title="Eliminar este ejercicio"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteExercise(exercise.id);
                          }}
                          className="rounded p-1 text-outline transition-colors hover:bg-surface-container hover:text-error"
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            delete
                          </span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Título de la tarjeta */}
                  <h2 className="font-display text-lg font-bold text-on-surface transition-colors group-hover:text-primary">
                    {exercise.title}
                  </h2>

                  {/* Concepto asociado */}
                  <div className="flex items-center gap-1.5">
                    <span className="font-mono text-xs text-outline">Concepto:</span>
                    <Link
                      href="/progreso"
                      onClick={(e) => e.stopPropagation()}
                      className="rounded bg-surface-container px-2 py-0.5 font-mono text-xs text-primary transition-colors hover:bg-surface-container-high"
                    >
                      {conceptNameById(exercise.conceptId)}
                    </Link>
                  </div>

                  {/* Ruta de archivo */}
                  <div className="flex items-center gap-1.5 rounded-lg bg-surface-container-lowest px-2.5 py-1.5 font-mono text-xs text-on-surface-variant">
                    <span className="material-symbols-outlined text-[14px] text-tertiary">
                      code
                    </span>
                    <span className="truncate">{exercise.codePath}</span>
                  </div>

                  {/* Qué cambié y Qué me costó */}
                  <div className="flex flex-col gap-2.5 pt-1">
                    <div className="flex flex-col gap-0.5">
                      <span className="flex items-center gap-1 font-mono text-xs font-semibold text-secondary">
                        <span className="material-symbols-outlined text-[14px]">
                          edit
                        </span>
                        Qué cambié / Lógica:
                      </span>
                      <p className="text-sm leading-relaxed text-on-surface-variant">
                        {exercise.whatChanged}
                      </p>
                    </div>

                    <div className="flex flex-col gap-0.5">
                      <span className="flex items-center gap-1 font-mono text-xs font-semibold text-tertiary">
                        <span className="material-symbols-outlined text-[14px]">
                          psychology
                        </span>
                        Qué me costó / Reflexión:
                      </span>
                      <p className="text-sm leading-relaxed text-on-surface-variant">
                        {exercise.whatWasHard}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sección inferior interactiva: Código y Comentarios */}
                <div className="mt-4 border-t border-surface-container-high pt-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 font-mono text-xs font-medium text-primary group-hover:underline">
                      <span className="material-symbols-outlined text-[16px]">
                        {isExpanded ? "expand_less" : "expand_more"}
                      </span>
                      {isExpanded ? "Ocultar código & notas" : "Ver código & notas de Fran"}
                    </span>
                    <span className="font-mono text-[11px] text-outline">
                      {comments.length > 0 ? `💬 ${comments.length}` : `#${exercise.id}`}
                    </span>
                  </div>

                  {/* Detalle expandido */}
                  {isExpanded && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="mt-3 flex flex-col gap-3"
                    >
                      {/* Código del ejercicio */}
                      {exercise.codeSnippet && (
                        <div className="flex flex-col gap-1.5 rounded-lg bg-surface-container-lowest p-3 font-mono text-xs shadow-inner">
                          <div className="flex items-center justify-between pb-1 text-outline">
                            <span className="font-mono text-[11px] text-secondary">
                              {exercise.language ?? "Código JavaScript"}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                handleCopyCode(exercise.id, exercise.codeSnippet)
                              }
                              className="flex items-center gap-1 rounded bg-surface-container px-2 py-0.5 font-mono text-[11px] text-on-surface hover:bg-surface-container-high"
                            >
                              <span className="material-symbols-outlined text-[12px]">
                                {copiedId === exercise.id ? "check" : "content_copy"}
                              </span>
                              {copiedId === exercise.id ? "¡Copiado!" : "Copiar"}
                            </button>
                          </div>
                          <pre className="overflow-x-auto text-[13px] leading-relaxed text-on-surface">
                            {exercise.codeSnippet}
                          </pre>
                        </div>
                      )}

                      {/* SECCIÓN DE COMENTARIOS / NOTAS DE PROGRESO DE FRAN */}
                      <div className="flex flex-col gap-2 rounded-lg bg-surface-container p-3">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface">
                          <span className="material-symbols-outlined text-[16px] text-tertiary">
                            chat
                          </span>
                          <span>Comentarios y Notas de Mejora de Fran:</span>
                        </div>

                        {/* Lista de comentarios existentes */}
                        {comments.length > 0 ? (
                          <div className="flex flex-col gap-1.5">
                            {comments.map((c) => (
                              <div
                                key={c.id}
                                className="flex flex-col rounded bg-surface-container-low p-2 text-xs"
                              >
                                <div className="flex items-center justify-between text-[11px] text-outline font-mono">
                                  <span>Fran</span>
                                  <span>{formatDate(c.date)}</span>
                                </div>
                                <p className="mt-0.5 text-on-surface leading-relaxed">
                                  {c.text}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs italic text-outline">
                            Aún no hay comentarios en este ejercicio. Deja una nota sobre qué puedes mejorar o qué practicaste hoy.
                          </p>
                        )}

                        {/* Input para agregar comentario rápido */}
                        <div className="mt-1 flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Dejar nota personal (ej. 'Hoy lo reescribí con map y quedó más limpio')..."
                            value={commentInputs[exercise.id] ?? ""}
                            onChange={(e) =>
                              setCommentInputs((prev) => ({
                                ...prev,
                                [exercise.id]: e.target.value,
                              }))
                            }
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                handleAddComment(exercise.id);
                              }
                            }}
                            className="flex-1 rounded bg-surface-container-lowest px-2.5 py-1.5 font-mono text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary"
                          />
                          <button
                            type="button"
                            onClick={() => handleAddComment(exercise.id)}
                            className="rounded bg-primary-container px-2.5 py-1.5 font-mono text-xs font-semibold text-on-primary-container hover:bg-primary"
                          >
                            Anotar
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
