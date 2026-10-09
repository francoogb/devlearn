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
