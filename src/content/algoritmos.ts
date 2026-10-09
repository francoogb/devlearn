// Contenido de la sección /algoritmos — procedimientos básicos de programación.
// Todos los ejemplos incluyen código en JavaScript, explicación paso a paso
// y un ejercicio para practicar.
// Los textos están en español, con los términos técnicos en inglés entre paréntesis.

export interface AlgorithmTopic {
  id: string;
  category: "busqueda" | "ordenamiento" | "recursion" | "complejidad";
  categoryLabel: string;
  title: string;
  englishTerm: string;
  summary: string;
  bigO: {
    time: string; // ej. "O(n)"
    space: string; // ej. "O(1)"
  };
  steps: string[]; // explicación paso a paso
  jsCode: string;
  exercise: {
    question: string;
    hint: string;
    solution: string;
  };
}

export const algorithmTopics: AlgorithmTopic[] = [
  // ---------- BÚSQUEDA ----------
  {
    id: "busqueda-lineal",
    category: "busqueda",
    categoryLabel: "Búsqueda (Searching)",
    title: "Búsqueda lineal",
    englishTerm: "Linear Search",
    summary:
      "Recorre los elementos uno por uno desde el principio hasta el final hasta encontrar el valor buscado o agotar la lista.",
    bigO: {
      time: "O(n)",
      space: "O(1)",
    },
    steps: [
      "Inicia un contador o puntero en el índice 0 del arreglo (array).",
      "Compara el elemento actual con el valor buscado (target).",
      "Si coinciden, retorna el índice inmediatamente.",
      "Si no coinciden, avanza al siguiente elemento.",
      "Si termina el bucle sin encontrarlo, retorna -1.",
    ],
    jsCode: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      return i; // Encontrado en el índice i
    }
  }
  return -1; // No se encontró
}

