# SPEC — Proyecto educativo: Next.js + TypeScript

## Objetivo del proyecto

Construir paso a paso una aplicación web de **lecciones de programación** usando
Next.js (App Router) y TypeScript en modo estricto. El proyecto tiene doble
función:

1. Es el **producto** que vamos a construir (una app donde se listan, se ven y
   se crean lecciones).
2. Es el **material de aprendizaje**: cada decisión de código se explica al
   alumno mientras se escribe.

## Usuario

- Un alumno que conoce JavaScript (ES6+) y React básico.
- No conoce TypeScript ni Next.js en profundidad.
- Aprende construyendo: explicaciones breves antes y después de cada cambio,
   en español. Identificadores de código en inglés.

## Forma de trabajo (metodología)

- Lecciones pequeñas: concepto breve → código juntos → ejercicio para el alumno
  → revisión de la solución del alumno antes de mostrar la resolución.
- Un cambio pequeño por vez; el alumno ejecuta el proyecto para ver el resultado.
- Sin abstracciones avanzadas (genéricos complejos, decoradores) salvo petición.
- Sin Tailwind CSS en esta etapa (CSS normal o módulos).
- Después de cada lección se actualiza `PROGRESO.md` con lo aprendido.
- Al final de cada módulo del plan, una pregunta de comprensión.

## Plan de lecciones (roadmap)

1. **Anatomía del proyecto**: estructura de carpetas, `package.json`, scripts,
   `tsconfig.json` y qué hace cada archivo.
2. **TypeScript frente a JavaScript**: tipos básicos, inferencia, interfaces y
   types, uniones, funciones tipadas y errores que TS detecta (JS vs TS lado a
   lado).
3. **Next.js frente a React**: qué es React (componentes, props, estado), qué
   agrega Next.js (rutas por carpetas, Server/Client Components, rutas de API)
   y cuándo usar cada uno.
4. **Feature: gestión de lecciones** (ver funcionalidades v1 abajo).
5. **Conceptos de programación** (resumen aplicado): variables y constantes,
   tipos de datos, condicionales, bucles, funciones, arreglos, objetos,
   recursión, búsqueda y ordenamiento, complejidad básica. Cada concepto con
   ejemplo en JS y su versión en TS.

## Funcionalidades de la primera versión (v1)

### F1 — Definir el modelo `Lesson`

Un tipo/interface `Lesson` que representa una lección: `id`, `title`,
`description`, `content`, `level` (ej. `"beginner" | "intermediate" |
"advanced"`) y `createdAt`.

**Criterios de aceptación:**
- Existe un archivo (p. ej. `src/types/lesson.ts` o `src/data/lessons.ts`) con
  el tipo `Lesson` exportado.
- El campo `level` solo acepta los valores del union type definido; cualquier
  otro valor es error de TypeScript en compilación.
- Hay un arreglo tipado `lessons` con al menos 3 lecciones de ejemplo.

### F2 — Listar lecciones

Una ruta `/lessons` que muestra todas las lecciones del arreglo: título,
nivel y descripción de cada una.

**Criterios de aceptación:**
- Al visitar `/lessons` se ven todas las lecciones del arreglo.
- Si el arreglo está vacío, se muestra un mensaje amigable ("No hay lecciones
  todavía") en lugar de una lista vacía.
- La lista se renderiza en el servidor (Server Component, sin `"use client"`).

### F3 — Abrir una lección por ruta dinámica

Una ruta `/lessons/[id]` que recibe el `id` y muestra el contenido completo
de la lección correspondiente.

**Criterios de aceptación:**
- `/lessons/1` muestra la lección con `id` 1 (título, nivel y contenido).
- Si el `id` no existe, se muestra un mensaje "Lección no encontrada".
- El `id` de la URL se obtiene con `params` tipado, sin usar `any`.
- Funciona en producción (`npm run build && npm start`), es decir, el
  `await params` no rompe el prerender (patrón Suspense si aplica en Next 16).

### F4 — Crear una lección con un formulario

Una ruta `/lessons/new` con un formulario (título, descripción, nivel y
contenido) que agrega la lección al arreglo. Sin base de datos: la lección se
guarda en memoria del servidor o se persiste en un archivo JSON vía una Route
Handler.

**Criterios de aceptación:**
- El formulario valida que título y contenido no estén vacíos (validación en
  el cliente y/o el servidor).
- Al enviar, se redirige a `/lessons` (o a la lección creada) y la nueva
  lección aparece en la lista.
- El nivel se elige de un `<select>` con las opciones del union type, sin
  strings sueltos repetidos en el JSX.
- El envío usa una Server Action o una Route Handler (`app/api/lessons/route.ts`),
  no un `fetch` a un endpoint externo.

## Fuera de alcance en v1

- Base de datos y autenticación.
- Edición y borrado de lecciones.
- Tailwind CSS.
- Tests automatizados (se valuda en lecciones posteriores si el alumno lo pide).

## Restricciones técnicas

- Next.js 16 (App Router) + TypeScript en modo estricto + React 19.
- Todo texto visible y comentarios en español; identificadores en inglés.
- Verificar la documentación oficial (o la copia local en `node_modules/next/dist/docs/`)
  antes de usar una API de Next.js, dado que Next 16 introduce cambios
  respecto a versiones anteriores.
