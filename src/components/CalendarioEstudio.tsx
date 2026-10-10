"use client";

// Calendario de Estudio Interactivo para Fran:
// Permite planificar días de estudio, registrar sesiones de código y ver el progreso diario.

import { useState } from "react";

interface StudyDay {
  dayNumber: number;
  dateStr: string;
  isToday: boolean;
  hasActivity: boolean;
  hours?: number;
  topic?: string;
  category?: "js" | "next" | "ts" | "ingles" | "algoritmos";
}

export default function CalendarioEstudio() {
  const [currentMonth, setCurrentMonth] = useState("Octubre 2026");
  const [selectedDay, setSelectedDay] = useState<number | null>(9); // 9 de octubre seleccionado por defecto
  const [studyNotes, setStudyNotes] = useState<Record<number, { topic: string; hours: number }>>({
    5: { topic: "Variables y Contador en React", hours: 1.5 },
    6: { topic: "Rutas dinámicas [nombre] en Next.js", hours: 2 },
    7: { topic: "Metas semanales y arreglos con .map()", hours: 1.5 },
    8: { topic: "AI-901 y gramática en Inglés", hours: 2.5 },
    9: { topic: "Fundamentos, diagramas de flujo y frases en inglés", hours: 3 },
  });

  const [inputTopic, setInputTopic] = useState("");
  const [inputHours, setInputHours] = useState(1);

  // Generador de días de Octubre 2026 (Octubre empieza en jueves -> día 4 de la semana)
  // 31 días en octubre
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const startOffset = 3; // Miércoles o Jueves

  const handleSaveDay = () => {
    if (!selectedDay || !inputTopic.trim()) return;
    setStudyNotes((prev) => ({
      ...prev,
      [selectedDay]: {
        topic: inputTopic.trim(),
        hours: Number(inputHours) || 1,
      },
    }));
    setInputTopic("");
  };

  const selectedNote = selectedDay ? studyNotes[selectedDay] : null;

  return (
    <section className="flex flex-col gap-5 rounded-2xl bg-surface-container p-6 shadow-sm border border-surface-container-high">
      {/* Encabezado del Calendario */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-surface-container-high pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/15 text-primary">
            <span className="material-symbols-outlined text-[24px]">calendar_month</span>
          </div>
          <div>
            <h2 className="font-display text-xl font-bold text-on-surface">
              Calendario de Estudio y Hábitos
            </h2>
            <p className="text-xs text-on-surface-variant">
              Monitorea tu racha, registra las horas que dedicas a programar y planifica tu semana.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1.5 rounded-full bg-secondary/15 px-3 py-1 font-mono text-xs font-semibold text-secondary">
            <span className="h-2 w-2 rounded-full bg-secondary animate-pulse" />
            Racha: 5 días consecutivos
          </span>
          <span className="rounded-lg bg-surface-container-highest px-3 py-1 font-mono text-xs text-on-surface">
            {currentMonth}
          </span>
        </div>
      </div>

      {/* Grid del Calendario */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Lado izquierdo: Días del Mes */}
        <div className="flex flex-col gap-3 lg:col-span-8">
          {/* Nombres de los días de la semana */}
          <div className="grid grid-cols-7 gap-1.5 text-center font-mono text-xs font-bold text-outline uppercase tracking-wider">
            <span>Lun</span>
            <span>Mar</span>
            <span>Mié</span>
            <span>Jue</span>
            <span>Vie</span>
            <span className="text-tertiary">Sáb</span>
            <span className="text-tertiary">Dom</span>
          </div>

          {/* Días en cuadrícula */}
          <div className="grid grid-cols-7 gap-1.5">
            {/* Celdas vacías del mes anterior */}
            {Array.from({ length: startOffset }).map((_, i) => (
              <div
                key={`empty-${i}`}
                className="h-12 sm:h-14 rounded-xl bg-surface-container-low/40 opacity-20"
              />
            ))}

            {/* Días del mes */}
            {daysInMonth.map((day) => {
              const isToday = day === 9;
              const hasActivity = !!studyNotes[day];
              const isSelected = selectedDay === day;

              let bgStyle = "bg-surface-container-low hover:bg-surface-container-high text-on-surface";
              if (isSelected) {
                bgStyle = "bg-primary text-on-primary ring-2 ring-primary/40 shadow-md font-bold";
              } else if (hasActivity) {
                bgStyle = "bg-surface-container-high border border-secondary/40 text-on-surface hover:border-secondary";
              }

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDay(day)}
                  className={`relative flex h-12 sm:h-14 flex-col items-center justify-between rounded-xl p-1.5 text-xs font-mono transition-all ${bgStyle}`}
                >
                  <div className="flex w-full items-center justify-between px-1">
                    <span className={`text-[11px] ${isSelected ? "text-on-primary" : "text-outline"}`}>
                      {day}
                    </span>
                    {isToday && (
                      <span className="h-1.5 w-1.5 rounded-full bg-secondary" title="Hoy" />
                    )}
                  </div>

                  {hasActivity && (
                    <div className="flex items-center gap-1">
                      <span
                        className={`material-symbols-outlined text-[14px] ${
                          isSelected ? "text-on-primary" : "text-secondary"
                        }`}
                      >
                        code
                      </span>
                      <span className={`text-[10px] font-bold ${isSelected ? "text-on-primary" : "text-secondary"}`}>
                        {studyNotes[day].hours}h
                      </span>
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Leyenda del calendario */}
          <div className="flex flex-wrap items-center gap-4 pt-2 text-xs font-mono text-outline">
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
              Día con sesión registrada
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-primary" />
              Día seleccionado
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full border border-secondary" />
              Hoy (9 Oct)
            </span>
          </div>
        </div>

        {/* Lado derecho: Detalle del día seleccionado & Añadir sesión */}
        <div className="flex flex-col gap-4 rounded-xl border border-surface-container-high bg-surface-container-low p-5 lg:col-span-4">
          <div className="flex items-center justify-between border-b border-surface-container-high pb-2.5">
            <span className="font-mono text-xs font-bold uppercase text-secondary">
              Detalle del Día {selectedDay ? `${selectedDay} de Octubre` : ""}
            </span>
            {selectedDay === 9 && (
              <span className="rounded bg-secondary/15 px-2 py-0.5 font-mono text-[10px] font-semibold text-secondary">
                HOY
              </span>
            )}
          </div>

          {selectedNote ? (
            <div className="flex flex-col gap-2 rounded-xl bg-surface-container p-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-outline">Tema estudiado:</span>
                <span className="rounded bg-primary/15 px-2 py-0.5 font-mono text-xs font-bold text-primary">
                  {selectedNote.hours} horas
                </span>
              </div>
              <p className="text-sm font-semibold text-on-surface">
                {selectedNote.topic}
              </p>
              <span className="text-[11px] text-secondary font-mono">
                ✓ Registro completado
              </span>
            </div>
          ) : (
            <div className="rounded-xl border border-dashed border-outline/30 p-4 text-center">
              <span className="material-symbols-outlined text-[24px] text-outline">
                edit_calendar
              </span>
              <p className="mt-1 text-xs text-on-surface-variant">
                Sin notas registradas para este día.
              </p>
            </div>
          )}

          {/* Formulario rápido para anotar sesión */}
          <div className="flex flex-col gap-2.5 border-t border-surface-container-high pt-3">
            <span className="font-mono text-xs font-bold text-on-surface">
              {selectedNote ? "Actualizar nota del día:" : "Registrar sesión de hoy:"}
            </span>
            <input
              type="text"
              placeholder="Ej: Practiqué algoritmos y 5 frases en inglés..."
              value={inputTopic}
              onChange={(e) => setInputTopic(e.target.value)}
              className="w-full rounded-lg bg-surface-container px-3 py-2 text-xs font-mono text-on-surface placeholder:text-outline focus:outline-none focus:ring-1 focus:ring-primary border border-surface-container-high"
            />
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-outline">Horas:</span>
              <input
                type="number"
                min={0.5}
                max={12}
                step={0.5}
                value={inputHours}
                onChange={(e) => setInputHours(Number(e.target.value))}
                className="w-20 rounded-lg bg-surface-container px-2 py-1.5 text-xs font-mono text-on-surface border border-surface-container-high text-center"
              />
              <button
                type="button"
                onClick={handleSaveDay}
                className="flex-1 rounded-lg bg-primary px-3 py-1.5 font-mono text-xs font-bold text-on-primary transition-colors hover:bg-primary/90"
              >
                Guardar Día
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
