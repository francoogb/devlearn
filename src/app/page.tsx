// Página principal (/) — Dashboard según el diseño de referencia "DevLearn".
// Server Component: solo presenta datos; lo interactivo (metas con
// checkboxes) vive en un Client Component importado.

import Link from "next/link";
import MetasSemanales from "@/components/MetasSemanales";
import RutaAprendizaje from "@/components/RutaAprendizaje";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      {/* ---------- Barra superior ---------- */}
      <header className="flex flex-wrap items-center justify-between gap-4 rounded-xl bg-surface-container px-5 py-3">
        <div className="flex min-w-56 flex-1 items-center gap-2 rounded-full bg-surface-container-low px-4 py-2 text-sm text-outline">
          <span className="material-symbols-outlined text-[18px]">search</span>
          Buscar sintaxis, frameworks, snippets...
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 font-mono text-xs text-secondary">
            <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
            Entorno Local Conectado
          </span>
          <span className="flex items-center gap-1 font-mono text-xs text-on-surface-variant">
            <span className="material-symbols-outlined text-[16px] text-tertiary">
              local_fire_department
            </span>
            12 Días en racha
          </span>
          <span className="material-symbols-outlined cursor-pointer text-on-surface-variant hover:text-on-surface">
            notifications
          </span>
        </div>
      </header>

      {/* ---------- Hero: saludo + nivel ---------- */}
      <section className="relative overflow-hidden rounded-xl bg-surface-container p-6 shadow-sm">
        <div className="pointer-events-none absolute -right-16 -top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-12 h-64 w-64 rounded-full bg-secondary/5 blur-2xl" />
        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 rounded-full bg-secondary/15 px-2 py-0.5 font-mono text-xs text-secondary">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                Modo compilación activo
              </span>
              <span className="flex items-center gap-1 rounded-full bg-tertiary-container/20 px-2 py-0.5 font-mono text-xs text-tertiary">
                <span className="material-symbols-outlined text-[14px]">
                  local_fire_department
                </span>
                12 días seguidos
              </span>
              <span className="font-mono text-xs text-on-surface-variant">
                {"// sesión: workspace-alpha"}
              </span>
            </div>
            <h1 className="mt-1 font-display text-4xl tracking-tight text-on-surface">
              ¡Hola Fran, a picar código!
            </h1>
            <p className="text-sm text-on-surface-variant">
              Tu entorno de compilación está listo. Tienes{" "}
              <strong className="text-on-surface">3 desafíos pendientes</strong>{" "}
              para asegurar tu racha semanal.
            </p>
          </div>

          {/* Pod de nivel */}
          <div className="flex min-w-72 flex-col gap-2 rounded-xl bg-surface-container-high p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
                <span className="font-mono text-xs text-on-surface">
                  Nivel 4: Apprentice
                </span>
              </div>
              <span className="rounded bg-primary/20 px-1.5 py-0.5 font-mono text-xs text-primary">
                85% XP
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-lowest">
              <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-secondary-container via-secondary to-primary-container" />
            </div>
            <div className="flex items-center justify-between font-mono text-xs text-on-surface-variant">
              <span>3,420 XP</span>
              <span>Nivel 5 (4,000 XP)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Grid principal: 8 cols / 4 cols ---------- */}
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-12">
        {/* COLUMNA IZQUIERDA */}
        <div className="flex flex-col gap-6 md:col-span-8">
          {/* Lección activa */}
          <section className="flex flex-col gap-4 overflow-hidden rounded-xl bg-surface-container p-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
                <span className="font-mono text-xs uppercase tracking-wider text-secondary">
                  En Progreso Activo
                </span>
                <span className="font-mono text-xs text-outline">•</span>
                <span className="font-mono text-xs text-on-surface-variant">
                  Módulo 4 de 7
                </span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg bg-surface-container-low px-2 py-1 font-mono text-xs text-on-surface-variant">
                <span className="material-symbols-outlined text-[16px]">schedule</span>
                ~18 min restantes hoy
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <h2 className="font-display text-2xl tracking-tight text-on-surface">
                Next.js y TypeScript: rutas, props y componentes
              </h2>
              <p className="text-sm text-on-surface-variant">
                Del archivo a la URL: cómo Next.js convierte carpetas en rutas y
                cómo TypeScript protege los datos que pasas entre componentes.
              </p>
            </div>

            {/* Vista previa de código */}
            <div className="flex flex-col gap-1 rounded-lg bg-surface-container-lowest p-4 font-mono text-xs text-on-surface shadow-inner">
              <div className="flex items-center justify-between pb-1 text-xs text-outline">
                <span className="flex items-center gap-1.5">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-error/70" />
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-tertiary-container/70" />
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-secondary/70" />
                  <span className="ml-2 text-on-surface-variant">
                    app/saludo/[nombre]/page.tsx
                  </span>
                </span>
                <span className="font-mono text-xs text-secondary">TS Activo</span>
              </div>
              <pre className="overflow-x-auto py-1 text-[13px] leading-relaxed">
                <span className="text-tertiary">interface</span>{" "}
                <span className="font-medium text-primary">SaludoProps</span> {"{"}
                {"\n"}  params: <span className="text-primary">Promise</span>
                {"<{"} nombre: <span className="text-primary-fixed-dim">string</span> {"}>"};
                {"\n"}{"}"}
                {"\n"}
                {"\n"}
                <span className="text-tertiary">async function</span>{" "}
                <span className="font-medium text-primary">Saludo</span>(
                {"{ params }"}: <span className="font-medium text-primary">SaludoProps</span>) {"{"}
                {"\n"}  <span className="text-tertiary">const</span> {"{ nombre }"} ={" "}
                <span className="text-tertiary">await</span> params;
                {"\n"}  <span className="text-tertiary">return</span>{" "}
                <span className="text-primary-fixed-dim">{"<h1>"}</span>¡Hola, {"{nombre}"}!
                <span className="text-primary-fixed-dim">{"</h1>"}</span>;
                {"\n"}{"}"}
              </pre>
            </div>

            <div className="flex flex-col justify-between gap-4 pt-1 sm:flex-row sm:items-center">
              <div className="flex w-full flex-col gap-1 sm:w-1/2">
                <div className="flex justify-between font-mono text-xs text-on-surface-variant">
                  <span>Dominio del módulo</span>
                  <span className="font-medium text-on-surface">68%</span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container-highest">
                  <div className="h-full w-[68%] rounded-full bg-secondary" />
                </div>
              </div>
              <Link
                href="/aprender/ts"
                className="flex items-center justify-center gap-1.5 rounded-full bg-secondary px-6 py-2 text-sm font-semibold text-on-secondary shadow-md transition-all hover:bg-secondary-fixed active:scale-95"
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
                Reanudar Lección
              </Link>
            </div>
          </section>

          {/* Rutas de estudio */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[22px] text-primary">
                  route
                </span>
                <h3 className="font-display text-xl text-on-surface">
                  Rutas de Estudio
                </h3>
              </div>
              <Link
                href="/aprender/next"
                className="flex items-center gap-0.5 text-sm text-primary hover:text-primary-fixed"
              >
                Ver todo
                <span className="material-symbols-outlined text-[16px]">
                  chevron_right
                </span>
              </Link>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Tarjeta: TypeScript */}
              <Link
                href="/aprender/ts"
                className="flex flex-col justify-between gap-4 rounded-xl bg-surface-container p-4 shadow-sm transition-colors hover:bg-surface-container-high"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-container/20 text-primary">
                      <span className="material-symbols-outlined text-[20px]">
                        code_blocks
                      </span>
                    </div>
                    <span className="rounded bg-surface-container-highest px-1.5 py-0.5 font-mono text-xs text-on-surface">
                      4 Secciones
                    </span>
                  </div>
                  <h4 className="mt-1 font-display text-xl text-on-surface">
                    TypeScript
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Tipos, interfaces y props tipadas, explicados visualmente.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-on-surface">Tipos · Interfaces · Props</span>
                    <span className="font-medium text-secondary">74% Total</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container-highest">
                    <div className="h-full w-[74%] rounded-full bg-secondary" />
                  </div>
                </div>
              </Link>

              {/* Tarjeta: Next.js */}
              <Link
                href="/aprender/next"
                className="flex flex-col justify-between gap-4 rounded-xl bg-surface-container p-4 shadow-sm transition-colors hover:bg-surface-container-high"
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-tertiary-container/20 text-tertiary">
                      <span className="material-symbols-outlined text-[20px]">hub</span>
                    </div>
                    <span className="rounded bg-surface-container-highest px-1.5 py-0.5 font-mono text-xs text-on-surface">
                      3 Secciones
                    </span>
                  </div>
                  <h4 className="mt-1 font-display text-xl text-on-surface">
                    React + Next.js
                  </h4>
                  <p className="text-xs text-on-surface-variant">
                    Rutas, Server vs Client Components y el layout con {"{children}"}.
                  </p>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between font-mono text-xs">
                    <span className="text-on-surface">Rutas · Server/Client · Layout</span>
                    <span className="font-medium text-primary">58% Total</span>
                  </div>
                  <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container-highest">
                    <div className="h-full w-[58%] rounded-full bg-primary" />
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* Metas semanales (interactivo) */}
          <MetasSemanales />
        </div>

        {/* COLUMNA DERECHA */}
        <div className="flex flex-col gap-6 md:col-span-4">
          {/* Ruta de Aprendizaje */}
          <RutaAprendizaje />

          {/* Scratchpad */}
          <section className="flex flex-col gap-4 rounded-xl bg-surface-container p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-tertiary">
                  sticky_note_2
                </span>
                <h3 className="font-display text-xl text-on-surface">Scratchpad</h3>
              </div>
              <span className="font-mono text-xs text-on-surface-variant">
                Buffer Volátil
              </span>
            </div>
            <textarea
              rows={3}
              placeholder="Apunta sintaxis rápida, flags de terminal, ideas..."
              className="w-full resize-none rounded-lg bg-surface-container-lowest p-2 font-mono text-xs text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1">
                <span className="cursor-pointer rounded bg-surface-container-high px-1.5 py-0.5 font-mono text-xs text-primary hover:bg-surface-bright">
                  +TODO
                </span>
                <span className="cursor-pointer rounded bg-surface-container-high px-1.5 py-0.5 font-mono text-xs text-error hover:bg-surface-bright">
                  +BUG
                </span>
                <span className="cursor-pointer rounded bg-surface-container-high px-1.5 py-0.5 font-mono text-xs text-secondary hover:bg-surface-bright">
                  +API
                </span>
              </div>
              <button
                type="button"
                className="flex items-center gap-1 rounded bg-primary-container px-2 py-1 font-mono text-xs font-medium text-on-primary-container hover:bg-primary"
              >
                <span className="material-symbols-outlined text-[14px]">save</span>
                Fijar
              </button>
            </div>
            {/* Nota fijada */}
            <div className="flex items-start justify-between gap-2 rounded-lg bg-surface-container-low p-2">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined mt-0.5 text-[16px] text-tertiary">
                  push_pin
                </span>
                <div className="flex flex-col">
                  <p className="font-mono text-xs text-on-surface">
                    Revisar{" "}
                    <code className="rounded bg-surface-container-highest px-1 py-0.5 text-secondary">
                      --force-with-lease
                    </code>{" "}
                    para git push
                  </p>
                  <span className="mt-0.5 font-mono text-[11px] text-outline">
                    Fijado hoy a las 10:14
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Cheat sheets */}
          <section className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[20px] text-secondary">
                  auto_stories
                </span>
                <h3 className="font-display text-xl text-on-surface">Cheat Sheets</h3>
              </div>
              <span className="font-mono text-xs text-on-surface-variant">
                2 recientes
              </span>
            </div>

            <div className="flex flex-col gap-3 rounded-xl bg-surface-container p-4 shadow-sm transition-colors hover:bg-surface-container-high">
              <div className="flex items-center justify-between">
                <span className="rounded bg-primary/15 px-1.5 py-0.5 font-mono text-xs text-primary">
                  Layouts
                </span>
                <span className="font-mono text-[11px] text-outline">Next.js</span>
              </div>
              <h4 className="text-sm font-semibold text-on-surface">
                El layout es un marco de foto
              </h4>
              <p className="text-xs text-on-surface-variant">
                Lo de fuera de {"{children}"} se repite en todas las páginas.
              </p>
              <div className="overflow-x-auto rounded bg-surface-container-lowest p-2 font-mono text-[11px] text-on-surface">
                <span className="text-tertiary">{"<body>"}</span>
                {"\n  <Nav />  "}
                <span className="text-outline">{"// en todas"}</span>
                {"\n  "}
                <span className="text-tertiary">{"{children}"}</span>
                {"  "}
                <span className="text-outline">{"// cambia"}</span>
                {"\n"}
                <span className="text-tertiary">{"</body>"}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3 rounded-xl bg-surface-container p-4 shadow-sm transition-colors hover:bg-surface-container-high">
              <div className="flex items-center justify-between">
                <span className="rounded bg-secondary/15 px-1.5 py-0.5 font-mono text-xs text-secondary">
                  TypeScript
                </span>
                <span className="font-mono text-[11px] text-outline">Core</span>
              </div>
              <h4 className="text-sm font-semibold text-on-surface">
                Interfaces: la ficha del objeto
              </h4>
              <p className="text-xs text-on-surface-variant">
                Si la propiedad no está en la interface, TS te detiene.
              </p>
              <div className="overflow-x-auto rounded bg-surface-container-lowest p-2 font-mono text-[11px] text-on-surface">
                <span className="text-tertiary">interface</span>{" "}
                <span className="text-primary">Usuario</span> {"{"}
                {"\n  id: number;"}
                {"\n  nombre: string;"}
                {"\n  email?: string; "}
                <span className="text-outline">{"// opcional"}</span>
                {"\n}"}
              </div>
            </div>
          </section>

          {/* Cita del día */}
          <section className="relative flex flex-col gap-3 overflow-hidden rounded-xl bg-surface-container-low p-4 shadow-sm">
            <div className="pointer-events-none absolute -bottom-4 right-2 select-none text-surface-container-highest opacity-30">
              <span className="material-symbols-outlined text-[72px]">
                format_quote
              </span>
            </div>
            <div className="flex items-center gap-2 text-on-surface-variant">
              <span className="material-symbols-outlined text-[18px]">psychology</span>
              <span className="font-mono text-xs uppercase tracking-wider">
                Insight del Día
              </span>
            </div>
            <blockquote className="relative z-10 text-base font-medium italic text-on-surface">
              &ldquo;Primero hazlo funcionar, luego hazlo correcto, luego hazlo
              rápido.&rdquo;
            </blockquote>
            <div className="flex items-center justify-between pt-1">
              <span className="font-mono text-xs font-medium text-primary">
                — Kent Beck
              </span>
              <span className="font-mono text-[11px] text-outline">
                Extreme Programming
              </span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
