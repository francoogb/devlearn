// Contenido pedagógico del módulo React (Fundamentos, Guía Rápida & Pensar en React)
// Basado fielmente en la documentación oficial moderna de React (react.dev / es.react.dev)

export interface ReactLesson {
  id: string;
  number: string;
  title: string;
  summary: string;
  officialRefUrl: string;
  concepts: {
    name: string;
    description: string;
    codeExample?: string;
    practicalRule?: string;
  }[];
  quiz: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
}

export const reactLessons: ReactLesson[] = [
  {
    id: "components-and-jsx",
    number: "01",
    title: "Crear componentes y escribir marcado con JSX",
    summary:
      "Las aplicaciones de React están hechas de componentes: piezas de UI reutilizables con su propia lógica y apariencia. En React moderno, son funciones de JavaScript que devuelven marcado JSX.",
    officialRefUrl: "https://es.react.dev/learn#creating-and-nesting-components",
    concepts: [
      {
        name: "Componentes funcionales de React",
        description:
          "Un componente de React es una función JavaScript que empieza obligatoriamente con Mayúscula y devuelve marcado JSX. Si empezara con minúscula, React lo interpretaría como una etiqueta HTML estándar nativa.",
        codeExample: `// 1. Declarar el componente con mayúscula
function MyButton() {
  return (
    <button className="btn-primary">
      Soy un botón de React
    </button>
  );
}

// 2. Anidarlo dentro de otro componente
export default function App() {
  return (
    <div>
      <h1>Bienvenido a mi aplicación</h1>
      <MyButton />
    </div>
  );
}`,
        practicalRule:
          "Regla de oro: Nombres de componentes SIEMPRE con PascalCase (ej: 'UserProfile', 'MyButton'). Si usas 'myButton', React asumirá que es HTML desconocido y no ejecutará tu función.",
      },
      {
        name: "Reglas estrictas de JSX",
        description:
          "JSX es una extensión de sintaxis similar a HTML pero dentro de JavaScript. Tiene 3 reglas inquebrantables: 1) Siempre devolver un solo elemento raíz (o usar un Fragmento <>...</>), 2) Cerrar todas las etiquetas (<img />, <br />), y 3) Usar camelCase para la mayoría de atributos ('className' en lugar de 'class', 'htmlFor' en lugar de 'for').",
        codeExample: `// Devolver un fragmento compartido sin agregar divs innecesarios al DOM
function ProfileHeader() {
  return (
    <>
      <h1>Perfil de Usuario</h1>
      <p>Desarrollador Frontend en React.<br />Activo recientemente.</p>
    </>
  );
}`,
        practicalRule:
          "¿Por qué un solo elemento raíz? Porque bajo el capó JSX se transforma en llamadas a funciones JS ('React.createElement(...)') y una función en JavaScript solo puede retornar un valor a la vez.",
      },
    ],
    quiz: {
      question: "¿Por qué los componentes de React deben iniciar obligatoriamente con letra mayúscula?",
      options: [
        "Es solo una sugerencia de estilo del equipo de diseño.",
        "Para que JSX distinga un componente personalizado de una etiqueta HTML nativa como <button> o <div>.",
        "Porque JavaScript lanza un error de sintaxis si una función empieza con minúscula.",
        "Para indicar que el componente se ejecutará únicamente en el servidor.",
      ],
      correctIndex: 1,
      explanation:
        "React usa la mayúscula inicial para saber que debe ejecutar la función del componente, mientras que las etiquetas en minúscula (<div/>, <span/>) son tratadas directamente como nodos nativos del DOM.",
    },
  },
  {
    id: "displaying-data-and-styles",
    number: "02",
    title: "Mostrar datos dinámicos y aplicar estilos con llaves { }",
    summary:
      "JSX te permite escapar de nuevo hacia JavaScript usando llaves {}. Así puedes mostrar variables, evaluar expresiones matemáticas y asignar estilos en línea mediante objetos.",
    officialRefUrl: "https://es.react.dev/learn#displaying-data",
    concepts: [
      {
        name: "Escapar a JavaScript con llaves {}",
        description:
          "Dentro de JSX, cualquier cosa dentro de { } se evalúa como JavaScript puro: variables, llamadas a funciones, concatenación o lógica.",
        codeExample: `const user = {
  name: 'Ada Lovelace',
  role: 'Pionera de la Computación',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100'
};

export default function Profile() {
  return (
    <div className="card">
      {/* Pasando texto dinámico */}
      <h2>{user.name}</h2>
      <p>{user.role.toUpperCase()}</p>
      
      {/* Pasando atributos dinámicos */}
      <img src={user.avatarUrl} alt={'Foto de ' + user.name} />
    </div>
  );
}`,
        practicalRule:
          "No uses comillas si vas a usar llaves: haz src={user.avatarUrl}, NO src=\"{user.avatarUrl}\". Las comillas convierten el contenido en una cadena literal de texto plano.",
      },
      {
        name: "Estilos en línea: la doble llave style={{ }}",
        description:
          "Cuando usas style en React, no escribes una cadena CSS ('color: red'). Pasas un objeto JavaScript con propiedades en camelCase ({ color: 'red', backgroundColor: '#fff' }). Por eso ves llaves dobles: la exterior es el escape de JSX y la interior es el objeto JS.",
        codeExample: `<div style={{
  backgroundColor: '#1e293b',
  borderRadius: '8px',
  padding: '16px',
  color: '#38bdf8'
}}>
  Tarjeta con estilos dinámicos en objeto
</div>`,
        practicalRule:
          "En Tailwind / shadcn/ui usamos casi siempre 'className=\"...\"', pero 'style={{}}' es indispensable cuando las dimensiones o colores dependen de variables calculadas dinámicamente en tiempo real.",
      },
    ],
    quiz: {
      question: "¿Por qué se utiliza la sintaxis style={{ width: 100 }} con dos llaves en JSX?",
      options: [
        "Porque React requiere una llave para CSS y otra para HTML.",
        "La llave externa es para escapar a JavaScript en JSX, y la llave interna es el objeto literal de JavaScript que contiene las propiedades.",
        "Porque indica que el estilo es reactivo y cambiará automáticamente con el tiempo.",
        "Es un error tipográfico de la documentación oficial.",
      ],
      correctIndex: 1,
      explanation:
        "No existe la sintaxis especial '{{}}'. Es simplemente una expresión JSX '{}' que contiene un objeto JS '{ width: 100 }'.",
    },
  },
  {
    id: "conditional-rendering-and-lists",
    number: "03",
    title: "Renderizado condicional y renderizado de listas con .map()",
    summary:
      "React no tiene directivas mágicas como 'v-if' o '*ngFor'. En su lugar, usa JavaScript regular: 'if/else', el operador ternario '?', el operador '&&', y el método '.map()' para transformar arreglos en elementos visuales.",
    officialRefUrl: "https://es.react.dev/learn#conditional-rendering",
    concepts: [
      {
        name: "Renderizado condicional (if, ? : y &&)",
        description:
          "Elige cómo mostrar u ocultar elementos. Usa el operador ternario 'condición ? <SiVerdadero /> : <SiFalso />' o el operador '&&' para cuando solo quieres mostrar algo si se cumple la condición.",
        codeExample: `// 1. Operador ternario dentro de JSX
<div>
  {isLoggedIn ? <UserDashboard /> : <LoginForm />}
</div>

// 2. Operador lógico && (renderizado de guardia)
<div>
  {hasUnreadMessages && (
    <span className="badge">¡Tienes nuevos mensajes!</span>
  )}
</div>`,
        practicalRule:
          "Cuidado con el 0: 'count && <Badge />' mostrará un '0' en pantalla si count es el número 0. Prefiere 'count > 0 && <Badge />' o usar operador ternario.",
      },
      {
        name: "Renderizado de listas y la importancia vital de la 'key'",
        description:
          "Para convertir una lista de datos en elementos visuales, se usa '.map()'. Cada elemento devuelto DEBE tener una propiedad 'key' única y estable para que React sepa qué nodo insertar, actualizar o eliminar del DOM sin reconstruir toda la lista.",
        codeExample: `const topics = [
  { id: 't1', title: 'Componentes', done: true },
  { id: 't2', title: 'Estado y Props', done: false },
  { id: 't3', title: 'Hooks', done: false },
];

export default function TopicList() {
  return (
    <ul>
      {topics.map((topic) => (
        <li key={topic.id} className={topic.done ? 'text-green' : 'text-gray'}>
          {topic.title}
        </li>
      ))}
    </ul>
  );
}`,
        practicalRule:
          "Nunca uses el índice del array '(item, index) => key={index}' si los elementos pueden reordenarse, filtrarse o eliminarse. Usa siempre un ID único proveniente de tu modelo o base de datos.",
      },
    ],
    quiz: {
      question: "¿Por qué es obligatorio asignar una 'key' única a cada elemento dentro de un .map() en React?",
      options: [
        "Para que el motor de CSS pueda aplicar estilos de colores alternados.",
        "Para que React identifique qué elemento específico cambió, se agregó o eliminó, optimizando las actualizaciones del DOM.",
        "Porque sin 'key', JavaScript arrojará un error de compilación irrecuperable.",
        "Es un requisito exclusivo de la librería Next.js.",
      ],
      correctIndex: 1,
      explanation:
        "La prop 'key' permite a React asociar la identidad de cada dato con su nodo en el Virtual DOM entre renderizados sucesivos.",
    },
  },
  {
    id: "events-and-usestate",
    number: "04",
    title: "Responder a eventos y memoria del componente (useState)",
    summary:
      "Los componentes cobran vida respondiendo a interacciones del usuario (clics, inputs, formularios). Para que un componente recuerde información y se vuelva a renderizar con nuevos datos, usamos el Hook 'useState'.",
    officialRefUrl: "https://es.react.dev/learn#responding-to-events",
    concepts: [
      {
        name: "Manejo de eventos: pasar funciones, no ejecutarlas",
        description:
          "Al asignar un evento como onClick, pasamos la referencia de la función (sin paréntesis al final). Si le pones paréntesis, se ejecutará inmediatamente durante el render en lugar de cuando el usuario haga clic.",
        codeExample: `function AlertButton() {
  function handleClick() {
    alert('¡Botón clickeado!');
  }

  // BIEN: Pasamos handleClick sin paréntesis
  return <button onClick={handleClick}>Haz clic</button>;

  // MAL: <button onClick={handleClick()}> -> Se ejecuta de inmediato
  // SI NECESITA PARÁMETROS: <button onClick={() => handleDelete(id)}>
}`,
        practicalRule:
          "Regla mnemotécnica: 'onClick={fn}' espera al usuario. 'onClick={fn()}' se dispara al instante al montar el componente.",
      },
      {
        name: "Estado local con useState",
        description:
          "Las variables normales de JS se pierden entre renders. 'useState' le da memoria persistente al componente y dispara una nueva renderización cuando su setter es llamado.",
        codeExample: `import { useState } from 'react';

export default function Counter() {
  // Declaración: [valorActual, funcionParaActualizar]
  const [count, setCount] = useState(0);

  function increment() {
    setCount(count + 1);
  }

  return (
    <button onClick={increment} className="btn">
      Has hecho clic {count} veces
    </button>
  );
}`,
        practicalRule:
          "Los estados son aislados e independientes: si renderizas tres <Counter /> en la misma página, cada uno llevará su propia cuenta sin afectar a los demás.",
      },
    ],
    quiz: {
      question: "¿Qué ocurre si escribes onClick={handleClick()} con paréntesis en un botón de React?",
      options: [
        "El botón funciona de forma normal y espera el clic del usuario.",
        "La función se ejecuta inmediatamente cuando el componente se renderiza, no al hacer clic.",
        "React convierte automáticamente la llamada en un listener asíncrono.",
        "Lanza un error de tipos en TypeScript pero funciona en JavaScript.",
      ],
      correctIndex: 1,
      explanation:
        "Los paréntesis ejecutan la función inmediatamente en tiempo de render. Debes pasar solo el nombre de la función: onClick={handleClick} o una función flecha: onClick={() => handleClick()}.",
    },
  },
  {
    id: "lifting-state-up",
    number: "05",
    title: "Compartir datos entre componentes: Levantar el Estado",
    summary:
      "A menudo dos o más componentes necesitan reflejar los mismos datos simultáneamente. En React, la solución es mover el estado hacia el ancestro común más cercano y pasarlo hacia abajo como 'props'.",
    officialRefUrl: "https://es.react.dev/learn#sharing-data-between-components",
    concepts: [
      {
        name: "El patrón de Levantar el Estado (Lifting State Up)",
        description:
          "En lugar de mantener copias de estado desconectadas en dos componentes hijos, movemos el 'useState' al padre. El padre pasa el valor actual y la función de actualización como props.",
        codeExample: `import { useState } from 'react';

// Componente Hijo: es 'tonto' (presentacional), recibe props
function SyncedButton({ count, onClick, label }) {
  return (
    <button onClick={onClick} className="btn-secondary">
      {label}: {count} clics
    </button>
  );
}

// Componente Padre: dueño de la única fuente de la verdad
export default function ParentApp() {
  const [sharedCount, setSharedCount] = useState(0);

  const handleIncrement = () => {
    setSharedCount(sharedCount + 1);
  };

  return (
    <div className="flex gap-4">
      <SyncedButton count={sharedCount} onClick={handleIncrement} label="Botón A" />
      <SyncedButton count={sharedCount} onClick={handleIncrement} label="Botón B" />
    </div>
  );
}`,
        practicalRule:
          "Flujo de datos unidireccional: En React los datos siempre fluyen hacia abajo (padre -> hijo mediante props) y los eventos fluyen hacia arriba (hijo llama a callbacks pasados por el padre).",
      },
      {
        name: "Props: inmutabilidad y paso de parámetros",
        description:
          "Las props son de solo lectura. Un componente hijo nunca debe modificar directamente 'props.count = 5'. Si necesita cambiarlo, debe notificar al padre mediante una función callback.",
        codeExample: `// Definición con desestructuración en TypeScript
interface CardProps {
  title: string;
  isActive: boolean;
  onSelect: () => void;
}

function Card({ title, isActive, onSelect }: CardProps) {
  return (
    <div 
      onClick={onSelect}
      className={isActive ? "border-blue-500" : "border-gray-200"}
    >
      <h3>{title}</h3>
    </div>
  );
}`,
        practicalRule:
          "Si una función de componente es pura respecto a sus props (mismas props = mismo JSX), tu interfaz será predecible, fácil de testear y libre de efectos secundarios inesperados.",
      },
    ],
    quiz: {
      question: "¿Cuál es el principio fundamental del flujo de datos en React?",
      options: [
        "Flujo bidireccional automático entre todos los componentes hermanos.",
        "Flujo unidireccional descendente: los datos bajan por props y los eventos suben mediante callbacks.",
        "Los componentes hijos pueden reescribir libremente las props que recibieron de sus padres.",
        "Todos los estados deben ser globales y guardarse en el objeto window.",
      ],
      correctIndex: 1,
      explanation:
        "React promueve el flujo de datos unidireccional (top-down), garantizando que siempre haya una 'única fuente de la verdad' (Single Source of Truth).",
    },
  },
];
