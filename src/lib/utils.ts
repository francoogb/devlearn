// Utilidad estándar de shadcn/ui.
//
// clsx: combina classNames condicionalmente, aceptando objetos y arrays.
//   clsx("btn", { "btn-active": isActive }) → "btn btn-active"
//
// twMerge: resuelve conflictos de clases de Tailwind quedándose con la última.
//   twMerge("px-2 px-4") → "px-4"  (no "px-2 px-4")
//
// cn() combina ambas: perfecto para componentes que aceptan className desde fuera.
//   <Button className="px-6" /> → la del padre gana sobre la default del Button.

import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
