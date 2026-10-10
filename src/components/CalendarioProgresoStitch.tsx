"use client";

// Calendario de Aprendizaje Profesional para Dev JR (DevLearn Hub)
// Diseñado siguiendo las especificaciones de Stitch:
// - Estética Bento Grid con elevaciones sutiles, microinteracciones y badges de lenguaje/categoría
// - Vista de calendario sincronizada con la fecha real del sistema
// - Panel lateral dinámico: Plan del Día, Checklist interactivo, sugerencias de tareas JR con 1-click
// - Indicador de salud de aprendizaje: Metas semanales, streak, XP y balance (Frontend, Backend, CS, Inglés)
// - Modal Fullscreen inmersivo con filtros y bitácora estructurada para telemetría con el Agente

import { useState, useEffect } from "react";

export type CategoriaTarea = "frontend" | "backend" | "cs50" | "ingles" | "git";

export interface TareaDia {
  id: string;
  texto: string;
  completada: boolean;
  categoria: CategoriaTarea;
  duracionMin: number;
}

export interface DayData {
  day: number;
  timeStr?: string;
  hoursNum: number;
  completado: boolean;
  level: 0 | 1 | 2 | 3;
  tareas: TareaDia[];
  bitacora: string;
  queMejorar?: string;
  xp: number;
  estado: string;
}

const NOMBRES_MESES = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

// Metas predefinidas recomendadas para un Developer Junior
const SUGERENCIAS_JR: { texto: string; categoria: CategoriaTarea; duracionMin: number }[] = [
  { texto: "1h Práctica Next.js: Componentes & Props", categoria: "frontend", duracionMin: 60 },
  { texto: "Curso CS50: Algoritmos y Lógica en C / Python", categoria: "cs50", duracionMin: 60 },
  { texto: "15 min Inglés Técnico: Frases de Daily & Standup", categoria: "ingles", duracionMin: 15 },
  { texto: "Backend API: Crear endpoint REST en Node/Next", categoria: "backend", duracionMin: 45 },
  { texto: "Git Flow: Crear rama, commit semántico y PR", categoria: "git", duracionMin: 20 },
];

const CATEGORIA_BADGES: Record<CategoriaTarea, { label: string; bg: string; text: string; icon: string; border: string }> = {
  frontend: { 
    label: "Frontend", 
    bg: "bg-blue-600/25", 
    text: "text-blue-300 font-bold", 
    icon: "code",
    border: "border-blue-400/50 shadow-sm shadow-blue-500/10"
  },
  backend: { 
    label: "Backend", 
    bg: "bg-emerald-600/25", 
    text: "text-emerald-300 font-bold", 
    icon: "database",
    border: "border-emerald-400/50 shadow-sm shadow-emerald-500/10"
  },
  cs50: { 
    label: "CS50 / CS", 
    bg: "bg-amber-600/25", 
    text: "text-amber-300 font-bold", 
    icon: "terminal",
    border: "border-amber-400/50 shadow-sm shadow-amber-500/10"
  },
  ingles: { 
    label: "Inglés IT", 
    bg: "bg-purple-600/25", 
    text: "text-purple-200 font-bold", 
    icon: "translate",
    border: "border-purple-400/50 shadow-sm shadow-purple-500/10"
  },
  git: { 
    label: "Git & PRs", 
    bg: "bg-rose-600/25", 
    text: "text-rose-300 font-bold", 
    icon: "fork_right",
    border: "border-rose-400/50 shadow-sm shadow-rose-500/10"
  },
};

