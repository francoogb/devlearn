# PROGRESO — Registro de aprendizaje

## 2026-10-09 — Recordatorio de aprendizaje (F5 + F6)

**Qué se construyó:**
- `/progreso`: lista de 10 conceptos de programación con estado
  (pendiente / en curso / terminado) y nº de ejercicios resueltos por concepto.
- `/ejercicios`: bitácora de ejercicios con título, concepto, fecha, ruta
  del código, "qué cambié" y "qué me costó".
- Datos en `src/data/progreso.json` (editable a mano, versionable, sin BD).

**Conceptos aprendidos:**
- `interface` y `type` (union types): describen la forma de los datos.
  `ConceptStatus` solo admite 3 valores; cualquier otro es error.
- "Tipar en la frontera": el JSON se importa en `src/lib/progress.ts` y ahí
  adopta los tipos con `as`. TypeScript NO puede verificar el contenido del
  JSON (llega como `string` genérico) — la validación estricta sería con un
  validador de runtime (zod), tema pendiente para lección futura.
- `resolveJsonModule` en `tsconfig.json` permite importar JSON con `import`.
- Server Components: las páginas leen datos y devuelven JSX; los contadores
  se calculan con `filter`, no se guardan a mano.
- Añadir un ejercicio = añadir una entrada al JSON. Nada de código cambia.

**Ejercicio propuesto (pendiente de resolver por el alumno):**
En `/progreso`, los ejercicios se cuentan con `exercisesFor(concept.id)`,
que recorre TODO el arreglo por cada concepto. ¿Se te ocurre cómo calcular
los conteos de todos los conceptos recorriendo el arreglo UNA sola vez?
(Pista: un objeto usado como contador, o `reduce`.)

**Pregunta de comprensión (módulo):**
¿Qué diferencia hay entre `type ConceptStatus = "a" | "b"` y
`const status: string`? ¿Qué error de TypeScript aparecería si en el JSON
pusieras `"status": "en-proceso"` y cómo lo detectarías?

---

## 2026-10-09 — Espacio de Mejora Continua de Fran y 4 Nuevas Secciones (F7 a F10)

**Qué se construyó:**
1. **Espacio de Progreso y Mejora de Fran (`/ejercicios`):**
   - Catálogo interactivo de tarjetas diferenciadas por tecnología (JavaScript, React & Next.js, TypeScript, Algoritmos y Estructuras de Datos).
   - Botón de filtro directo **"JavaScript (JS) — Ver todos los de JS"** para revisar en un solo clic todos los ejercicios de JS vistos a lo largo del curso.
   - Formulario modal **"+ Añadir mi ejercicio de JS"** para que Fran registre sus propios códigos, ejemplos y desafíos.
   - Hilo de **comentarios y notas de mejora** en cada tarjeta: Fran puede dejar reflexiones personales sobre qué optimizó o qué le costó.
   - Persistencia automática en el navegador (`localStorage`) para que ningún ejercicio ni comentario añadido por Fran se pierda al recargar.
2. **Cuatro nuevas secciones temáticas en la barra lateral:**
   - `/ai-901`: repaso verificado del examen Microsoft Azure AI Fundamentals, dominios con porcentajes oficiales, checklist de repaso y log de preguntas falladas.
   - `/ingles`: práctica interactiva de gramática (5 estructuras), vocabulario técnico con casillas, lecturas de documentación y registro de sesiones.
   - `/algoritmos`: búsqueda lineal/binaria, ordenamientos (burbuja, selección, inserción), recursión y análisis Big O con JavaScript y ejercicios interactivos.
   - `/estructuras-de-datos`: 9 estructuras (arreglos, objetos, Map, Set, pilas, colas, listas enlazadas, árboles, grafos) con versiones tipadas en TS vs JS.
3. **Legibilidad optimizada:**
   - Se aumentó el tamaño de letra en todas las lecciones y tarjetas a un estándar más cómodo (`text-sm` a `text-base`).

**Metodología de evolución para el alumno (Fran):**
- Cada vez que Fran practique un concepto nuevo o resuelva un reto en JS, lo agregará a `/ejercicios`.
- Dejará anotado en "Qué cambié" su lógica personal y en "Qué me costó" sus reflexiones.
- Los agentes que interactúen con Fran en futuras sesiones leerán `AGENTS.md`, `PROGRESO.md` y `src/data/progreso.json` para saber en qué punto del camino se encuentra y sugerirle retos acordes a su evolución.

---

## 2026-10-09 — Rediseño Pedagógico de `/arquitectura` (Modo Bloc de Notas para JR)

