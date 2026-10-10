"use client";

// Página /arquitectura — Blueprint técnico interactivo y bitácora de construcción del proyecto DevLearn.
// Diseñado con el formato oficial de Stitch DevLearn Hub:
// - Mapeo Fullstack: Frontend Next.js 16 + Backend NestJS en puerto 3001 (/backend)
// - Métricas técnicas de arquitectura (Fases completadas, Comandos CLI, Patrón arquitectónico, Tiempo de build)
// - Cronograma interactivo paso a paso (Bootstrap, Sistema Electric Slate, Modelo de datos, Shell, Backend NestJS API, Compilación)
// - Arquitectura en 4 Capas Clave (Frontend Next.js, Backend NestJS REST API, Estado & Context Hub, Integración DevAgent IA)
// - Comandos copiables con 1-clic y notificación toast reactiva.

import { useState } from "react";

export default function ArquitecturaPage() {
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const copySnippet = (texto: string, mensajeConfirmacion: string = "Copiado al portapapeles") => {
    navigator.clipboard.writeText(texto);
    setToastMsg(mensajeConfirmacion);
    setTimeout(() => setToastMsg(null), 2500);
  };

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Toast Notificación Reactiva */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-300 bg-surface-container-highest px-4 py-3 rounded-xl shadow-2xl flex items-center gap-2.5 text-secondary border border-secondary/30">
          <span className="material-symbols-outlined text-[20px]">check_circle</span>
          <span className="font-mono text-xs font-semibold">{toastMsg}</span>
        </div>
      )}

      {/* Header de Vista */}
      <header className="flex flex-col gap-4 pb-2 border-b border-surface-container-high/60">
        <div className="flex items-center gap-2 text-primary font-mono text-xs">
          <span className="material-symbols-outlined text-[16px]">account_tree</span>
          <span>SYSTEM_BLUEPRINT // DEVLEARN_V2.4</span>
          <span className="text-outline">/</span>
          <span className="text-secondary font-mono text-[11px] bg-secondary/10 px-2 py-0.5 rounded-full font-bold">
            FULLSTACK (NEXT.JS + NESTJS)
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
          <div className="flex flex-col gap-1 max-w-3xl">
            <h1 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-on-surface">
              Arquitectura &amp; Bitácora de Construcción
            </h1>
            <p className="text-sm md:text-base text-on-surface-variant">
              Blueprint técnico interactivo: trazabilidad completa desde la interfaz en Next.js 16 hasta la API desacoplada en NestJS y la telemetría con el DevAgent AI.
            </p>
          </div>

          {/* Botones de acción rápida */}
          <div className="flex items-center gap-2 flex-wrap">
            <button
              type="button"
              onClick={() =>
                copySnippet(
                  "# 1) Clonar + instalar deps\ngit clone https://github.com/fran/next-js-introducing.git\ncd next-js-introducing\nnpm install\ncd backend && npm install && cd ..\n\n# 2) Crear BD en Postgres (requiere Postgres corriendo)\npsql -U postgres -c \"CREATE DATABASE devlearn;\"\n\n# 3) Configurar backend/.env (copiar desde .env.example y poner tu password)\ncp backend/.env.example backend/.env\n\n# 4) Correr migración + seed\ncd backend\nnpx prisma migrate deploy\nnpx prisma db seed\ncd ..\n\n# 5) Arrancar frontend\nnpm run dev",
                  "Script de setup fullstack copiado al portapapeles"
                )
              }
              className="px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface text-xs font-mono shadow-sm transition-all flex items-center gap-2 border border-surface-container-highest"
            >
              <span className="material-symbols-outlined text-[17px] text-primary">terminal</span>
              <span>Copiar Setup Fullstack</span>
            </button>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("architecture-layers");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="px-3.5 py-2 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface text-xs font-mono shadow-sm transition-all flex items-center gap-2 border border-surface-container-highest"
            >
              <span className="material-symbols-outlined text-[17px] text-secondary">schema</span>
              <span>Diagrama de Capas</span>
            </button>

            <button
              type="button"
              onClick={() =>
                copySnippet(
                  "# DevLearn Architecture Specification v2.5\nFrontend:   Next.js 16.4.0 (Turbopack, port :3000) + React 19.3.0\nBackend:    NestJS 10.4.15 (Express, port :3001) /api/progreso\nDatabase:   PostgreSQL 17 (devlearn, port :5432, local)\nORM:        Prisma 6.19.3 (type-safe client + versioned migrations)\nDev Runner: ts-node-dev (NO tsx — tsx no emite decorator metadata)\nDesign System: Electric Slate (Stitch) + Tailwind CSS v4\nPersistence: Postgres (fuente de verdad) + localStorage (UI cache)\nAI Telemetry: DevAgent / Antigravity JSON Protocol",
                  "Tech Spec v2.5 exportada al portapapeles"
                )
              }
              className="px-3.5 py-2 rounded-xl bg-primary-container hover:bg-primary text-on-primary-container text-xs font-mono font-semibold shadow-sm transition-all flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[17px]">download</span>
              <span>Exportar Tech Spec</span>
            </button>
          </div>
        </div>

        {/* Fila de Tags de Metadatos del Stack Real */}
        <div className="flex items-center gap-2 flex-wrap pt-1 font-mono text-xs">
          <span className="bg-surface-container-low px-2.5 py-1 rounded-lg text-on-surface flex items-center gap-1.5 shadow-sm border border-surface-container-high">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            Frontend: Next.js 16.4.0 (Port :3000)
          </span>
          <span className="bg-surface-container-low px-2.5 py-1 rounded-lg text-rose-400 flex items-center gap-1.5 shadow-sm border border-surface-container-high font-bold">
            <span className="w-2 h-2 rounded-full bg-rose-400" />
            Backend: NestJS 10.4.15 (Port :3001)
          </span>
          <span className="bg-surface-container-low px-2.5 py-1 rounded-lg text-sky-400 flex items-center gap-1.5 shadow-sm border border-surface-container-high font-bold">
            <span className="w-2 h-2 rounded-full bg-sky-400" />
            Database: PostgreSQL 17 (Port :5432)
          </span>
          <span className="bg-surface-container-low px-2.5 py-1 rounded-lg text-tertiary flex items-center gap-1.5 shadow-sm border border-surface-container-high font-bold">
            <span className="w-2 h-2 rounded-full bg-tertiary" />
            ORM: Prisma 6.19 (type-safe)
          </span>
          <span className="bg-surface-container-low px-2.5 py-1 rounded-lg text-on-surface-variant border border-surface-container-high">
            React 19.3.0
          </span>
          <span className="bg-surface-container-low px-2.5 py-1 rounded-lg text-on-surface-variant border border-surface-container-high">
            TypeScript 5.6+ (Strict)
          </span>
          <span className="bg-surface-container-low px-2.5 py-1 rounded-lg text-on-surface-variant border border-surface-container-high">
            Tailwind CSS v4
          </span>
          <span className="bg-secondary/15 text-secondary px-2.5 py-1 rounded-lg font-mono text-xs font-bold border border-secondary/25">
            Fullstack + DB Connected (CORS Enabled)
          </span>
        </div>
      </header>

      {/* Métricas Técnicas de Arquitectura */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Métrica 1 */}
        <div className="p-5 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between border border-surface-container-high hover:border-secondary/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[11px] text-outline uppercase tracking-wider font-semibold">
              Fases de Construcción
            </span>
            <span className="material-symbols-outlined text-[20px] text-secondary">check_circle</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-on-surface">7 / 7</span>
            <span className="text-xs text-secondary font-mono font-bold">100% Core</span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1">Next.js + NestJS + Postgres/Prisma</p>
          <div className="w-full bg-surface-container-highest h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-secondary h-full rounded-full w-full" />
          </div>
        </div>

        {/* Métrica 2 */}
        <div className="p-5 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between border border-surface-container-high hover:border-rose-400/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[11px] text-outline uppercase tracking-wider font-semibold">
              Servicios &amp; Puertos
            </span>
            <span className="material-symbols-outlined text-[20px] text-rose-400">dns</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-2xl font-bold text-on-surface">:3000 &amp; :3001</span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1">Next.js UI &amp; NestJS REST API</p>
          <div className="w-full bg-surface-container-highest h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-rose-500 h-full rounded-full w-[95%]" />
          </div>
        </div>

        {/* Métrica 3 */}
        <div className="p-5 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between border border-surface-container-high hover:border-tertiary/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[11px] text-outline uppercase tracking-wider font-semibold">
              Patrón Arquitectónico
            </span>
            <span className="material-symbols-outlined text-[20px] text-tertiary">hub</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl font-bold text-on-surface">Desacoplado / Hybrid</span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1">SSR Client-Fetch + Backend Degradable</p>
          <div className="w-full bg-surface-container-highest h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-tertiary h-full rounded-full w-[90%]" />
          </div>
        </div>

        {/* Métrica 4 */}
        <div className="p-5 rounded-xl bg-surface-container-low shadow-sm flex flex-col justify-between border border-surface-container-high hover:border-secondary/50 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-[11px] text-outline uppercase tracking-wider font-semibold">
              Tiempo de Compilación
            </span>
            <span className="material-symbols-outlined text-[20px] text-secondary">timer</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display text-3xl font-bold text-secondary">1.2s</span>
            <span className="font-mono text-xs text-on-surface-variant">Turbopack</span>
          </div>
          <p className="text-xs text-on-surface-variant mt-1">19 rutas prerenderizadas limpiamente</p>
          <div className="w-full bg-surface-container-highest h-1 rounded-full mt-3 overflow-hidden">
            <div className="bg-secondary h-full rounded-full w-full" />
          </div>
        </div>
      </section>

      {/* Stepper Cronológico de Construcción */}
      <section className="flex flex-col gap-5 mt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-primary-container/20 text-primary flex items-center justify-center font-bold">
              <span className="material-symbols-outlined text-[20px]">reorder</span>
            </span>
            <h2 className="font-display text-xl font-bold text-on-surface tracking-tight">
              Paso a Paso Cronológico de Construcción Fullstack
            </h2>
          </div>
          <span className="font-mono text-xs text-outline">Trazabilidad determinística</span>
        </div>

        <div className="flex flex-col gap-6 relative">
          <div className="hidden lg:block absolute left-8 top-10 bottom-10 w-0.5 bg-surface-container-highest" />

          {/* FASE 01: Bootstrap */}
          <article className="flex flex-col lg:flex-row gap-4 lg:gap-6 relative">
            <div className="flex lg:flex-col items-center gap-2 lg:w-16 z-10 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-secondary text-on-secondary flex items-center justify-center font-bold font-display text-lg shadow-md">
                01
              </div>
              <span className="font-mono text-[11px] text-secondary font-semibold">T+00m</span>
            </div>

            <div className="flex-1 bg-surface-container-low rounded-xl p-5 shadow-sm flex flex-col gap-3 border border-surface-container-high/60">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-lg font-bold text-on-surface">Inicialización Frontend Next.js</h3>
                  <span className="bg-secondary/15 text-secondary px-2 py-0.5 rounded-full font-mono text-[10px] font-bold">
                    FASE INICIAL
                  </span>
                </div>
                <span className="font-mono text-xs text-outline">`git-init` • `app-scaffold`</span>
              </div>

              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Se ejecutó el bootstrap de la aplicación configurando el App Router de Next.js 16 con soporte nativo de TypeScript estricto, Tailwind CSS y resolución de rutas modular con alias <code className="font-mono text-primary font-bold">@/*</code>. Inmediatamente se protegió la integridad creando el commit base del repositorio.
              </p>

              <div className="rounded-xl bg-surface-container-lowest p-3 flex flex-col gap-1 border border-surface-container-high">
                <div className="flex items-center justify-between pb-1 text-outline font-mono text-[11px]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-error/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/60" />
                    <span className="w-2.5 h-2.5 rounded-full bg-secondary/60" />
                    <span className="ml-2 text-on-surface-variant">bash • powershell</span>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      copySnippet(
                        "npx create-next-app@latest devlearn --typescript --tailwind --eslint --app --src-dir --import-alias \"@/*\"\ncd devlearn && git init && git add .\ngit commit -m \"feat: initial clean scaffolding\"",
                        "Comando de bootstrap copiado"
                      )
                    }
                    className="text-on-surface-variant hover:text-secondary transition-colors flex items-center gap-1 font-mono text-xs"
                  >
                    <span className="material-symbols-outlined text-[14px]">content_copy</span>
                    <span>Copiar</span>
                  </button>
                </div>
                <pre className="font-mono text-xs text-on-surface overflow-x-auto leading-relaxed py-1">
                  <span className="text-primary">$</span> <span className="text-secondary">npx create-next-app@latest</span> devlearn \<br />
                  &nbsp;&nbsp;--typescript \<br />
                  &nbsp;&nbsp;--tailwind \<br />
                  &nbsp;&nbsp;--eslint \<br />
                  &nbsp;&nbsp;--app \<br />
                  &nbsp;&nbsp;--src-dir \<br />
                  &nbsp;&nbsp;--import-alias <span className="text-tertiary">&quot;@/*&quot;</span><br /><br />
                  <span className="text-primary">$</span> cd devlearn &amp;&amp; git init &amp;&amp; git add .<br />
                  <span className="text-primary">$</span> git commit -m <span className="text-secondary">&quot;feat: initial clean scaffolding&quot;</span>
                </pre>
              </div>
            </div>
          </article>

          {/* FASE 02: Tokens & Sistema Electric Slate */}
          <article className="flex flex-col lg:flex-row gap-4 lg:gap-6 relative">
            <div className="flex lg:flex-col items-center gap-2 lg:w-16 z-10 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high text-primary flex items-center justify-center font-bold font-display text-lg shadow-md border border-primary/30">
                02
              </div>
              <span className="font-mono text-[11px] text-outline font-semibold">T+08m</span>
            </div>

            <div className="flex-1 bg-surface-container-low rounded-xl p-5 shadow-sm flex flex-col gap-3 border border-surface-container-high/60">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-lg font-bold text-on-surface">Tokens &amp; Sistema de Diseño ‘Electric Slate’</h3>
                  <span className="bg-primary/20 text-primary px-2 py-0.5 rounded-full font-mono text-[10px] font-bold">
                    THEME ENGINE
                  </span>
                </div>
                <span className="font-mono text-xs text-outline">Material Symbols + Google Stitch</span>
              </div>

              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Para evitar interfaces terminales frías, se configuró el tema <strong className="text-on-surface">Electric Slate</strong>. Se inyectaron los tokens semánticos: slate luminiscente de fondo (<code className="font-mono text-xs">#0b1326</code>), contenedores de baja vibración, acentos esmeralda (<code className="font-mono text-xs text-secondary">#4edea3</code>) para telemetría y violeta/índigo (<code className="font-mono text-xs text-primary">#c0c1ff</code>) para estados interactivos.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1 font-mono text-xs">
                <div className="p-2 rounded-lg bg-surface flex items-center gap-2 border border-surface-container-high">
                  <span className="w-4 h-4 rounded bg-[#0b1326] border border-surface-container-highest" />
                  <span className="text-on-surface-variant">surface #0b1326</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container flex items-center gap-2 border border-surface-container-high">
                  <span className="w-4 h-4 rounded bg-[#171f33]" />
                  <span className="text-on-surface-variant">container #171f33</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container flex items-center gap-2 border border-surface-container-high">
                  <span className="w-4 h-4 rounded bg-[#4edea3]" />
                  <span className="text-secondary font-bold">secondary #4edea3</span>
                </div>
                <div className="p-2 rounded-lg bg-surface-container flex items-center gap-2 border border-surface-container-high">
                  <span className="w-4 h-4 rounded bg-[#c0c1ff]" />
                  <span className="text-primary font-bold">primary #c0c1ff</span>
                </div>
              </div>
            </div>
          </article>

          {/* FASE 03: Arquitectura Backend NestJS */}
          <article className="flex flex-col lg:flex-row gap-4 lg:gap-6 relative">
            <div className="flex lg:flex-col items-center gap-2 lg:w-16 z-10 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold font-display text-lg shadow-md border border-rose-400/40">
                03
              </div>
              <span className="font-mono text-[11px] text-rose-400 font-semibold">T+18m</span>
            </div>

            <div className="flex-1 bg-surface-container-low rounded-xl p-5 shadow-sm flex flex-col gap-3 border border-surface-container-high/60">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-lg font-bold text-on-surface">Arquitectura del Backend NestJS (/backend)</h3>
                  <span className="bg-rose-500/15 text-rose-400 px-2 py-0.5 rounded-full font-mono text-[10px] font-bold">
                    NESTJS REST API
                  </span>
                </div>
                <span className="font-mono text-xs text-outline">Puerto :3001 • Prefijo /api</span>
              </div>

              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Se construyó un micro-servicio backend desacoplado en la carpeta <code className="font-mono text-xs text-rose-300">/backend</code> con el framework <strong>NestJS 10.4.15</strong>. Cuenta con un módulo de progreso (<code className="font-mono text-xs">ProgresoModule</code>), servicio (<code className="font-mono text-xs">ProgresoService</code>) y controlador (<code className="font-mono text-xs">ProgresoController</code>) que expone el endpoint <code className="font-mono text-xs text-secondary">GET /api/progreso</code> con soporte CORS habilitado para Next.js.
              </p>

              <div className="rounded-xl bg-surface-container-lowest p-3 flex flex-col gap-1 border border-surface-container-high">
                <div className="flex items-center justify-between pb-1 text-outline font-mono text-[11px]">
                  <span>backend/src/main.ts (Servidor NestJS)</span>
                  <button
                    type="button"
                    onClick={() =>
                      copySnippet(
                        "cd backend && npm run start:dev",
                        "Comando de arranque NestJS copiado"
                      )
                    }
                    className="text-on-surface-variant hover:text-rose-400 font-mono text-xs flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">content_copy</span>
                    <span>Arrancar Backend</span>
                  </button>
                </div>
                <pre className="font-mono text-xs text-on-surface overflow-x-auto leading-relaxed py-1">
                  <span className="text-rose-400">async function</span> <span className="text-primary">bootstrap</span>() &#123;<br />
                  &nbsp;&nbsp;<span className="text-secondary">const</span> app = <span className="text-secondary">await</span> NestFactory.create(AppModule);<br />
                  &nbsp;&nbsp;app.setGlobalPrefix(<span className="text-tertiary">&apos;api&apos;</span>);<br />
                  &nbsp;&nbsp;app.enableCors(); <span className="text-outline">// Conecta con el frontend en localhost:3000</span><br />
                  &nbsp;&nbsp;<span className="text-secondary">await</span> app.listen(<span className="text-amber-400">3001</span>);<br />
                  &nbsp;&nbsp;console.log(<span className="text-secondary">&apos;Backend NestJS en http://localhost:3001/api&apos;</span>);<br />
                  &#125;
                </pre>
              </div>

              <div className="flex items-center gap-2 flex-wrap font-mono text-[11px] text-outline pt-1">
                <span>Estructura backend:</span>
                <span className="bg-surface-container px-2 py-0.5 rounded text-rose-300">backend/src/app.module.ts</span>
                <span className="bg-surface-container px-2 py-0.5 rounded text-rose-300">backend/src/progreso/progreso.controller.ts</span>
                <span className="bg-surface-container px-2 py-0.5 rounded text-rose-300">backend/src/progreso/progreso.service.ts</span>
              </div>
            </div>
          </article>

          {/* FASE 04: Conexión Frontend & Backend (Resiliencia) */}
          <article className="flex flex-col lg:flex-row gap-4 lg:gap-6 relative">
            <div className="flex lg:flex-col items-center gap-2 lg:w-16 z-10 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high text-tertiary flex items-center justify-center font-bold font-display text-lg shadow-md border border-tertiary/30">
                04
              </div>
              <span className="font-mono text-[11px] text-outline font-semibold">T+27m</span>
            </div>

            <div className="flex-1 bg-surface-container-low rounded-xl p-5 shadow-sm flex flex-col gap-3 border border-surface-container-high/60">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-lg font-bold text-on-surface">Conexión Resiliente Next.js &lt;—&gt; NestJS</h3>
                  <span className="bg-tertiary/20 text-tertiary px-2 py-0.5 rounded-full font-mono text-[10px] font-bold">
                    HYBRID FETCH &amp; FALLBACK
                  </span>
                </div>
                <span className="font-mono text-xs text-outline">src/app/progreso/page.tsx</span>
              </div>

              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                En la página de progreso se implementó el patrón de <strong>degradación elegante (Graceful Degradation)</strong>: Next.js intenta consultar a NestJS (<code className="font-mono text-xs text-primary">fetch(&apos;http://localhost:3001/api/progreso&apos;)</code>). Si NestJS está levantado, usa los datos del backend en vivo; si el backend está apagado, el frontend se degrada automáticamente al JSON local sin romperse.
              </p>

              <div className="rounded-xl bg-surface-container-lowest p-3 flex flex-col gap-1 border border-surface-container-high">
                <pre className="font-mono text-xs text-on-surface overflow-x-auto leading-relaxed py-1">
                  <span className="text-secondary">async function</span> <span className="text-primary">getProgreso</span>() &#123;<br />
                  &nbsp;&nbsp;<span className="text-tertiary">try</span> &#123;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-secondary">const</span> res = <span className="text-secondary">await</span> fetch(<span className="text-tertiary">&apos;http://localhost:3001/api/progreso&apos;</span>, &#123; cache: <span className="text-tertiary">&apos;no-store&apos;</span> &#125;);<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-secondary">return</span> &#123; ...(await res.json()), fromBackend: <span className="text-primary">true</span> &#125;;<br />
                  &nbsp;&nbsp;&#125; <span className="text-tertiary">catch</span> &#123;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-outline">// Si NestJS está apagado, degrada a datos locales seguros</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-secondary">return</span> &#123; concepts: localConcepts, exercises: localExercises, fromBackend: <span className="text-rose-400">false</span> &#125;;<br />
                  &nbsp;&nbsp;&#125;<br />
                  &#125;
                </pre>
              </div>
            </div>
          </article>

          {/* FASE 05: Shell Global & Telemetría AI */}
          <article className="flex flex-col lg:flex-row gap-4 lg:gap-6 relative">
            <div className="flex lg:flex-col items-center gap-2 lg:w-16 z-10 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 text-secondary flex items-center justify-center font-bold font-display text-lg shadow-md border border-secondary/30">
                05
              </div>
              <span className="font-mono text-[11px] text-secondary font-semibold">T+41m</span>
            </div>

            <div className="flex-1 bg-surface-container-low rounded-xl p-5 shadow-sm flex flex-col gap-3 border border-surface-container-high/60">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-lg font-bold text-on-surface">Shell, Calendario Bento &amp; Telemetría AI</h3>
                  <span className="bg-secondary/15 text-secondary px-2 py-0.5 rounded-full font-mono text-[10px] font-bold">
                    UI &amp; AI BRIDGE
                  </span>
                </div>
                <span className="font-mono text-xs text-outline">Calendario • Metas • Contexto AI</span>
              </div>

              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                Construcción del Calendario de hábitos para Developer Junior con checklist interactivo por día (Frontend, Backend, CS50, Inglés), modal adaptado a pantalla completa y sincronización en vivo de la fecha real. Todo se empaqueta en JSON con las dudas registradas en <code className="font-mono text-xs text-amber-400">queMejorar</code> para que el Agente AI prepare tutorías personalizadas.
              </p>
            </div>
          </article>

          {/* FASE 06: Compilación & Verificación */}
          <article className="flex flex-col lg:flex-row gap-4 lg:gap-6 relative">
            <div className="flex lg:flex-col items-center gap-2 lg:w-16 z-10 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-surface-container-high text-secondary flex items-center justify-center font-bold font-display text-lg shadow-md border border-secondary/30">
                06
              </div>
              <span className="font-mono text-[11px] text-outline font-semibold">T+52m</span>
            </div>

            <div className="flex-1 bg-surface-container-low rounded-xl p-5 shadow-sm flex flex-col gap-3 border border-surface-container-high/60">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-lg font-bold text-on-surface">Compilación Limpia con Turbopack</h3>
                  <span className="bg-secondary/15 text-secondary px-2 py-0.5 rounded-full font-mono text-[10px] font-bold">
                    BUILD READY
                  </span>
                </div>
                <span className="font-mono text-xs text-outline">Next Build • Zero Lints</span>
              </div>

              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                El frontend compila de manera determinística mediante Turbopack con 19 rutas prerenderizadas estáticamente y exclusión limpia del directorio <code className="font-mono text-xs">backend/</code> en <code className="font-mono text-xs">tsconfig.json</code> para garantizar build independiente de ambos servicios.
              </p>

              <div className="rounded-xl bg-surface-container-lowest p-3 flex flex-col gap-1 border border-surface-container-high">
                <pre className="font-mono text-xs text-on-surface overflow-x-auto leading-relaxed py-1">
                  <span className="text-primary">$</span> <span className="text-secondary">npm run build</span><br />
                  ▲ Next.js 16.4.0 (Turbopack)<br />
                  ✓ Compiled successfully in 1.2s<br />
                  ✓ Generating static pages (19/19) in 1.3s<br />
                  ✓ Finalizing page optimization [Exit code 0]
                </pre>
              </div>
            </div>
          </article>

          {/* FASE 07: Persistencia con PostgreSQL + Prisma */}
          <article className="flex flex-col lg:flex-row gap-4 lg:gap-6 relative">
            <div className="flex lg:flex-col items-center gap-2 lg:w-16 z-10 shrink-0">
              <div className="w-12 h-12 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-bold font-display text-lg shadow-md border border-sky-400/40">
                07
              </div>
              <span className="font-mono text-[11px] text-sky-400 font-semibold">T+68m</span>
            </div>

            <div className="flex-1 bg-surface-container-low rounded-xl p-5 shadow-sm flex flex-col gap-3 border border-surface-container-high/60">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-display text-lg font-bold text-on-surface">
                    Capa de Datos Real: PostgreSQL + Prisma ORM
                  </h3>
                  <span className="bg-sky-500/15 text-sky-400 px-2 py-0.5 rounded-full font-mono text-[10px] font-bold">
                    PERSISTENCE LAYER
                  </span>
                </div>
                <span className="font-mono text-xs text-outline">
                  Postgres :5432 • Prisma 6.19 • Migraciones versionadas
                </span>
              </div>

              <p className="text-xs md:text-sm text-on-surface-variant leading-relaxed">
                El salto de JSON plano a base de datos real. Se instaló{" "}
                <strong className="text-sky-400">PostgreSQL 17</strong> local, se
                creó la BD <code className="font-mono text-xs text-sky-300">devlearn</code>{" "}
                y se adoptó <strong className="text-tertiary">Prisma 6.19</strong>{" "}
                como ORM tipado. En{" "}
                <code className="font-mono text-xs">backend/prisma/schema.prisma</code>{" "}
                se modelaron 3 tablas (<code className="font-mono text-xs">concepts</code>,{" "}
                <code className="font-mono text-xs">exercises</code>,{" "}
                <code className="font-mono text-xs">sections_progress</code>) y
                2 enums nativos de Postgres. El{" "}
                <code className="font-mono text-xs">ProgresoService</code> dejó
                de leer JSON y ahora inyecta{" "}
                <code className="font-mono text-xs">PrismaService</code> para
                hacer queries type-safe. La respuesta del endpoint conserva el
                shape original para no romper el frontend.
              </p>

              {/* Sub-grid: 4 pilares de la Fase 07 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-lg bg-surface-container flex flex-col gap-0.5 border border-surface-container-high">
                  <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
                    Schema
                  </span>
                  <span className="font-mono text-xs text-sky-300">
                    schema.prisma + 2 enums
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container flex flex-col gap-0.5 border border-surface-container-high">
                  <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
                    Migraciones
                  </span>
                  <span className="font-mono text-xs text-sky-300">
                    prisma/migrations/ (versionadas)
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container flex flex-col gap-0.5 border border-surface-container-high">
                  <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
                    Seed
                  </span>
                  <span className="font-mono text-xs text-sky-300">
                    seed.ts (JSON → Postgres, idempotente)
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-container flex flex-col gap-0.5 border border-surface-container-high">
                  <span className="font-mono text-[10px] text-outline uppercase tracking-wider">
                    DI Fix
                  </span>
                  <span className="font-mono text-xs text-tertiary">
                    tsx → ts-node-dev (decorator metadata)
                  </span>
                </div>
              </div>

              {/* Comando copiable: setup inicial de Prisma */}
              <div className="rounded-xl bg-surface-container-lowest p-3 flex flex-col gap-1 border border-surface-container-high">
                <div className="flex items-center justify-between pb-1 text-outline font-mono text-[11px]">
                  <span>Setup inicial Postgres + Prisma</span>
                  <button
                    type="button"
                    onClick={() =>
                      copySnippet(
                        "# 1) Crear BD en pgAdmin o psql:\nCREATE DATABASE devlearn;\n\n# 2) Configurar backend/.env con DATABASE_URL\n#    (copiar desde backend/.env.example y poner tu password)\n\n# 3) Instalar deps y correr migración + seed\ncd backend\nnpm install\nnpx prisma migrate dev --name init\nnpx prisma db seed\n\n# 4) Explorar la BD en GUI (equivalente a Django Admin)\nnpx prisma studio",
                        "Setup Postgres + Prisma copiado"
                      )
                    }
                    className="text-on-surface-variant hover:text-sky-400 font-mono text-xs flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-[14px]">
                      content_copy
                    </span>
                    <span>Copiar Setup DB</span>
                  </button>
                </div>
                <pre className="font-mono text-xs text-on-surface overflow-x-auto leading-relaxed py-1">
                  <span className="text-outline"># 1) Crear la BD contenedora (Prisma no la crea sola)</span><br />
                  <span className="text-primary">$</span> psql -U postgres -c <span className="text-tertiary">&quot;CREATE DATABASE devlearn;&quot;</span><br /><br />
                  <span className="text-outline"># 2) Configurar backend/.env con DATABASE_URL</span><br />
                  <span className="text-sky-300">DATABASE_URL</span>=<span className="text-tertiary">&quot;postgresql://postgres:TU_PASS@localhost:5432/devlearn?schema=public&quot;</span><br /><br />
                  <span className="text-outline"># 3) Correr migración + seed</span><br />
                  <span className="text-primary">$</span> <span className="text-secondary">cd</span> backend<br />
                  <span className="text-primary">$</span> <span className="text-secondary">npx prisma migrate dev</span> --name init<br />
                  <span className="text-primary">$</span> <span className="text-secondary">npx prisma db seed</span><br /><br />
                  <span className="text-outline"># 4) GUI visual (como Django Admin)</span><br />
                  <span className="text-primary">$</span> <span className="text-secondary">npx prisma studio</span>
                </pre>
              </div>

              {/* Snippet del service refactorizado */}
              <div className="rounded-xl bg-surface-container-lowest p-3 flex flex-col gap-1 border border-surface-container-high">
                <div className="flex items-center justify-between pb-1 text-outline font-mono text-[11px]">
                  <span>backend/src/progreso/progreso.service.ts (refactor)</span>
                  <span className="text-sky-400 font-bold">JSON → Prisma</span>
                </div>
                <pre className="font-mono text-xs text-on-surface overflow-x-auto leading-relaxed py-1">
                  <span className="text-rose-400">@Injectable</span>()<br />
                  <span className="text-secondary">export class</span> <span className="text-primary">ProgresoService</span> &#123;<br />
                  &nbsp;&nbsp;<span className="text-secondary">constructor</span>(<span className="text-tertiary">private readonly</span> prisma: PrismaService) &#123;&#125;<br /><br />
                  &nbsp;&nbsp;<span className="text-secondary">async</span> <span className="text-primary">getProgreso</span>() &#123;<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-outline">// 3 queries en paralelo con Promise.all</span><br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-secondary">const</span> [concepts, exercises, sections] = <span className="text-secondary">await</span> Promise.all([<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-tertiary">this</span>.prisma.<span className="text-sky-300">concept</span>.findMany(),<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-tertiary">this</span>.prisma.<span className="text-sky-300">exercise</span>.findMany(&#123; orderBy: &#123; id: <span className="text-tertiary">&apos;asc&apos;</span> &#125; &#125;),<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-tertiary">this</span>.prisma.<span className="text-sky-300">sectionProgress</span>.findMany(),<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;]);<br />
                  &nbsp;&nbsp;&nbsp;&nbsp;<span className="text-secondary">return</span> &#123; concepts, exercises, sectionsProgress: sections &#125;;<br />
                  &nbsp;&nbsp;&#125;<br />
                  &#125;
                </pre>
              </div>

              {/* Nota técnica importante */}
              <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20 flex gap-2.5">
                <span className="material-symbols-outlined text-amber-400 text-[18px] shrink-0 mt-0.5">
                  warning
                </span>
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-amber-400 font-bold">
                    Gotcha descubierto en esta fase
                  </span>
                  <span className="text-xs text-on-surface-variant leading-relaxed">
                    <code className="font-mono text-xs text-amber-300">tsx</code>{" "}
                    (basado en esbuild) <strong>NO</strong> emite{" "}
                    <code className="font-mono text-xs">emitDecoratorMetadata</code>
                    , lo que rompe la inyección de dependencias de NestJS cuando
                    un service recibe parámetros en el constructor. Por eso{" "}
                    <code className="font-mono text-xs">npm run start:dev</code>{" "}
                    ahora usa{" "}
                    <code className="font-mono text-xs text-tertiary">
                      ts-node-dev
                    </code>{" "}
                    (TypeScript real). El seed sigue con tsx porque no usa
                    decoradores.
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 flex-wrap font-mono text-[11px] text-outline pt-1">
                <span>Archivos nuevos:</span>
                <span className="bg-surface-container px-2 py-0.5 rounded text-sky-300">
                  backend/prisma/schema.prisma
                </span>
                <span className="bg-surface-container px-2 py-0.5 rounded text-sky-300">
                  backend/prisma/seed.ts
                </span>
                <span className="bg-surface-container px-2 py-0.5 rounded text-sky-300">
                  backend/src/prisma/prisma.service.ts
                </span>
                <span className="bg-surface-container px-2 py-0.5 rounded text-sky-300">
                  backend/.env.example
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* Sección de Diagrama de Arquitectura de Capas */}
      <section className="flex flex-col gap-4 mt-6 pt-4 border-t border-surface-container-high/60" id="architecture-layers">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-secondary font-mono text-xs">
            <span className="material-symbols-outlined text-[16px]">account_tree</span>
            <span>SYSTEM_LAYERS // TOPOLOGY</span>
          </div>
          <h2 className="font-display text-2xl font-bold text-on-surface tracking-tight">
            Topología del Sistema en Cuatro Capas (Next.js + NestJS + AI)
          </h2>
          <p className="text-xs md:text-sm text-on-surface-variant max-w-3xl">
            Interconexión estructurada entre la interfaz en Next.js 16, la API desacoplada en NestJS, el almacenamiento reactivo local y la telemetría del asistente AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {/* Capa 01 */}
          <div className="rounded-xl bg-surface-container-low p-5 shadow-sm flex flex-col justify-between gap-4 border border-surface-container-high">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] bg-primary/20 text-primary px-2 py-0.5 rounded-full font-bold">
                  CAPA 01
                </span>
                <span className="material-symbols-outlined text-primary text-[22px]">devices</span>
              </div>
              <h3 className="font-display text-base font-bold text-on-surface">Next.js Frontend (:3000)</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Componentes atómicos en React 19 y App Router con diseño táctil Bento Grid de Stitch.
              </p>
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="p-2 rounded bg-surface-container text-on-surface font-mono text-xs flex items-center justify-between border border-surface-container-high">
                  <span>AppRouter Layout</span>
                  <span className="text-secondary font-bold">✓ Active</span>
                </div>
                <div className="p-2 rounded bg-surface-container text-on-surface font-mono text-xs flex items-center justify-between border border-surface-container-high">
                  <span>Calendario Bento</span>
                  <span className="text-secondary font-bold">✓ Active</span>
                </div>
                <div className="p-2 rounded bg-surface-container text-on-surface font-mono text-xs flex items-center justify-between border border-surface-container-high">
                  <span>Modal Fullscreen</span>
                  <span className="text-secondary font-bold">✓ Active</span>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-surface-container-highest/40 flex items-center justify-between font-mono text-[11px] text-outline">
              <span>Puerto: 3000</span>
              <span className="text-primary font-bold">Client + SSR</span>
            </div>
          </div>

          {/* Capa 02 */}
          <div className="rounded-xl bg-surface-container-low p-5 shadow-sm flex flex-col justify-between gap-4 border border-surface-container-high border-t-2 border-t-rose-500">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] bg-rose-500/20 text-rose-400 px-2 py-0.5 rounded-full font-bold">
                  CAPA 02
                </span>
                <span className="material-symbols-outlined text-rose-400 text-[22px]">dns</span>
              </div>
              <h3 className="font-display text-base font-bold text-on-surface">NestJS Backend (:3001)</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Micro-servicio en NestJS 10.4.15 que expone la API REST de progreso y telemetría.
              </p>
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="p-2 rounded bg-surface-container text-on-surface font-mono text-xs flex items-center justify-between border border-surface-container-high">
                  <span>GET /api/progreso</span>
                  <span className="text-secondary font-bold">✓ 200 OK</span>
                </div>
                <div className="p-2 rounded bg-surface-container text-on-surface font-mono text-xs flex items-center justify-between border border-surface-container-high">
                  <span>CORS Middleware</span>
                  <span className="text-secondary font-bold">✓ Enabled</span>
                </div>
                <div className="p-2 rounded bg-surface-container text-on-surface font-mono text-xs flex items-center justify-between border border-surface-container-high">
                  <span>ProgresoService</span>
                  <span className="text-secondary font-bold">✓ Injected</span>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-surface-container-highest/40 flex items-center justify-between font-mono text-[11px] text-outline">
              <span>Puerto: 3001</span>
              <span className="text-rose-400 font-bold">Express Engine</span>
            </div>
          </div>

          {/* Capa 03 */}
          <div className="rounded-xl bg-surface-container-low p-5 shadow-sm flex flex-col justify-between gap-4 border border-surface-container-high border-t-2 border-t-sky-500">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] bg-sky-500/20 text-sky-400 px-2 py-0.5 rounded-full font-bold">
                  CAPA 03
                </span>
                <span className="material-symbols-outlined text-sky-400 text-[22px]">database</span>
              </div>
              <h3 className="font-display text-base font-bold text-on-surface">Postgres + Prisma (Persistencia)</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                PostgreSQL 17 local como fuente de verdad + Prisma 6.19 como ORM tipado. localStorage del dashboard queda como caché de UI.
              </p>
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="p-2 rounded bg-surface-container text-on-surface font-mono text-xs flex items-center justify-between border border-surface-container-high">
                  <span>devlearn @ :5432</span>
                  <span className="text-secondary font-bold">✓ Running</span>
                </div>
                <div className="p-2 rounded bg-surface-container text-on-surface font-mono text-xs flex items-center justify-between border border-surface-container-high">
                  <span>Prisma Migrations</span>
                  <span className="text-secondary font-bold">✓ Versioned</span>
                </div>
                <div className="p-2 rounded bg-surface-container text-on-surface font-mono text-xs flex items-center justify-between border border-surface-container-high">
                  <span>3 tablas · 2 enums</span>
                  <span className="text-secondary font-bold">✓ Type-Safe</span>
                </div>
                <div className="p-2 rounded bg-surface-container text-on-surface font-mono text-xs flex items-center justify-between border border-surface-container-high">
                  <span>localStorage (UI cache)</span>
                  <span className="text-tertiary font-bold">✓ Hybrid</span>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-surface-container-highest/40 flex items-center justify-between font-mono text-[11px] text-outline">
              <span>Puerto DB: 5432</span>
              <span className="text-sky-400 font-bold">PostgreSQL + Prisma</span>
            </div>
          </div>

          {/* Capa 04 */}
          <div className="rounded-xl bg-surface-container-low p-5 shadow-sm flex flex-col justify-between gap-4 border border-surface-container-high">
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[11px] bg-secondary/20 text-secondary px-2 py-0.5 rounded-full font-bold">
                  CAPA 04
                </span>
                <span className="material-symbols-outlined text-secondary text-[22px]">smart_toy</span>
              </div>
              <h3 className="font-display text-base font-bold text-on-surface">Integración DevAgent IA</h3>
              <p className="text-xs text-on-surface-variant leading-relaxed">
                Puente de telemetría que inyecta automáticamente los tags técnicos, tareas y dudas en el prompt del LLM.
              </p>
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="p-2 rounded bg-surface-container text-on-surface font-mono text-xs flex items-center justify-between border border-surface-container-high">
                  <span>JSON Context Formatter</span>
                  <span className="text-secondary font-bold">✓ Online</span>
                </div>
                <div className="p-2 rounded bg-surface-container text-on-surface font-mono text-xs flex items-center justify-between border border-surface-container-high">
                  <span>Tutoría Pedagógica</span>
                  <span className="text-secondary font-bold">✓ Stream</span>
                </div>
                <div className="p-2 rounded bg-surface-container text-on-surface font-mono text-xs flex items-center justify-between border border-surface-container-high">
                  <span>Dudas (`queMejorar`)</span>
                  <span className="text-secondary font-bold">✓ Extracted</span>
                </div>
              </div>
            </div>
            <div className="pt-2 border-t border-surface-container-highest/40 flex items-center justify-between font-mono text-[11px] text-outline">
              <span>Sincronización: JSON</span>
              <span className="text-secondary font-bold">Live Bridge</span>
            </div>
          </div>
        </div>
      </section>

      {/* Banner de Clonación & Arranque Fullstack */}
      <section className="rounded-xl bg-surface-container-low p-4 flex flex-col md:flex-row items-center justify-between gap-3 border border-surface-container-high">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-[24px] text-secondary">terminal</span>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-bold text-on-surface">
              Arranque Diario (Postgres + NestJS + Next.js)
            </span>
            <span className="text-xs text-on-surface-variant">
              Postgres debe estar corriendo (servicio{" "}
              <code className="font-mono text-[11px]">postgresql-x64-17</code> en
              Windows). Luego: frontend en :3000, backend en :3001.
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() =>
            copySnippet(
              "# 0) Verificar que Postgres esté corriendo (Windows):\n#    Get-Service postgresql-x64-17  →  Status: Running\n\n# Terminal 1 (Frontend Next.js, puerto 3000):\nnpm run dev\n\n# Terminal 2 (Backend NestJS, puerto 3001):\ncd backend && npm run start:dev\n\n# Opcional — GUI de la BD (equivalente a Django Admin):\ncd backend && npx prisma studio",
              "Comandos de arranque copiados"
            )
          }
          className="px-4 py-2 rounded-xl bg-secondary text-on-secondary font-mono text-xs font-bold hover:bg-secondary-fixed transition-colors flex items-center gap-2 shadow-sm shrink-0"
        >
          <span className="material-symbols-outlined text-[16px]">content_copy</span>
          <span>Copiar Comandos de Arranque</span>
        </button>
      </section>
    </div>
  );
}