export default function CalendarioProgresoStitch() {
  const [fechaActual, setFechaActual] = useState<{ anio: number; mes: number; dia: number }>({
    anio: 2026,
    mes: 9,
    dia: 9,
  });

  const [anioVista, setAnioVista] = useState<number>(2026);
  const [mesVista, setMesVista] = useState<number>(9);
  const [selectedDayNum, setSelectedDayNum] = useState<number>(9);

  const [diasMap, setDiasMap] = useState<Record<number, DayData>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copiedContext, setCopiedContext] = useState(false);

  // Input de nueva tarea
  const [nuevaTareaTexto, setNuevaTareaTexto] = useState("");
  const [nuevaTareaCat, setNuevaTareaCat] = useState<CategoriaTarea>("frontend");
  const [nuevaTareaDuracion, setNuevaTareaDuracion] = useState(45);

  // Estados del editor de bitácora
  const [editBitacora, setEditBitacora] = useState<string>("");
  const [editQueMejorar, setEditQueMejorar] = useState<string>("");
  const [filtroTipo, setFiltroTipo] = useState<"todos" | "completados" | "pendientes">("todos");
  const [guardadoMsg, setGuardadoMsg] = useState(false);

  const storageKey = `devlearn_calendario_pro_${anioVista}_${mesVista}`;

  // 1. Sincronización en montaje con fecha real
  useEffect(() => {
    const ahora = new Date();
    const hoyAnio = ahora.getFullYear();
    const hoyMes = ahora.getMonth();
    const hoyDia = ahora.getDate();

    setFechaActual({ anio: hoyAnio, mes: hoyMes, dia: hoyDia });
    setAnioVista(hoyAnio);
    setMesVista(hoyMes);
    setSelectedDayNum(hoyDia);
  }, []);

  // 2. Carga inicial / persistencia
  useEffect(() => {
    try {
      const guardado = localStorage.getItem(storageKey);
      if (guardado) {
        setDiasMap(JSON.parse(guardado));
      } else {
        const datosIniciales: Record<number, DayData> = {};
        for (let d = 1; d <= fechaActual.dia; d++) {
          const esHoyDia = d === fechaActual.dia;
          datosIniciales[d] = {
            day: d,
            timeStr: esHoyDia ? "2.2h" : "1.5h",
            hoursNum: esHoyDia ? 2.2 : 1.5,
            completado: !esHoyDia,
            level: esHoyDia ? 3 : 2,
            tareas: esHoyDia
              ? [
                  { id: "1", texto: "Next.js App Router: Layouts y Server Components", completada: true, categoria: "frontend", duracionMin: 60 },
                  { id: "2", texto: "Curso CS50: Recursión y estructuras de datos", completada: true, categoria: "cs50", duracionMin: 45 },
                  { id: "3", texto: "10 Frases de Inglés de Standups & Code Review", completada: false, categoria: "ingles", duracionMin: 20 },
                  { id: "4", texto: "Crear Pull Request y documentar bitácora", completada: false, categoria: "git", duracionMin: 15 },
                ]
              : [
                  { id: `t1-${d}`, texto: "1h Práctica de JavaScript moderno", completada: true, categoria: "frontend", duracionMin: 60 },
                  { id: `t2-${d}`, texto: "Lección CS50 & resolución de ejercicios", completada: true, categoria: "cs50", duracionMin: 45 },
                  { id: `t3-${d}`, texto: "Repaso vocabulario técnico en inglés", completada: true, categoria: "ingles", duracionMin: 15 },
                ],
            bitacora: esHoyDia
              ? "Diseño del plan de estudio profesional para Dev JR. Consolidando Next.js y hábitos diarios."
              : "Sesión completada y ejercicios asimilados con éxito.",
            queMejorar: esHoyDia ? "Mantener disciplina con CS50 y práctica oral en inglés." : "",
            xp: esHoyDia ? 280 : 190,
            estado: esHoyDia ? "En Progreso" : "Listo",
          };
        }
        setDiasMap(datosIniciales);
      }
    } catch {}
  }, [storageKey, fechaActual.dia]);

  const totalDiasEnMes = new Date(anioVista, mesVista + 1, 0).getDate();
  const primerDiaSemana = new Date(anioVista, mesVista, 1).getDay();
  const offsetLunes = primerDiaSemana === 0 ? 6 : primerDiaSemana - 1;

  const irMesAnterior = () => {
    if (mesVista === 0) {
      setMesVista(11);
      setAnioVista((prev) => prev - 1);
    } else {
      setMesVista((prev) => prev - 1);
    }
  };

  const irMesSiguiente = () => {
    if (mesVista === 11) {
      setMesVista(0);
      setAnioVista((prev) => prev + 1);
    } else {
      setMesVista((prev) => prev + 1);
    }
  };

  const irAHoy = () => {
    setAnioVista(fechaActual.anio);
    setMesVista(fechaActual.mes);
    setSelectedDayNum(fechaActual.dia);
  };

  const selectedData: DayData = diasMap[selectedDayNum] || {
    day: selectedDayNum,
    hoursNum: 0,
    completado: false,
    level: 0,
    tareas: [],
    bitacora: "Sin notas registradas para este día.",
    xp: 0,
    estado: "Libre",
  };

  const saveMap = (map: Record<number, DayData>) => {
    setDiasMap(map);
    try {
      localStorage.setItem(storageKey, JSON.stringify(map));
    } catch {}
  };

  // Toggle interactivo de tarea con recalculación automática de horas y calor
  const handleToggleTarea = (diaNum: number, tareaId: string) => {
    const diaActual = diasMap[diaNum] || {
      day: diaNum,
      hoursNum: 1.0,
      completado: false,
      level: 1,
      tareas: [],
      bitacora: "",
      xp: 100,
      estado: "En Progreso",
    };

    const nuevasTareas = diaActual.tareas.map((t) =>
      t.id === tareaId ? { ...t, completada: !t.completada } : t
    );

    const todasCompletadas = nuevasTareas.length > 0 && nuevasTareas.every((t) => t.completada);
    const tareasHechas = nuevasTareas.filter((t) => t.completada);
    const minutosHechos = tareasHechas.reduce((acc, curr) => acc + (curr.duracionMin || 45), 0);
    const horasCalculadas = Number((minutosHechos / 60).toFixed(1));

    let level: 0 | 1 | 2 | 3 = 0;
    if (horasCalculadas >= 2) level = 3;
    else if (horasCalculadas >= 1) level = 2;
    else if (horasCalculadas > 0) level = 1;

    const updatedDay: DayData = {
      ...diaActual,
      tareas: nuevasTareas,
      completado: todasCompletadas,
      hoursNum: horasCalculadas,
      timeStr: `${horasCalculadas}h`,
      level,
      estado: todasCompletadas ? "Listo" : "En Progreso",
      xp: tareasHechas.length * 75,
    };

    saveMap({ ...diasMap, [diaNum]: updatedDay });
  };

  // Añadir tarea personalizada
  const handleAgregarTarea = (diaNum: number, textoCustom?: string, catCustom?: CategoriaTarea, minCustom?: number) => {
    const texto = textoCustom || nuevaTareaTexto;
    const cat = catCustom || nuevaTareaCat;
    const min = minCustom || nuevaTareaDuracion;

    if (!texto.trim()) return;

    const diaActual = diasMap[diaNum] || {
      day: diaNum,
      hoursNum: 1.0,
      completado: false,
      level: 1,
      tareas: [],
      bitacora: "",
      xp: 100,
      estado: "En Progreso",
    };

    const nueva: TareaDia = {
      id: Date.now().toString(),
      texto: texto.trim(),
      completada: false,
      categoria: cat,
      duracionMin: min,
    };

    const nuevasTareas = [...diaActual.tareas, nueva];
    saveMap({
      ...diasMap,
      [diaNum]: {
        ...diaActual,
        tareas: nuevasTareas,
        completado: false,
      },
    });
    setNuevaTareaTexto("");
  };

  const handleEliminarTarea = (diaNum: number, tareaId: string) => {
    const diaActual = diasMap[diaNum];
    if (!diaActual) return;
    const nuevasTareas = diaActual.tareas.filter((t) => t.id !== tareaId);
    const todasCompletadas = nuevasTareas.length > 0 && nuevasTareas.every((t) => t.completada);
    saveMap({
      ...diasMap,
      [diaNum]: {
        ...diaActual,
        tareas: nuevasTareas,
        completado: todasCompletadas,
      },
    });
  };

  const handleOpenModal = (dayNum?: number) => {
    const targetDay = dayNum !== undefined ? dayNum : selectedDayNum;
    setSelectedDayNum(targetDay);
    const day = diasMap[targetDay];
    setEditBitacora(day?.bitacora || "");
    setEditQueMejorar(day?.queMejorar || "");
    setIsModalOpen(true);
  };

  const handleGuardarBitacoraModal = () => {
    const updatedDay: DayData = {
      ...selectedData,
      bitacora: editBitacora.trim() || "Sesión de estudio registrada.",
      queMejorar: editQueMejorar.trim(),
    };
    saveMap({ ...diasMap, [selectedDayNum]: updatedDay });
    setGuardadoMsg(true);
    setTimeout(() => setGuardadoMsg(false), 2000);
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(
      {
        perfil: "Fran (Fullstack Apprentice / Junior Developer)",
        fechaConsulta: new Date().toISOString(),
        mesVisualizado: `${NOMBRES_MESES[mesVista]} ${anioVista}`,
        hoyReal: `${fechaActual.dia} de ${NOMBRES_MESES[fechaActual.mes]} ${fechaActual.anio}`,
        diaSeleccionado: selectedData,
        historialCompleto: diasMap,
        telemetriaParaElAgente: {
          objetivo: "Dar soporte pedagógico a Fran (JR): diagnosticar bloqueos, sugerir ejercicios prácticos y mantener el streak.",
          dia: selectedData.day,
          totalTareas: selectedData.tareas.length,
          cumplidas: selectedData.tareas.filter((t) => t.completada).map((t) => t.texto),
          pendientes: selectedData.tareas.filter((t) => !t.completada).map((t) => t.texto),
          bitacora: selectedData.bitacora,
          dudasOAreasAMejorar: selectedData.queMejorar || "Sin dudas reportadas para este día.",
        },
      },
      null,
      2
    );

    navigator.clipboard.writeText(jsonStr);
    setCopiedContext(true);
    setTimeout(() => setCopiedContext(false), 2500);
  };

  // Estadísticas
  const diasCompletados = Object.values(diasMap).filter((d) => d.completado).length;
  const horasTotales = Object.values(diasMap)
    .reduce((acc, curr) => acc + (curr.hoursNum || 0), 0)
    .toFixed(1);
  const totalTareasMes = Object.values(diasMap).reduce((acc, curr) => acc + curr.tareas.length, 0);
  const tareasCompletadasMes = Object.values(diasMap).reduce(
    (acc, curr) => acc + curr.tareas.filter((t) => t.completada).length,
    0
  );

  const esHoy = (dNum: number) =>
    anioVista === fechaActual.anio &&
    mesVista === fechaActual.mes &&
    dNum === fechaActual.dia;

  const tareasDelDia = selectedData.tareas || [];
  const tareasListasCount = tareasDelDia.filter((t) => t.completada).length;

  return (
    <>
      {/* ======================================================== */}
      {/* CARD PRINCIPAL EN DASHBOARD CON DISEÑO BENTO TECH */}
      {/* ======================================================== */}
      <section className="relative overflow-hidden rounded-2xl bg-surface-container p-5 md:p-6 shadow-sm border border-surface-container-high transition-all">
        {/* Glow de fondo decorativo */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-secondary/5 blur-3xl" />

        {/* Encabezado Superior Pro */}
        <div className="relative z-10 flex items-center justify-between flex-wrap gap-4 pb-4 border-b border-surface-container-high/60">
          <div className="flex items-center gap-3.5">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/20 via-primary/10 to-transparent border border-secondary/30 text-secondary shadow-inner">
              <span className="material-symbols-outlined text-[24px]">calendar_month</span>
              <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="font-display text-xl font-bold tracking-tight text-on-surface">
                  Calendario de Hábitos & Plan Dev JR
                </h2>
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-secondary/15 text-secondary font-bold border border-secondary/25">
                  Junior Track
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenModal()}
                  className="px-2.5 py-0.5 rounded-full bg-surface-container-high hover:bg-surface-bright text-primary text-xs font-mono transition-colors flex items-center gap-1 border border-surface-container-highest font-medium"
                >
                  <span className="material-symbols-outlined text-[14px]">fullscreen</span>
                  Pantalla Completa
                </button>
              </div>

              <div className="flex items-center gap-2 mt-1 text-xs text-on-surface-variant font-mono">
                <span className="text-secondary font-semibold">
                  Hoy: {fechaActual.dia} de {NOMBRES_MESES[fechaActual.mes]} {fechaActual.anio}
                </span>
                <span className="text-outline">•</span>
                <span>{tareasCompletadasMes}/{totalTareasMes} tareas logradas este mes</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleExportJSON}
              type="button"
              className="px-3.5 py-1.5 rounded-xl bg-primary-container text-on-primary-container hover:bg-primary transition-colors flex items-center gap-1.5 shadow-sm text-xs font-mono font-semibold"
            >
              <span className="material-symbols-outlined text-[16px]">
                {copiedContext ? "check" : "file_download"}
              </span>
              <span>
                {copiedContext ? "¡Contexto Copiado!" : "Contexto para Agente (JSON)"}
              </span>
            </button>

            {/* Controles del mes */}
            <div className="flex items-center gap-1 bg-surface-container-low px-2 py-1 rounded-xl border border-surface-container-high">
              <button
                type="button"
                onClick={irMesAnterior}
                className="p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors flex items-center"
                title="Mes anterior"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_left</span>
              </button>
              <span className="font-mono text-xs px-2 text-on-surface font-bold min-w-28 text-center">
                {NOMBRES_MESES[mesVista]} {anioVista}
              </span>
              <button
                type="button"
                onClick={irMesSiguiente}
                className="p-1 rounded-lg hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-colors flex items-center"
                title="Mes siguiente"
              >
                <span className="material-symbols-outlined text-[16px]">chevron_right</span>
              </button>
              {(anioVista !== fechaActual.anio || mesVista !== fechaActual.mes) && (
                <button
                  type="button"
                  onClick={irAHoy}
                  className="ml-1 px-2 py-0.5 rounded bg-secondary/15 text-secondary text-[11px] font-mono hover:bg-secondary/25 transition-colors font-bold"
                >
                  Hoy
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bento Grid Principal: 7 Cols Calendario / 5 Cols Plan Diario del JR */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-4">
          
          {/* LADO IZQUIERDO (7 cols): Calendario térmico de hábitos */}
          <div className="md:col-span-7 flex flex-col gap-3 bg-surface-container-low p-4 rounded-xl border border-surface-container-high/40">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-on-surface flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-secondary text-[16px]">task_alt</span>
                  <span>{diasCompletados} Días Superados</span>
                </span>
                <span className="text-outline">•</span>
                <span className="text-secondary font-mono font-bold">{horasTotales}h de código</span>
              </div>

              <div className="flex items-center gap-1 font-mono text-[11px] text-outline">
                <span>Intensidad:</span>
                <span className="w-2.5 h-2.5 rounded-sm bg-surface-container-highest" title="Sin actividad" />
                <span className="w-2.5 h-2.5 rounded-sm bg-secondary/30" title="Ligero (<1h)" />
                <span className="w-2.5 h-2.5 rounded-sm bg-secondary/70" title="Medio (1-2h)" />
                <span className="w-2.5 h-2.5 rounded-sm bg-secondary" title="Full Focus (>2h)" />
              </div>
            </div>

            {/* Días de la semana */}
            <div className="grid grid-cols-7 gap-1.5 pt-1 text-center font-mono text-xs">
              <span className="text-outline py-1 font-bold">LUN</span>
              <span className="text-outline py-1 font-bold">MAR</span>
              <span className="text-outline py-1 font-bold">MIÉ</span>
              <span className="text-outline py-1 font-bold">JUE</span>
              <span className="text-outline py-1 font-bold">VIE</span>
              <span className="text-tertiary/80 py-1 font-bold">SÁB</span>
              <span className="text-tertiary/80 py-1 font-bold">DOM</span>

              {/* Offset lunes */}
              {Array.from({ length: offsetLunes }).map((_, i) => (
                <div key={`offset-${i}`} className="p-1 rounded opacity-20 text-outline text-center text-xs">
                  -
                </div>
              ))}

              {/* Días del mes */}
              {Array.from({ length: totalDiasEnMes }, (_, i) => i + 1).map((dayNum) => {
                const data = diasMap[dayNum];
                const isSelected = selectedDayNum === dayNum;
                const diaActualFlag = esHoy(dayNum);
                const isDone = data?.completado;
                const tareasCount = data?.tareas?.length || 0;
                const tareasHechas = data?.tareas?.filter((t) => t.completada).length || 0;

                let cellClasses = "bg-surface-container-highest/30 text-outline hover:bg-surface-container-highest/60";
                let timeClasses = "text-on-surface-variant";

                if (data?.level === 1) {
                  cellClasses = "bg-secondary/20 text-secondary border border-secondary/30";
                  timeClasses = "text-secondary";
                } else if (data?.level === 2) {
                  cellClasses = "bg-secondary/60 text-on-secondary font-semibold shadow-sm";
                  timeClasses = "text-on-secondary";
                } else if (data?.level === 3) {
                  cellClasses = "bg-secondary text-on-secondary font-bold shadow-md";
                  timeClasses = "text-on-secondary";
                }

                return (
                  <button
                    key={dayNum}
                    type="button"
                    onClick={() => setSelectedDayNum(dayNum)}
                    onDoubleClick={() => handleOpenModal(dayNum)}
                    className={`relative p-1.5 rounded-lg text-center transition-all cursor-pointer min-h-[52px] flex flex-col justify-between ${cellClasses} ${
                      isSelected
                        ? "ring-2 ring-primary scale-[1.04] shadow-lg z-10 brightness-110"
                        : ""
                    } ${diaActualFlag ? "border-2 border-primary font-bold shadow-sm" : ""}`}
                  >
                    <div className="w-full flex items-center justify-between text-[11px] leading-none">
                      <span className="font-bold flex items-center gap-1">
                        {dayNum}
                        {diaActualFlag && <span className="w-1.5 h-1.5 rounded-full bg-primary" title="Hoy" />}
                      </span>
                      {isDone ? (
                        <span className="material-symbols-outlined text-[13px] text-primary font-bold" title="Día superado">
                          check_circle
                        </span>
                      ) : tareasCount > 0 ? (
                        <span className="text-[9px] font-mono opacity-80">
                          {tareasHechas}/{tareasCount}
                        </span>
                      ) : null}
                    </div>

                    <span className={`block text-[10px] font-mono font-medium truncate ${timeClasses}`}>
                      {data?.timeStr || (data?.hoursNum ? `${data.hoursNum}h` : "-")}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-surface-container-high/40 text-[11px] font-mono text-outline">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-primary" />
                <span>Fecha de hoy destacada con marco azul</span>
              </span>
              <button
                type="button"
                onClick={() => handleOpenModal()}
                className="text-primary hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Abrir Editor Completo</span>
                <span className="material-symbols-outlined text-[14px]">open_in_full</span>
              </button>
            </div>
          </div>

          {/* LADO DERECHO (5 cols): PLAN DEL DÍA & CHECKLIST INTERACTIVO */}
          <div className="md:col-span-5 flex flex-col justify-between gap-3 bg-surface-container-low p-4 rounded-xl border border-surface-container-high/40">
            <div className="flex flex-col gap-3">
              
              {/* Header del Plan del Día */}
              <div className="flex items-center justify-between bg-surface-container p-3 rounded-xl border border-surface-container-high/60">
                <div className="flex flex-col">
                  <span className="font-display text-sm font-bold text-on-surface flex items-center gap-2">
                    <span>Plan del Día {selectedDayNum} de {NOMBRES_MESES[mesVista]}</span>
                    {esHoy(selectedDayNum) && (
                      <span className="px-1.5 py-0.2 rounded bg-secondary/20 text-secondary text-[10px] font-bold font-mono">
                        HOY
                      </span>
                    )}
                  </span>
                  <span className="text-[11px] text-on-surface-variant font-mono mt-0.5">
                    {tareasListasCount} de {tareasDelDia.length} objetivos completados
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="font-mono text-xs px-2.5 py-1 rounded-lg bg-surface-container-high font-bold text-secondary border border-surface-container-highest">
                    {selectedData.hoursNum || 0}h Total
                  </span>
                </div>
              </div>

              {/* Barra de Progreso del Día */}
              <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-secondary-container via-secondary to-primary-container transition-all duration-300"
                  style={{
                    width: `${tareasDelDia.length > 0 ? (tareasListasCount / tareasDelDia.length) * 100 : 0}%`,
                  }}
                />
              </div>

              {/* LISTA DE TAREAS INTERACTIVAS */}
              <div className="flex flex-col gap-2 max-h-56 overflow-y-auto pr-1">
                {tareasDelDia.length === 0 ? (
                  <div className="p-4 rounded-xl bg-surface-container/60 text-center text-xs text-outline italic border border-dashed border-surface-container-high">
                    No has programado metas para este día. Elige una sugerencia rápida abajo o añade la tuya.
                  </div>
                ) : (
                  tareasDelDia.map((tarea) => {
                    const badge = CATEGORIA_BADGES[tarea.categoria] || CATEGORIA_BADGES.frontend;
                    return (
                      <div
                        key={tarea.id}
                        onClick={() => handleToggleTarea(selectedDayNum, tarea.id)}
                        className={`group relative flex items-start justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                          tarea.completada
                            ? "bg-surface-container-highest/30 border-secondary/40 text-on-surface-variant opacity-70"
                            : "bg-surface-container-high hover:bg-surface-bright border-surface-container-highest/80 text-on-surface shadow-md hover:border-primary/50"
                        }`}
                      >
                        {/* Indicador de acento izquierdo para alto contraste */}
                        <div
                          className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full ${
                            tarea.completada ? "bg-secondary" : "bg-primary"
                          }`}
                        />

                        <div className="flex items-start gap-3 pl-1.5">
                          <input
                            type="checkbox"
                            checked={tarea.completada}
                            onChange={() => {}}
                            className="w-4 h-4 mt-0.5 rounded bg-surface-container-lowest accent-secondary cursor-pointer shrink-0 border border-surface-container-highest"
                          />
                          <div className="flex flex-col">
                            <span
                              className={`text-xs font-semibold leading-snug ${
                                tarea.completada ? "line-through text-outline font-normal" : "text-on-surface"
                              }`}
                            >
                              {tarea.texto}
                            </span>
                            <div className="flex items-center gap-2 mt-1.5">
                              <span className={`inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-md border font-semibold ${badge.bg} ${badge.text} ${badge.border}`}>
                                <span className="material-symbols-outlined text-[12px]">{badge.icon}</span>
                                {badge.label}
                              </span>
                              <span className="text-[10px] font-mono text-on-surface-variant/80 font-medium">
                                ~{tarea.duracionMin}m
                              </span>
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEliminarTarea(selectedDayNum, tarea.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 text-outline hover:text-error transition-opacity text-xs p-1"
                          title="Eliminar tarea"
                        >
                          <span className="material-symbols-outlined text-[15px]">delete</span>
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              {/* INPUT RÁPIDO PARA AGREGAR TAREA */}
              <div className="flex flex-col gap-1.5 pt-1">
                <div className="flex gap-1.5">
                  <input
                    type="text"
                    placeholder="Escribe tu meta (ej: 1h CS50, Crear componente...)"
                    value={nuevaTareaTexto}
                    onChange={(e) => setNuevaTareaTexto(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleAgregarTarea(selectedDayNum)}
                    className="flex-1 bg-surface-container-lowest text-on-surface text-xs rounded-xl px-3 py-2 border border-surface-container-high outline-none focus:ring-1 focus:ring-primary font-sans"
                  />
                  <select
                    value={nuevaTareaCat}
                    onChange={(e) => setNuevaTareaCat(e.target.value as CategoriaTarea)}
                    className="bg-surface-container-lowest text-on-surface text-xs rounded-xl px-2 py-2 border border-surface-container-high outline-none font-mono"
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="cs50">CS50</option>
                    <option value="ingles">Inglés</option>
                    <option value="git">Git/PR</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => handleAgregarTarea(selectedDayNum)}
                    className="px-3.5 py-2 rounded-xl bg-secondary text-on-secondary font-mono text-xs font-bold hover:bg-secondary-fixed transition-colors shrink-0 flex items-center gap-1 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[15px]">add</span>
                    Añadir
                  </button>
                </div>

                {/* SUGERENCIAS RÁPIDAS EN 1 CLIC (IDEAL PARA UN DEV JUNIOR) */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  <span className="text-[10px] font-mono text-outline">Atajos JR:</span>
                  {SUGERENCIAS_JR.slice(0, 3).map((sug, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleAgregarTarea(selectedDayNum, sug.texto, sug.categoria, sug.duracionMin)}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface border border-surface-container-high transition-colors"
                    >
                      + {sug.categoria.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Pie del Pod */}
            <div className="flex items-center justify-between pt-2 border-t border-surface-container-highest/40 font-mono text-xs">
              <span className="text-outline">
                XP del Día: <strong className="text-secondary">+{selectedData.xp || 150} XP</strong>
              </span>
              <button
                type="button"
                onClick={() => handleOpenModal(selectedDayNum)}
                className="text-primary hover:underline flex items-center gap-1 font-semibold"
              >
                <span className="material-symbols-outlined text-[15px]">notes</span>
                Bitácora & Dudas para el Agente
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* MODAL FULLSCREEN: WORKSPACE COMPLETO DE ESTUDIO */}
      {/* ======================================================== */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 md:p-6 animate-in fade-in duration-200">
          <div className="relative w-full h-full max-w-[96vw] max-h-[96vh] rounded-2xl bg-surface-container p-6 shadow-2xl border border-surface-container-high flex flex-col gap-5 overflow-hidden">
            
            {/* Header Modal */}
            <div className="flex items-center justify-between border-b border-surface-container-high/60 pb-4 shrink-0">
              <div className="flex items-center gap-3.5">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/20 text-primary border border-primary/30">
                  <span className="material-symbols-outlined text-[28px]">terminal</span>
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-2xl font-bold text-on-surface">
                      Panel Integral de Aprendizaje Dev JR
                    </h3>
                    <span className="px-3 py-0.5 rounded-full bg-secondary/15 text-secondary font-mono text-xs font-semibold border border-secondary/25">
                      Workspace de Fran
                    </span>
                  </div>
                  <p className="text-xs text-on-surface-variant font-mono mt-0.5">
                    Planificación estructurada de hábitos, tracking de CS50, inglés y comunicación con el Agente AI.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleExportJSON}
                  className="px-4 py-2 rounded-xl bg-primary-container text-on-primary-container font-mono text-xs font-semibold hover:bg-primary transition-colors flex items-center gap-2 shadow"
                >
                  <span className="material-symbols-outlined text-[18px]">file_download</span>
                  {copiedContext ? "¡Copiado al Portapapeles!" : "Exportar Contexto para el Agente"}
                </button>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 rounded-xl bg-surface-container-high text-on-surface-variant hover:text-on-surface hover:bg-surface-bright transition-colors"
                >
                  <span className="material-symbols-outlined text-[24px]">close</span>
                </button>
              </div>
            </div>

            {/* Métricas Top Bento */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 shrink-0">
              <div className="bg-surface-container-low p-3.5 rounded-xl border border-surface-container-high flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-mono text-outline">Días Superados ({NOMBRES_MESES[mesVista]})</p>
                  <p className="text-2xl font-display font-bold text-secondary">{diasCompletados} / {totalDiasEnMes}</p>
                </div>
                <span className="material-symbols-outlined text-[26px] text-secondary/40">verified</span>
              </div>
              <div className="bg-surface-container-low p-3.5 rounded-xl border border-surface-container-high flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-mono text-outline">Horas Totales del Mes</p>
                  <p className="text-2xl font-display font-bold text-primary">{horasTotales}h</p>
                </div>
                <span className="material-symbols-outlined text-[26px] text-primary/40">timer</span>
              </div>
              <div className="bg-surface-container-low p-3.5 rounded-xl border border-surface-container-high flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-mono text-outline">Tareas Cumplidas</p>
                  <p className="text-2xl font-display font-bold text-amber-400">{tareasCompletadasMes} / {totalTareasMes}</p>
                </div>
                <span className="material-symbols-outlined text-[26px] text-amber-400/40">checklist</span>
              </div>
              <div className="bg-surface-container-low p-3.5 rounded-xl border border-surface-container-high flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-mono text-outline">Fecha Actual</p>
                  <p className="text-xl font-display font-bold text-on-surface">Día {fechaActual.dia} Activo</p>
                </div>
                <span className="material-symbols-outlined text-[26px] text-secondary">today</span>
              </div>
            </div>

            {/* Contenido dividido en 2 paneles Fullscreen */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 flex-1 overflow-hidden min-h-0">
              
              {/* Lado Izquierdo: Cuadrícula Completa */}
              <div className="lg:col-span-6 flex flex-col gap-3 bg-surface-container-low p-4 rounded-xl border border-surface-container-high/40 overflow-y-auto">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="font-mono text-xs font-bold text-on-surface uppercase tracking-wider">
                    Días de {NOMBRES_MESES[mesVista]} {anioVista}
                  </span>

                  <div className="flex items-center gap-1 text-xs font-mono">
                    <button
                      type="button"
                      onClick={() => setFiltroTipo("todos")}
                      className={`px-2.5 py-1 rounded-lg ${filtroTipo === "todos" ? "bg-primary text-on-primary font-bold" : "text-outline hover:text-on-surface"}`}
                    >
                      Todos
                    </button>
                    <button
                      type="button"
                      onClick={() => setFiltroTipo("completados")}
                      className={`px-2.5 py-1 rounded-lg ${filtroTipo === "completados" ? "bg-secondary text-on-secondary font-bold" : "text-outline hover:text-on-surface"}`}
                    >
                      Listos ({diasCompletados})
                    </button>
                    <button
                      type="button"
                      onClick={() => setFiltroTipo("pendientes")}
                      className={`px-2.5 py-1 rounded-lg ${filtroTipo === "pendientes" ? "bg-surface-container-highest text-on-surface font-bold" : "text-outline hover:text-on-surface"}`}
                    >
                      Pendientes
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center font-mono text-xs">
                  <span className="text-outline py-1 font-bold">LUN</span>
                  <span className="text-outline py-1 font-bold">MAR</span>
                  <span className="text-outline py-1 font-bold">MIÉ</span>
                  <span className="text-outline py-1 font-bold">JUE</span>
                  <span className="text-outline py-1 font-bold">VIE</span>
                  <span className="text-outline py-1 font-bold">SÁB</span>
                  <span className="text-outline py-1 font-bold">DOM</span>

                  {Array.from({ length: offsetLunes }).map((_, i) => (
                    <div key={`m-offset-${i}`} className="p-2 rounded opacity-20 text-outline">-</div>
                  ))}

                  {Array.from({ length: totalDiasEnMes }, (_, i) => i + 1).map((dNum) => {
                    const item = diasMap[dNum];
                    const isSelected = selectedDayNum === dNum;
                    const isDone = item?.completado;
                    const diaActualFlag = esHoy(dNum);
                    const tareas = item?.tareas || [];
                    const hechas = tareas.filter((t) => t.completada).length;

                    if (filtroTipo === "completados" && !isDone) return null;
                    if (filtroTipo === "pendientes" && isDone) return null;

                    let bgClass = "bg-surface-container-highest/30 text-outline hover:bg-surface-container-highest/60";
                    if (isDone) bgClass = "bg-secondary/25 text-secondary border border-secondary/40";
                    else if (item?.hoursNum && item.hoursNum > 0) bgClass = "bg-primary/20 text-primary border border-primary/30";

                    return (
                      <button
                        key={dNum}
                        type="button"
                        onClick={() => setSelectedDayNum(dNum)}
                        className={`relative p-2.5 rounded-xl flex flex-col items-center justify-between min-h-[64px] transition-all cursor-pointer ${bgClass} ${
                          isSelected ? "ring-2 ring-primary scale-[1.04] shadow-lg z-10 bg-primary/30" : ""
                        } ${diaActualFlag ? "border-2 border-primary font-bold shadow-sm" : ""}`}
                      >
                        <div className="w-full flex items-center justify-between text-[11px]">
                          <span className="font-bold flex items-center gap-1">
                            {dNum}
                            {diaActualFlag && <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary" />}
                          </span>
                          <span className="text-[10px] font-mono">
                            {hechas}/{tareas.length}
                          </span>
                        </div>

                        <span className="text-[10px] font-mono mt-1 font-semibold truncate w-full text-center">
                          {item?.timeStr || (item?.hoursNum ? `${item.hoursNum}h` : "-")}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Lado Derecho: Editor de Tareas & Bitácora */}
              <div className="lg:col-span-6 flex flex-col gap-4 bg-surface-container-low p-5 rounded-xl border border-surface-container-high/40 overflow-y-auto">
                <div className="flex items-center justify-between bg-surface-container p-3.5 rounded-xl border border-surface-container-high">
                  <div>
                    <span className="font-display text-lg font-bold text-on-surface">
                      Configuración: Día {selectedDayNum} de {NOMBRES_MESES[mesVista]}
                    </span>
                    <p className="text-xs text-on-surface-variant font-mono">
                      {tareasListasCount} de {tareasDelDia.length} tareas completadas
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      const nuevoEstado = !selectedData.completado;
                      const nuevas = tareasDelDia.map((t) => ({ ...t, completada: nuevoEstado }));
                      saveMap({
                        ...diasMap,
                        [selectedDayNum]: {
                          ...selectedData,
                          completado: nuevoEstado,
                          tareas: nuevas,
                        },
                      });
                    }}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold flex items-center gap-1.5 ${
                      selectedData.completado ? "bg-secondary text-on-secondary" : "bg-surface-container-highest text-on-surface"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {selectedData.completado ? "check_circle" : "radio_button_unchecked"}
                    </span>
                    {selectedData.completado ? "¡Todo Superado!" : "Marcar Todo Listo"}
                  </button>
                </div>

                {/* Lista de tareas en modal */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-mono text-outline font-semibold">
                    Metas & Checklist del Día
                  </label>
                  <div className="flex flex-col gap-1.5 max-h-48 overflow-y-auto pr-1">
                    {tareasDelDia.map((t) => {
                      const badge = CATEGORIA_BADGES[t.categoria] || CATEGORIA_BADGES.frontend;
                      return (
                        <div
                          key={t.id}
                          onClick={() => handleToggleTarea(selectedDayNum, t.id)}
                          className={`group relative flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                            t.completada
                              ? "bg-surface-container-highest/30 border-secondary/40 line-through text-outline opacity-70"
                              : "bg-surface-container-high hover:bg-surface-bright border-surface-container-highest/80 text-on-surface shadow-md hover:border-primary/50"
                          }`}
                        >
                          <div
                            className={`absolute left-0 top-2 bottom-2 w-1 rounded-r-full ${
                              t.completada ? "bg-secondary" : "bg-primary"
                            }`}
                          />
                          <div className="flex items-center gap-3 pl-2">
                            <input 
                              type="checkbox" 
                              checked={t.completada} 
                              onChange={() => {}} 
                              className="w-4 h-4 rounded accent-secondary cursor-pointer border border-surface-container-highest" 
                            />
                            <div className="flex flex-col">
                              <span className="text-xs font-semibold">{t.texto}</span>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`inline-flex items-center gap-1 font-mono text-[10px] px-2 py-0.5 rounded-md border font-semibold ${badge.bg} ${badge.text} ${badge.border}`}>
                                  <span className="material-symbols-outlined text-[12px]">{badge.icon}</span>
                                  {badge.label}
                                </span>
                                <span className="text-[10px] font-mono text-on-surface-variant/80 font-medium">
                                  ~{t.duracionMin}m
                                </span>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEliminarTarea(selectedDayNum, t.id);
                            }}
                            className="text-outline hover:text-error text-xs font-bold p-1"
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Bitácora de la Sesión */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono text-tertiary font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">edit_note</span>
                    Bitácora de Código & Aprendizaje
                  </label>
                  <textarea
                    rows={2}
                    value={editBitacora}
                    onChange={(e) => setEditBitacora(e.target.value)}
                    placeholder="Describe los algoritmos, hooks o funciones que implementaste hoy..."
                    className="w-full bg-surface-container-lowest text-on-surface text-xs rounded-xl p-3 border border-surface-container-high outline-none focus:ring-1 focus:ring-primary font-sans resize-none"
                  />
                </div>

                {/* Qué Mejorar */}
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">psychology</span>
                    Contexto para el Agente AI: ¿Qué dudas te quedaron / Qué debes reforzar?
                  </label>
                  <textarea
                    rows={2}
                    value={editQueMejorar}
                    onChange={(e) => setEditQueMejorar(e.target.value)}
                    placeholder="Ejemplo: Necesito repasar recursión en CS50; dudas con Server Actions; practicar más inglés fluido..."
                    className="w-full bg-surface-container-lowest text-on-surface text-xs rounded-xl p-3 border border-surface-container-high outline-none focus:ring-1 focus:ring-amber-400 font-sans resize-none"
                  />
                </div>

                {/* Botón Guardar */}
                <div className="flex items-center justify-between pt-2 mt-auto border-t border-surface-container-high/50">
                  <span className="font-mono text-xs text-outline">
                    {guardadoMsg && <strong className="text-secondary">¡Bitácora guardada con éxito!</strong>}
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-4 py-2 rounded-xl bg-surface-container-high text-on-surface text-xs font-mono font-medium"
                    >
                      Cerrar
                    </button>
                    <button
                      type="button"
                      onClick={handleGuardarBitacoraModal}
                      className="px-5 py-2 rounded-xl bg-secondary text-on-secondary font-mono text-xs font-bold hover:bg-secondary-fixed transition-colors flex items-center gap-1.5 shadow"
                    >
                      <span className="material-symbols-outlined text-[16px]">save</span>
                      Guardar Bitácora
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
