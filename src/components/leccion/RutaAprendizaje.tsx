// Columna izquierda de la lección: la "Ruta de Aprendizaje".
// Muestra los pasos del módulo: cuáles están completados, cuál es el
// actual y cuáles vienen después.
// Server Component: es solo presentación, sin interactividad.

interface Paso {
  numero: number;
  titulo: string;
  detalle: string;
  estado: "completado" | "activo" | "pendiente";
}

interface RutaAprendizajeProps {
  pasos: Paso[];
  activo: number; // cuántos pasos están completados (para el "X / Y Activo")
}

export default function RutaAprendizaje({ pasos, activo }: RutaAprendizajeProps) {
  return (
    <div className="flex flex-col gap-4 rounded-xl bg-surface-container-low p-4 shadow-md">
      <div className="flex items-center justify-between">
        <span className="font-display text-xl text-on-surface">
          Ruta de Aprendizaje
        </span>
        <span className="rounded-full bg-primary-container/20 px-2 py-0.5 font-mono text-xs text-primary">
          {activo} / {pasos.length} Activo
        </span>
      </div>

      <nav className="relative flex flex-col gap-1">
        {/* Línea vertical continua que conecta los pasos */}
        <div className="absolute bottom-4 left-4 top-4 w-0.5 bg-surface-container-highest" />

        {pasos.map((paso) => {
          if (paso.estado === "completado") {
            return (
              <div
                key={paso.numero}
                className="group relative z-10 flex cursor-pointer items-start gap-2 rounded-lg p-1 transition-colors hover:bg-surface-container/60"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary-container text-on-secondary shadow-sm">
                  <span className="material-symbols-outlined text-[18px]">check</span>
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="text-xs font-semibold text-on-surface group-hover:text-secondary">
                    {paso.numero}. {paso.titulo}
                  </span>
                  <span className="font-mono text-xs text-secondary">
                    Completado • {paso.detalle}
                  </span>
                </div>
              </div>
            );
          }

          if (paso.estado === "activo") {
            return (
              <div
                key={paso.numero}
                className="relative z-10 flex items-start gap-2 rounded-lg bg-surface-container-high p-1 shadow-sm"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-on-primary shadow-md ring-4 ring-primary/20">
                  <span className="material-symbols-outlined animate-pulse text-[18px]">
                    play_arrow
                  </span>
                </div>
                <div className="flex min-w-0 flex-col">
                  <span className="text-xs font-bold text-primary">
                    {paso.numero}. {paso.titulo}
                  </span>
                  <span className="flex items-center gap-1 font-mono text-xs text-on-surface-variant">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {paso.detalle}
                  </span>
                </div>
              </div>
            );
          }

          return (
            <div
              key={paso.numero}
              className="relative z-10 flex items-start gap-2 rounded-lg p-1 opacity-70 transition-opacity hover:opacity-100"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-container-highest text-on-surface-variant">
                <span className="font-mono text-xs">{paso.numero}</span>
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="text-xs font-semibold text-on-surface-variant">
                  {paso.numero}. {paso.titulo}
                </span>
                <span className="font-mono text-xs text-outline">{paso.detalle}</span>
              </div>
            </div>
          );
        })}
      </nav>
    </div>
  );
}
