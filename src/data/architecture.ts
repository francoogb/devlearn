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
          "La 'ficha de identidad' del proyecto en Node.js: su nombre (devlearn), los scripts que podés correr con 'npm run <nombre>' (dev, build, lint) y la lista completa de dependencias. Cuando alguien clona el repo, 'npm install' lee este archivo para saber qué instalar.",
      },
      {
        path: "tsconfig.json",
        kind: "file",
        description:
          "Configuración de TypeScript en modo 'strict' (máxima rigurosidad). Define el alias '@/*' para que puedas escribir 'import x from \"@/components/X\"' en vez de '../../../components/X'. También permite importar archivos .json como si fueran módulos.",
      },
      {
        path: "next.config.ts",
        kind: "file",
        description:
          "Configuración de Next.js. Acá se personalizarían cosas como redirecciones, dominios de imágenes externas o variables de entorno públicas. Hoy usa los valores por defecto; se tocaría cuando el proyecto necesite features avanzadas.",
      },
      {
        path: "eslint.config.mjs",
        kind: "file",
        description:
          "Reglas de ESLint (el 'corrector automático' del código): detecta errores comunes antes de ejecutar, como variables no usadas, imports mal escritos o malos patrones de React. Se corre con 'npm run lint'.",
      },
      {
        path: "postcss.config.mjs",
        kind: "file",
        description:
          "Conecta PostCSS con Next.js. PostCSS es el procesador que transforma el CSS escrito con directivas de Tailwind v4 (@theme, @tailwind, etc.) en el CSS final que entiende el navegador.",
      },
      {
        path: ".gitignore",
        kind: "file",
        description:
          "Qué archivos NO se suben a GitHub: node_modules, .next, .venv-docx y todos los .env* (excepto .env.example que sí se versiona como plantilla).",
      },
      {
        path: "components.json",
        kind: "file",
        description:
          "Config de shadcn/ui: le dice a la CLI dónde generar los componentes (src/components/ui), qué alias usar (@/components, @/lib/utils) y qué estilo base aplicar. Si corrés 'npx shadcn@latest add card' en el futuro, lee este archivo.",
      },
    ],
  },
  {
    id: "backend",
    title: "backend/ — NestJS + Prisma + Postgres",
    icon: "dns",
    items: [
      {
        path: "backend/package.json",
        kind: "file",
        description:
          "Dependencias y scripts del backend: NestJS, Prisma, @prisma/client y los runners ts-node-dev (dev) y tsx (seed).",
      },
      {
        path: "backend/.env",
        kind: "file",
        description:
          "Credenciales reales de Postgres (DATABASE_URL). IGNORADO por git — nunca se sube al repo.",
      },
      {
        path: "backend/.env.example",
        kind: "file",
        description:
          "Plantilla del .env con placeholder en lugar de contraseña. Esta sí se versiona para que otros devs sepan qué variables configurar.",
      },
      {
        path: "backend/src/main.ts",
        kind: "file",
        description:
          "Punto de entrada: arranca Nest, pone el prefijo /api, habilita CORS y escucha en el puerto 3001.",
      },
      {
        path: "backend/src/app.module.ts",
        kind: "file",
        description:
          "Módulo raíz: importa PrismaModule (global) y ProgresoModule. Donde se 'enchufan' los módulos de la app.",
      },
      {
        path: "backend/src/prisma/prisma.service.ts",
        kind: "file",
        description:
          "Wrapper de PrismaClient como servicio Nest. Conecta a Postgres en onModuleInit y cierra la conexión en onModuleDestroy.",
      },
      {
        path: "backend/src/prisma/prisma.module.ts",
        kind: "file",
        description:
          "Módulo @Global que expone PrismaService a toda la app sin tener que importarlo en cada módulo.",
      },
      {
        path: "backend/src/progreso/progreso.module.ts",
        kind: "file",
        description:
          "Módulo del dominio progreso: agrupa el controller y el service.",
      },
      {
        path: "backend/src/progreso/progreso.controller.ts",
        kind: "file",
        description:
          "Controlador: expone GET /api/progreso. Inyecta ProgresoService vía DI.",
      },
      {
        path: "backend/src/progreso/progreso.service.ts",
        kind: "file",
        description:
          "Servicio del dominio. ANTES leía src/data/progreso.json; AHORA consulta Postgres con Prisma. Transforma el enum 'en_curso' → 'en-curso' para no romper el frontend.",
      },
      {
        path: "backend/prisma/schema.prisma",
        kind: "file",
        description:
          "El 'models.py' de Prisma: define datasource (Postgres), generator (cliente TS) y los modelos Concept, Exercise y SectionProgress + 2 enums.",
      },
      {
        path: "backend/prisma/migrations/",
        kind: "folder",
        description:
          "Migraciones SQL generadas por 'prisma migrate dev'. Cada carpeta es un snapshot versionado en git — equivalente a las migraciones de Django.",
      },
      {
        path: "backend/prisma/seed.ts",
        kind: "file",
        description:
          "Script que lee src/data/progreso.json y lo inserta en Postgres. Idempotente: se puede correr varias veces. Se ejecuta con 'npx prisma db seed'.",
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
        description:
          "Página 404 personalizada que se renderiza automáticamente cuando el usuario entra a una URL que no coincide con ninguna carpeta de app/.",
      },
      {
        path: "src/app/page.module.css",
        kind: "file",
        description:
          "CSS Module específico de la página raíz (/). CSS Modules es la alternativa de Next.js al CSS global: los estilos se encapsulan por archivo, así class 'card' en page.module.css no colisiona con 'card' de otro componente.",
      },
      {
        path: "src/app/practica/",
        kind: "folder",
        description:
          "Laboratorio pedagógico: una lista de usuarios obtenida con fetch en el SERVIDOR (Server Component dentro de <Suspense>) + el Contador interactivo en el CLIENTE. Sirve para contrastar visualmente ambos tipos de componentes.",
      },
      {
        path: "src/app/about/",
        kind: "folder",
        description:
          "Página 'Acerca de': resumen de los aprendizajes clave de Next.js y TypeScript que ha ido acumulando el proyecto.",
      },
      {
        path: "src/app/contacto/",
        kind: "folder",
        description:
          "Página de contacto simple con un email de referencia. Útil como demo de layout centrado con card.",
      },
      {
        path: "src/app/biblioteca/",
        kind: "folder",
        description:
          "DevLearn Knowledge Hub: biblioteca de conocimiento jerárquica (Áreas → Módulos → Temas → Lecciones). Incluye buscador global en tiempo real, filtros por estado, 10 componentes pedagógicos por lección y registro de sesiones + errores comunes.",
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
      {
        path: "src/app/shadcn/",
        kind: "folder",
        description:
          "Guía interactiva de shadcn/ui: qué es (no es un paquete, es código tuyo), la trinidad Tailwind+Radix+CVA, la función cn(), variants con CVA, patrón asChild/Slot y cómo adaptar los tokens al tema Electric Slate.",
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
        description:
          "Ejercicio clásico de estado: un contador con useState. Es Client Component porque usa un hook — por eso la primera línea es 'use client'.",
      },
      {
        path: "src/components/CalendarioEstudio.tsx",
        kind: "file",
        description:
          "Calendario interactivo clásico: permite planificar días de estudio y registrar sesiones de código. Client Component (usa useState para los días seleccionados).",
      },
      {
        path: "src/components/CalendarioProgresoStitch.tsx",
        kind: "file",
        description:
          "Versión 'Stitch' del calendario: diseño rediseñado con tema Electric Slate y telemetría visual del progreso. Persiste en localStorage para que la racha sobreviva al refresh.",
      },
      {
        path: "src/components/MetasCodigoStitch.tsx",
        kind: "file",
        description:
          "Metas de código con sistema de XP: cada meta tiene puntos, y marcarla como completada suma XP. Diseño alineado con Stitch.",
      },
      {
        path: "src/components/PanelLateralStitch.tsx",
        kind: "file",
        description:
          "Columna derecha del dashboard (Métricas IA, Rutas en Curso, Cursos Pendientes, Scratchpad). Los cursos pendientes se definen como un array (cursosPendientes) para que agregar nuevos sea solo una línea.",
      },
      {
        path: "src/components/EnglishCurriculumExplorer.tsx",
        kind: "file",
        description:
          "Visor interactivo del Programa de Inglés A1-A2: panel izquierdo con la lección actual, panel derecho con la lista de lecciones del módulo. Soporta vocabulario, lecturas, verbos y actividades (multiple-choice, fill-in-blank, word-order, error-correction).",
      },
      {
        path: "src/components/leccion/",
        kind: "folder",
        description:
          "Componentes reutilizables de las lecciones: RutaAprendizaje (por props) y ComparacionCodigo (JS vs TS lado a lado).",
      },
      {
        path: "src/components/ui/",
        kind: "folder",
        description:
          "Componentes de shadcn/ui (Button, Card, Tabs, Dialog). NO vienen de node_modules: son archivos .tsx propios del proyecto, generados por la CLI de shadcn y editados para usar los tokens Electric Slate (bg-primary / text-on-primary) en vez de los defaults de shadcn (bg-primary / text-primary-foreground).",
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
      {
        path: "src/content/fundamentos.ts",
        kind: "file",
        description:
          "Conceptos esenciales de programación para estudiantes/juniors: cada tema trae analogía cotidiana, explicación en español (con términos en inglés), diagrama de flujo paso a paso y mini ejercicio con código.",
      },
      {
        path: "src/content/shadcn.ts",
        kind: "file",
        description:
          "Contenido pedagógico de shadcn/ui: 6 conceptos (qué es, trinidad Tailwind+Radix+CVA, cn(), variants, asChild, adaptación de tokens) con analogía, explicación técnica, flujo de 5 pasos, código real y quiz interactivo. Mismo contrato que prisma.ts y nestjs.ts.",
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
        description:
          "Los datos de ESTA página: estructura del proyecto (structureSections) + cronología pedagógica paso a paso (projectStepsChronology). Al añadir archivos nuevos al proyecto, se documentan aquí.",
      },
      {
        path: "src/data/knowledgeRepository.ts",
        kind: "file",
        description:
          "Repositorio semilla del DevLearn Knowledge Hub: Áreas, Módulos, Temas y Lecciones estructuradas (con objetivos, ejemplos, errores comunes y quizzes). Incluye sesiones de estudio y errores registrados.",
      },
      {
        path: "src/data/englishCurriculumData.ts",
        kind: "file",
        description:
          "Datos del Programa de Inglés A1-A2: módulos con lecciones de vocabulario, lecturas y verbos irregulares. Cada lección tipada con el contrato de englishCurriculum.ts.",
      },
      {
        path: "src/lib/progress.ts",
        kind: "file",
        description:
          "El puente (capa 'frontera'): importa el JSON crudo y le fija los tipos con 'as'. A partir de este archivo, el resto del código tiene autocompletado real y chequeo de tipos. Si quisiéramos validación en runtime, iría zod aquí.",
      },
      {
        path: "src/lib/utils.ts",
        kind: "file",
        description:
          "Helper cn() de shadcn/ui: combina clsx (classNames condicionales) + tailwind-merge (resuelve conflictos entre utility classes de Tailwind, ej. 'px-2 px-8' → 'px-8'). Lo usan TODOS los componentes de src/components/ui/ para permitir overrides del className desde fuera.",
      },
      {
        path: "src/types/progress.ts",
        kind: "file",
        description:
          "Contratos del progreso: interfaces Concept, Exercise, SectionProgress y el tipo union ConceptStatus. Si el JSON no cumple esta forma, TypeScript lo detecta antes de compilar.",
      },
      {
        path: "src/types/knowledge.ts",
        kind: "file",
        description:
          "Contratos del Knowledge Hub: tipos de la jerarquía Área → Módulo → Tema → Lección → Actividades. Soporta sesiones de estudio y tracking de errores frecuentes.",
      },
      {
        path: "src/types/englishCurriculum.ts",
        kind: "file",
        description:
          "Contratos del Programa de Inglés: niveles CEFR (A1/A2), tipos de actividades (multiple-choice, fill-in-blank, word-order, error-correction) y la jerarquía Nivel → Módulo → Tema → Lección.",
      },
    ],
  },
  {
    id: "docs",
    title: "Documentación y scripts (raíz)",
    icon: "description",
    items: [
      {
        path: "README.md",
        kind: "file",
        description:
          "Puerta de entrada del repo. Lo primero que ve alguien al abrir el proyecto en GitHub: qué es, cómo arrancarlo, qué comandos usar.",
      },
      {
        path: "SPEC.md",
        kind: "file",
        description:
          "Especificación viva del proyecto: funcionalidades planeadas, rutas, criterios de aceptación. Se usa como contrato entre lo que hay y lo que falta.",
      },
      {
        path: "APUNTES.md",
        kind: "file",
        description:
          "Apuntes del curso de Next.js + TypeScript en Markdown — son los que se transforman en Word con generar_docx.py.",
      },
      {
        path: "APUNTES_IA.md",
        kind: "file",
        description:
          "Apuntes complementarios enfocados en IA, agentes de código y herramientas aplicadas al aprendizaje con asistentes.",
      },
      {
        path: "PROGRESO.md",
        kind: "file",
        description:
          "Bitácora de aprendizaje por sesión: qué se logró, qué quedó pendiente, qué conceptos ya se dominan. Útil para no perder el hilo entre sesiones.",
      },
      {
        path: "generar_docx.py",
        kind: "file",
        description:
          "Script de Python (en el .venv-docx local) que convierte APUNTES.md en un archivo Word (Apuntes_NextJS_TS.docx) con formato, para imprimir o compartir fuera del repo.",
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
  {
    number: 8,
    phase: "Capa de Datos Real: PostgreSQL + Prisma ORM",
    title: "8. Persistencia Profesional con Postgres + Prisma",
    subtitle: "¿Cómo pasar del JSON plano a una base de datos real sin romper el frontend?",
    explanation:
      "Hasta este punto los datos vivían en 'src/data/progreso.json' (plano, sin persistencia por usuario). El salto profesional es: PostgreSQL 17 como almacenamiento + Prisma 6.19 como ORM tipado. Prisma hace lo mismo que el ORM de Django ('models.py' + 'migrate'), pero en TypeScript: definís modelos en 'schema.prisma', corrés 'prisma migrate dev' y Prisma genera un cliente con tipos para hacer queries seguras. El 'ProgresoService' ya no lee JSON — ahora llama 'prisma.concept.findMany()' y Postgres responde.",
    keyFiles: [
      {
        path: "backend/.env",
        purpose:
          "DATABASE_URL con usuario, contraseña y nombre de la BD. IGNORADO por git (seguridad).",
      },
      {
        path: "backend/.env.example",
        purpose:
          "Plantilla sin contraseña real. ESTA sí se sube al repo para documentar qué variables se necesitan.",
      },
      {
        path: "backend/prisma/schema.prisma",
        purpose:
          "Define el datasource (postgres), el generator (cliente TS) y los modelos Concept, Exercise, SectionProgress + enums ConceptStatus y ExerciseCategory.",
      },
      {
        path: "backend/prisma/migrations/",
        purpose:
          "Carpeta con migraciones SQL versionadas en git. Equivalente a los archivos que crea 'makemigrations' de Django.",
      },
      {
        path: "backend/prisma/seed.ts",
        purpose:
          "Script que lee el JSON y lo inserta en Postgres via Prisma. Idempotente (se puede correr varias veces).",
      },
      {
        path: "backend/src/prisma/prisma.service.ts",
        purpose:
          "Wrapper de PrismaClient que se integra al ciclo de vida de Nest (conecta en onModuleInit, desconecta en onModuleDestroy).",
      },
      {
        path: "backend/src/prisma/prisma.module.ts",
        purpose:
          "Módulo @Global que expone PrismaService a toda la app sin tener que importarlo en cada módulo.",
      },
      {
        path: "backend/src/progreso/progreso.service.ts",
        purpose:
          "Refactorizado: ahora inyecta PrismaService y hace 3 queries en paralelo (concepts, exercises, sections) con Promise.all. Preserva el shape original del JSON para no romper el frontend.",
      },
    ],
    takeaways: [
      "ORM = traducir código TypeScript ↔ SQL. En vez de 'SELECT * FROM concepts WHERE status = ?' escribís 'prisma.concept.findMany({ where: { status } })' y es type-safe.",
      "Migraciones = snapshots del schema versionados en git. Cada vez que cambiás schema.prisma corrés 'prisma migrate dev --name <descripcion>' y queda un .sql reproducible.",
      "El @map('en-curso') del enum conserva el valor exacto del JSON en Postgres, pero el nombre TS del enum (en_curso) es con guión bajo porque Prisma no permite guiones en identificadores.",
      "Prisma Studio ('npx prisma studio') es la 'Django Admin' de Prisma: una GUI web para ver/editar la BD en vivo.",
      "Gotcha importante: en NestJS, 'tsx' (basado en esbuild) NO emite emitDecoratorMetadata, lo que rompe la inyección de dependencias cuando un service tiene parámetros en el constructor. Por eso 'npm run start:dev' usa 'ts-node-dev' (TypeScript real) y no tsx.",
    ],
    codeSnippet: `// backend/prisma/schema.prisma (fragmento):
model Concept {
  id        String        @id
  name      String
  status    ConceptStatus
  exercises Exercise[]
  @@map("concepts")
}

enum ConceptStatus {
  pendiente
  en_curso  @map("en-curso")
  terminado
}

// backend/src/progreso/progreso.service.ts (refactor):
@Injectable()
export class ProgresoService {
  constructor(private readonly prisma: PrismaService) {}

  async getProgreso() {
    const [concepts, exercises, sections] = await Promise.all([
      this.prisma.concept.findMany(),
      this.prisma.exercise.findMany({ orderBy: { id: "asc" } }),
      this.prisma.sectionProgress.findMany(),
    ]);
    return { concepts, exercises, sectionsProgress: sections };
  }
}`,
    notes:
      "Tip Junior: antes de correr 'prisma migrate dev' por primera vez, hay que crear la BD en Postgres manualmente (CREATE DATABASE devlearn) y configurar DATABASE_URL en backend/.env. Prisma crea las TABLAS, pero no la BD contenedora.",
  },
];
