// Contenido de la sección /estructuras-de-datos — cómo se guardan y organizan los datos.
// Cubre: Arreglos, objetos, Map, Set, pilas, colas, listas enlazadas, árboles y grafos.
// Cada una con: qué es, cuándo usarla, versión tipada en TypeScript,
// comparación con JavaScript y un mini ejercicio.
// Textos en español con términos técnicos en inglés entre paréntesis.

export interface DataStructureTopic {
  id: string;
  name: string;
  englishTerm: string;
  whatIsIt: string; // qué es
  whenToUse: string; // cuándo usarla
  tsCode: string; // versión tipada en TypeScript
  jsComparison: string; // comparación con JavaScript
  exercise: {
    prompt: string;
    hint: string;
    solution: string;
  };
}

export const dataStructures: DataStructureTopic[] = [
  // 1. ARREGLOS
  {
    id: "arreglos",
    name: "Arreglos",
    englishTerm: "Arrays",
    whatIsIt:
      "Una colección indexada de elementos contiguos en memoria donde cada valor se recupera mediante un índice numérico entero basado en cero (zero-indexed).",
    whenToUse:
      "Cuando necesitas una lista secuencial de elementos ordenados donde el acceso por índice numérico es frecuente y se realizan iteraciones consecutivas.",
    tsCode: `// Tipado homogéneo estricto:
const nombres: string[] = ["Ana", "Carlos", "Beatriz"];

// Tipado con genéricos:
const edades: Array<number> = [25, 30, 28];

// Arreglos de objetos tipados con interface:
interface Tarea {
  id: number;
  titulo: string;
  completada: boolean;
}

const tareas: Tarea[] = [
  { id: 1, titulo: "Estudiar TS", completada: true },
  { id: 2, titulo: "Crear rutas", completada: false },
];

// Tuplas (tuples): longitud fija y tipos por posición
const coordenada: [number, number] = [-33.45, -70.66];`,
    jsComparison:
      "En JavaScript normal, los arreglos son heterogéneos y dinámicos (pueden mezclar números, strings y funciones en la misma lista sin error). En TypeScript, el compilador verifica que cada elemento coincida con el tipo declarado, previniendo errores de tipo en tiempo de ejecución.",
    exercise: {
      prompt:
        "Declara un tipo o interface 'Producto' (con id numérico, nombre string y precio numérico) y crea un arreglo tipado que solo acepte productos con precio mayor a cero.",
      hint: "Usa interface Producto y asigna el tipo Producto[] al arreglo.",
      solution: `interface Producto {
  id: number;
  nombre: string;
  precio: number;
}

const catalogo: Producto[] = [
  { id: 1, nombre: "Teclado Mecánico", precio: 89.99 },
  { id: 2, nombre: "Ratón Óptico", precio: 29.50 },
];`,
    },
  },

  // 2. OBJETOS
  {
    id: "objetos",
    name: "Objetos",
    englishTerm: "Objects",
    whatIsIt:
      "Una estructura de pares clave-valor (key-value pairs) utilizada para modelar entidades del mundo real y estructurar propiedades relacionadas.",
    whenToUse:
      "Cuando modelas una entidad con propiedades conocidas y fijas (como un usuario, configuración, producto o respuesta de API).",
    tsCode: `interface Usuario {
  readonly id: number; // Inmutable tras creación
  nombre: string;
  email: string;
  telefono?: string;   // Propiedad opcional
}

const dev: Usuario = {
  id: 101,
  nombre: "Fran",
  email: "fran@devlearn.local",
};

// Index signatures para claves dinámicas tipadas:
interface ConteoPalabras {
  [palabra: string]: number;
}
const frecuencias: ConteoPalabras = { react: 4, next: 6 };`,
    jsComparison:
      "En JavaScript puedes agregar, mutar o eliminar propiedades arbitrariamente (dev.apellido = 'Pérez' funciona sin advertencia). En TypeScript, intentar acceder a propiedades no declaradas en la interface arroja un error en tiempo de desarrollo.",
    exercise: {
      prompt:
        "Crea una interface 'Configuracion' que tenga 'tema' obligatorio (solo 'claro' o 'oscuro') y 'notificaciones' opcional (booleano).",
      hint: "Usa un union type ('claro' | 'oscuro') para la propiedad tema.",
      solution: `interface Configuracion {
  tema: "claro" | "oscuro";
  notificaciones?: boolean;
}

const miConfig: Configuracion = {
  tema: "oscuro",
  notificaciones: true,
};`,
    },
  },

  // 3. MAP
  {
    id: "map",
    name: "Mapa",
    englishTerm: "Map",
    whatIsIt:
      "Una colección de pares clave-valor que recuerda el orden de inserción y permite que las claves sean de cualquier tipo (objetos, funciones, números o strings).",
    whenToUse:
      "Cuando necesitas agregar y eliminar claves dinámicamente con frecuencia, cuando las claves no son strings (por ejemplo objetos como llaves), o cuando necesitas saber el tamaño exacto con .size en tiempo O(1).",
    tsCode: `// Map con tipos genéricos <Clave, Valor>:
const cacheUsuarios = new Map<number, { nombre: string; rol: string }>();

// Inserción y lectura:
cacheUsuarios.set(1, { nombre: "Elena", rol: "Admin" });
cacheUsuarios.set(2, { nombre: "Tomás", rol: "Editor" });

const user = cacheUsuarios.get(1); // Tipo inferido: { nombre: string; rol: string } | undefined
console.log(cacheUsuarios.has(2)); // true
console.log(cacheUsuarios.size);   // 2`,
    jsComparison:
      "En JS, las llaves de un objeto común {} solo son strings o Symbols, y un objeto tiene prototipos heredados que pueden colisionar. Map en TS te permite tipar fuertemente tanto la clave como el valor y garantiza limpieza sin claves heredadas.",
    exercise: {
      prompt:
        "Crea un Map tipado donde la clave sea el código de moneda (string, ej. 'USD') y el valor sea la tasa de cambio numérica respecto al peso.",
      hint: "Usa new Map<string, number>() y usa el método .set().",
      solution: `const tasasCambio = new Map<string, number>();
tasasCambio.set("USD", 950.5);
tasasCambio.set("EUR", 1025.0);
tasasCambio.set("CLP", 1.0);`,
    },
  },

  // 4. SET
  {
    id: "set",
    name: "Conjunto",
    englishTerm: "Set",
    whatIsIt:
      "Una colección de valores únicos. No permite elementos duplicados y optimiza la búsqueda de pertenencia.",
    whenToUse:
      "Cuando necesitas eliminar duplicados de una lista o verificar rápidamente si un valor ya ha sido registrado con .has() en tiempo constante O(1).",
    tsCode: `// Set tipado con tipo genérico:
const tagsValidos = new Set<string>();

tagsValidos.add("typescript");
tagsValidos.add("nextjs");
tagsValidos.add("typescript"); // Se ignora silenciosamente

console.log(tagsValidos.size); // 2

// Deduplicar un arreglo al instante:
const conRepetidos: number[] = [1, 2, 2, 3, 4, 4, 5];
const unicos: number[] = Array.from(new Set<number>(conRepetidos));
console.log(unicos); // [1, 2, 3, 4, 5]`,
    jsComparison:
      "En JS un Set previene duplicados en runtime por igualdad estricta (===). En TS, añade verificación de tipos en compilación para que no puedas insertar por error un número en un Set<string>.",
    exercise: {
      prompt:
        "Escribe una función tipada en TypeScript que reciba una lista de correos electrónicos (string[]) y devuelva true si todos son únicos o false si hay algún repetido.",
      hint: "Compara arr.length con new Set(arr).size.",
      solution: `function sonCorreosUnicos(emails: string[]): boolean {
  const setCorreos = new Set<string>(emails);
  return setCorreos.size === emails.length;
}`,
    },
  },

  // 5. PILAS (STACKS)
  {
    id: "pilas",
    name: "Pila",
    englishTerm: "Stack (LIFO)",
    whatIsIt:
      "Una estructura de datos lineal que sigue el principio LIFO (Last In, First Out): el último elemento en entrar es el primero en salir.",
    whenToUse:
      "Historial de navegación (botón atrás), deshacer/rehacer (undo/redo), balanceo de paréntesis y llamadas a funciones (call stack).",
    tsCode: `// Implementación genérica tipada de una Pila:
class Stack<T> {
  private items: T[] = [];

  // Apilar: agrega un elemento arriba
  push(element: T): void {
    this.items.push(element);
  }

  // Desapilar: quita y devuelve el elemento superior
  pop(): T | undefined {
    return this.items.pop();
  }

  // Mirar la cima sin remover
  peek(): T | undefined {
    return this.items[this.items.length - 1];
  }

  isEmpty(): boolean {
    return this.items.length === 0;
  }
}

const historial = new Stack<string>();
historial.push("/inicio");
historial.push("/lecciones");
console.log(historial.pop()); // "/lecciones"`,
    jsComparison:
      "En JS cualquier arreglo se puede usar como pila con push() y pop(), pero nada te impide llamar por error a splice() o reasignar posiciones intermedias. En TS con una clase o tipo protegemos la encapsulación de las operaciones LIFO.",
    exercise: {
      prompt:
        "Utiliza una pila para verificar si los paréntesis de una cadena '(()())' están correctamente balanceados.",
      hint: "Haz push ante '(' y pop ante ')'. Si intentas pop con pila vacía o al final no queda vacía, no está balanceado.",
      solution: `function estaBalanceado(texto: string): boolean {
  const stack: string[] = [];
  for (const char of texto) {
    if (char === "(") {
      stack.push(char);
    } else if (char === ")") {
      if (stack.length === 0) return false;
      stack.pop();
    }
  }
  return stack.length === 0;
}`,
    },
  },

  // 6. COLAS (QUEUES)
  {
    id: "colas",
    name: "Cola",
    englishTerm: "Queue (FIFO)",
    whatIsIt:
      "Una estructura de datos lineal que sigue el principio FIFO (First In, First Out): el primer elemento en entrar es el primero en salir.",
    whenToUse:
      "Colas de impresión, procesamiento de peticiones en servidores de fondo (background jobs), manejo de eventos y búsqueda en amplitud (BFS).",
    tsCode: `class Queue<T> {
  private items: T[] = [];

  // Encolar: añadir al final
  enqueue(item: T): void {
    this.items.push(item);
  }

  // Desencolar: retirar del frente
  dequeue(): T | undefined {
    return this.items.shift();
  }

  front(): T | undefined {
    return this.items[0];
  }

  size(): number {
    return this.items.length;
  }
}

interface Mensaje {
  emisor: string;
  contenido: string;
}

const colaMensajes = new Queue<Mensaje>();
colaMensajes.enqueue({ emisor: "Sistema", contenido: "Bienvenido" });`,
    jsComparison:
      "En JS se suele usar arr.push() y arr.shift(), pero shift() en arreglos nativos cuesta O(n) porque reindexa todos los elementos. Para grandes volúmenes se implementa con listas enlazadas u objetos de punteros indexados.",
    exercise: {
      prompt:
        "Crea una interfaz 'Peticion' (id: string, timestamp: number) y escribe una función que procese los elementos de la cola en orden FIFO.",
      hint: "Llama a dequeue() dentro de un bucle while (!cola.isEmpty()).",
      solution: `interface Peticion {
  id: string;
  timestamp: number;
}

function procesarCola(cola: Queue<Peticion>): void {
  while (cola.size() > 0) {
    const actual = cola.dequeue();
    console.log("Procesando petición:", actual?.id);
  }
}`,
    },
  },

  // 7. LISTAS ENLAZADAS (LINKED LISTS)
  {
    id: "listas-enlazadas",
    name: "Lista enlazada",
    englishTerm: "Linked List",
    whatIsIt:
      "Una colección lineal de nodos donde cada nodo almacena un valor y un puntero (referencia) al siguiente nodo de la secuencia.",
    whenToUse:
      "Cuando requieres inserciones y eliminaciones al inicio o en posiciones intermedias en tiempo constante O(1) sin tener que reasignar bloques contiguos de memoria.",
    tsCode: `class ListNode<T> {
  value: T;
  next: ListNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

class LinkedList<T> {
  head: ListNode<T> | null = null;

  // Insertar al inicio: O(1)
  prepend(value: T): void {
    const nuevo = new ListNode(value);
    nuevo.next = this.head;
    this.head = nuevo;
  }

  // Recorrer e imprimir:
  print(): void {
    let actual = this.head;
    const valores: T[] = [];
    while (actual !== null) {
      valores.push(actual.value);
      actual = actual.next;
    }
    console.log(valores.join(" -> "));
  }
}

const lista = new LinkedList<number>();
lista.prepend(30);
lista.prepend(20);
lista.prepend(10); // 10 -> 20 -> 30`,
    jsComparison:
      "En JS clásico, una referencia nula accidental causa el temido 'Cannot read properties of null'. En TS, la unión 'ListNode<T> | null' te obliga a comprobar que el nodo no sea null antes de leer .next o .value.",
    exercise: {
      prompt:
        "Implementa un método 'buscar(valor: T): boolean' en la clase LinkedList que retorne true si el valor existe en algún nodo.",
      hint: "Recorre con un bucle while (actual !== null) y compara actual.value === valor.",
      solution: `buscar(valor: T): boolean {
  let actual = this.head;
  while (actual !== null) {
    if (actual.value === valor) return true;
    actual = actual.next;
  }
  return false;
}`,
    },
  },

  // 8. ÁRBOLES BÁSICOS (TREES)
  {
    id: "arboles",
    name: "Árbol binario básico",
    englishTerm: "Binary Tree",
    whatIsIt:
      "Una estructura jerárquica no lineal donde un nodo raíz (root) se conecta con nodos hijos, teniendo como máximo dos hijos cada uno: izquierdo (left) y derecho (right).",
    whenToUse:
      "Estructuras jerárquicas como el DOM de HTML, sistemas de archivos de carpetas, y árboles de búsqueda binaria (BST) para búsquedas rápidas en O(log n).",
    tsCode: `class TreeNode<T> {
  value: T;
  left: TreeNode<T> | null = null;
  right: TreeNode<T> | null = null;

  constructor(value: T) {
    this.value = value;
  }
}

// Recorrido In-Order (izquierda, nodo, derecha):
function inOrderTraversal<T>(node: TreeNode<T> | null, visit: (val: T) => void): void {
  if (node === null) return;
  inOrderTraversal(node.left, visit);
  visit(node.value);
  inOrderTraversal(node.right, visit);
}

// Raíz con dos hijos:
const raiz = new TreeNode(50);
raiz.left = new TreeNode(25);
raiz.right = new TreeNode(75);`,
    jsComparison:
      "El compilador de TS protege la recursividad en árboles validando que los enlaces a hijos puedan ser 'null' e impidiendo llamar a métodos en hojas que no tienen descendencia.",
    exercise: {
      prompt:
        "Escribe una función recursiva que cuente el número total de nodos en un árbol binario.",
      hint: "Caso base: si node === null retorna 0. En otro caso, retorna 1 + contar(node.left) + contar(node.right).",
      solution: `function contarNodos<T>(node: TreeNode<T> | null): number {
  if (node === null) return 0;
  return 1 + contarNodos(node.left) + contarNodos(node.right);
}`,
    },
  },

  // 9. INTRODUCCIÓN A GRAFOS (GRAPHS)
  {
    id: "grafos",
    name: "Introducción a grafos",
    englishTerm: "Graphs",
    whatIsIt:
      "Una estructura compuesta por un conjunto de vértices o nodos (vertices/nodes) y aristas (edges) que representan conexiones y relaciones arbitrarias entre ellos.",
    whenToUse:
      "Redes sociales (amistades), sistemas de recomendación, mapas de rutas de navegación (GPS), dependencias de paquetes (npm dependency graph) y enrutadores de red.",
    tsCode: `// Representación mediante lista de adyacencia (Adjacency List):
class Graph<T> {
  private adjacencyList = new Map<T, Set<T>>();

  addVertex(vertex: T): void {
    if (!this.adjacencyList.has(vertex)) {
      this.adjacencyList.set(vertex, new Set<T>());
    }
  }

  // Conexión no dirigida entre origen y destino:
  addEdge(source: T, destination: T): void {
    this.addVertex(source);
    this.addVertex(destination);
    this.adjacencyList.get(source)?.add(destination);
    this.adjacencyList.get(destination)?.add(source);
  }

  getNeighbors(vertex: T): Set<T> | undefined {
    return this.adjacencyList.get(vertex);
  }
}

const redSocial = new Graph<string>();
redSocial.addEdge("Ana", "Carlos");
redSocial.addEdge("Carlos", "Beatriz");`,
    jsComparison:
      "En JS se suele usar un objeto plano para grafos ({ Ana: ['Carlos'] }), lo que puede generar errores de claves inexistentes o tipos confusos. En TS tipamos los vértices con genéricos T y garantizamos unicidad de aristas con Set<T>.",
    exercise: {
      prompt:
        "Explica la diferencia entre un grafo dirigido (directed graph) y uno no dirigido (undirected graph) con un ejemplo de la vida real.",
      hint: "Piensa en 'Seguir en Twitter/X' frente a 'Ser amigos en Facebook'.",
      solution:
        "En un grafo no dirigido las relaciones son bidireccionales (ej: 'Amigos en Facebook': si A es amigo de B, B es amigo de A). En un grafo dirigido tienen un sentido único (ej: 'Seguidores en Twitter/X': A puede seguir a B sin que B necesariamente siga a A).",
    },
  },
];
