// Sidebar de navegación estilizado y limpio (estilo Notion/Linear/VSCode).
// - Enlaces principales directos (Dashboard, Arquitectura, Ejercicios) sin desplegables.
// - Solo 2 submenús desplegables discretos para agrupar lo que realmente crece:
//   1. "Backend & Datos" (NestJS + Prisma)
//   2. "Especialidades & CS" (Algoritmos, Estructuras, AI-901, Inglés)
// - Los cursos centrales Frontend (JS, TS, Next.js, Fundamentos) como accesos directos limpios.

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavLink {
  href: string;
  icon: string;
  label: string;
  badge?: string;
}

interface NavDropdown {
  id: string;
  label: string;
  icon: string;
  badge?: string;
  items: NavLink[];
}

// 1. Enlaces directos principales
const directMainLinks: NavLink[] = [
  { href: "/", icon: "dashboard", label: "Dashboard" },
  { href: "/biblioteca", icon: "local_library", label: "Biblioteca", badge: "Hub" },
  { href: "/arquitectura", icon: "account_tree", label: "Arquitectura", badge: "Fullstack" },
  { href: "/ejercicios", icon: "checklist", label: "Ejercicios" },
  { href: "/fundamentos", icon: "school", label: "Fundamentos" },
];

// 2. Frontend / Stack Web directo
const frontendLinks: NavLink[] = [
  { href: "/aprender/js", icon: "javascript", label: "JavaScript" },
  { href: "/aprender/ts", icon: "code_blocks", label: "TypeScript" },
  { href: "/aprender/react", icon: "flutter", label: "React", badge: "Core" },
  { href: "/aprender/next", icon: "hub", label: "Next.js" },
  { href: "/shadcn", icon: "widgets", label: "shadcn/ui", badge: "UI" },
];

