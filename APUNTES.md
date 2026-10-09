# Apuntes: Next.js + TypeScript (desde cero)

## 1. ¿Qué es Next.js?

Es un framework construido sobre React. React solo te da la UI por componentes;
Next.js agrega lo que falta para una app completa:

- **Ruteo por archivos**: no configuras rutas manualmente, las creas como archivos/carpetas.
- **Renderizado en servidor (SSR/SSG)**: el HTML se puede generar en el servidor
  en vez de solo en el navegador (mejor SEO y velocidad inicial).
- **API Routes**: puedes crear endpoints de backend en el mismo proyecto.
- **Optimizaciones automáticas**: imágenes, fuentes, división de código (code splitting).

---

## 2. TypeScript en resumen (para quien viene de JS)

TS es JS con **tipos estáticos**. El código compila a JS normal; los tipos solo
existen en desarrollo para detectar errores ANTES de ejecutar.

### Lo que usarás el 90% del tiempo

```ts
// Tipar variables y funciones
const nombre: string = "Ana";
function suma(a: number, b: number): number {
  return a + b;
}

// Interface: la "forma" que debe tener un objeto
interface Usuario {
  id: number;
  nombre: string;
  email?: string; // el ? significa que es OPCIONAL
}

// Tipar las props de un componente React
interface TarjetaProps {
  titulo: string;
  usuario: Usuario;
}

function Tarjeta({ titulo, usuario }: TarjetaProps) {
  return (
    <h1>
      {titulo} — {usuario.nombre}
    </h1>
  );
}
```

### Tipos básicos de TS

| Tipo        | Ejemplo                    | Significa                         |
| ----------- | -------------------------- | --------------------------------- |
| `string`    | `"hola"`                   | texto                             |
| `number`    | `42`, `3.14`               | números                           |
| `boolean`   | `true`                     | verdadero/falso                   |
| `string[]`  | `["a", "b"]`               | arreglo de strings                |
| `X \| null` | valor o null               | unión de tipos                    |
| `any`       | cualquier cosa             | EVÍTALO, desactiva el chequeo     |

Regla práctica: **tipa todo lo que cruce una frontera** (props de componentes,
datos que vienen de una API, funciones públicas). Dentro de una función,
TS normalmente infiere el tipo solo y no necesitas escribirlo.

---

## 3. Las 4 ideas clave de Next.js (App Router)

### 3.1 Las rutas son carpetas/archivos

```
src/app/page.tsx          ->  /           (la página principal)
src/app/about/page.tsx    ->  /about      (página "acerca de")
src/app/blog/[id]/page.tsx -> /blog/123   (ruta dinámica, id = "123")
src/app/layout.tsx        ->  envuelve TODAS las páginas (header, footer, etc.)
src/app/not-found.tsx     ->  página 404 personalizada
```

### 3.2 Server Components (por defecto)

Todos los archivos dentro de `app/` corren en el **servidor** salvo que digas lo contrario.
En el servidor puedes:

- Hacer `await fetch(...)` directo en el cuerpo del componente.
- Leer archivos, conectarte a una base de datos.
- Mantener código privado (nunca llega al navegador).

Limitación: NO pueden usar hooks (`useState`, `useEffect`) ni manejar eventos (`onClick`).

### 3.3 Client Components (para interactividad)

Cuando necesites estado o eventos, agrega `"use client"` en la PRIMERA línea:

```tsx
"use client";

import { useState } from "react";

export default function Contador() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>Clicks: {n}</button>;
}
```

Patrón mental: **el servidor trae los datos, el cliente maneja la interacción.**
Un Server Component puede importar y renderizar Client Components y viceversa.

### 3.4 Data fetching en el servidor + Suspense

```tsx
// src/app/usuarios/page.tsx  (Server Component)
interface Usuario {
  id: number;
  name: string;
}

async function ListaUsuarios() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const usuarios: Usuario[] = await res.json(); // tipamos la respuesta
  return (
    <ul>
      {usuarios.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

export default function UsuariosPage() {
  return (
    // Suspense muestra el fallback mientras el fetch termina
    <Suspense fallback={<p>Cargando...</p>}>
      <ListaUsuarios />
    </Suspense>
  );
}
```

**Ojo con Next.js 16**: un `fetch` sin caché (o un `await params` en rutas
dinámicas) NO puede estar directo en el cuerpo de la página durante el build,
bloquea el prerender. La solución es mover lo asíncrono a un componente hijo
y envolverlo en `<Suspense>` (ver `src/app/practica/page.tsx` y
`src/app/saludo/[nombre]/page.tsx` en este proyecto).

```tsx
// src/app/usuarios/page.tsx  (Server Component)
interface Usuario {
  id: number;
  name: string;
}

export default async function UsuariosPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const usuarios: Usuario[] = await res.json(); // tipamos la respuesta

  return (
    <ul>
      {usuarios.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
```

---

## 4. Estructura típica del proyecto

```
devlearn/
├─ src/
│  ├─ app/                 # rutas y páginas (App Router)
│  │  ├─ layout.tsx        # plantilla global
│  │  ├─ page.tsx          # página principal (/)
│  │  └─ globals.css
│  └─ ...                  # (puedes crear src/components/ para componentes)
├─ public/                 # archivos estáticos (imágenes, favicon)
├─ next.config.ts          # configuración de Next
├─ tsconfig.json           # configuración de TypeScript
└─ package.json            # dependencias y scripts
```

---

## 5. Comandos útiles

```bash
npm run dev      # servidor de desarrollo en http://localhost:3000
npm run build    # compila para producción
npm start        # sirve la build de producción
npm run lint     # revisa errores de código
```

---

## 6. Plan de aprendizaje sugerido

1. Modifica `src/app/page.tsx` y ve el cambio en el navegador (hot reload).
2. Crea `src/app/about/page.tsx` con texto simple.
3. Crea una ruta dinámica `src/app/saludo/[nombre]/page.tsx` que lea el parámetro.
4. Haz un Server Component que haga `fetch` a una API pública y liste datos.
5. Crea un Client Component con un botón/contador e impórtalo en una página.
6. Aprende `next/link` para navegar sin recargar (`<Link href="/about">`).

## 7. Recursos oficiales

- Documentación Next.js: https://nextjs.org/docs
- Tutorial interactivo oficial: https://nextjs.org/learn
- Documentación TypeScript: https://www.typescriptlang.org/docs/
