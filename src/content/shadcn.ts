// Contenido interactivo y pedagógico para /shadcn
// Explicación profunda de shadcn/ui + Tailwind + Radix + CVA para desarrolladores Juniors.
// Mismo contrato que src/content/prisma.ts para que la página reutilice el patrón.

export interface FlowStep {
  label: string;
  type: "start" | "process" | "decision" | "end" | "api_req" | "api_res";
  detail?: string;
}

export interface ShadcnConcept {
  id: string;
  title: string;
  englishTerm: string;
  tag: string;
  icon: string;
  analogy: string;
  explanation: string;
  flowTitle: string;
  flowSteps: FlowStep[];
  codeExample: {
    language: string;
    code: string;
    description: string;
  };
  exercise: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const shadcnConcepts: ShadcnConcept[] = [
  // 1. ¿QUÉ ES SHADCN/UI?
  {
    id: "que-es-shadcn",
    title: "¿Qué es shadcn/ui y por qué no es un paquete normal?",
    englishTerm: "What is shadcn/ui and why it isn't a normal package",
    tag: "shadcn 01",
    icon: "widgets",
    analogy:
      "Imagina que vas a amueblar tu casa. La opción clásica (como instalar un paquete npm tradicional, por ejemplo Material UI) es comprar muebles ya armados en una tienda: te los traen a casa, pero si querés cambiarle el color a una silla tenés que pedirle al fabricante que te mande una versión nueva. shadcn/ui es como ir a IKEA con los planos: te dan las piezas y las instrucciones, vos las armás en tu casa y a partir de ese momento ese mueble es TUYO. Si querés pintarlo, cambiarle una pata o agregarle un cajón, lo hacés sin pedirle permiso a nadie.",
    explanation:
      "shadcn/ui NO es un paquete npm que instalás con 'npm install shadcn-ui'. Es una **colección de componentes de React construidos sobre Tailwind + Radix UI** cuyo código fuente se copia a tu propio proyecto. Usás una CLI (`npx shadcn@latest add button`) y los archivos `.tsx` quedan en `src/components/ui/` como código tuyo, versionado en tu git. Esto significa: cero dependencia de versión, podés editar libremente, el bundle solo incluye lo que usás, y aprendés el código real al leerlo. Es la biblioteca estándar del ecosistema Next.js desde ~2023.",
    flowTitle: "Flujo: cómo llega un componente shadcn a tu proyecto",
    flowSteps: [
      { label: "Instalás la CLI una vez", type: "start", detail: "npx shadcn@latest init  →  crea components.json y lib/utils.ts" },
      { label: "Pedís un componente", type: "process", detail: "npx shadcn@latest add button  →  descarga el .tsx del registry oficial" },
      { label: "El archivo se copia a tu repo", type: "process", detail: "src/components/ui/button.tsx queda en tu código, no en node_modules" },
      { label: "Lo editás libremente", type: "decision", detail: "Si querés cambiar colores, variants o quitar algo, lo hacés en tu archivo" },
      { label: "Lo importás como propio", type: "end", detail: "import { Button } from '@/components/ui/button'" },
    ],
    codeExample: {
      language: "Terminal + estructura de archivos",
      code: `# Setup inicial (solo una vez por proyecto)
$ npx shadcn@latest init

# Agregar un componente nuevo
$ npx shadcn@latest add button
$ npx shadcn@latest add card tabs dialog

# Resultado: los archivos QUEDAN en tu repo
src/
├── components/
│   └── ui/
│       ├── button.tsx    ← tuyo, editable
│       ├── card.tsx      ← tuyo, editable
│       ├── tabs.tsx      ← tuyo, editable
│       └── dialog.tsx    ← tuyo, editable
└── lib/
    └── utils.ts          ← función cn()`,
      description: "A diferencia de Material UI o Chakra, acá no hay 'node_modules/shadcn-ui'. Los componentes son archivos tuyos, versionados en git. Si querés agregar un variant 'tertiary' al Button, editás el button.tsx directamente.",
    },
    exercise: {
      question: "¿Qué diferencia a shadcn/ui de una biblioteca tradicional como Material UI?",
      options: [
        "shadcn es más rápido porque usa WebAssembly.",
        "El código de los componentes se copia a tu proyecto, no vive en node_modules. Vos sos el dueño del código.",
        "shadcn no usa Tailwind, usa CSS vanilla.",
        "shadcn solo funciona con Vue, no con React.",
      ],
      correctIndex: 1,
      explanation:
        "La idea central de shadcn es 'ownership': los componentes son tuyos. No dependés de la versión de un paquete externo; si quieres modificar un botón, abrís el archivo y lo cambiás. Esto da máxima libertad pero también significa que vos sos responsable de mantenerlos.",
    },
  },

  // 2. LA TRINIDAD: TAILWIND + RADIX + CVA
  {
    id: "trinidad-tech",
    title: "La trinidad: Tailwind + Radix + CVA",
    englishTerm: "The tech trinity: Tailwind + Radix + CVA",
    tag: "shadcn 02",
    icon: "hub",
    analogy:
      "Pensá en un auto deportivo: Tailwind es la pintura y la carrocería (estética), Radix UI es el chasis y el motor (ingeniería interna que no se ve pero que hace que todo funcione: dirección, frenos, airbags), y CVA (class-variance-authority) es el panel de control del conductor (switches: ¿modo deportivo o eco? ¿tracción total o trasera?). shadcn/ui es el ensamblador que une los tres: toma la base técnica de Radix, le pone la ropa de Tailwind y configura las opciones con CVA.",
    explanation:
      "shadcn/ui no inventa nada nuevo: combina 3 librerías que ya eran estándar. **Tailwind CSS** (utility-first) es para los estilos visuales. **Radix UI** son 'primitivas sin estilo' (headless): componentes como Dialog, Tabs, Dropdown que ya manejan accesibilidad, foco, teclado y ARIA por vos, pero sin pintura. **CVA (class-variance-authority)** es una helper function que define 'variantes' tipadas de un componente (variant: default/secondary/outline, size: sm/md/lg). shadcn arma el combo: toma la primitiva de Radix, le aplica clases de Tailwind, y usa CVA para que el componente tenga múltiples apariencias con autocompletado en TypeScript.",
    flowTitle: "Flujo: cómo colaboran las 3 librerías en un <Button>",
    flowSteps: [
      { label: "Radix NO interviene en Button", type: "start", detail: "El Button es simple: no requiere a11y compleja. Para Dialog o Tabs sí usa Radix" },
      { label: "CVA define las variants tipadas", type: "process", detail: "cva(baseClasses, { variants: { variant: {...}, size: {...} } })" },
      { label: "Tailwind entrega las utility classes", type: "process", detail: "bg-primary text-on-primary hover:bg-primary-container shadow-md" },
      { label: "TypeScript infiere el tipo de las props", type: "decision", detail: "VariantProps<typeof buttonVariants> genera: variant?: 'default' | 'secondary' | ..." },
      { label: "El componente final tiene autocompletado", type: "end", detail: "<Button variant='secondary' size='lg'> con sugerencias de IDE" },
    ],
    codeExample: {
      language: "TypeScript (fragmento de button.tsx)",
      code: `import { cva, type VariantProps } from "class-variance-authority";

// CVA = Class Variance Authority
const buttonVariants = cva(
  // Classes base: TODAS las variantes las tienen
  "inline-flex items-center justify-center rounded-lg font-semibold transition-all",
  {
    variants: {
      variant: {
        default:   "bg-primary text-on-primary hover:bg-primary-container",
        secondary: "bg-secondary text-on-secondary hover:bg-secondary-container",
        outline:   "border border-outline-variant bg-transparent text-on-surface",
        ghost:     "bg-transparent hover:bg-surface-container-high",
      },
      size: {
        sm:      "h-8 px-3 text-xs",
        default: "h-10 px-4 text-sm",
        lg:      "h-11 px-6 text-base",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

// TypeScript infiere el tipo de las props automáticamente
export interface ButtonProps extends VariantProps<typeof buttonVariants> {
  className?: string;
}

// Uso:
<Button variant="secondary" size="lg">Click me</Button>`,
      description: "CVA transforma un objeto de opciones en una función que devuelve el string de classNames correcto. Lo mágico: VariantProps<typeof buttonVariants> extrae automáticamente los tipos literales, así TypeScript te autocompleta 'default | secondary | outline | ghost' sin que vos lo escribas dos veces.",
    },
    exercise: {
      question: "¿Qué rol cumple cada pieza de la trinidad en un componente shadcn?",
      options: [
        "Las 3 hacen exactamente lo mismo pero son opcionales.",
        "Tailwind maneja el estado interno, Radix pinta los colores, CVA controla la BD.",
        "Tailwind = estilos (utility classes), Radix = comportamiento/a11y (primitivas headless), CVA = variants tipados (sm/md/lg, default/secondary/etc).",
        "Es solo marketing: en realidad shadcn está escrito en CSS puro.",
      ],
      correctIndex: 2,
      explanation:
        "Separación de responsabilidades: Tailwind pinta, Radix se encarga de que el componente sea accesible y funcione con teclado, CVA te permite tener múltiples 'skins' del mismo componente con tipos. Button simple usa solo Tailwind+CVA; Dialog, Dropdown, Tabs sí usan Radix por debajo.",
    },
  },

  // 3. LA FUNCIÓN cn() Y tailwind-merge
  {
    id: "funcion-cn",
    title: "cn(): combinar clases sin que peleen entre sí",
    englishTerm: "cn() helper: merging Tailwind classes safely",
    tag: "shadcn 03",
    icon: "merge",
    analogy:
      "Imaginate que estás ordenando una pizza para 2. Vos pedís 'con queso extra' y tu amigo pide 'sin queso'. Si el pizzero fuera un `className=''` normal de React, pondría los dos pedidos pegados ('con queso extra sin queso') y la pizza llegaría con una contradicción. `cn()` es un pizzero inteligente que escucha ambos pedidos y aplica la última regla ganadora. En Tailwind: si tu componente dice `px-2` y el padre le pasa `px-6`, `cn()` resuelve que gana `px-6` y descarta el `px-2`.",
    explanation:
      "Un componente de shadcn (como Button) tiene classes 'default' que define él mismo. Pero vos como consumidor podés pasarle un `className` desde afuera para customizar. Problema: si el componente dice `className='px-4'` y vos pasás `className='px-8'`, en el HTML final queda `'px-4 px-8'` y Tailwind usa el que aparece primero en el CSS compilado, NO el último. La función `cn()` resuelve esto combinando `clsx` (que une classNames condicionalmente) con `tailwind-merge` (que detecta conflictos de Tailwind y deja ganar al último). Es el helper #1 de todo proyecto con shadcn.",
    flowTitle: "Flujo: qué pasa cuando llamás cn() con classes conflictivas",
    flowSteps: [
      { label: "Llamada: cn('px-2 bg-red', 'px-8')", type: "start", detail: "El componente aporta sus defaults + el usuario aporta overrides" },
      { label: "clsx() las une en un string", type: "process", detail: "Resultado intermedio: 'px-2 bg-red px-8'" },
      { label: "tailwind-merge detecta el conflicto", type: "decision", detail: "'px-2' y 'px-8' pertenecen al mismo grupo (padding-x)" },
      { label: "Gana el que aparece último", type: "process", detail: "Elimina 'px-2' porque 'px-8' vino después" },
      { label: "Devuelve 'bg-red px-8'", type: "end", detail: "Sin conflicto, sin surprise behavior. El override del usuario ganó" },
    ],
    codeExample: {
      language: "TypeScript (src/lib/utils.ts)",
      code: `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ========== EJEMPLOS DE USO ==========

// 1. Combinar simples
cn("flex", "items-center");                // "flex items-center"

// 2. Classes condicionales (clsx)
cn("btn", isActive && "btn-active");       // isActive=true  → "btn btn-active"
                                            // isActive=false → "btn"

// 3. Objeto de condiciones
cn("btn", { "btn-primary": isPrimary, "btn-sm": isSmall });

// 4. Resolver conflictos de Tailwind (tailwind-merge)
cn("px-2 py-4", "px-8");                   // "py-4 px-8"  (px-2 descartado)
cn("bg-red-500", "bg-blue-500");           // "bg-blue-500" (el último gana)

// 5. Patrón más común en shadcn: default + override del usuario
function Button({ className, ...props }) {
  return <button className={cn("px-4 py-2 bg-primary", className)} {...props} />;
}

// Ahora: <Button className="px-8" /> → px-8 gana sobre px-4`,
      description: "Sin cn(), un usuario que haga <Button className='px-8'> va a tener en el HTML 'px-4 px-8' y el padding resultante dependería del orden del CSS compilado, lo cual es frágil. Con cn(), el override SIEMPRE funciona predeciblemente.",
    },
    exercise: {
      question: "¿Qué problema específico resuelve tailwind-merge dentro de cn()?",
      options: [
        "Compila Tailwind más rápido en producción.",
        "Previene inyecciones XSS en los classNames.",
        "Detecta conflictos entre utility classes de Tailwind (por ejemplo px-2 vs px-8) y deja ganar la última, para que los overrides del usuario funcionen de forma predecible.",
        "Convierte las clases de Tailwind a CSS plano en runtime.",
      ],
      correctIndex: 2,
      explanation:
        "Sin tailwind-merge, pasar className desde afuera a un componente puede resultar en 'px-4 px-8' en el HTML y Tailwind no garantiza cuál gana. tailwind-merge entiende qué clases son del mismo grupo (padding-x) y descarta las conflictivas que vinieron antes.",
    },
  },

  // 4. VARIANTS CON CVA
  {
    id: "variants-cva",
    title: "Variants con CVA: un componente, muchas apariencias",
    englishTerm: "Component variants with CVA",
    tag: "shadcn 04",
    icon: "style",
    analogy:
      "Pensá en una Coca-Cola: siempre es la misma receta base, pero viene en varias 'variantes' (Regular, Zero, Light, Vainilla) y en varios 'tamaños' (lata, 500ml, 1.5L, 2L). CVA es como el sistema de etiquetado de la fábrica: define una receta base (las classes comunes), después un switch de sabores (variant: default/secondary/outline) y uno de tamaños (size: sm/md/lg). Vos pedís 'Zero tamaño 2L' y recibís el producto correcto sin confusión.",
    explanation:
      "CVA (class-variance-authority) es una micro-librería que convierte un objeto de JavaScript en una función tipada que devuelve classNames. Sirve para componentes que tienen MÚLTIPLES apariencias (ej: Button con variants primary/secondary/outline). La ventaja clave sobre un `if/else` manual: TypeScript extrae automáticamente los tipos literales ('primary' | 'secondary' | 'outline') y los expone como `VariantProps<typeof fn>`, dándote autocompletado en el IDE y errores de compilación si pasás un variant que no existe.",
    flowTitle: "Flujo: cómo CVA genera un componente con 20 estilos posibles",
    flowSteps: [
      { label: "Definís la receta base", type: "start", detail: "cva('rounded-lg font-semibold transition-all', {...})" },
      { label: "Agregás grupos de variants", type: "process", detail: "variant: { default, secondary, outline, ghost }  +  size: { sm, md, lg }" },
      { label: "Ponés los defaults", type: "process", detail: "defaultVariants: { variant: 'default', size: 'default' }" },
      { label: "TypeScript extrae los tipos", type: "api_res", detail: "VariantProps<typeof buttonVariants>  →  { variant?: 4 opciones, size?: 3 opciones }" },
      { label: "Al llamarlo, autocompletás variants", type: "end", detail: "4 variants × 3 sizes = 12 combinaciones posibles, todas tipadas" },
    ],
    codeExample: {
      language: "TypeScript (CVA en acción)",
      code: `import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva(
  // 1) BASE: classes que SIEMPRE se aplican
  "inline-flex items-center justify-center rounded-lg font-semibold transition-all",
  {
    // 2) VARIANTS: grupos de opciones mutuamente excluyentes
    variants: {
      variant: {
        default:   "bg-primary text-on-primary hover:bg-primary-container",
        secondary: "bg-secondary text-on-secondary hover:bg-secondary-container",
        outline:   "border border-outline-variant bg-transparent",
        ghost:     "bg-transparent hover:bg-surface-container-high",
      },
      size: {
        sm:      "h-8 px-3 text-xs",
        default: "h-10 px-4 text-sm",
        lg:      "h-11 px-6 text-base",
      },
    },

    // 3) DEFAULTS: qué pasa si no pasás nada
    defaultVariants: { variant: "default", size: "default" },
  }
);

// 4) EXPORTAR LOS TIPOS DERIVADOS automáticamente
export interface ButtonProps extends VariantProps<typeof buttonVariants> {}

// Uso:
<Button />                              // default + default size
<Button variant="secondary" />          // verde, size default
<Button variant="outline" size="lg" />  // outline grande
<Button variant="radiant" />            // ❌ error de TypeScript: 'radiant' no existe`,
      description: "La magia está en línea 4: `VariantProps<typeof buttonVariants>` lee el objeto y genera el tipo { variant?: 'default' | 'secondary' | 'outline' | 'ghost'; size?: 'sm' | 'default' | 'lg' }. Si agregás un variant nuevo al objeto, el tipo se actualiza automáticamente.",
    },
    exercise: {
      question: "¿Qué pasa si pasás a un Button de CVA un variant que no existe en el objeto variants, por ejemplo <Button variant='radiant' />?",
      options: [
        "El componente renderiza con las classes default y muestra un warning en consola.",
        "TypeScript da un error de compilación en tiempo de desarrollo porque 'radiant' no está en la unión de tipos extraídos por VariantProps.",
        "shadcn hace una llamada HTTP al servidor para pedir el variant faltante.",
        "El build se cae silenciosamente en producción.",
      ],
      correctIndex: 1,
      explanation:
        "La fuerza de CVA es que el tipo de las props se deriva del objeto variants. Si no existe 'radiant' en el objeto, TypeScript lo marca como error INMEDIATAMENTE en el editor — antes de ejecutar. Es el patrón ideal: fuente única de verdad.",
    },
  },

  // 5. RADIX SLOT Y asChild
  {
    id: "slot-aschild",
    title: "Radix Slot y asChild: composición sin anidación",
    englishTerm: "Radix Slot and the asChild pattern",
    tag: "shadcn 05",
    icon: "integration_instructions",
    analogy:
      "Imaginá que tenés un uniforme de bombero (el estilo de <Button>) y necesitás que un cadete (un <Link> de Next.js) actúe como bombero temporalmente. Opción A (sin asChild): le ponés el uniforme ENCIMA de su ropa — queda abultado, no se mueve bien, y hay dos cuellos (`<a><button>...</button></a>`, HTML inválido). Opción B (con asChild + Slot): le PRESTÁS el uniforme para que lo use directamente — el cadete sigue siendo cadete pero vestido como bombero. Un solo elemento con el aspecto del Button pero navegando como Link.",
    explanation:
      "Problema: querés que un `<Link href='/x'>` tenga el estilo de un `<Button>`. Si anidás `<Button><Link>...</Link></Button>`, generás HTML inválido porque obtenés `<button><a>...</a></button>` (los botones no deben contener anchors). La solución de Radix es el componente `<Slot>`: cuando pasás `asChild={true}` al Button, Radix NO renderiza `<button>`, sino que **inyecta las classes y props del Button directamente en el primer hijo** (el `<Link>`). Resultado: un solo elemento `<a>` con los estilos del Button y el comportamiento del Link. Es un patrón de composición súper potente.",
    flowTitle: "Flujo: qué hace asChild={true} con Slot",
    flowSteps: [
      { label: "Pasás asChild al Button", type: "start", detail: "<Button asChild><Link href='/x'>Ver</Link></Button>" },
      { label: "El Button ve asChild=true", type: "decision", detail: "const Comp = asChild ? Slot : 'button'" },
      { label: "Slot renderiza el primer hijo", type: "process", detail: "El <Link> es ahora el elemento root, no un hijo del button" },
      { label: "Slot inyecta props y className", type: "process", detail: "Las classes del buttonVariants se fusionan con las del Link" },
      { label: "HTML final: un solo <a>", type: "end", detail: "<a href='/x' class='bg-primary text-on-primary...'>Ver</a>" },
    ],
    codeExample: {
      language: "TypeScript (dentro de button.tsx)",
      code: `import { Slot } from "@radix-ui/react-slot";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;  // ← la prop mágica
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {

    // Si asChild=true usamos Slot (merge en hijo). Si no, un <button> normal.
    const Comp = asChild ? Slot : "button";

    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

// ========== USO ==========

// Botón normal (asChild=false, default)
<Button onClick={handleClick}>Enviar</Button>
// → HTML: <button class="...">Enviar</button>

// Link con pinta de botón (asChild=true)
<Button asChild variant="secondary" size="lg">
  <Link href="/dashboard">Ir al dashboard</Link>
</Button>
// → HTML: <a href="/dashboard" class="bg-secondary text-on-secondary h-11 px-6 ...">Ir al dashboard</a>
// Un solo elemento <a>, no <a><button></button></a>`,
      description: "El patrón asChild es clave para accesibilidad y HTML válido. Un botón que navega debe ser <a>, no <button>; un botón que envía un form debe ser <button>, no <a>. asChild te deja mantener la semántica correcta sin perder los estilos.",
    },
    exercise: {
      question: "¿Para qué sirve principalmente la prop asChild de un componente shadcn?",
      options: [
        "Para que el componente se renderice en el servidor en lugar del cliente.",
        "Para fusionar los estilos y props del componente con su primer hijo, evitando anidación innecesaria de elementos HTML (ej. que un <Link> tenga aspecto de <Button> sin generar <button><a></a></button>).",
        "Para ocultar el componente mientras se cargan los datos.",
        "Para forzar que el componente sea un Server Component.",
      ],
      correctIndex: 1,
      explanation:
        "asChild usa Radix Slot para 'inyectar' las clases y props en el primer hijo, generando UN SOLO elemento HTML con el aspecto del componente padre y la semántica del hijo. Ideal para que anchors parezcan botones y viceversa, manteniendo accesibilidad.",
    },
  },

  // 6. ADAPTAR TOKENS AL TEMA DEL PROYECTO
  {
    id: "adaptar-tokens",
    title: "Adaptar shadcn a tu tema (Electric Slate vs defaults)",
    englishTerm: "Theming shadcn to your project tokens",
    tag: "shadcn 06",
    icon: "palette",
    analogy:
      "Imaginate que te mudás a Argentina pero tu reloj marca hora de Nueva York. Dos opciones: (A) le pedís a todos tus amigos argentinos que piensen en horario NY cuando te hablen (horrible), o (B) ajustás TU reloj a hora argentina y listo. Al adoptar shadcn, el componente default usa su propia nomenclatura de colores (`bg-primary`, `text-primary-foreground`), pero tu proyecto ya tenía la suya (`bg-primary`, `text-on-primary` — nomenclatura Material 3). La opción (B) es editar el button.tsx para que use TUS tokens, en vez de obligar a todo el proyecto a hablar el idioma shadcn.",
    explanation:
      "Los componentes shadcn vienen con una paleta por defecto basada en variables CSS (ej. `--background`, `--foreground`, `--primary`, `--primary-foreground`). Tu proyecto DevLearn usa nomenclatura Material 3 (`--color-surface`, `--color-on-surface`, `--color-primary`, `--color-on-primary`). Hay dos caminos: (1) **aliasear** en `globals.css` las variables shadcn hacia las tuyas (`--foreground: var(--color-on-surface)`), o (2) **editar directamente los componentes** generados para que usen tus clases. En este proyecto elegimos la opción 2 porque es más explícita y queda documentado en el código.",
    flowTitle: "Flujo: adaptar un componente shadcn a Electric Slate",
    flowSteps: [
      { label: "shadcn genera button.tsx con defaults", type: "start", detail: "bg-primary text-primary-foreground  (tokens genéricos)" },
      { label: "Identificar las clases ajenas al tema", type: "decision", detail: "primary-foreground, background, muted, border, destructive-foreground..." },
      { label: "Mapear a tokens Material 3 del proyecto", type: "process", detail: "primary-foreground → on-primary;  background → surface;  destructive → error" },
      { label: "Editar las variants de CVA", type: "process", detail: "Reemplazar en el string de classes el token shadcn por el token local" },
      { label: "El Button ahora respeta Electric Slate", type: "end", detail: "Mismo API pero coherencia visual total con el resto del dashboard" },
    ],
    codeExample: {
      language: "TypeScript (diff conceptual)",
      code: `// ========== ANTES (defaults de shadcn/ui) ==========
const buttonVariants = cva("...", {
  variants: {
    variant: {
      default:     "bg-primary text-primary-foreground hover:bg-primary/90",
      destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      outline:     "border border-input bg-background hover:bg-accent",
      secondary:   "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      ghost:       "hover:bg-accent hover:text-accent-foreground",
      link:        "text-primary underline-offset-4 hover:underline",
    },
  },
});

// ========== DESPUÉS (adaptado a Electric Slate / Material 3) ==========
const buttonVariants = cva("...", {
  variants: {
    variant: {
      default:
        "bg-primary text-on-primary shadow-md hover:bg-primary-container hover:text-on-primary-container",
      secondary:
        "bg-secondary text-on-secondary shadow-md hover:bg-secondary-container",
      tertiary:
        "bg-tertiary text-on-tertiary shadow-md hover:bg-tertiary-container",
      destructive:
        "bg-error text-on-error shadow-md hover:bg-error/90",
      outline:
        "border border-outline-variant bg-transparent text-on-surface hover:bg-surface-container-high",
      ghost:
        "bg-transparent text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface",
      link:
        "bg-transparent text-primary underline-offset-4 hover:underline",
    },
  },
});`,
      description: "El cambio es puramente nombres de clases. La API del Button no cambia (sigue aceptando variant='default'|'secondary'|...), solo las clases Tailwind internas usan los tokens que el resto del proyecto ya usa. Resultado: cero divergencia visual entre el <Button> nuevo y los <div className='bg-primary'> existentes.",
    },
    exercise: {
      question: "¿Por qué conviene adaptar los tokens de un componente shadcn al tema propio del proyecto en vez de usar los defaults?",
      options: [
        "Porque los defaults de shadcn son más lentos.",
        "Para mantener coherencia visual: si tu dashboard ya usa bg-primary (lavender), bg-secondary (verde) con sus variantes 'on-*' Material 3, el Button nuevo debe hablar el mismo idioma; si no, convive mal con el resto del UI.",
        "Porque shadcn obliga a cambiarlos por licencia.",
        "No conviene: los defaults siempre son óptimos.",
      ],
      correctIndex: 1,
      explanation:
        "Coherencia visual = profesionalismo. Si en tu proyecto un botón primario es lavender (#c0c1ff), el <Button> de shadcn debe serlo también. Dejar los defaults crea un UI 'frankenstein' con dos paletas conviviendo. Y como shadcn te DA el código fuente, adaptarlo es trivial.",
    },
  },
];