// 3. Los únicos dos submenús agrupados necesarios para mantener limpio el sidebar
const dropdownSections: NavDropdown[] = [
  {
    id: "backend-data",
    label: "Backend & Datos",
    icon: "database",
    badge: "API",
    items: [
      { href: "/nestjs", icon: "dns", label: "NestJS", badge: ":3001" },
      { href: "/prisma", icon: "dataset", label: "Prisma ORM", badge: "BD" },
    ],
  },
  {
    id: "cs-skills",
    label: "Computer Science & Skills",
    icon: "psychology",
    badge: "+4",
    items: [
      { href: "/algoritmos", icon: "reorder", label: "Algoritmos" },
      { href: "/estructuras-de-datos", icon: "schema", label: "Estructuras de Datos" },
      { href: "/ai-901", icon: "smart_toy", label: "AI-901 Azure" },
      { href: "/ingles", icon: "translate", label: "Inglés Técnico" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  // Estado para desplegables: se abren si la ruta actual está adentro
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {
      "backend-data": true, // abierto por defecto para acceso rápido a NestJS/Prisma
      "cs-skills": false,
    };
    dropdownSections.forEach((dropdown) => {
      if (dropdown.items.some((item) => item.href === pathname)) {
        initial[dropdown.id] = true;
      }
    });
    return initial;
  });

  // Mantener abierto automáticamente si el usuario navega a una sub-ruta
  useEffect(() => {
    dropdownSections.forEach((dropdown) => {
      if (dropdown.items.some((item) => item.href === pathname)) {
        setOpenDropdowns((prev) => ({ ...prev, [dropdown.id]: true }));
      }
    });
  }, [pathname]);

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <aside className="flex w-64 shrink-0 flex-col gap-2 overflow-y-auto bg-surface-container-low p-4 border-r border-outline-variant/10">
      {/* ---------- LOGO Y MARCA ---------- */}
      <div className="mb-2 flex items-center gap-3 px-2 pt-1">
        <span className="material-symbols-outlined text-primary text-2xl">terminal</span>
        <div>
          <p className="font-display text-lg font-bold text-on-surface">DevLearn</p>
          <p className="text-[11px] text-on-surface-variant">Personal Dev Workspace</p>
        </div>
      </div>

      {/* ---------- NAVEGACIÓN DIRECTA & MODERADA ---------- */}
      <nav className="flex flex-col gap-1">
        {/* 1. SECCIÓN PRINCIPAL (Enlaces directos estándar) */}
        {directMainLinks.map((link) => {
          const activo = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                activo
                  ? "bg-surface-container-high font-semibold text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined text-[20px] ${activo ? "text-primary" : "text-outline"}`}>
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className="rounded px-1.5 py-0.2 font-mono text-[10px] font-bold bg-surface-container-highest text-secondary">
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* Separador sutil */}
        <div className="my-2 px-3">
          <p className="font-mono text-[10px] uppercase tracking-wider text-outline">
            Frontend & Web
          </p>
        </div>

        {/* 2. ENLACES DE FRONTEND (Directos, sin desplegable) */}
        {frontendLinks.map((link) => {
          const activo = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${
                activo
                  ? "bg-surface-container-high font-semibold text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`material-symbols-outlined text-[20px] ${activo ? "text-primary" : "text-outline"}`}>
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </div>
              {link.badge && (
                <span className="rounded px-1.5 py-0.2 font-mono text-[10px] font-bold bg-surface-container-highest text-secondary">
                  {link.badge}
                </span>
              )}
            </Link>
          );
        })}

        {/* Separador sutil */}
        <div className="my-2 px-3">
          <p className="font-mono text-[10px] uppercase tracking-wider text-outline">
            Módulos Agrupados
          </p>
        </div>

        {/* 3. SOLO 2 SUBMENÚS DESPLEGABLES (Lo justo y necesario) */}
        <div className="flex flex-col gap-1.5">
          {dropdownSections.map((dropdown) => {
            const isOpen = !!openDropdowns[dropdown.id];
            const hasActiveChild = dropdown.items.some((item) => item.href === pathname);

            return (
              <div
                key={dropdown.id}
                className="flex flex-col rounded-xl overflow-hidden border border-outline-variant/10 bg-surface-container/20"
              >
                {/* Cabecera del desplegable */}
                <button
                  type="button"
                  onClick={() => toggleDropdown(dropdown.id)}
                  className={`flex items-center justify-between px-3 py-2 text-xs font-semibold transition-colors ${
                    hasActiveChild
                      ? "text-primary bg-primary/10"
                      : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/40"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[18px]">
                      {dropdown.icon}
                    </span>
                    <span>{dropdown.label}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {dropdown.badge && !isOpen && (
                      <span className="rounded px-1.5 py-0.2 font-mono text-[9px] bg-surface-container-highest text-secondary">
                        {dropdown.badge}
                      </span>
                    )}
                    <span
                      className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                        isOpen ? "rotate-180" : "rotate-0 text-outline"
                      }`}
                    >
                      expand_more
                    </span>
                  </div>
                </button>

                {/* Sub-items cuando está expandido */}
                {isOpen && (
                  <div className="flex flex-col gap-0.5 p-1 pt-0.5 bg-surface-container-low/50">
                    {dropdown.items.map((item) => {
                      const activo = pathname === item.href;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`flex items-center justify-between rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                            activo
                              ? "bg-primary font-bold text-on-primary shadow-sm"
                              : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`material-symbols-outlined text-[16px] ${
                                activo ? "text-on-primary" : "text-outline"
                              }`}
                            >
                              {item.icon}
                            </span>
                            <span>{item.label}</span>
                          </div>

                          {item.badge && (
                            <span
                              className={`rounded px-1.5 py-0.2 font-mono text-[9px] font-bold ${
                                activo
                                  ? "bg-white/20 text-on-primary"
                                : "bg-surface-container-highest text-secondary"
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* ---------- TARJETA DE PERFIL Y PROGRESO ---------- */}
      <div className="mt-auto flex flex-col gap-3 pt-2">
        <div className="rounded-xl bg-surface-container p-3 border border-outline-variant/10">
          <div className="mb-2 flex items-center gap-2.5">
            <span className="material-symbols-outlined rounded-full bg-surface-container-highest p-1.5 text-primary text-base">
              person
            </span>
            <div>
              <p className="text-xs font-semibold text-on-surface">Fran</p>
              <p className="text-[10px] text-on-surface-variant">Fullstack Apprentice</p>
            </div>
          </div>
          <div className="mb-1 flex justify-between text-[11px] text-on-surface-variant font-mono">
            <span>Progreso XP</span>
            <span className="text-secondary font-bold">3,420 / 4,000</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-container-highest">
            <div className="h-full w-[85%] rounded-full bg-secondary" />
          </div>
        </div>

        <div className="flex flex-col gap-0.5 text-xs text-on-surface-variant">
          <span className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-surface-container-high hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-[18px]">settings</span>
            Ajustes
          </span>
          <span className="flex cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 hover:bg-surface-container-high hover:text-on-surface transition-colors">
            <span className="material-symbols-outlined text-[18px]">logout</span>
            Cerrar Sesión
          </span>
        </div>
      </div>
    </aside>
  );
}
