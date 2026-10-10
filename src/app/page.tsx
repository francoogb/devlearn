// Página principal (/) — Dashboard actualizado con el diseño oficial Stitch DevLearn Hub
import CalendarioProgresoStitch from "@/components/CalendarioProgresoStitch";
import MetasCodigoStitch from "@/components/MetasCodigoStitch";
import PanelLateralStitch from "@/components/PanelLateralStitch";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      {/* ---------- Barra superior (Header) ---------- */}
      <header className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-surface-container px-5 py-3 shadow-sm border border-surface-container-high">
        {/* Barra de búsqueda */}
        <div className="flex min-w-64 max-w-md flex-1 items-center gap-2 rounded-xl bg-surface-container-low px-3 py-1.5 text-xs text-on-surface-variant border border-surface-container-high/40">
          <span className="material-symbols-outlined text-[18px] text-outline">search</span>
          <input
            type="text"
            placeholder="Buscar sintaxis, frameworks, snippets..."
            className="w-full bg-transparent border-none outline-none text-xs text-on-surface placeholder:text-outline font-sans"
            readOnly
          />
          <kbd className="px-1.5 py-0.5 rounded bg-surface-container-highest text-on-surface-variant font-mono text-[10px]">
            ⌘K
          </kbd>
        </div>

        {/* Badges de estado & Acciones */}
        <div className="flex items-center gap-2.5 flex-wrap">
          {/* DevAgent Badge */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-xs font-mono border border-surface-container-highest">
            <span className="material-symbols-outlined text-[16px] text-secondary animate-pulse">
              robot_2
            </span>
            <span className="text-on-surface">DevAgent v2.4:</span>
            <span className="text-secondary font-semibold">Auditoría Lista</span>
          </div>

          {/* Entorno Local Conectado */}
          <div className="hidden md:flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-low text-xs font-mono text-secondary border border-surface-container-high">
            <span className="material-symbols-outlined text-[15px] text-secondary">
              bolt
            </span>
            <span>Entorno Local Conectado</span>
          </div>

          {/* Racha */}
          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-low text-xs font-mono text-tertiary border border-surface-container-high">
            <span className="material-symbols-outlined text-[15px] text-tertiary">
              local_fire_department
            </span>
            <span>12 Días en racha</span>
          </div>

          {/* Botones de acción rápida */}
          <div className="flex items-center gap-1.5 ml-1">
            <button
              type="button"
              className="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface text-xs transition-colors flex items-center gap-1 font-sans"
            >
              <span className="material-symbols-outlined text-[15px]">add</span>
              Snippet
            </button>
            <button
              type="button"
              className="px-2.5 py-1 rounded-lg bg-primary-container text-on-primary-container text-xs transition-colors flex items-center gap-1 font-sans font-medium"
            >
              <span className="material-symbols-outlined text-[15px]">edit_note</span>
              Nota
            </button>
          </div>

          <button
            type="button"
            className="p-1.5 text-on-surface-variant hover:text-on-surface transition-colors flex items-center"
            aria-label="Notificaciones"
          >
            <span className="material-symbols-outlined text-[20px]">notifications</span>
          </button>
        </div>
      </header>

      {/* ---------- Top Hero Banner / Welcome Surface ---------- */}
      <section className="relative overflow-hidden rounded-xl bg-surface-container p-6 shadow-sm border border-surface-container-high">
        <div className="pointer-events-none absolute -right-16 -top-20 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-12 h-64 w-64 rounded-full bg-secondary/5 blur-2xl" />

        <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="flex items-center gap-1 rounded-full bg-secondary/15 px-2.5 py-0.5 font-mono text-xs text-secondary font-medium">
                <span className="material-symbols-outlined text-[14px]">bolt</span>
                Modo compilación activo
              </span>
              <span className="flex items-center gap-1 rounded-full bg-tertiary-container/20 px-2.5 py-0.5 font-mono text-xs text-tertiary font-medium">
                <span className="material-symbols-outlined text-[14px]">
                  local_fire_department
                </span>
                12 días seguidos
              </span>
              <span className="font-mono text-xs text-on-surface-variant">
                {"// sesión: workspace-alpha"}
              </span>
            </div>

            <h1 className="mt-1 font-display text-3xl md:text-4xl font-bold tracking-tight text-on-surface">
              ¡Hola Fran, a picar código!
            </h1>
            <p className="text-sm text-on-surface-variant">
              Tu entorno de compilación está listo. Tienes{" "}
              <strong className="text-on-surface font-semibold">
                3 desafíos pendientes
              </strong>{" "}
              para asegurar tu racha semanal.
            </p>
          </div>

          {/* Level & Progression Pod */}
          <div className="flex min-w-[280px] flex-col gap-2 rounded-xl bg-surface-container-high p-4 border border-surface-container-highest">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
                <span className="font-mono text-xs text-on-surface font-semibold">
                  Nivel 4: Apprentice
                </span>
              </div>
              <span className="rounded bg-primary/20 px-1.5 py-0.5 font-mono text-xs text-primary font-bold">
                85% XP
              </span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-lowest">
              <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-secondary-container via-secondary to-primary-container transition-all duration-700" />
            </div>
            <div className="flex items-center justify-between font-mono text-xs text-on-surface-variant">
              <span>3,420 XP</span>
              <span>Próximo rango: Nivel 5 (4,000 XP)</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Main Grid: 8 Cols (Operaciones & Calendario) / 4 Cols (Métricas & Scratchpad) ---------- */}
      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12">
        {/* Columna Izquierda (8 columnas): Calendario + Metas */}
        <div className="flex flex-col gap-6 lg:col-span-8">
          {/* Calendario de Progreso Stitch */}
          <CalendarioProgresoStitch />

          {/* Metas de Código Stitch */}
          <MetasCodigoStitch />
        </div>

        {/* Columna Derecha (4 columnas): Métricas Clave, Rutas y Scratchpad */}
        <div className="lg:col-span-4">
          <PanelLateralStitch />
        </div>
      </div>
    </div>
  );
}