**Qué se construyó:**
- Se rediseñó por completo la página [`/arquitectura`](http://localhost:3000/arquitectura o `:3001`).
- En lugar de ser solo un listado estático de archivos, ahora cuenta con un **modo selector dual**:
  1. **"Bloc de Notas: Cómo lo construimos (Paso a Paso)"** (Pensado especialmente para desarrolladores Juniors):
     - Narra en 7 fases cronológicas cómo nació el proyecto desde cero:
       1. Inicialización (`create-next-app` + TypeScript + `--src-dir`).
       2. Esqueleto global (`layout.tsx` y `globals.css`).
       3. Navegación y la regla `'use client'` (`Sidebar.tsx` vs Server Components).
       4. Modelado de datos y fronteras tipadas (`progreso.json` + `src/types/progress.ts`).
       5. Enrutamiento automático con App Router (`src/app/.../page.tsx` y rutas dinámicas como `[nombre]`).
       6. Desacoplamiento de contenido en `src/content/`.
       7. Control de compilación y estabilidad en producción (`npm run build`).
     - Cada fase incluye: explicación en lenguaje simple, archivos clave involucrados, snippet de código/comando, lecciones que un JR debe recordar y "tips de oro".
  2. **"Mapa Técnico del Árbol de Carpetas"**: el árbol clásico clasificado por Configuración, App Router, Componentes, Contenidos y Datos.
---

## 2026-10-09 — Nueva Sección: `/fundamentos` (Bases Esenciales de Programación)

**Qué se construyó:**
- Se creó la ruta dedicada **[`/fundamentos`](http://localhost:3000/fundamentos)** y su enlace correspondiente en la barra lateral ([`Sidebar.tsx`](file:///c:/Users/Gamer/Desktop/Semestral/Cursos_Programacion/Curso_js/next-js-introducing/src/components/Sidebar.tsx)).
- Contenido desacoplado en [`src/content/fundamentos.ts`](file:///c:/Users/Gamer/Desktop/Semestral/Cursos_Programacion/Curso_js/next-js-introducing/src/content/fundamentos.ts) con 5 temas fundamentales:
  1. **Variables y Constantes**: analogía de la caja de zapatos vs caja fuerte sellada, asignación en RAM y `const` vs `let`.
  2. **Funciones y Parámetros**: analogía de la receta de cocina/licuadora, inputs (argumentos) y output (`return`).
  3. **¿Qué es una API?**: analogía del comensal (cliente), el mesero (API) y la cocina (servidor), ciclo Request/Response HTTP y códigos de estado (200, 404, 500).
  4. **Diagramas de Flujo y Lógica Condicional**: el mapa con semáforo, toma de decisiones (`if/else`) y formas geométricas estándar (rombos, rectángulos).
  5. **Bucles y Repeticiones**: analogía de las repeticiones en el gimnasio, condición de parada, `for` y peligro de los bucles infinitos.
- Cada concepto incluye:
  - Selector/slider tipo pestañas apilables.
  - Analogía cotidiana para entenderlo sin tecnicismos complejos.
  - Explicación conceptual en español con términos en inglés entre paréntesis.
  - **Diagrama de flujo interactivo paso a paso** con tarjetas visuales del proceso.
  - Ejemplo de código real y limpio en JavaScript/TypeScript.
  - Mini ejercicio interactivo de opción múltiple con retroalimentación inmediata.
  - Botón para marcar el concepto como dominado.
- Progreso registrado en [`src/data/progreso.json`](file:///c:/Users/Gamer/Desktop/Semestral/Cursos_Programacion/Curso_js/next-js-introducing/src/data/progreso.json) y documentado en la arquitectura.
- Compilación de producción verificada (`next build`: 19/19 páginas estáticas con código 0).

---

## 2026-10-09 — Actualización en `/ingles`: Frase Clave para Reuniones Técnicas

**Qué se incorporó:**
- En la sección de **Inglés Básico** (`activeTab === "basico"`), se amplió el catálogo de frases esenciales en [`src/content/ingles.ts`](file:///c:/Users/Gamer/Desktop/Semestral/Cursos_Programacion/Curso_js/next-js-introducing/src/content/ingles.ts).
- Se agregó como frase principal y destacada:
  - **Inglés:** *"Are we on the same page?"*
  - **Traducción al español:** *"¿Estamos en la misma sintonía? / ¿Estamos de acuerdo?"*
  - **Contexto:** *Reuniones de equipo / Daily Standup (para confirmar si todos entendieron la misma idea o requerimiento antes de codificar).*
- Se actualizó el diseño de las tarjetas de frases en [`src/app/ingles/page.tsx`](file:///c:/Users/Gamer/Desktop/Semestral/Cursos_Programacion/Curso_js/next-js-introducing/src/app/ingles/page.tsx) para incluir una etiqueta explicativa con el contexto de uso en el mundo real.

---

## 2026-10-09 — Incorporación de 17 Frases de Películas y Modal Interactivo

**Qué se incorporó:**
- Se agregaron **17 frases de películas y conversación cotidiana** en [`src/content/ingles.ts`](file:///c:/Users/Gamer/Desktop/Semestral/Cursos_Programacion/Curso_js/next-js-introducing/src/content/ingles.ts) con sus marcas de tiempo (timestamp del video), traducción y contexto de uso:
  1. *"Are you from this area?"* (01:31) — ¿Eres de esta zona?
  2. *"Are you ignoring me?"* (01:52) — ¿Me estás ignorando?
  3. *"Are you upset about something?"* (02:33) — ¿Estás molesto por algo?
  4. *"Are you wasted?"* (02:59) — ¿Estás borracho? (coloquial)
  5. *"Be brave."* (03:26) — Sé valiente.
  6. *"Can we talk now?"* (03:55) — ¿Podemos hablar ahora?
  7. *"Did I do something wrong?"* (04:26) — ¿Hice algo mal?
  8. *"Did you get what you needed?"* (04:55) — ¿Conseguiste lo que necesitabas?
  9. *"Do you follow what I'm saying?"* (05:24) — ¿Me sigues? / ¿Me entiendes?
  10. *"Do you have something on your mind?"* (06:02) — ¿Tienes algo en mente?
  11. *"Do you live around here?"* (07:00) — ¿Vives por aquí?
  12. *"Are you the owner of this place?"* (07:30) — ¿Eres el dueño de este lugar?
  13. *"Do you understand me?"* (07:59) — ¿Me entiendes?
  14. *"Do you want a seat?"* (08:29) — ¿Quieres un asiento? / ¿Te quieres sentar?
  15. *"Do you want to sit here?"* (08:55) — ¿Quieres sentarte aquí?
  16. *"Do you want to talk about it?"* (09:29) — ¿Quieres hablar de ello?
  17. *"Does this belong to you?"* (10:02) — ¿Esto te pertenece? / ¿Esto es tuyo?
- Total de frases activas: **26 frases**.
- **Modal interactivo:** Al hacer clic en cualquier tarjeta se abre un diálogo modal con la frase ampliada, traducción, cuándo usarla, marca de tiempo y botones **"Siguiente frase"** y **"Anterior"** para repasarlas una a una de forma inmersiva.

---

## 2026-10-09 — Rediseño del Dashboard: Calendario de Estudio y Limpieza de Ruido

**Qué se transformó:**
- Se eliminó el bloque estático saturado de texto que estaba en el Dashboard (código de `app/saludo/[nombre]/page.tsx`, scratchpad volátil duplicado, chuletas repetidas y tarjetas que saturaban la vista).
- Se implementó un nuevo componente interactivo: **[`CalendarioEstudio.tsx`](file:///c:/Users/Gamer/Desktop/Semestral/Cursos_Programacion/Curso_js/next-js-introducing/src/components/CalendarioEstudio.tsx)** en la raíz del Dashboard (`/`).
  - **Malla mensual:** Muestra los días del mes actual con indicador de racha activa y puntos en los días con sesiones de código.
  - **Selector por día:** Fran puede hacer clic en cualquier día para ver qué estudió y cuántas horas le dedicó.
  - **Formulario de registro rápido:** Permite anotar qué tema practicó hoy (ej: *"Practiqué algoritmos y 5 frases en inglés"*) y guardar las horas dedicadas.
- **Tarjetas de acceso directo limpias:** Accesos directos a Fundamentos, Inglés Técnico & Frases, Mis Ejercicios y Algoritmia con contadores de progreso en vivo.
- **Metas semanales:** Conservadas en un layout balanceado junto a la frase de motivación.
- **Build verificado:** `next build` genera exitosamente las 19 rutas estáticas con código 0.

---

## 2026-10-09 — Backend NestJS: /progreso conectado a una API real

**Qué se incorporó:**
- **Backend NestJS mínimo** en la carpeta [`backend/`](file:///c:/Users/Gamer/Desktop/Semestral/Cursos_Programacion/Curso_js/next-js-introducing/backend): `main.ts` (prefijo global `/api`, puerto 3001), `app.module.ts` y el módulo `progreso` (controller + service). Sin base de datos todavía: el service lee el mismo `src/data/progreso.json` (una sola fuente de verdad).
- **Endpoint `GET http://localhost:3001/api/progreso`**: devuelve concepts, exercises y sectionsProgress del JSON.
- **Frontend**: la página [`src/app/progreso/page.tsx`](file:///c:/Users/Gamer/Desktop/Semestral/Cursos_Programacion/Curso_js/next-js-introducing/src/app/progreso/page.tsx) ahora pide los datos al backend con `fetch` (`cache: "no-store"`) dentro de un `<Suspense>`. Si el backend no responde, DEGRADA a los datos locales del JSON y muestra un aviso ("Backend no disponible").
- **Conceptos nuevos aprendidos:**
  - *Server Component* async: la página puede esperar (`await`) datos antes de pintar.
  - *Degradación elegante (graceful degradation)*: si la API falla, la página sigue funcionando con datos locales en vez de romperse.
  - *Caché HMR* (`serverComponentsHmrCache`): en desarrollo Next cachea los `fetch` entre recargas **incluso con `no-store`**; se desactivó en `next.config.ts` para siempre ver datos frescos del backend.
  - Con *Cache Components* activado, la parte con `fetch` va dentro de `<Suspense>` para ejecutarse en cada petición (request time).
- **Comandos:** backend en dev → `cd backend && npm run start:dev` (tsx watch); frontend igual que siempre → `npm run dev`.
