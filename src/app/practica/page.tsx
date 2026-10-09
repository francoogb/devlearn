// Laboratorio (/practica) — Server Component con dos demos:
// 1. ListaUsuarios: fetch en el servidor (dentro de <Suspense>)
// 2. Contador: Client Component interactivo

import { Suspense } from "react";
import Contador from "@/components/Contador";

interface Usuario {
  id: number;
  name: string;
  email: string;
}

// Componente asíncrono: hace el fetch en el servidor
async function ListaUsuarios() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const usuarios: Usuario[] = await res.json();

  return (
    <ul className="flex flex-col gap-2">
      {usuarios.map((u) => (
        <li
          key={u.id}
          className="flex flex-col rounded-lg bg-surface-container-low p-3"
        >
          <span className="text-sm font-semibold text-on-surface">{u.name}</span>
          <span className="font-mono text-xs text-on-surface-variant">{u.email}</span>
        </li>
      ))}
    </ul>
  );
}

export default function PracticaPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* Encabezado */}
      <div className="rounded-xl bg-surface-container p-6 shadow-sm">
        <h1 className="font-display text-3xl text-on-surface">🧪 Laboratorio</h1>
        <p className="mt-1 text-sm text-on-surface-variant">
          Dos demos juntas: datos traídos en el servidor (izquierda) e
          interacción en el navegador (derecha). El patrón más común de Next.js.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
        {/* Demo servidor */}
        <section className="flex flex-col gap-3 rounded-xl bg-surface-container-low p-4 shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl text-on-surface">
              Datos desde el servidor
            </h2>
            <span className="rounded-full bg-primary/15 px-2 py-0.5 font-mono text-xs text-primary">
              Server Component
            </span>
          </div>
          <p className="text-xs text-on-surface-variant">
            Este <code className="font-mono text-tertiary">fetch</code> ocurre en
            el servidor, antes de que el navegador reciba el HTML.
          </p>
          <Suspense fallback={<p className="font-mono text-xs text-outline">Cargando usuarios...</p>}>
            <ListaUsuarios />
          </Suspense>
        </section>

        {/* Demo cliente */}
        <section className="flex flex-col gap-3 rounded-xl bg-surface-container-low p-4 shadow-md">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-xl text-on-surface">
              Interacción en el navegador
            </h2>
            <span className="rounded-full bg-secondary/15 px-2 py-0.5 font-mono text-xs text-secondary">
              Client Component
            </span>
          </div>
          <p className="text-xs text-on-surface-variant">
            <code className="font-mono text-tertiary">Contador.tsx</code> usa{" "}
            <code className="font-mono text-tertiary">useState</code> y eventos,
            así que necesita{" "}
            <code className="font-mono text-tertiary">&quot;use client&quot;</code>.
          </p>
          <Contador />
        </section>
      </div>
    </div>
  );
}
