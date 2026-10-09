// Vista de lección (estándar DevLearn) — Lección de React + Next.js.
// Misma plantilla que /aprender/ts: solo cambian los datos que se pasan
// por props a los componentes reutilizables. Así funciona la
// componibilidad: escribir una vez, usar en todas partes.

import Link from "next/link";
import RutaAprendizaje from "@/components/leccion/RutaAprendizaje";

const pasos = [
  { numero: 1, titulo: "¿Qué es el App Router?", detalle: "+30 XP", estado: "completado" as const },
  { numero: 2, titulo: "Rutas = carpetas", detalle: "+40 XP", estado: "completado" as const },
  { numero: 3, titulo: "Server vs Client Components", detalle: "En progreso actual", estado: "activo" as const },
  { numero: 4, titulo: "Reto Práctico: Contador", detalle: "Ejercicio interactivo", estado: "pendiente" as const },
  { numero: 5, titulo: "Autoevaluación Final", detalle: "3 preguntas de control", estado: "pendiente" as const },
];

export default function LeccionNextPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* ---------- Barra de contexto ---------- */}
      <div className="flex w-full flex-wrap items-center justify-between rounded-xl bg-surface-container-low px-6 py-2 shadow-md">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant">
            <span className="flex cursor-pointer items-center gap-1 text-primary hover:underline">
              <span className="material-symbols-outlined text-[16px]">data_object</span>
              React + Next.js
            </span>
            <span className="text-outline">/</span>
            <span className="cursor-pointer hover:text-on-surface">
              Módulo 02: Fundamentos de Next
            </span>
            <span className="text-outline">/</span>
            <span className="flex items-center gap-1 font-semibold text-on-surface">
              <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
              Lección 02: Server vs Client Components
            </span>
          </div>
          <span className="rounded-full bg-tertiary-container/30 px-1.5 py-0.5 font-mono text-xs uppercase tracking-wider text-tertiary">
            Nivel Básico
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <div className="flex items-center gap-1.5 rounded-lg bg-surface-container px-2 py-1 font-mono text-xs text-secondary">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            next-engine v16 [online]
          </div>
          <Link
            href="/aprender/ts"
            className="flex items-center gap-1 rounded-lg bg-surface-container-high px-2 py-1 font-mono text-xs text-on-surface-variant transition-colors hover:bg-surface-bright hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[16px]">keyboard</span>
            Lección anterior
          </Link>
        </div>
      </div>

      {/* ---------- Grid de 3 columnas ---------- */}
      <div className="grid grid-cols-12 items-start gap-4">
        {/* COLUMNA DERECHA (ruta + chuleta): en pantallas grandes va a la derecha */}
        <div className="col-span-12 flex flex-col gap-4 lg:order-2 lg:col-span-3">
          <RutaAprendizaje pasos={pasos} activo={3} />

          <div className="flex flex-col gap-3 rounded-xl bg-surface-container-low p-4 shadow-md">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-[20px]">sticky_note_2</span>
              <span className="font-display text-xl text-on-surface">
                Chuleta del Módulo
              </span>
            </div>
            <p className="text-xs text-on-surface-variant">
              Estructuras clave para recordar durante la sesión activa:
            </p>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1 rounded-lg bg-surface-container p-2.5">
                <span className="font-mono text-xs text-secondary">
                  &quot;use client&quot;
                </span>
                <span className="text-xs text-on-surface-variant">
                  Primera línea: habilita estado y eventos en el navegador.
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg bg-surface-container p-2.5">
                <span className="font-mono text-xs text-primary">await fetch(...)</span>
                <span className="text-xs text-on-surface-variant">
                  Solo en el servidor: trae datos antes de renderizar.
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg bg-surface-container p-2.5">
                <span className="font-mono text-xs text-tertiary">
                  carpeta/page.tsx
                </span>
                <span className="text-xs text-on-surface-variant">
                  La carpeta define la URL; page.tsx es la página.
                </span>
              </div>
            </div>
            <a
              href="https://nextjs.org/docs"
              target="_blank"
              className="mt-1 flex w-full items-center justify-center gap-1 rounded-lg bg-surface-container-high py-1.5 text-center font-mono text-xs text-primary transition-colors hover:text-primary-fixed"
            >
              <span className="material-symbols-outlined text-[16px]">open_in_new</span>
              Ver doc completa de Next.js
            </a>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL */}
        <div className="col-span-12 flex flex-col gap-4 lg:order-1 lg:col-span-9">
          <article className="flex flex-col gap-6 rounded-xl bg-surface-container-low p-6 shadow-md">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-secondary/15 px-2 py-0.5 font-mono text-xs text-secondary">
                  Paso 3 de 5
                </span>
                <span className="font-mono text-xs text-outline">
                  • Lectura estimada: 5 min
                </span>
              </div>
              <h1 className="font-display text-4xl leading-tight tracking-tight text-on-surface">
                ¿Dónde corre tu código:{" "}
                <code className="rounded bg-surface-container px-2 py-1 font-mono text-primary">
                  servidor
                </code>{" "}
                o{" "}
                <code className="rounded bg-surface-container px-2 py-1 font-mono text-secondary">
                  navegador
                </code>
                ?
              </h1>
              <p className="text-base text-on-surface-variant">
                En Next.js tu aplicación corre en DOS lugares. La pregunta que
                debes hacerte al crear cualquier archivo es una sola:{" "}
                <strong className="font-medium text-secondary">
                  ¿necesita interactuar con el usuario?
                </strong>{" "}
                Si sí: cliente. Si no: servidor.
              </p>
            </div>

            {/* Diagrama: decisión server/client */}
            <div className="flex flex-col gap-3 rounded-xl bg-surface-container p-4 shadow-inner">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 font-display text-xl text-on-surface">
                  <span className="material-symbols-outlined text-[20px] text-primary">
                    account_tree
                  </span>
                  Árbol de decisión
                </span>
                <span className="font-mono text-xs text-on-surface-variant">
                  Esquema Operativo
                </span>
              </div>
              <div className="flex w-full items-center justify-center rounded-lg bg-surface-container-lowest p-2">
                <svg
                  className="h-auto w-full max-w-md"
                  fill="none"
                  viewBox="0 0 420 180"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect fill="#171f33" height="50" rx="8" width="105" x="10" y="25" />
                  <text fill="#dae2fd" fontFamily="Space Grotesk" fontSize="12" fontWeight="600" textAnchor="middle" x="62" y="47">
                    Componente
                  </text>
                  <text fill="#c7c4d7" fontFamily="JetBrains Mono" fontSize="10" textAnchor="middle" x="62" y="63">
                    nuevo.tsx
                  </text>
                  <path d="M120 50 L155 50" stroke="#8083ff" strokeDasharray="3 3" strokeWidth="2" />
                  <polygon fill="#8083ff" points="155,47 163,50 155,53" />
                  <rect fill="#222a3d" height="70" rx="10" width="130" x="165" y="15" />
                  <text fill="#c0c1ff" fontFamily="JetBrains Mono" fontSize="11" fontWeight="bold" textAnchor="middle" x="230" y="38">
                    ¿Necesita
                  </text>
                  <text fill="#4edea3" fontFamily="JetBrains Mono" fontSize="11" textAnchor="middle" x="230" y="55">
                    interactividad?
                  </text>
                  <text fill="#908fa0" fontFamily="Plus Jakarta Sans" fontSize="9" textAnchor="middle" x="230" y="72">
                    estado, clicks, hooks
                  </text>
                  {/* Rama SÍ: cliente */}
                  <path d="M298 35 L335 35" stroke="#4edea3" strokeWidth="2" />
                  <polygon fill="#4edea3" points="335,32 343,35 335,38" />
                  <rect fill="#003824" height="40" rx="6" width="65" x="345" y="15" />
                  <text fill="#4edea3" fontFamily="Space Grotesk" fontSize="10" fontWeight="bold" textAnchor="middle" x="377" y="32">
                    SÍ
                  </text>
                  <text fill="#6ffbbe" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="377" y="47">
                    &quot;use client&quot;
                  </text>
                  {/* Rama NO: servidor */}
                  <path d="M230 87 L230 115 L335 115" stroke="#c0c1ff" strokeWidth="1.5" />
                  <polygon fill="#c0c1ff" points="335,112 343,115 335,118" />
                  <rect fill="#1000a9" height="35" rx="6" width="65" x="345" y="98" />
                  <text fill="#c0c1ff" fontFamily="Space Grotesk" fontSize="10" textAnchor="middle" x="377" y="115">
                    NO
                  </text>
                  <text fill="#dae2fd" fontFamily="JetBrains Mono" fontSize="9" textAnchor="middle" x="377" y="127">
                    servidor 🖥️
                  </text>
                  <text fill="#908fa0" fontFamily="Plus Jakarta Sans" fontSize="10" textAnchor="middle" x="210" y="165">
                    Empieza como Server Component; agrega &quot;use client&quot; solo si lo necesitas.
                  </text>
                </svg>
              </div>
            </div>

            {/* Analogía */}
            <div className="flex items-start gap-3 rounded-xl bg-surface-container p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-tertiary-container/20 text-tertiary">
                <span className="material-symbols-outlined text-[24px]">lightbulb</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display text-xl text-on-surface">
                  La Analogía del Restaurante
                </span>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  El <code className="font-mono text-tertiary">servidor</code> es
                  la cocina: prepara el plato (el HTML) con ingredientes que el
                  comensal nunca ve (base de datos, claves API). El{" "}
                  <code className="font-mono text-secondary">navegador</code> es
                  el comedor: el plato ya llega servido, pero allí ocurre la
                  interacción — el comensal prueba, pide, cambia de opinión
                  (clicks, estado).
                </p>
              </div>
            </div>

            {/* Trampa común */}
            <div className="flex items-start gap-3 rounded-xl bg-surface-container-high p-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-error/20 text-error">
                <span className="material-symbols-outlined text-[24px]">warning</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-display text-xl text-on-surface">
                  Trampa común: &quot;use client&quot; por todas partes
                </span>
                <p className="text-sm leading-relaxed text-on-surface-variant">
                  Si agregas{" "}
                  <span className="font-semibold text-on-surface">
                    &quot;use client&quot;
                  </span>{" "}
                  a todo, todo el código se envía al navegador: pierdes la
                  velocidad inicial, el SEO y la seguridad del servidor. Y al
                  revés: usar{" "}
                  <code className="font-mono text-error">useState</code> en un
                  Server Component da error de compilación.
                </p>
              </div>
            </div>

            {/* Buena práctica */}
            <div className="flex items-center gap-3 rounded-lg bg-surface-container p-3 text-secondary">
              <span className="material-symbols-outlined text-[20px] text-secondary">
                verified
              </span>
              <span className="text-xs text-on-surface">
                <strong>Buena Práctica:</strong> deja que los datos bajen del
                servidor (fetch, BD) y sube solo la interacción al cliente
                (botones, formularios). Uno Server envolviendo a varios Clients.
              </span>
            </div>
          </article>
        </div>
      </div>

      {/* ---------- Dock inferior ---------- */}
      <footer className="mt-1 flex w-full flex-wrap items-center justify-between gap-2 rounded-xl bg-surface-container-low px-6 py-2 shadow-lg">
        <div className="flex items-center gap-3">
          <Link
            href="/aprender/ts"
            className="flex items-center gap-1.5 rounded-lg bg-surface-container px-4 py-2 text-sm text-on-surface transition-colors hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Paso Anterior
          </Link>
          <Link
            href="/practica"
            title="Ir al laboratorio"
            className="rounded-lg bg-surface-container p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">bookmark_add</span>
          </Link>
        </div>

        <div className="flex min-w-72 items-center gap-4">
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center justify-between font-mono text-xs text-on-surface-variant">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-secondary">
                  trending_up
                </span>
                Progreso del Módulo 02
              </span>
              <span className="font-semibold text-secondary">40% completado</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
              <div className="h-full w-[40%] rounded-full bg-gradient-to-r from-primary via-secondary to-secondary-container transition-all duration-500" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="mr-1 hidden flex-col items-end sm:flex">
            <span className="font-mono text-xs font-bold text-secondary">+50 XP</span>
            <span className="text-[11px] text-outline">Recompensa por paso</span>
          </div>
          <Link
            href="/practica"
            className="flex items-center gap-2 rounded-full bg-secondary px-6 py-2.5 text-sm font-bold text-on-secondary shadow-md transition-all hover:brightness-110 active:scale-95"
          >
            Validar y Continuar
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
