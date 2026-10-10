// Datos de la página /arquitectura: la estructura del proyecto explicada.
// Cada entrada describe una carpeta o archivo y para qué sirve.
// Al añadir carpetas nuevas al proyecto, se documentan aquí.

export type ItemKind = "folder" | "file";

export interface StructureItem {
  path: string; // ruta relativa al proyecto
  kind: ItemKind;
  description: string; // qué es y para qué se usa
}

export interface StructureSection {
  id: string;
  title: string; // nombre del grupo
  icon: string; // icono de Material Symbols
  items: StructureItem[];
}

// La estructura, agrupada por secciones lógicas
export const structureSections: StructureSection[] = [
  {
    id: "config",
    title: "Configuración (raíz)",
    icon: "settings",
    items: [
      {
        path: "package.json",
        kind: "file",
        description:
          "La ficha del proyecto: nombre (devlearn), scripts (dev, build, lint) y dependencias.",
      },
      {
        path: "tsconfig.json",
        kind: "file",
        description:
          "Configuración de TypeScript en modo estricto. Define el alias @/* → src/* y permite importar JSON.",
      },
      {
        path: "next.config.ts",
        kind: "file",
        description: "Configuración de Next.js. Por ahora usa los valores por defecto.",
      },
      {
        path: "eslint.config.mjs",
        kind: "file",
        description: "Reglas de lint del proyecto (npm run lint).",
      },
      {
        path: "postcss.config.mjs",
        kind: "file",
        description: "Conecta Tailwind CSS v4 con el build de Next.",
      },
      {
        path: ".gitignore",
        kind: "file",
        description: "Qué archivos NO se suben a GitHub: node_modules, .next, .venv-docx, etc.",
      },
    ],
  },
  {
    id: "app",
    title: "src/app — Las rutas (App Router)",
    icon: "web",
    items: [
      {
        path: "src/app/layout.tsx",
        kind: "file",
        description:
          "La plantilla global: envuelve TODAS las páginas. Aquí vive la barra lateral y las fuentes.",
      },
      {
        path: "src/app/page.tsx",
        kind: "file",
        description: "El Dashboard (/): saludo, lección activa, ruta de aprendizaje y scratchpad.",
      },
      {
        path: "src/app/globals.css",
        kind: "file",
        description: "Estilos globales y tema de colores que usan las clases de Tailwind.",
      },
      {
        path: "src/app/not-found.tsx",
        kind: "file",
        description: "Página 404 personalizada para rutas que no existen.",
      },
      {
        path: "src/app/aprender/",
        kind: "folder",
        description:
          "Las lecciones: js/ (placeholder), ts/ y next/. Cada carpeta con page.tsx es una URL.",
      },
      {
        path: "src/app/ejercicios/",
        kind: "folder",
        description: "Bitácora de ejercicios resueltos (lee el JSON de datos).",
      },
      {
        path: "src/app/progreso/",
        kind: "folder",
        description: "Mapa de conceptos con su estado y ejercicios por concepto.",
      },
      {
        path: "src/app/arquitectura/",
        kind: "folder",
        description: "Esta misma página: la estructura del proyecto explicada.",
      },
      {
        path: "src/app/saludo/[nombre]/",
        kind: "folder",
        description:
          "Ruta dinámica de práctica: /saludo/Fran lee el parámetro [nombre] desde la URL.",
      },
      {
        path: "src/app/ai-901/",
        kind: "folder",
        description:
          "Espacio para repasar el examen Microsoft Azure AI Fundamentals (AI-901).",
      },
      {
        path: "src/app/ingles/",
        kind: "folder",
        description:
          "Práctica interactiva de gramática, vocabulario y lectura técnica en inglés.",
      },
      {
        path: "src/app/algoritmos/",
        kind: "folder",
        description:
          "Procedimientos algorítmicos básicos: búsqueda, ordenamiento, recursión y Big O.",
      },
      {
        path: "src/app/estructuras-de-datos/",
        kind: "folder",
        description:
          "Guía de 9 estructuras de datos, su uso, tipado en TypeScript vs JS y ejercicios.",
      },
      {
        path: "src/app/fundamentos/",
        kind: "folder",
        description:
          "Conceptos esenciales de programación: variables, funciones, qué es una API y diagramas de flujo interactivos.",
      },
      {
        path: "src/app/nestjs/",
        kind: "folder",
        description:
          "Fundamentos de backend con NestJS: módulos, controladores, servicios e inyección de dependencias.",
      },
      {
        path: "src/app/prisma/",
        kind: "folder",
        description:
          "Guía y documentación interactiva de Prisma ORM en NestJS: schemas, migraciones, PrismaService y Type-Safety.",
      },
    ],
  },
  {
    id: "components",
    title: "src/components — Piezas reutilizables",
    icon: "widgets",
    items: [
      {
        path: "src/components/Sidebar.tsx",
        kind: "file",
        description:
          "Barra lateral de navegación. Es Client Component porque usa el hook usePathname().",
      },
      {
        path: "src/components/RutaAprendizaje.tsx",
        kind: "file",
        description: "Bloque del dashboard con los pasos del módulo, alimentado por datos tipados.",
      },
      {
        path: "src/components/MetasSemanales.tsx",
        kind: "file",
        description: "Checkboxes interactivos de metas semanales (Client Component).",
      },
      {
        path: "src/components/Contador.tsx",
        kind: "file",
        description: "Ejercicio clásico de estado: un contador con useState.",
      },
      {
        path: "src/components/leccion/",
        kind: "folder",
        description:
          "Componentes reutilizables de las lecciones: RutaAprendizaje (por props) y ComparacionCodigo (JS vs TS).",
      },
    ],
  },
  {
    id: "content",
    title: "src/content — Contenidos temáticos desacoplados",
    icon: "library_books",
    items: [
      {
        path: "src/content/ai901.ts",
        kind: "file",
        description:
          "Datos y temas verificados del examen oficial Microsoft AI-901.",
      },
      {
        path: "src/content/ingles.ts",
        kind: "file",
        description:
          "Lecciones de gramática, vocabulario para devs y lecturas técnicas.",
      },
      {
        path: "src/content/algoritmos.ts",
        kind: "file",
        description:
          "Algoritmos de búsqueda, ordenamiento, recursión y Big O con código JS y retos.",
      },
      {
        path: "src/content/estructurasDatos.ts",
        kind: "file",
        description:
          "9 estructuras de datos con análisis, tipado TypeScript y comparaciones.",
      },
      {
        path: "src/content/nestjs.ts",
        kind: "file",
        description:
          "Conceptos pedagógicos de NestJS: módulos, controladores, servicios y flujo HTTP.",
      },
      {
        path: "src/content/prisma.ts",
        kind: "file",
        description:
          "Conceptos de Prisma ORM para NestJS: ORM vs SQL, schemas, migraciones, PrismaService y CRUD.",
      },
    ],
  },
  {
    id: "data",
    title: "src/data · src/lib · src/types — Los datos",
    icon: "database",
    items: [
      {
        path: "src/data/progreso.json",
        kind: "file",
        description:
          "EL archivo editable: conceptos, ejercicios y progreso de las 4 secciones temáticas.",
      },
      {
        path: "src/data/learningPath.ts",
        kind: "file",
        description: "Pasos de la ruta del dashboard, tipados con interface.",
      },
      {
        path: "src/data/architecture.ts",
        kind: "file",
        description: "Los datos de esta página: la estructura del proyecto como arreglo tipado.",
      },
      {
        path: "src/lib/progress.ts",
        kind: "file",
        description: "El puente: importa el JSON y le fija los tipos (la 'frontera').",
      },
      {
        path: "src/types/progress.ts",
        kind: "file",
        description: "Los contratos: interfaces Concept, Exercise, SectionProgress y ConceptStatus.",
      },
    ],
  },
  {
    id: "docs",
    title: "Documentación y scripts (raíz)",
    icon: "description",
    items: [
      {
        path: "SPEC.md",
        kind: "file",
        description: "Especificación del proyecto: funcionalidades y criterios de aceptación.",
      },
      {
        path: "APUNTES.md",
        kind: "file",
        description: "Apuntes del curso de Next.js + TypeScript, en Markdown.",
      },
      {
        path: "PROGRESO.md",
        kind: "file",
        description: "Registro de lo aprendido en cada sesión, con ejercicios pendientes.",
      },
      {
        path: "generar_docx.py",
        kind: "file",
        description: "Script de Python que genera el Word (Apuntes_NextJS_TS.docx) desde los apuntes.",
      },
    ],
  },
];

