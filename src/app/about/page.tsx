import Link from "next/link";

const aprendizajes = [
  "Las rutas son carpetas: page.tsx dentro de app/ define cada URL.",
  "Los Server Components traen datos; los Client Components manejan la interacción.",
  "TypeScript tipa las props para cachar errores antes de ejecutar.",
];

export default function AboutPage() {
  return (
    <div className="flex flex-col items-center gap-4 py-10">
      <div className="w-full max-w-lg rounded-xl bg-surface-container p-8 shadow-md">
        <h1 className="font-display text-3xl text-on-surface">Acerca de este proyecto</h1>
        <p className="mt-2 text-sm text-on-surface-variant">
          DevLearn es mi espacio personal para aprender Next.js y TypeScript
          desde cero, construyendo la propia app donde estudio.
        </p>

        <h2 className="mt-6 font-display text-xl text-on-surface">
          Lo que he aprendido hasta ahora
        </h2>
        <ul className="mt-2 flex flex-col gap-2">
          {aprendizajes.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 rounded-lg bg-surface-container-low p-3 text-sm text-on-surface-variant"
            >
              <span className="material-symbols-outlined mt-0.5 text-[18px] text-secondary">
                check_circle
              </span>
              {item}
            </li>
          ))}
        </ul>

        <Link
          href="/practica"
          className="mt-6 flex items-center gap-1.5 text-sm text-primary hover:text-primary-fixed"
        >
          Ver el laboratorio
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
