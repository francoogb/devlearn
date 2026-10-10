"use client";

// Sidebar lateral derecho: Métricas Clave IA, Rutas en Curso, Cursos Pendientes y Scratchpad
import { useState } from "react";
import Link from "next/link";

const cursosPendientes = [
  {
    titulo: "Microsoft AI-900 · Conceptos de IA",
    plataforma: "Microsoft Learn",
    url: "https://learn.microsoft.com/es-es/training/paths/ai-concepts/",
    icono: "smart_toy",
  },
  {
    titulo: "Codewars · Katas de práctica",
    plataforma: "Codewars",
    url: "https://www.codewars.com/dashboard",
    icono: "code",
  },
];

export default function PanelLateralStitch() {
  const [scratchpadText, setScratchpadText] = useState("");
  const [notasFijadas, setNotasFijadas] = useState([
    { id: 1, texto: "--force-with-lease (git push)", hora: "10:14" },
  ]);

  const handleGuardarNota = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && scratchpadText.trim()) {
      e.preventDefault();
      const horaActual = new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setNotasFijadas([
        { id: Date.now(), texto: scratchpadText.trim(), hora: horaActual },
        ...notasFijadas,
      ]);
      setScratchpadText("");
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* 1. Métricas Clave IA */}
      <section className="rounded-xl bg-surface-container p-5 flex flex-col gap-3 shadow-sm border border-surface-container-high">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-secondary text-[20px]">
              insights
            </span>
            <h3 className="font-display text-base font-semibold text-on-surface">
              Métricas Clave IA
            </h3>
          </div>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-bold">
            ONLINE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-0.5 border border-surface-container-high/30">
            <span className="text-outline text-[11px] font-mono">Retención</span>
            <span className="font-display text-lg font-bold text-secondary">
              91.4%
            </span>
          </div>
          <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-0.5 border border-surface-container-high/30">
            <span className="text-outline text-[11px] font-mono">Racha Activa</span>
            <span className="font-display text-lg font-bold text-tertiary">
              12 Días
            </span>
          </div>
          <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-0.5 border border-surface-container-high/30">
            <span className="text-outline text-[11px] font-mono">Horas / Mes</span>
            <span className="font-display text-lg font-bold text-on-surface">
              34.6h
            </span>
          </div>
          <div className="p-3 rounded-lg bg-surface-container-low flex flex-col gap-0.5 border border-surface-container-high/30">
            <span className="text-outline text-[11px] font-mono">Ritmo Diario</span>
            <span className="font-display text-lg font-bold text-primary">
              45 min
            </span>
          </div>
        </div>

        <div className="p-2.5 rounded-lg bg-surface-container-low flex items-center justify-between text-xs font-mono border border-surface-container-high/30">
          <span className="text-outline">Próximo Objetivo:</span>
          <span className="text-secondary font-semibold">Go: Channels</span>
        </div>
      </section>

      {/* 2. Rutas en Curso */}
      <section className="rounded-xl bg-surface-container p-5 flex flex-col gap-3 shadow-sm border border-surface-container-high">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-[20px]">
              route
            </span>
            <h3 className="font-display text-base font-semibold text-on-surface">
              Rutas en Curso
            </h3>
          </div>
          <span className="font-mono text-[11px] text-outline">
            Progreso Real
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {/* Lenguajes Base */}
          <Link
            href="/aprender/js"
            className="group p-3 rounded-lg bg-surface-container-low flex flex-col gap-1.5 border border-surface-container-high/30 hover:border-secondary/40 transition-colors"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-on-surface group-hover:text-secondary transition-colors">
                Lenguajes Base (JS & TS)
              </span>
              <span className="font-mono text-secondary font-bold text-xs">
                74%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
              <div className="h-full bg-secondary rounded-full w-[74%]" />
            </div>
          </Link>

          {/* Frameworks & Backend */}
          <Link
            href="/aprender/next"
            className="group p-3 rounded-lg bg-surface-container-low flex flex-col gap-1.5 border border-surface-container-high/30 hover:border-primary/40 transition-colors"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-on-surface group-hover:text-primary transition-colors">
                Frameworks & Backend
              </span>
              <span className="font-mono text-primary font-bold text-xs">
                58%
              </span>
            </div>
            <div className="w-full h-1.5 rounded-full bg-surface-container-highest overflow-hidden">
              <div className="h-full bg-primary rounded-full w-[58%]" />
            </div>
          </Link>
        </div>
      </section>

      {/* 3. Cursos Pendientes */}
      <section className="rounded-xl bg-surface-container p-5 flex flex-col gap-3 shadow-sm border border-surface-container-high">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-[20px]">
              school
            </span>
            <h3 className="font-display text-base font-semibold text-on-surface">
              Cursos Pendientes
            </h3>
          </div>
          <span className="font-mono text-[11px] text-outline">En curso</span>
        </div>

        <div className="flex flex-col gap-2">
          {cursosPendientes.map((curso) => (
            <a
              key={curso.url}
              href={curso.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group p-3 rounded-lg bg-surface-container-low flex flex-col gap-2 border border-surface-container-high/30 hover:border-tertiary/40 transition-colors"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="material-symbols-outlined text-tertiary text-[18px] shrink-0">
                    {curso.icono}
                  </span>
                  <span className="font-medium text-on-surface text-xs group-hover:text-tertiary transition-colors truncate">
                    {curso.titulo}
                  </span>
                </div>
                <span className="material-symbols-outlined text-outline text-[14px] shrink-0 group-hover:text-tertiary transition-colors">
                  open_in_new
                </span>
              </div>
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-outline">{curso.plataforma}</span>
                <span className="text-tertiary font-semibold">Pendiente</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* 4. Scratchpad */}
      <section className="rounded-xl bg-surface-container p-5 flex flex-col gap-3 shadow-sm border border-surface-container-high">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-tertiary text-[20px]">
              sticky_note_2
            </span>
            <h3 className="font-display text-base font-semibold text-on-surface">
              Scratchpad
            </h3>
          </div>
          <span className="font-mono text-[11px] text-on-surface-variant">
            Rápido
          </span>
        </div>

        <div className="relative">
          <textarea
            value={scratchpadText}
            onChange={(e) => setScratchpadText(e.target.value)}
            onKeyDown={handleGuardarNota}
            rows={2}
            placeholder="Apunta comandos, flags o notas rápidas... (Enter para fijar)"
            className="w-full bg-surface-container-lowest text-on-surface font-mono text-xs rounded-lg p-2.5 placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary border border-surface-container-high resize-none"
          />
        </div>

        <div className="flex flex-col gap-1.5 max-h-32 overflow-y-auto">
          {notasFijadas.map((nota) => (
            <div
              key={nota.id}
              className="p-2 rounded bg-surface-container-low flex items-center justify-between text-xs font-mono border border-surface-container-high/20"
            >
              <span className="text-on-surface truncate pr-2">{nota.texto}</span>
              <span className="text-outline text-[10px] shrink-0">{nota.hora}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