// =========================================================================
// GUÍA PASO A PASO (CRONOLÓGICA) - ESTILO BLOC DE NOTAS PARA JUNIOR / DEV
// =========================================================================

export interface ProjectStep {
  number: number;
  phase: string;
  title: string;
  subtitle: string;
  explanation: string;
  keyFiles: { path: string; purpose: string }[];
  takeaways: string[];
  codeSnippet?: string;
  notes?: string;
}

export const projectStepsChronology: ProjectStep[] = [
  {
    number: 1,
    phase: "Fase Inicial: El Nacimiento del Proyecto",
    title: "1. Inicialización con create-next-app y TypeScript",
    subtitle: "¿Cómo empieza todo proyecto moderno de Next.js?",
    explanation:
      "Lo primero que se hizo en la terminal fue ejecutar el comando oficial de Next.js. Esto genera toda la estructura base con Node.js, TypeScript y Tailwind CSS listos sin tener que configurar Webpack ni Babel manualmente.",
    keyFiles: [
      {
        path: "package.json",
        purpose: "Declara las dependencias principales: next, react, react-dom, tailwindcss y typescript.",
      },
      {
        path: "tsconfig.json",
        purpose: "Configura TypeScript en modo estricto e incluye el atajo '@/*' para importar desde 'src/'.",
      },
      {
        path: ".gitignore",
        purpose: "Evita subir a GitHub carpetas pesadas como 'node_modules/' y el caché de compilación '.next/'.",
      },
    ],
    takeaways: [
      "Next.js 16 usa Turbopack por defecto en desarrollo para compilar súper rápido.",
      "El alias '@/*' te ahorra escribir rutas relativas complicadas como '../../../componentes'.",
    ],
    codeSnippet: `// Comando inicial en la terminal:
npx create-next-app@latest devlearn --typescript --tailwind --eslint --app --src-dir`,
    notes:
      "Tip Junior: Cuando creas un proyecto, siempre elige '--src-dir' para mantener el código limpio dentro de 'src/' en vez de mezclarlo con los archivos de configuración en la raíz.",
  },
  {
    number: 2,
    phase: "Cimientos: El Esqueleto Global",
    title: "2. Creación del Layout Raíz y Estilos Globales",
    subtitle: "¿Cómo se construye el contenedor donde viven todas las páginas?",
    explanation:
      "En Next.js App Router, todo parte en 'layout.tsx'. Este archivo es el envoltorio supremo (HTML, HEAD y BODY). Cualquier componente que pongas aquí (como la barra lateral o fuentes de Google) se mantendrá fijo y no se recargará cuando el usuario navegue entre páginas.",
    keyFiles: [
      {
        path: "src/app/layout.tsx",
        purpose: "Envuelve cada pantalla del proyecto. Renderiza la fuente, el Sidebar y el contenedor principal.",
      },
      {
        path: "src/app/globals.css",
        purpose: "Define las variables del tema oscuro de Material Theme (surface, primary, secondary) y Tailwind.",
      },
    ],
    takeaways: [
      "layout.tsx nunca se desmonta al cambiar de ruta: ahorra memoria y da sensación de app instantánea.",
      "Aquí inyectamos las fuentes y los iconos de Google Fonts ('material-symbols-outlined').",
    ],
    codeSnippet: `// src/app/layout.tsx simplificado:
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className="flex min-h-screen bg-surface text-on-surface">
        <Sidebar /> {/* Fijo a la izquierda */}
        <main className="flex-1 p-6">{children}</main> {/* Cambia por cada URL */}
      </body>
    </html>
  );
}`,
    notes:
      "Tip Junior: {children} representa la página que el usuario está visitando en ese momento (ej. si entra a /ingles, {children} es ingles/page.tsx).",
  },
  {
    number: 3,
    phase: "Navegación: Separando Servidor y Cliente",
    title: "3. La Barra Lateral y la Regla 'use client'",
    subtitle: "¿Por qué algunos archivos llevan 'use client' y otros no?",
    explanation:
      "Por defecto en Next.js, TODOS los componentes son Server Components (corren en el servidor y envían HTML puro). Pero para que el Sidebar sepa en qué URL estamos y resalte el botón activo, necesita el hook 'usePathname()'. Por eso agregamos 'use client' en la primera línea.",
    keyFiles: [
      {
        path: "src/components/Sidebar.tsx",
        purpose: "Client Component que lee la URL activa ('usePathname()') y renderiza enlaces con Next Link.",
      },
    ],
    takeaways: [
      "Server Component: rápido, seguro, no carga JavaScript al navegador del usuario (ideal para mostrar datos).",
      "Client Component ('use client'): necesario cuando usas 'useState', 'useEffect', 'usePathname' o 'onClick'.",
      "Usa siempre <Link href='/...'> en vez de <a href='/...'> para no recargar la página entera.",
    ],
    codeSnippet: `"use client"; // Le dice a Next: 'este código necesita ejecutarse en el navegador'
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Sidebar() {
  const pathname = usePathname();
  const isActive = pathname === "/arquitectura";
  return <Link href="/arquitectura" className={isActive ? "text-primary" : "text-outline"}>Arquitectura</Link>;
}`,
    notes:
      "Tip Junior: No le pongas 'use client' a todo. Solo a los componentes interactivos hoja (botones, formularios, modales). Deja las páginas como Server Components cuando puedas.",
  },
  {
    number: 4,
    phase: "Estructura de Datos: Tipado y Fronteras",
    title: "4. Modelado con TypeScript y Archivos JSON",
    subtitle: "¿Cómo guardar datos sin base de datos compleja al inicio?",
    explanation:
      "Antes de llenar las pantallas de texto hardcodeado, creamos un archivo JSON editable ('progreso.json') y lo protegimos con interfaces de TypeScript. A esto se le llama 'la frontera tipada': el JSON puede cambiar, pero TypeScript garantiza que si falta un campo, la app no compilará con errores silenciosos.",
    keyFiles: [
      {
        path: "src/types/progress.ts",
        purpose: "Define los contratos: interface Concept, Exercise, SectionProgress y el tipo ConceptStatus.",
      },
      {
        path: "src/data/progreso.json",
        purpose: "Base de datos en archivo plano con las secciones, temas estudiados y bitácora de ejercicios.",
      },
      {
        path: "src/lib/progress.ts",
        purpose: "Módulo puente (helper) con funciones como 'sectionProgressById()' para consultar el progreso.",
      },
    ],
    takeaways: [
      "Separar 'data' de 'presentación' te permite rehacer el diseño sin tocar los datos reales.",
      "TypeScript te da autocompletado en el editor: sabes qué propiedades tiene cada lección sin adivinar.",
    ],
    codeSnippet: `// src/types/progress.ts:
export type ConceptStatus = "dominado" | "en-progreso" | "pendiente";

export interface Concept {
  id: string;
  name: string;
  status: ConceptStatus;
  exerciseIds: string[];
}`,
    notes:
      "Tip Junior: Si cambias un dato en 'progreso.json', las funciones en 'src/lib/progress.ts' validan automáticamente que cumpla la estructura esperada.",
  },
  {
    number: 5,
    phase: "Enrutamiento: El Poder del App Router",
    title: "5. Creación de las Rutas y Páginas (/aprender, /ingles, /ai-901)",
    subtitle: "¿Cómo se crean nuevas páginas en Next.js sin configurar routers?",
    explanation:
      "En Next.js no existe un archivo como 'routes.js'. La estructura de carpetas DENTRO de 'src/app/' ES la URL del navegador. Si creas la carpeta 'src/app/ingles/' y dentro pones 'page.tsx', automáticamente se crea la URL 'http://localhost:3000/ingles'.",
    keyFiles: [
      {
        path: "src/app/page.tsx",
        purpose: "Ruta raíz '/': Dashboard con racha, saludo a Fran y accesos rápidos.",
      },
      {
        path: "src/app/ingles/page.tsx",
        purpose: "Ruta '/ingles': Pestañas ordenadas para vocabulario técnico, lecturas y verbos.",
      },
      {
        path: "src/app/ai-901/page.tsx",
        purpose: "Ruta '/ai-901': Repaso oficial del examen de Azure AI con casillas de verificación.",
      },
      {
        path: "src/app/saludo/[nombre]/page.tsx",
        purpose: "Ruta dinámica: [nombre] es una variable que captura lo que escribas en la URL.",
      },
    ],
    takeaways: [
      "Carpeta con 'page.tsx' = Ruta pública accesible en la web.",
      "Carpetas entre corchetes como '[nombre]' = Rutas dinámicas (ej. /saludo/Fran, /saludo/Maria).",
      "Si un archivo no se llama 'page.tsx' (por ejemplo 'boton.tsx'), Next NO lo expone como URL.",
    ],
    codeSnippet: `// src/app/saludo/[nombre]/page.tsx
export default async function SaludoPage({ params }: { params: Promise<{ nombre: string }> }) {
  const { nombre } = await params;
  return <h1>¡Hola, {nombre}! Bienvenido a tu sesión de estudio.</h1>;
}`,
    notes:
      "Tip Junior: En Next.js 15 y 16, 'params' es una Promise, por lo que se desestructura usando 'await params'.",
  },
  {
    number: 6,
    phase: "Desacoplamiento: Contenido Limpio",
    title: "6. Separación de Contenido en 'src/content/'",
    subtitle: "¿Por qué no meter 500 líneas de texto directamente adentro del JSX?",
    explanation:
      "A medida que el proyecto creció con explicaciones de algoritmos, estructuras de datos y exámenes, las páginas se volvían imposibles de leer. Se creó la carpeta 'src/content/' para guardar arreglos de datos puros. Las páginas solo se encargan de pintar la interfaz (UI).",
    keyFiles: [
      {
        path: "src/content/ingles.ts",
        purpose: "Vocabulario informático, lecturas técnicas, frases y verbos irregulares.",
      },
      {
        path: "src/content/algoritmos.ts",
        purpose: "Explicaciones de Big O, ordenamiento, búsqueda y recursión con código JS.",
      },
      {
        path: "src/content/estructurasDatos.ts",
        purpose: "Las 9 estructuras explicadas (Array, Set, Map, Pilas, Colas, Grafos, etc.).",
      },
      {
        path: "src/content/ai901.ts",
        purpose: "Dominios y temas verificados del examen Microsoft Azure AI Fundamentals.",
      },
    ],
    takeaways: [
      "Mantenibilidad: si necesitas corregir una falta de ortografía o agregar un verbo, editas 'ingles.ts' sin tocar la UI.",
      "Reutilización: el mismo contenido puede mostrarse en la página web, imprimirse en un PDF o exportarse.",
    ],
    codeSnippet: `// En src/content/ingles.ts:
export const technicalVocabulary: VocabTerm[] = [
  { id: "deploy", english: "deploy", spanish: "desplegar / producción", ... },
];

// En src/app/ingles/page.tsx:
import { technicalVocabulary } from "@/content/ingles";
// Y solo hacemos un .map() para renderizarlo limpio`,
    notes:
      "Tip Junior: Esta es la clave de la arquitectura profesional: el código que pinta (JSX) debe estar limpio y recibir los datos listos.",
  },
  {
    number: 7,
    phase: "Control y Estabilidad: Build y TypeScript",
    title: "7. Compilación Estricta y Verificación con 'npm run build'",
    subtitle: "¿Cómo aseguramos que la aplicación esté lista para producción?",
    explanation:
      "Next.js analiza cada página, compila TypeScript, comprueba tipos y genera páginas estáticas (SSG) de alto rendimiento. Con 'npm run build', Next.js nos confirma que las 18 rutas del proyecto no tienen ningún error de tipado ni imports rotos.",
    keyFiles: [
      {
        path: "SPEC.md",
        purpose: "Documento vivo con los requerimientos, rutas y criterios de aceptación del proyecto.",
      },
      {
        path: "PROGRESO.md",
        purpose: "Bitácora donde Fran anota qué se ha logrado, qué falta y qué conceptos domina.",
      },
    ],
    takeaways: [
      "En Next.js: '○ (Static)' significa que la página se compila a HTML estático en segundos, cargando al instante.",
      "'npm run build' es tu prueba de fuego antes de hacer git push y subir a GitHub o Vercel.",
    ],
    codeSnippet: `▲ Next.js 16 (Turbopack)
✓ Compiled successfully
  Running TypeScript ... Finished in 3.2s
✓ Generating static pages (18/18)
Route (app)
├ ○ /ai-901
├ ○ /algoritmos
├ ○ /estructuras-de-datos
├ ○ /ingles
└ ○ /arquitectura`,
    notes:
      "Tip Junior: Si 'npm run build' pasa con código 0, puedes estar 100% seguro de que no vas a romper producción.",
  },
];