// Ejemplo:
const numeros = [10, 45, 2, 89, 34];
console.log(linearSearch(numeros, 89)); // 3
console.log(linearSearch(numeros, 99)); // -1`,
    exercise: {
      question:
        "Modifica linearSearch para que en lugar del primer índice, devuelva cuántas veces aparece un elemento repetido en el arreglo.",
      hint: "Usa una variable contador (count) que sume 1 cada vez que coincida en lugar de hacer return inmediato.",
      solution: `function countOccurrences(arr, target) {
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) count++;
  }
  return count;
}`,
    },
  },
  {
    id: "busqueda-binaria",
    category: "busqueda",
    categoryLabel: "Búsqueda (Searching)",
    title: "Búsqueda binaria",
    englishTerm: "Binary Search",
    summary:
      "Busca un elemento dividiendo sucesivamente el arreglo a la mitad. Requiere obligatoriamente que el arreglo esté previamente ordenado (sorted array).",
    bigO: {
      time: "O(log n)",
      space: "O(1)",
    },
    steps: [
      "Establece dos punteros: inicio (left = 0) y fin (right = arr.length - 1).",
      "Calcula el punto medio: mid = Math.floor((left + right) / 2).",
      "Si arr[mid] es igual al objetivo, retorna mid.",
      "Si el objetivo es menor que arr[mid], descarta la mitad derecha: right = mid - 1.",
      "Si el objetivo es mayor que arr[mid], descarta la mitad izquierda: left = mid + 1.",
      "Repite mientras left <= right; si no se encuentra, retorna -1.",
    ],
    jsCode: `function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) {
      return mid; // Elemento encontrado
    } else if (arr[mid] < target) {
      left = mid + 1; // Buscar en la mitad derecha
    } else {
      right = mid - 1; // Buscar en la mitad izquierda
    }
  }

  return -1; // No existe en el arreglo
}

// Requiere arreglo ordenado:
const ordenados = [3, 8, 14, 27, 33, 50, 72];
console.log(binarySearch(ordenados, 33)); // 4`,
    exercise: {
      question:
        "¿Qué ocurriría si ejecutas binarySearch sobre un arreglo desordenado como [50, 10, 40, 20] buscando 10? ¿Garantiza el resultado?",
      hint: "Piensa en qué condición asume el algoritmo cuando decide descartar una mitad.",
      solution:
        "No garantiza el resultado correcto. Al no estar ordenado, descartará incorrectamente mitades que podrían contener el elemento, retornando posiblemente -1 aunque el elemento sí esté en la lista.",
    },
  },

  // ---------- ORDENAMIENTO ----------
  {
    id: "ordenamiento-burbuja",
    category: "ordenamiento",
    categoryLabel: "Ordenamiento (Sorting)",
    title: "Ordenamiento burbuja",
    englishTerm: "Bubble Sort",
    summary:
      "Compara pares de elementos adyacentes repetidamente y los intercambia si están en el orden incorrecto. Los elementos más grandes 'flotan' como burbujas hacia el final.",
    bigO: {
      time: "O(n²)",
      space: "O(1)",
    },
    steps: [
      "Recorre el arreglo con un bucle exterior n veces.",
      "En el bucle interior, compara arr[j] con arr[j + 1].",
      "Si arr[j] > arr[j + 1], intercambia (swap) sus posiciones.",
      "Al finalizar cada pasada, el elemento más grande queda fijado al final.",
      "Optimización: si en una pasada completa no hubo intercambios, el arreglo ya está ordenado.",
    ],
    jsCode: `function bubbleSort(arr) {
  const n = arr.length;
  const copia = [...arr]; // Evitamos mutar el arreglo original

  for (let i = 0; i < n - 1; i++) {
    let huboIntercambio = false;

    for (let j = 0; j < n - 1 - i; j++) {
      if (copia[j] > copia[j + 1]) {
        // Intercambio (swap) usando desestructuración
        [copia[j], copia[j + 1]] = [copia[j + 1], copia[j]];
        huboIntercambio = true;
      }
    }

    if (!huboIntercambio) break; // Ya está ordenado
  }

  return copia;
}

console.log(bubbleSort([64, 34, 25, 12, 22, 11, 90]));
// [11, 12, 22, 25, 34, 64, 90]`,
    exercise: {
      question:
        "¿Por qué el bucle interior recorre hasta 'n - 1 - i' en lugar de hasta 'n - 1'?",
      hint: "Observa dónde termina el número más grande después de la primera iteración del bucle exterior.",
      solution:
        "Porque tras cada iteración 'i', los últimos 'i' elementos ya están en su posición final definitiva ordenada, por lo que no es necesario volver a compararlos.",
    },
  },
  {
    id: "ordenamiento-seleccion",
    category: "ordenamiento",
    categoryLabel: "Ordenamiento (Sorting)",
    title: "Ordenamiento por selección",
    englishTerm: "Selection Sort",
    summary:
      "Encuentra repetidamente el elemento mínimo de la parte no ordenada y lo coloca al inicio de esa sección.",
    bigO: {
      time: "O(n²)",
      space: "O(1)",
    },
    steps: [
      "Divide conceptualmente el arreglo en una sublista ordenada (al inicio) y una no ordenada.",
      "Busca el índice del valor mínimo en la sublista no ordenada.",
      "Intercambia el elemento mínimo con el primer elemento de la sublista no ordenada.",
      "Avanza la frontera de la sublista ordenada una posición hacia la derecha.",
      "Repite hasta que todo el arreglo quede ordenado.",
    ],
    jsCode: `function selectionSort(arr) {
  const copia = [...arr];
  const n = copia.length;

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    for (let j = i + 1; j < n; j++) {
      if (copia[j] < copia[minIdx]) {
        minIdx = j; // Nuevo mínimo encontrado
      }
    }

    if (minIdx !== i) {
      [copia[i], copia[minIdx]] = [copia[minIdx], copia[i]];
    }
  }

  return copia;
}

console.log(selectionSort([29, 10, 14, 37, 13]));
// [10, 13, 14, 29, 37]`,
    exercise: {
      question:
        "¿Cuántos intercambios (swaps) hace selectionSort como máximo en un arreglo de longitud n?",
      hint: "Fíjate cuántas veces se ejecuta el intercambio en relación con el bucle exterior.",
      solution:
        "Hace como máximo n - 1 intercambios en total (a lo sumo un swap por cada pasada del bucle exterior), lo cual es mucho menor que bubble sort aunque su tiempo de comparaciones siga siendo O(n²).",
    },
  },
  {
    id: "ordenamiento-insercion",
    category: "ordenamiento",
    categoryLabel: "Ordenamiento (Sorting)",
    title: "Ordenamiento por inserción",
    englishTerm: "Insertion Sort",
    summary:
      "Construye el arreglo ordenado de a un elemento a la vez, tomando cada elemento e insertándolo en su posición correcta dentro de la parte ya ordenada (como ordenar cartas en la mano).",
    bigO: {
      time: "O(n²)",
      space: "O(1)",
    },
    steps: [
      "Asume que el primer elemento (índice 0) ya está ordenado.",
      "Toma el siguiente elemento (clave o actual).",
      "Compara hacia atrás con los elementos ya ordenados.",
      "Desplaza los elementos mayores una posición hacia la derecha.",
      "Inserta la clave en el espacio liberado.",
      "Repite para todos los elementos restantes.",
    ],
    jsCode: `function insertionSort(arr) {
  const copia = [...arr];

  for (let i = 1; i < copia.length; i++) {
    const clave = copia[i];
    let j = i - 1;

    // Desplazar elementos mayores que la clave
    while (j >= 0 && copia[j] > clave) {
      copia[j + 1] = copia[j];
      j--;
    }

    copia[j + 1] = clave;
  }

  return copia;
}

console.log(insertionSort([12, 11, 13, 5, 6]));
// [5, 6, 11, 12, 13]`,
    exercise: {
      question:
        "¿Cuál es la complejidad temporal de insertionSort en el mejor caso (cuando el arreglo ya está ordenado)?",
      hint: "¿Cuántas veces se ejecuta el while interno si ningún elemento previo es mayor que la clave?",
      solution:
        "O(n) en el mejor caso. El bucle while nunca entra porque copia[j] > clave siempre es falso, requiriendo solo una comparación por elemento.",
    },
  },

  // ---------- RECURSIÓN ----------
  {
    id: "recursion-factorial",
    category: "recursion",
    categoryLabel: "Recursión (Recursion)",
    title: "Recursión: Factorial",
    englishTerm: "Factorial (Recursion)",
    summary:
      "Una función recursiva se llama a sí misma para resolver subproblemas más pequeños. El factorial de n (n!) es n * (n - 1)! con caso base en n <= 1.",
    bigO: {
      time: "O(n)",
      space: "O(n) por la pila de llamadas (call stack)",
    },
    steps: [
      "Define el caso base (base case): si n <= 1, retorna 1 (evita recursión infinita).",
      "Define el paso recursivo (recursive step): retorna n * factorial(n - 1).",
      "Cada llamada se apila en la pila de llamadas (call stack) hasta alcanzar el caso base.",
      "Luego se desapilan resolviendo la multiplicación en reversa.",
    ],
    jsCode: `function factorial(n) {
  // Caso base (base case)
  if (n <= 1) return 1;

  // Paso recursivo (recursive step)
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 5 * 4 * 3 * 2 * 1 = 120`,
    exercise: {
      question:
        "¿Qué ocurre si ejecutas factorial(-3) con la implementación actual? ¿Cómo lo protegerías?",
      hint: "Revisa qué pasa cuando los números negativos restan -1 indefinidamente.",
      solution: `function factorialSeguro(n) {
  if (n < 0) throw new Error("El factorial no está definido para números negativos");
  if (n <= 1) return 1;
  return n * factorialSeguro(n - 1);
}`,
    },
  },
  {
    id: "recursion-fibonacci",
    category: "recursion",
    categoryLabel: "Recursión (Recursion)",
    title: "Recursión: Secuencia de Fibonacci",
    englishTerm: "Fibonacci Sequence",
    summary:
      "Calcula el n-ésimo término de la secuencia donde cada número es la suma de los dos anteriores: F(n) = F(n-1) + F(n-2).",
    bigO: {
      time: "O(2ⁿ) en versión ingenua / O(n) con memorización (memoization)",
      space: "O(n) en el call stack",
    },
    steps: [
      "Casos base: fibonacci(0) = 0 y fibonacci(1) = 1.",
      "Paso recursivo: fibonacci(n) = fibonacci(n - 1) + fibonacci(n - 2).",
      "Nota pedagógica: la versión ingenua recalcula ramas idénticas repetidas veces (árbol binario de llamadas).",
    ],
    jsCode: `// Versión recursiva clásica:
function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Versión optimizada con memorización (memoization):
function fibMemo(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 0) return 0;
  if (n === 1) return 1;

  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}

console.log(fibonacci(7)); // 13
console.log(fibMemo(40));   // 102334155 (instantáneo)`,
    exercise: {
      question:
        "¿Por qué fibonacci(50) se congela en la versión ingenua pero responde de inmediato con fibMemo?",
      hint: "Calcula cuántas operaciones requiere 2⁵⁰ frente a 50 operaciones.",
      solution:
        "Porque la versión ingenua genera 2⁵⁰ (~1.125 billones) de llamadas a funciones calculando los mismos valores una y otra vez. La memorización guarda cada resultado en un objeto (hash map) reduciendo las operaciones a solo O(n).",
    },
  },
  {
    id: "recursion-suma-arreglo",
    category: "recursion",
    categoryLabel: "Recursión (Recursion)",
    title: "Recursión: Suma de elementos de un arreglo",
    englishTerm: "Array Sum (Recursion)",
    summary:
      "Suma todos los números de un arreglo dividiendo el problema en: primer elemento + la suma del resto del arreglo.",
    bigO: {
      time: "O(n)",
      space: "O(n) de profundidad en el stack",
    },
    steps: [
      "Caso base: si el arreglo está vacío (arr.length === 0), la suma es 0.",
      "Paso recursivo: toma el primer elemento (arr[0]) y súmale la suma del resto (arr.slice(1)).",
      "Alternativa eficiente: pasar un índice actual en vez de clonar con slice.",
    ],
    jsCode: `function sumaArreglo(arr, index = 0) {
  // Caso base: llegamos al final del arreglo
  if (index >= arr.length) return 0;

  // Paso recursivo: elemento actual + suma del resto
  return arr[index] + sumaArreglo(arr, index + 1);
}

console.log(sumaArreglo([2, 4, 6, 8])); // 20`,
    exercise: {
      question:
        "Escribe una función recursiva similar que calcule el valor MÁXIMO de un arreglo.",
      hint: "Caso base: si index === arr.length - 1, retorna arr[index]. Compara con Math.max.",
      solution: `function maxArreglo(arr, index = 0) {
  if (index === arr.length - 1) return arr[index];
  return Math.max(arr[index], maxArreglo(arr, index + 1));
}`,
    },
  },

  // ---------- COMPLEJIDAD (BIG O) ----------
  {
    id: "complejidad-big-o",
    category: "complejidad",
    categoryLabel: "Complejidad Algorítmica (Big O)",
    title: "Complejidad básica: O(1), O(n), O(log n) y O(n²)",
    englishTerm: "Big O Notation",
    summary:
      "La notación Big O describe cómo escalan el tiempo de ejecución (time complexity) y el uso de memoria (space complexity) a medida que el tamaño de entrada (n) crece.",
    bigO: {
      time: "Desde O(1) hasta O(n²)",
      space: "Variables auxiliares",
    },
    steps: [
      "O(1) Tiempo Constante (Constant Time): no depende de n. Ej: acceder a arr[0] o leer una propiedad de objeto.",
      "O(log n) Tiempo Logarítmico (Logarithmic Time): divide el problema a la mitad en cada paso. Ej: búsqueda binaria.",
      "O(n) Tiempo Lineal (Linear Time): recorre los n elementos una vez. Ej: bucle for simple, búsqueda lineal.",
      "O(n²) Tiempo Cuadrático (Quadratic Time): bucles anidados donde por cada elemento se recorren todos los demás. Ej: bubble sort.",
    ],
    jsCode: `// 1. O(1) - Constante:
function primerElemento(arr) {
  return arr[0]; // Tiempo idéntico con 10 o 10,000,000 elementos
}

// 2. O(log n) - Logarítmico:
// Cada iteración duplica o divide el espacio de búsqueda (Binary Search).

// 3. O(n) - Lineal:
function imprimirTodos(arr) {
  for (const item of arr) {
    console.log(item);
  }
}

// 4. O(n²) - Cuadrático:
function imprimirPares(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      console.log(arr[i], arr[j]);
    }
  }
}`,
    exercise: {
      question:
        "Si una función tiene dos bucles for separados (uno después del otro, NO anidados), ¿cuál es su complejidad Big O?",
      hint: "Suma O(n) + O(n). ¿Qué pasa con las constantes en Big O?",
      solution:
        "Es O(n). O(n) + O(n) = O(2n), y en la notación Big O las constantes se descartan, resultando en tiempo lineal O(n).",
    },
  },
];
