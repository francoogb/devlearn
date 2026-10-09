// Ruta dinámica: responde en /saludo/cualquier-nombre
// En Next.js 15+ los params llegan como Promesa; en Next.js 16 el
// await debe ir dentro de <Suspense> para no bloquear el prerender.

import { Suspense } from "react";
import Link from "next/link";

interface SaludoPageProps {
  params: Promise<{ nombre: string }>;
}

async function Saludo({ params }: SaludoPageProps) {
  const { nombre } = await params;

  return (
    <div className="flex flex-col items-center gap-3 py-16 text-center">
      <span className="material-symbols-outlined text-[48px] text-primary">
        waving_hand
      </span>
      <h1 className="font-display text-5xl text-on-surface">
        ¡Hola, {nombre}! 👋
      </h1>
      <p className="max-w-md text-sm text-on-surface-variant">
        Esta página es{" "}
        <code className="rounded bg-surface-container-high px-1.5 py-0.5 font-mono text-xs text-tertiary">
          src/app/saludo/[nombre]/page.tsx
        </code>{" "}
        — el valor{" "}
        <code className="rounded bg-surface-container-high px-1.5 py-0.5 font-mono text-xs text-secondary">
          {nombre}
        </code>{" "}
        viene de la URL. Cámbialo en la barra de direcciones y recarga.
      </p>
    </div>
  );
}

export default function SaludoPage({ params }: SaludoPageProps) {
  return (
    <div>
      <Suspense
        fallback={
          <p className="py-16 text-center font-mono text-sm text-outline">
            Cargando saludo...
          </p>
        }
      >
        <Saludo params={params} />
      </Suspense>
      <div className="text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-primary-fixed"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
