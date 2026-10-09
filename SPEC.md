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

### F5 — Página de progreso (/progreso)

Una lista de conceptos de programación con su estado (`pendiente`,
`en-curso`, `terminado`) y el número de ejercicios resueltos de cada uno.
Arranca con: variables, tipos de datos, condicionales, bucles, funciones,
arreglos, objetos, recursión, búsqueda y ordenamiento, complejidad básica.

**Criterios de aceptación:**
- Existen las interfaces `Concept` y `ConceptStatus` en
  `src/types/progress.ts`, y el JSON se valida contra ellas en
  `src/lib/progress.ts` (error de compilación si el JSON incumple el contrato).
- `/progreso` lista todos los conceptos con su estado y el conteo de
  ejercicios se CALCULA filtrando el arreglo (no se guarda a mano).
- El resumen superior (terminados / en curso / pendientes / total de
  ejercicios) se calcula a partir de los datos, no está hardcodeado.
- Los contadores de la barra lateral y del resumen cambian solos al
  editar el JSON.

### F6 — Bitácora de ejercicios (/ejercicios)

Cada ejercicio tiene: título, concepto al que pertenece, fecha, ruta del
código, qué cambié yo y qué me costó. Los datos viven en
`src/data/progreso.json`, versionables y editables a mano. Añadir un
ejercicio = añadir una entrada al arreglo `exercises` del JSON.

**Criterios de aceptación:**
- Existe la interface `Exercise` en `src/types/progress.ts` y se usa al
  importar el JSON.
- `/ejercicios` muestra todos los ejercicios ordenados por fecha (más
  reciente primero) con los 6 campos visibles.
- Si no hay ejercicios, se muestra un mensaje amigable, no una lista vacía.
- Añadir una entrada al JSON hace aparecer el ejercicio en la página sin
  tocar código; un JSON inválido (campo faltante, estado inexistente)
  produce error de TypeScript en compilación.
- La barra lateral enlaza a `/progreso` y `/ejercicios`.

### F7 — Repaso de certificación AI-901 (/ai-901)

Espacio dedicado al repaso del examen "Examen AI-901: aspectos básicos de la inteligencia artificial de Microsoft Azure". Contenido en `src/content/ai901.ts` y progreso en `src/data/progreso.json`.

**Criterios de aceptación:**
- Ruta `/ai-901` disponible y enlazada en la barra lateral.
- Muestra el título oficial verificado y puntuación mínima aprobatoria de 700 puntos.
- Desglose de los 2 dominios oficiales: identificación de conceptos y funcionalidades de IA (40-45%) e implementación de soluciones mediante Microsoft Foundry (55-60%).
- Estado de idioma verificado: inglés confirmado; español para Chile explícitamente marcado como "por verificar".
- Enlaces oficiales verificados a la página del examen, Study Guide y ruta de conceptos.
- Enlace a evaluación de práctica indicando inicio de sesión en AI Skills Navigator, con URL directa marcada como por verificar.
- Lista de repaso interactiva con casillas basada en la guía oficial.
- Bitácora interactiva para registrar preguntas falladas en la práctica y qué concepto no se dominaba.
- Progreso vinculado a `src/data/progreso.json` a través de `src/lib/progress.ts`.

### F8 — Práctica de inglés técnico (/ingles)

Sección de entrenamiento en gramática, vocabulario para desarrollo y comprensión lectora. Contenido en `src/content/ingles.ts` y progreso en `src/data/progreso.json`.

**Criterios de aceptación:**
- Ruta `/ingles` disponible y enlazada en la barra lateral.
- Gramática con explicaciones cortas en español y ejercicios interactivos de completar y de opción múltiple para: pasado simple (con irregulares), presente perfecto con for/since, voz pasiva, condicional tipo 1 y modales (can, must, should).
- Vocabulario técnico inglés-español con casillas interactivas para marcar términos dominados.
- Comprensión lectora con fragmentos de documentación técnica y preguntas de opción múltiple.
- Registro interactivo de resultados y notas de sesión.
- Progreso vinculado a `src/data/progreso.json`.

### F9 — Procedimientos algorítmicos básicos (/algoritmos)

Estudio de procedimientos y algoritmos fundamentales con código JavaScript y análisis de complejidad. Contenido en `src/content/algoritmos.ts` y progreso en `src/data/progreso.json`.

**Criterios de aceptación:**
- Ruta `/algoritmos` disponible y enlazada en la barra lateral.
- Cubre búsqueda lineal y búsqueda binaria; ordenamiento por burbuja, selección e inserción; recursión (factorial, Fibonacci y suma de arreglo); y complejidad Big O: O(1), O(n), O(log n) y O(n²).
- Cada tema cuenta con: resumen, términos técnicos en inglés entre paréntesis, explicación paso a paso, código en JavaScript, complejidad temporal/espacial y ejercicio con solución desplegable.
- Progreso vinculado a `src/data/progreso.json`.

### F10 — Estructuras de datos (/estructuras-de-datos)

Guía completa de cómo se almacenan y estructuran los datos en programación. Contenido en `src/content/estructurasDatos.ts` y progreso en `src/data/progreso.json`.

**Criterios de aceptación:**
- Ruta `/estructuras-de-datos` disponible y enlazada en la barra lateral.
- Cubre las 9 estructuras: arreglos, objetos, Map, Set, pilas (stacks), colas (queues), listas enlazadas (linked lists), árboles binarios básicos y grafos.
- Cada estructura detalla: qué es, cuándo usarla, versión fuertemente tipada en TypeScript, comparación con JavaScript y un mini ejercicio interactivo con solución desplegable.
- Términos técnicos en inglés entre paréntesis.
- Progreso vinculado a `src/data/progreso.json`.

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
