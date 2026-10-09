import Link from "next/link";

export default function ContactoPage() {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <div className="w-full max-w-md rounded-xl bg-surface-container p-8 shadow-md">
        <h1 className="font-display text-3xl text-on-surface">Contacto</h1>
        <p className="mt-2 text-sm text-on-surface-variant">
          ¿Dudas sobre el proyecto? Escríbeme a:
        </p>
        <p className="mt-3 rounded-lg bg-surface-container-low p-3 text-center font-mono text-sm text-secondary">
          contacto@devlearn.app
        </p>
        <Link
          href="/"
          className="mt-6 flex items-center gap-1.5 text-sm text-primary hover:text-primary-fixed"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
