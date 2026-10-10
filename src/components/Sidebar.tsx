// Sidebar de navegación con grupos y submenús colapsables.
// Organiza el contenido en categorías claras (Principal, Frontend & Lenguajes,
// Backend & Base de Datos, CS & Fundamentos, Certificación & Habilidades)
// para evitar que el menú lateral se sobrecargue y crezca desordenado.

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SubItem {
  href: string;
  icon: string;
  label: string;
  badge?: string;
}

interface NavGroup {
  id: string;
  label: string;
  icon: string;
  description?: string;
  defaultOpen?: boolean;
  items: SubItem[];
}

// Estructura organizada de navegación en categorías temáticas
const navGroups: NavGroup[] = [
  {
    id: "overview",
    label: "General",
    icon: "space_dashboard",
    defaultOpen: true,
    items: [
      { href: "/", icon: "dashboard", label: "Dashboard" },
      { href: "/arquitectura", icon: "account_tree", label: "Arquitectura", badge: "Fullstack" },
      { href: "/ejercicios", icon: "checklist", label: "Ejercicios" },
    ],
  },
  {
    id: "backend-db",
    label: "Backend & Base de Datos",
    icon: "storage",
    description: "NestJS, APIs, ORMs y Persistencia",
    defaultOpen: true,
    items: [
      { href: "/nestjs", icon: "dns", label: "NestJS", badge: ":3001" },
      { href: "/prisma", icon: "dataset", label: "Prisma ORM", badge: "BD" },
    ],
  },
  {
    id: "frontend-lang",
    label: "Frontend & Lenguajes",
    icon: "devices",
    description: "JavaScript, TypeScript y Next.js",
    defaultOpen: true,
    items: [
      { href: "/aprender/js", icon: "javascript", label: "JavaScript" },
      { href: "/aprender/ts", icon: "code_blocks", label: "TypeScript" },
      { href: "/aprender/next", icon: "hub", label: "Next.js" },
    ],
  },
  {
    id: "cs-fundamentos",
    label: "CS & Fundamentos",
    icon: "psychology",
    description: "Lógica, Algoritmos y Estructuras",
    defaultOpen: false,
    items: [
      { href: "/fundamentos", icon: "school", label: "Fundamentos" },
      { href: "/algoritmos", icon: "reorder", label: "Algoritmos" },
      { href: "/estructuras-de-datos", icon: "schema", label: "Estructuras" },
    ],
  },
  {
    id: "skills-cert",
    label: "Skills & Certificaciones",
    icon: "military_tech",
    description: "IA aplicada e Inglés técnico",
    defaultOpen: false,
    items: [
      { href: "/ai-901", icon: "smart_toy", label: "AI-901 (Azure)" },
      { href: "/ingles", icon: "translate", label: "Inglés Técnico" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  // Estado para controlar qué grupos están expandidos
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    navGroups.forEach((group) => {
      // Abre por defecto si defaultOpen es true o si la ruta actual está en este grupo
      const containsActive = group.items.some((item) => item.href === pathname);
      initial[group.id] = group.defaultOpen || containsActive;
    });
    return initial;
  });

  // Si cambia de ruta, aseguramos que el grupo activo permanezca expandido
  useEffect(() => {
    navGroups.forEach((group) => {
      const containsActive = group.items.some((item) => item.href === pathname);
      if (containsActive) {
        setOpenGroups((prev) => ({ ...prev, [group.id]: true }));
      }
    });
  }, [pathname]);

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  return (
    <aside className="flex w-64 shrink-0 flex-col gap-3 overflow-y-auto bg-surface-container-low p-4 border-r border-outline-variant/10">
      {/* ---------- LOGO Y MARCA ---------- */}
      <div className="flex items-center gap-3 px-2 pt-2">
        <span className="material-symbols-outlined text-primary text-2xl">terminal</span>
        <div>
          <p className="font-display text-lg font-bold text-on-surface">DevLearn</p>
          <p className="text-[11px] text-on-surface-variant">Personal Dev Workspace</p>
        </div>
      </div>

      {/* ---------- NAVEGACIÓN AGRUPADA CON SUBMENÚS ---------- */}
      <nav className="flex flex-col gap-2 pt-2">
        {navGroups.map((group) => {
          const isOpen = !!openGroups[group.id];
          const hasActiveItem = group.items.some((item) => item.href === pathname);

          return (
            <div
              key={group.id}
              className="flex flex-col rounded-xl overflow-hidden bg-surface-container/30 border border-outline-variant/10"
            >
              {/* Botón Cabecera de Categoría / Submenú */}
              <button
                type="button"
                onClick={() => toggleGroup(group.id)}
                className={`flex items-center justify-between px-3 py-2 text-xs font-semibold tracking-wide transition-colors ${
                  hasActiveItem
                    ? "text-primary bg-primary/10"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high/50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[17px] opacity-80">
                    {group.icon}
                  </span>
                  <span className="uppercase text-[11px] font-mono tracking-wider">
                    {group.label}
                  </span>
                </div>
                <span
                  className={`material-symbols-outlined text-[16px] transition-transform duration-200 ${
                    isOpen ? "rotate-180" : "rotate-0 text-outline"
                  }`}
                >
                  expand_more
                </span>
              </button>

              {/* Items desplegables */}
              {isOpen && (
                <div className="flex flex-col gap-0.5 p-1.5 pt-0.5">
                  {group.items.map((item) => {
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
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`material-symbols-outlined text-[18px] ${
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
