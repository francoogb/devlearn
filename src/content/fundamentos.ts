// Contenido de la sección /fundamentos — Conceptos esenciales de programación
// Para estudiantes, juniors y desarrolladores que inician su camino.
// Cada tema incluye: analogía cotidiana, explicación conceptual en español (términos en inglés),
// diagrama visual / de flujo paso a paso y código práctico con mini ejercicio.

export interface FlowStep {
  label: string;
  type: "start" | "process" | "decision" | "end" | "api_req" | "api_res";
  detail?: string;
}

export interface FundamentalConcept {
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

export const fundamentalConcepts: FundamentalConcept[] = [
  // 1. VARIABLES Y CONSTANTES
  {
    id: "variables-y-constantes",
    title: "Variables y Constantes",
    englishTerm: "Variables and Constants",
    tag: "Fundamento 01",
    icon: "inventory_2",
    analogy:
      "Imagina una caja de zapatos etiquetada. Si le pones la etiqueta 'zapatos' puedes guardar unos tenis hoy y mañana cambiarlos por botas (variable: let). Pero si es una caja de seguridad sellada con pegamento para guardar tu pasaporte, nunca podrás cambiar lo que hay dentro sin romperla (constante: const).",
    explanation:
      "Una variable es un espacio reservado en la memoria RAM de la computadora con un nombre específico (identificador) para guardar información temporal que tu programa necesita mientras se está ejecutando. En JavaScript y TypeScript moderno usamos 'const' por defecto y 'let' solo cuando sabemos con seguridad que el valor cambiará más adelante.",
    flowTitle: "Diagrama de Flujo: Asignación y Reasignación en Memoria",
    flowSteps: [
      { label: "Inicio: Declarar variable", type: "start", detail: "let puntos = 10;" },
      { label: "La computadora reserva un espacio en RAM", type: "process", detail: "Dirección 0x01 = 10" },
      { label: "¿El usuario ganó puntos?", type: "decision", detail: "Si gana, modificamos el valor" },
      { label: "Reasignar: puntos = puntos + 5;", type: "process", detail: "El espacio en RAM ahora vale 15" },
      { label: "Fin: Leer nuevo valor (15)", type: "end", detail: "Memoria actualizada" },
    ],
    codeExample: {
      language: "JavaScript / TypeScript",
      code: `// Constante: no cambia (inmutable por reasignación)
const MAX_INTENTOS = 3;

// Variable: cambia según las acciones del usuario
let intentosUsuario = 0;
intentosUsuario = intentosUsuario + 1; // Incrementamos

console.log(\`Llevas \${intentosUsuario} de \${MAX_INTENTOS} intentos\`);`,
      description: "Usa 'const' para valores fijos como URLs de APIs o máximos permitidos; usa 'let' para contadores o estados.",
    },
    exercise: {
      question: "¿Qué ocurre en JavaScript si intentas hacer 'const PI = 3.14; PI = 3.1416;'?",
      options: [
        "El valor se actualiza silenciosamente sin problema.",
        "Lanza un error de tipo TypeError: Assignment to constant variable.",
        "Se convierte automáticamente en una variable 'let'.",
      ],
      correctIndex: 1,
      explanation: "Las constantes declaradas con 'const' no permiten reasignación. Intentar modificarlas disparará un TypeError inmediato.",
    },
  },

  // 2. FUNCIONES Y PARÁMETROS
  {
    id: "funciones",
    title: "Funciones y Parámetros",
    englishTerm: "Functions and Parameters",
    tag: "Fundamento 02",
    icon: "code_blocks",
    analogy:
      "Una función es como una licuadora o una receta de cocina. Tú le ingresas ingredientes (parámetros / inputs), la licuadora ejecuta un proceso automático adentro, y te entrega un delicioso jugo listo para tomar (retorno / output).",
    explanation:
      "Una función es un bloque de código reutilizable diseñado para cumplir una sola tarea concreta. En lugar de escribir el mismo cálculo 10 veces en tu aplicación, escribes una función una sola vez y la 'llamas' (call / invoke) cada vez que la necesites pasándole argumentos específicos.",
    flowTitle: "Diagrama de Flujo: Ciclo de Vida de una Función",
    flowSteps: [
      { label: "Llamada con argumentos (Input)", type: "start", detail: "calcularPrecioTotal(100, 0.19)" },
      { label: "La función recibe los parámetros (a, b)", type: "process", detail: "precioBase = 100, iva = 0.19" },
      { label: "Ejecución del algoritmo interno", type: "process", detail: "const total = precioBase + (precioBase * iva)" },
      { label: "Instrucción return (Output)", type: "end", detail: "Devuelve 119 al código que la llamó" },
    ],
    codeExample: {
      language: "JavaScript / TypeScript",
      code: `// Definición de la función (La receta)
function calcularTotal(precio: number, impuesto: number): number {
  const montoImpuesto = precio * impuesto;
  return precio + montoImpuesto; // Entrega el resultado final
}

// Invocación (Preparar el jugo)
const totalConIva = calcularTotal(100, 0.19); // 119
console.log("Total a pagar:", totalConIva);`,
      description: "Los parámetros son los nombres de las variables en la definición; los argumentos son los valores reales que le pasas al invocarla.",
    },
    exercise: {
      question: "¿Cuál es la diferencia entre un parámetro y el valor devuelto con 'return'?",
      options: [
        "El parámetro es la entrada (input) y el return es el resultado de salida (output).",
        "Son exactamente lo mismo con dos nombres distintos.",
        "El return solo se puede usar si la función no tiene parámetros.",
      ],
      correctIndex: 0,
      explanation: "Los parámetros son los datos que la función necesita recibir para trabajar; el 'return' es lo que entrega al terminar su trabajo.",
    },
  },

  // 3. ¿QUÉ ES UNA API? (REQUEST Y RESPONSE)
  {
    id: "que-es-una-api",
    title: "¿Qué es una API? (Cliente, Servidor, HTTP)",
    englishTerm: "Application Programming Interface (API)",
    tag: "Fundamento 03",
    icon: "hub",
    analogy:
      "Imagina que estás en un restaurante. Tú eres el Cliente (Frontend / Navegador) sentado en la mesa. La cocina es el Servidor (Backend / Base de datos) donde se preparan los platos. Tú no puedes entrar a la cocina a cocinar. Por eso usas al Mozo/Mesero, que es la API: él toma tu pedido (Request), se lo lleva a la cocina, y te trae el plato listo (Response).",
    explanation:
      "API significa 'Interfaz de Programación de Aplicaciones'. Es un conjunto de reglas, rutas y formatos (casi siempre JSON) que permite que dos sistemas informáticos se comuniquen a través de internet usando el protocolo HTTP. Tu aplicación web de React/Next.js envía una petición ('Request') mediante métodos como GET, POST, PUT o DELETE, y el servidor responde ('Response') con datos y un código de estado (como 200 OK o 404 Not Found).",
    flowTitle: "Diagrama de Flujo: Ciclo Request-Response de una API",
    flowSteps: [
      { label: "Cliente (Navegador): Envía Request", type: "api_req", detail: "GET https://api.tienda.com/productos" },
      { label: "La petición viaja por Internet (HTTP)", type: "process", detail: "Headers, Tokens y Parámetros" },
      { label: "Servidor: Recibe y consulta la Base de Datos", type: "decision", detail: "¿El recurso existe y el token es válido?" },
      { label: "Servidor: Empaqueta los datos en formato JSON", type: "process", detail: "{ status: 200, data: [...] }" },
      { label: "Cliente: Recibe Response y pinta la pantalla", type: "api_res", detail: "UI actualizada con la lista de productos" },
    ],
    codeExample: {
      language: "JavaScript / Next.js",
      code: `// Consumiendo una API con async / await y fetch en JavaScript:
async function obtenerUsuarios() {
  try {
    // 1. Enviamos el Request
    const respuesta = await fetch("https://jsonplaceholder.typicode.com/users");
    
    // 2. Si el servidor respondió con error (ej. 404 o 500)
    if (!respuesta.ok) {
      throw new Error(\`Error HTTP: \${respuesta.status}\`);
    }

    // 3. Convertimos el Response a formato JSON
    const usuarios = await respuesta.json();
    console.log("Usuarios recibidos:", usuarios);
  } catch (error) {
    console.error("Fallo la petición a la API:", error);
  }
}`,
      description: "El navegador hace un 'fetch', espera la respuesta del servidor en la nube y transforma el texto recibido a un arreglo de objetos manipulable en JavaScript.",
    },
    exercise: {
      question: "¿Qué código de estado HTTP indica que el recurso pedido no existe en el servidor?",
      options: [
        "200 OK",
        "404 Not Found",
        "500 Internal Server Error",
      ],
      correctIndex: 1,
      explanation: "El código 404 Not Found significa que la URL o el recurso solicitado no fue encontrado en el servidor.",
    },
  },

  // 4. DIAGRAMAS DE FLUJO Y TOMA DE DECISIONES
  {
    id: "diagramas-de-flujo",
    title: "Diagramas de Flujo y Lógica Condicional",
    englishTerm: "Flowcharts and Conditional Logic (If / Else)",
    tag: "Fundamento 04",
    icon: "account_tree",
    analogy:
      "Es como un mapa con un semáforo o una bifurcación en la carretera. Si el semáforo está en verde, avanzas; si está en rojo, te detienes. Tu cerebro toma decisiones basadas en condiciones verdaderas (true) o falsas (false) todo el día.",
    explanation:
      "Antes de escribir una sola línea de código, los programadores representan la lógica usando Diagramas de Flujo (Flowcharts). Usan formas geométricas estándar: óvalos para Inicio/Fin, rectángulos para Acciones/Procesos y rombos para Decisiones (condicionales 'if/else'). En código, esto se traduce en evaluar una expresión booleana.",
    flowTitle: "Diagrama de Flujo: Lógica de Autenticación de un Usuario",
    flowSteps: [
      { label: "Inicio: Usuario presiona 'Iniciar Sesión'", type: "start", detail: "Ingresa correo y contraseña" },
      { label: "¿El correo y la contraseña son correctos?", type: "decision", detail: "Condición booleana: true o false" },
      { label: "SI (True): Generar sesión y redirigir al Dashboard", type: "process", detail: "router.push('/dashboard')" },
      { label: "NO (False): Mostrar mensaje 'Credenciales erróneas'", type: "process", detail: "setError('Revisa tus datos')" },
      { label: "Fin del flujo", type: "end", detail: "La pantalla espera la siguiente acción" },
    ],
    codeExample: {
      language: "JavaScript / TypeScript",
      code: `const usuario = { email: "fran@dev.cl", passwordValida: true };

// Condicional if / else (El Rombo de Decisión del Diagrama)
if (usuario.passwordValida) {
  console.log("Acceso concedido: Bienvenido a DevLearn");
} else {
  console.warn("Acceso denegado: Contraseña incorrecta");
}`,
      description: "El bloque 'if' solo se ejecuta si la condición dentro de los paréntesis se evalúa a true.",
    },
    exercise: {
      question: "En un diagrama de flujo tradicional, ¿qué figura geométrica representa una decisión condicional?",
      options: [
        "Un rectángulo",
        "Un rombo",
        "Un círculo",
      ],
      correctIndex: 1,
      explanation: "El rombo simboliza una bifurcación condicional donde el flujo se divide según si la respuesta es verdadera (Sí) o falsa (No).",
    },
  },

  // 5. BUCLES Y REPETICIONES
  {
    id: "bucles-y-ciclos",
    title: "Bucles y Ciclos Repetitivos",
    englishTerm: "Loops and Iterations (For, While)",
    tag: "Fundamento 05",
    icon: "replay",
    analogy:
      "Hacer 10 flexiones en el gimnasio. Empiezas en el conteo 1, haces una flexión, y te preguntas: '¿Ya llegué a 10?'. Si la respuesta es no, repites. Cuando el contador llega a 10, te detienes.",
    explanation:
      "Un bucle (loop) es una estructura de control que ejecuta un mismo bloque de instrucciones una y otra vez mientras se cumpla una condición específica. Sin bucles, tendrías que escribir el mismo código a mano cientos de veces para procesar una lista de elementos.",
    flowTitle: "Diagrama de Flujo: Ciclo For con Contador",
    flowSteps: [
      { label: "Inicio: Inicializar contador", type: "start", detail: "let i = 0;" },
      { label: "¿i es menor que la cantidad de elementos (i < total)?", type: "decision", detail: "¿Continuar repitiendo?" },
      { label: "SI: Ejecutar código y luego sumar (i++)", type: "process", detail: "console.log(elementos[i])" },
      { label: "NO: Condición terminada, salir del bucle", type: "end", detail: "Continuar con el resto del programa" },
    ],
    codeExample: {
      language: "JavaScript / TypeScript",
      code: `const lenguajes = ["JavaScript", "TypeScript", "Python"];

// Bucle for tradicional:
for (let i = 0; i < lenguajes.length; i++) {
  console.log(\`Lenguaje #\${i + 1}: \${lenguajes[i]}\`);
}

// Bucle moderno funcional en arreglos:
lenguajes.forEach((lenguaje) => {
  console.log("Estudiando:", lenguaje);
});`,
      description: "Itera sobre una colección paso a paso, ejecutando la misma lógica para cada uno de los elementos.",
    },
    exercise: {
      question: "¿Qué peligro existe si olvidas actualizar la condición de salida de un bucle 'while'?",
      options: [
        "El programa se compila más rápido.",
        "Se produce un bucle infinito que congela la computadora o el navegador.",
        "El valor se reinicia a cero automáticamente.",
      ],
      correctIndex: 1,
      explanation: "Un bucle infinito ocurre cuando la condición nunca llega a ser falsa, consumiendo toda la CPU de la máquina hasta colapsar el proceso.",
    },
  },
];
