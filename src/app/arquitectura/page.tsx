// Página /arquitectura — el mapa del proyecto: qué carpetas y archivos
// existen y para qué sirve cada uno. Los datos viven en
// src/data/architecture.ts (editables); esta página solo los presenta.
// Server Component: sin estado ni eventos.

import { structureSections } from "@/data/architecture";

export default function ArquitecturaPage() {
  // Contadores calculados a partir de los datos
  const totalFolders = structureSections.reduce(
    (acc, s) => acc + s.items.filter((i) => i.kind === "folder").length,
    0,
  );
  const totalFiles = structureSections.reduce(
    (acc, s) => acc + s.items.filter((i) => i.kind === "file").length,
    0,
  );

  return (
    <div className="flex flex-col gap-4">
      {/* Encabezado */}
      <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-surface-container-low px-6 py-4 shadow-md">
        <div className="flex flex-col gap-1">
          <h1 className="font-display text-2xl text-on-surface">
            Arquitectura del Proyecto
          </h1>
          <p className="text-sm text-on-surface-variant">
            Qué hay en cada carpeta de devlearn y para qué sirve.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary/15 px-2 py-0.5 font-mono text-xs text-primary">
            {totalFolders} carpetas
          </span>
          <span className="rounded-full bg-secondary/15 px-2 py-0.5 font-mono text-xs text-secondary">
            {totalFiles} archivos
          </span>
        </div>
      </div>

      {/* Leyenda */}
      <div className="flex items-center gap-4 rounded-xl bg-surface-container-high px-4 py-2">
        <span className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] text-tertiary">
            folder
          </span>
          Carpeta (contiene más cosas)
        </span>
        <span className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant">
          <span className="material-symbols-outlined text-[16px] text-secondary">
            draft
          </span>
          Archivo
        </span>
        <span className="ml-auto hidden font-mono text-xs text-outline md:block">
          Los datos de esta página viven en{" "}
          <code className="rounded bg-surface-container-highest px-1 py-0.5 text-secondary">
            src/data/architecture.ts
          </code>
        </span>
      </div>

      {/* Secciones de la estructura */}
      <div className="flex flex-col gap-4">
        {structureSections.map((section) => (
          <section
            key={section.id}
            className="flex flex-col gap-2 rounded-xl bg-surface-container-low p-4 shadow-md"
          >
            <div className="flex items-center gap-2 px-1 pb-1">
              <span className="material-symbols-outlined text-[20px] text-primary">
                {section.icon}
              </span>
              <h2 className="font-display text-xl text-on-surface">
                {section.title}
              </h2>
              <span className="ml-auto font-mono text-xs text-outline">
                {section.items.length} elementos
              </span>
            </div>

            {section.items.map((item) => (
              <div
                key={item.path}
                className="flex items-start gap-3 border-t border-surface-container-high px-1 py-2.5 first:border-t-0"
              >
                <span
                  className={`material-symbols-outlined mt-0.5 text-[18px] ${
                    item.kind === "folder" ? "text-tertiary" : "text-secondary"
                  }`}
                >
                  {item.kind === "folder" ? "folder" : "draft"}
                </span>
                <div className="flex min-w-0 flex-col gap-0.5">
                  <code className="break-all font-mono text-xs font-medium text-on-surface">
                    {item.path}
                  </code>
                  <p className="text-xs text-on-surface-variant">
                    {item.description}
                  </p>
                </div>
                <span
                  className={`ml-auto mt-0.5 shrink-0 rounded px-1.5 py-0.5 font-mono text-[11px] ${
                    item.kind === "folder"
                      ? "bg-tertiary/15 text-tertiary"
                      : "bg-surface-container-highest text-outline"
                  }`}
                >
                  {item.kind === "folder" ? "carpeta" : "archivo"}
                </span>
              </div>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
