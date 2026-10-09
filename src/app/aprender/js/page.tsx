// Página /aprender/js — placeholder de la futura sección de JavaScript.
// Server Component: solo presenta el aviso de que el contenido está en camino.

import Link from "next/link";

export default function AprenderJsPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-surface-container-low px-6 py-4 shadow-md">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-2xl text-on-surface">JavaScript</h1>
          <p className="text-sm text-on-surface-variant">
            Fundamentos de JS: la base de todo lo demás.
          </p>
        </div>
        <span className="rounded-full bg-tertiary-container/30 px-1.5 py-0.5 font-mono text-xs uppercase tracking-wider text-tertiary">
          En construcción
        </span>
      </div>

      <div className="flex flex-col items-center gap-3 rounded-xl bg-surface-container-low p-10 text-center shadow-md">
        <span className="material-symbols-outlined text-[48px] text-primary">
          javascript
        </span>
        <p className="max-w-md text-sm text-on-surface-variant">
          Esta sección está en camino. Aquí irán las lecciones de JavaScript:
          variables, funciones, arreglos, objetos y más, con ejemplos lado a
          lado con TypeScript.
        </p>
        <div className="flex items-center gap-4">
          <Link
            href="/ejercicios"
            className="flex items-center gap-1 rounded-lg bg-surface-container-high px-3 py-1.5 text-xs text-on-surface-variant transition-colors hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[16px]">checklist</span>
            Ver ejercicios resueltos
          </Link>
          <Link
            href="/aprender/ts"
            className="flex items-center gap-1 rounded-lg bg-surface-container-high px-3 py-1.5 text-xs text-on-surface-variant transition-colors hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[16px]">code_blocks</span>
            Ir a la sección de TS
          </Link>
        </div>
      </div>
    </div>
  );
}
