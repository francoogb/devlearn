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
