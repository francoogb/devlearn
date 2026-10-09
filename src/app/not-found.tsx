import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-4 py-16 text-center">
      <p className="font-mono text-7xl font-bold text-primary">404</p>
      <h1 className="font-display text-2xl text-on-surface">
        Página no encontrada
      </h1>
      <p className="max-w-md text-sm text-on-surface-variant">
        La ruta que buscas no existe... todavía. En Next.js, crear{" "}
        <code className="rounded bg-surface-container-high px-1.5 py-0.5 font-mono text-xs text-tertiary">
          src/app/&lt;ruta&gt;/page.tsx
        </code>{" "}
        la haría realidad.
      </p>
      <Link
        href="/"
        className="mt-2 flex items-center gap-2 rounded-full bg-secondary px-6 py-2.5 text-sm font-bold text-on-secondary shadow-md transition-all hover:brightness-110 active:scale-95"
      >
        <span className="material-symbols-outlined text-[18px]">home</span>
        Volver al inicio
      </Link>
    </div>
  );
}
