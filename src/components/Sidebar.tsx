// Sidebar de navegación — aparece en TODAS las páginas porque está en
// layout.tsx (fuera de {children}).
//
// Es Client Component porque usa usePathname(): un hook de Next.js que
// dice en qué ruta estás, para resaltar el enlace activo.

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// El menú: cada entrada apunta a una ruta real de nuestra app
const enlaces = [
  { href: "/", icon: "dashboard", label: "Inicio / Dashboard" },
  { href: "/aprender/next", icon: "explore", label: "Explorador de Tecnologías" },
  { href: "/aprender/ts", icon: "menu_book", label: "Lección en Curso" },
  { href: "/practica", icon: "code", label: "Laboratorio" },
  { href: "/contacto", icon: "mail", label: "Contacto" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex w-64 shrink-0 flex-col gap-1 bg-surface-container-low p-4">
      {/* Logo */}
      <div className="mb-4 flex items-center gap-3 px-2 pt-2">
        <span className="material-symbols-outlined text-primary">terminal</span>
        <div>
          <p className="font-display text-lg font-bold text-on-surface">DevLearn</p>
          <p className="text-xs text-on-surface-variant">Personal Dev Workspace</p>
        </div>
      </div>

      {/* Enlaces de navegación */}
      <nav className="flex flex-col gap-1">
        {enlaces.map((enlace) => {
          const activo = pathname === enlace.href;
          return (
            <Link
              key={enlace.href}
              href={enlace.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
                activo
                  ? "bg-surface-container-high font-semibold text-primary"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {enlace.icon}
              </span>
              {enlace.label}
            </Link>
          );
        })}
      </nav>

      {/* Tarjeta de perfil */}
      <div className="mt-auto flex flex-col gap-4">
        <div className="rounded-lg bg-surface-container p-3">
          <div className="mb-2 flex items-center gap-3">
            <span className="material-symbols-outlined rounded-full bg-surface-container-highest p-2 text-primary">
              person
            </span>
            <div>
              <p className="text-sm font-semibold text-on-surface">Fran</p>
              <p className="text-xs text-on-surface-variant">Fullstack Apprentice</p>
            </div>
          </div>
          <div className="mb-1 flex justify-between text-xs text-on-surface-variant">
            <span>Progreso XP</span>
            <span className="font-mono text-secondary">3,420 / 4,000</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-container-highest">
            <div className="h-full w-[85%] rounded-full bg-secondary" />
          </div>
        </div>

        <div className="flex flex-col gap-1 text-sm text-on-surface-variant">
          <span className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 hover:bg-surface-container-high">
            <span className="material-symbols-outlined text-[20px]">settings</span>
            Ajustes
          </span>
          <span className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 hover:bg-surface-container-high">
            <span className="material-symbols-outlined text-[20px]">logout</span>
            Cerrar Sesión
          </span>
        </div>
      </div>
    </aside>
  );
}
