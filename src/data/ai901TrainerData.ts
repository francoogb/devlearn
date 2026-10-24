export interface TrainerQuestion {
  id: number;
  module: string;
  category: "NLP" | "Voz" | "Visión" | "Documentos" | "RAG" | "Fundamentos";
  question: string;
  options: {
    id: string;
    text: string;
  }[];
  correctId: string;
  keywordHint: string;
  explanation: string;
}

export const trainerQuestions: TrainerQuestion[] = [
  // 1. NLP
  {
    id: 1,
    module: "Módulo 3: NLP",
    category: "NLP",
    question:
      "Una empresa necesita preparar grandes volúmenes de texto libre antes de procesarlos con un modelo de IA. El equipo necesita dividir oraciones completas en fragmentos mínimos y manejables. ¿Qué técnica deben aplicar?",
    options: [
      { id: "A", text: "Lematización" },
      { id: "B", text: "Tokenización" },
      { id: "C", text: "Etiquetado POS" },
      { id: "D", text: "Derivación (Stemming)" },
    ],
    correctId: "B",
    keywordHint: "Dividir en partes más pequeñas / trocear",
    explanation:
      "La tokenización es el proceso fundamental de fragmentar el texto continuo en unidades individuales (tokens o palabras) para que puedan ser analizadas.",
  },
  {
    id: 2,
    module: "Módulo 3: NLP",
    category: "NLP",
    question:
      "Quieres calcular la relevancia de palabras clave en un artículo comparándolo con una biblioteca completa de miles de documentos, reduciendo el peso de palabras comunes como 'el' o 'de' y premiando términos verdaderamente distintivos. ¿Qué técnica estadística debes usar?",
    options: [
      { id: "A", text: "Bag-of-Words" },
      { id: "B", text: "TextRank" },
      { id: "C", text: "TF-IDF" },
      { id: "D", text: "Extracción de N-gramas" },
    ],
    correctId: "C",
    keywordHint: "Comparar un documento contra una colección grande / frecuencia inversa",
    explanation:
      "TF-IDF (Term Frequency - Inverse Document Frequency) premia las palabras raras y específicas de un documento castigando aquellas que aparecen en toda la biblioteca.",
  },
  {
    id: 3,
    module: "Módulo 3: NLP",
    category: "NLP",
    question:
      "En una aplicación legal se requiere reducir las palabras flexionadas ('estudiando', 'estudió') a su forma base oficial del diccionario ('estudiar') garantizando que el resultado sea siempre una palabra gramaticalmente válida. ¿Qué técnica es preferible?",
    options: [
      { id: "A", text: "Derivación (Stemming)" },
      { id: "B", text: "Lematización" },
      { id: "C", text: "Normalización por minúsculas" },
      { id: "D", text: "Segmentación de N-gramas" },
    ],
    correctId: "B",
    keywordHint: "Forma base real de diccionario vs recorte mecánico",
    explanation:
      "La lematización recurre a reglas lingüísticas y diccionarios para obtener el lema real. El stemming solo recorta sufijos y a menudo inventa raíces inexistentes.",
  },

  // 2. Voz
  {
    id: 4,
    module: "Módulo 4: Voz",
    category: "Voz",
    question:
      "En un sistema de reconocimiento de voz (STT), se capturan ventanas de audio de 20 a 30 ms para extraer coeficientes que imitan la respuesta perceptual del oído humano, aislando la huella espectral útil. ¿Qué técnica se está utilizando?",
    options: [
      { id: "A", text: "Beam Search (Búsqueda por haz)" },
      { id: "B", text: "Extracción de MFCC" },
      { id: "C", text: "Vocoder neuronal" },
      { id: "D", text: "Análisis fonético G2P" },
    ],
    correctId: "B",
    keywordHint: "Oído humano / ventanas cortas / extracción de vectores en STT",
    explanation:
      "Los coeficientes MFCC (Mel-Frequency Cepstral Coefficients) extraen las frecuencias clave del audio imitando el oído humano en la fase de preprocesamiento de STT.",
  },
  {
    id: 5,
    module: "Módulo 4: Voz",
    category: "Voz",
    question:
      "Durante la transcripción de audio, el sistema duda si el usuario dijo 'Voy a caza' o 'Voy a casa'. Ambos términos suenan idénticos (homófonos). ¿Qué componente del pipeline decide la palabra correcta según las palabras vecinas?",
    options: [
      { id: "A", text: "Modelado acústico" },
      { id: "B", text: "Modelado de lenguaje" },
      { id: "C", text: "Captura digital a 16 kHz" },
      { id: "D", text: "Generación de prosodia" },
    ],
    correctId: "B",
    keywordHint: "Homófonos / contexto gramatical / palabras vecinas",
    explanation:
      "El modelo acústico solo sabe cómo suena el fonema; el modelo de lenguaje aplica reglas gramaticales y probabilidad contextual para decidir la palabra correcta.",
  },
  {
    id: 6,
    module: "Módulo 4: Voz",
    category: "Voz",
    question:
      "Al sintetizar voz a partir de texto (TTS), una aplicación ajusta el tono, ritmo, pausas y velocidad para transmitir sorpresa en una oración con signos de exclamación. ¿Qué fase del pipeline es responsable de esta modulación humana?",
    options: [
      { id: "A", text: "Normalización de texto" },
      { id: "B", text: "Generación de prosodia" },
      { id: "C", text: "Descodificación por haz" },
      { id: "D", text: "Extracción de fonemas" },
    ],
    correctId: "B",
    keywordHint: "Ritmo, entonación, emoción, cadencia",
    explanation:
      "La prosodia define la musicalidad, inflexión, volumen y emoción del habla humana para evitar que suene monótono o robótico.",
  },
  {
    id: 7,
    module: "Módulo 4: Voz",
    category: "Voz",
    question:
      "En síntesis de voz moderna, un modelo genera primero un espectrograma de Mel como representación visual intermedia de frecuencias. ¿Qué componente toma ese espectrograma y lo convierte en la onda de sonido física final?",
    options: [
      { id: "A", text: "Vocoder" },
      { id: "B", text: "Conversor G2P" },
      { id: "C", text: "Filtro MFCC" },
      { id: "D", text: "Tokenizador de voz" },
    ],
    correctId: "A",
    keywordHint: "De espectrograma a onda de audio física",
    explanation:
      "El Vocoder (neuronal) actúa como el parlante virtual que sintetiza la onda de presión sonora (audio real) a partir del mapa de frecuencias del espectrograma.",
  },

  // 3. Computer Vision
  {
    id: 8,
    module: "Módulo 5: Visión",
    category: "Visión",
    question:
      "¿Cuál es la unidad matemática y visual fundamental en la que se basan los algoritmos de visión por computadora para manipular, aplicar filtros y clasificar una imagen?",
    options: [
      { id: "A", text: "Vectores de texto" },
      { id: "B", text: "Píxeles" },
      { id: "C", text: "Fonemas" },
      { id: "D", text: "Espectrogramas" },
    ],
    correctId: "B",
    keywordHint: "Unidad mínima / cuadrícula numérica de la imagen",
    explanation:
      "Las computadoras perciben las imágenes como cuadrículas bidimensionales de números denominados píxeles (con valores de color e intensidad).",
  },
  {
    id: 9,
    module: "Módulo 5: Visión",
    category: "Visión",
    question:
      "¿Cuál es el rol principal de las capas de filtros (kernels) en una red neuronal convolucional (CNN) para visión?",
    options: [
      { id: "A", text: "Comprimir el archivo JPEG para ahorrar almacenamiento en disco" },
      { id: "B", text: "Extraer características numéricas progresivas de la imagen (bordes, texturas, formas)" },
      { id: "C", text: "Generar subtítulos en lenguaje natural mediante prompts" },
      { id: "D", text: "Convertir audio en ondas sinusoidales" },
    ],
    correctId: "B",
    keywordHint: "Extracción jerárquica de características numéricas",
    explanation:
      "En una CNN, los filtros convolucionales se deslizan sobre la matriz de píxeles para extraer características numéricas que la red utiliza para clasificar o detectar objetos.",
  },
  {
    id: 10,
    module: "Módulo 5: Visión",
    category: "Visión",
    question:
      "Un desarrollador necesita un modelo de IA capaz de recibir una fotografía de un motor, analizar sus partes y responder preguntas escritas en texto sobre posibles fallas mecánicas. ¿Qué tipo de arquitectura hace posible esta interacción conjunta?",
    options: [
      { id: "A", text: "Clasificador Bag-of-Words" },
      { id: "B", text: "Modelo multimodal con Vision Transformers (ViT)" },
      { id: "C", text: "Filtro de audio MFCC" },
      { id: "D", text: "Algoritmo de lematización" },
    ],
    correctId: "B",
    keywordHint: "Unir imagen y texto simultáneamente / multimodal",
    explanation:
      "Los modelos multimodales (basados en Vision Transformers y LLMs) procesan tanto imágenes como lenguaje natural de forma unificada para razonar sobre ambos.",
  },
  {
    id: 11,
    module: "Módulo 5: Visión",
    category: "Visión",
    question:
      "Una herramienta de generación de imágenes por IA recibe el prompt 'astronauta montando a caballo en Marte' y genera la imagen empezando con una matriz de ruido aleatorio que se va limpiando paso a paso. ¿Qué técnica describe este proceso?",
    options: [
      { id: "A", text: "Modelo de Difusión" },
      { id: "B", text: "Segmentación semántica" },
      { id: "C", text: "Reconocimiento OCR" },
      { id: "D", text: "Beam Search" },
    ],
    correctId: "A",
    keywordHint: "Generar imagen limpiando ruido aleatorio paso a paso",
    explanation:
      "Los modelos de difusión aprenden a eliminar ruido de forma gradual y controlada para sintetizar imágenes nuevas de alta fidelidad guiadas por texto.",
  },

  // 4. Extracción de Información
  {
    id: 12,
    module: "Módulo 6: Documentos",
    category: "Documentos",
    question:
      "Una empresa recibe miles de facturas escaneadas en papel. ¿Qué tecnología específica se encarga de convertir las imágenes de esos caracteres impresos en datos de texto legibles y editables por máquina?",
    options: [
      { id: "A", text: "OCR (Reconocimiento Óptico de Caracteres)" },
      { id: "B", text: "Chunking vectorial" },
      { id: "C", text: "Prosodia neuronal" },
      { id: "D", text: "Stemming de documentos" },
    ],
    correctId: "A",
    keywordHint: "Imagen escaneada a texto editable digital",
    explanation:
      "El OCR actúa como los ojos del sistema, examinando imágenes y convirtiendo los píxeles de letras en texto digital codificado.",
  },
  {
    id: 13,
    module: "Módulo 6: Documentos",
    category: "Documentos",
    question:
      "Una vez que el OCR extrae todo el texto plano de un recibo, ¿cómo ayuda la IA generativa / modelo semántico en la solución?",
    options: [
      { id: "A", text: "Imprimiendo el recibo físicamente con mayor resolución" },
      { id: "B", text: "Emparejando y asignando con precisión los valores extraídos a los campos correctos (Total, Fecha, Proveedor)" },
      { id: "C", text: "Eliminando la necesidad de usar computadoras" },
      { id: "D", text: "Traduciendo el texto únicamente a código binario" },
    ],
    correctId: "B",
    keywordHint: "Mapeo inteligente de valores a campos de datos",
    explanation:
      "La IA generativa y los modelos de lenguaje entienden el contexto semántico del documento para discernir qué número corresponde al campo 'Total' y cuál a la 'Fecha'.",
  },

  // 5. RAG
  {
    id: 14,
    module: "Módulo 7: RAG",
    category: "RAG",
    question:
      "¿Cuál es el propósito principal del patrón arquitectónico RAG (Retrieval-Augmented Generation)?",
    options: [
      { id: "A", text: "Entrenar un modelo base desde cero usando billones de parámetros" },
      { id: "B", text: "Fundamentar las respuestas generadas en información pertinente recuperada de un origen de datos externo y confiable" },
      { id: "C", text: "Aumentar la velocidad del ventilador del procesador" },
      { id: "D", text: "Sustituir el texto por síntesis de voz exclusivamente" },
    ],
    correctId: "B",
    keywordHint: "Fundamentar respuestas / mitigar alucinaciones con datos externos",
    explanation:
      "RAG combina recuperación de información con generación de LLMs para responder con base en datos reales, privados y actualizados, evitando alucinaciones.",
  },
  {
    id: 15,
    module: "Módulo 7: RAG",
    category: "RAG",
    question:
      "En una solución RAG, ¿por qué los manuales de políticas empresariales extensos se dividen en fragmentos pequeños (chunking) antes de indexarse?",
    options: [
      { id: "A", text: "Porque los modelos de IA no saben leer archivos de más de una página" },
      { id: "B", text: "Para recuperar pasajes relevantes que quepan de forma eficiente en el prompt sin desbordar el contexto" },
      { id: "C", text: "Para eliminar los signos de puntuación del documento" },
      { id: "D", text: "Para convertir el texto a formato de imagen PNG" },
    ],
    correctId: "B",
    keywordHint: "Pasajes que quepan de forma eficiente en el prompt",
    explanation:
      "El chunking divide documentos grandes en fragmentos específicos para que el sistema inyecte en el prompt únicamente la porción relevante de contexto.",
  },
  {
    id: 16,
    module: "Módulo 7: RAG",
    category: "RAG",
    question:
      "¿Qué representa una incrustación (embedding) en una solución de búsqueda y recuperación semántica?",
    options: [
      { id: "A", text: "Un archivo de audio en formato MP3" },
      { id: "B", text: "Un vector numérico que captura las características semánticas y el significado del contenido" },
      { id: "C", text: "Una lista de sinónimos guardada en un archivo de texto plano" },
      { id: "D", text: "Un filtro de censura de palabras prohibidas" },
    ],
    correctId: "B",
    keywordHint: "Vector numérico con características semánticas",
    explanation:
      "Un embedding es una serie de números (vector) en un espacio multidimensional donde los conceptos similares quedan ubicados a corta distancia matemática.",
  },
  {
    id: 17,
    module: "Módulo 7: RAG",
    category: "RAG",
    question:
      "Un usuario busca 'gastos de viaje de negocios' y el sistema encuentra un documento titulado 'costos de traslados de la empresa', a pesar de que casi no comparten palabras exactas. ¿Qué tipo de búsqueda hace posible esto?",
    options: [
      { id: "A", text: "Búsqueda por coincidencia exacta de subcadenas" },
      { id: "B", text: "Búsqueda semántica de vectores" },
      { id: "C", text: "Ordenamiento alfabético simple" },
      { id: "D", text: "Detección de prefijos mediante expresiones regulares" },
    ],
    correctId: "B",
    keywordHint: "Búsqueda semántica de vectores (afinidad conceptual)",
    explanation:
      "La búsqueda semántica vectorial compara la distancia entre los embeddings de la consulta y de los documentos, identificando significado equivalente aunque las palabras sean diferentes.",
  },
  {
    id: 18,
    module: "Módulo 7: RAG",
    category: "RAG",
    question:
      "Un asistente con RAG responde con una redacción impecable y fluida, pero afirma erróneamente que los empleados tienen 5 días de vacaciones en vez de 15. ¿Qué se debe examinar primero en la arquitectura?",
    options: [
      { id: "A", text: "Cambiar de inmediato el monitor del usuario" },
      { id: "B", text: "Comprobar si el pasaje de directiva correcto y actual fue recuperado e inyectado como contexto en el prompt" },
      { id: "C", text: "Reinstalar la tarjeta gráfica del servidor" },
      { id: "D", text: "Apagar el modelo generativo de por vida" },
    ],
    correctId: "B",
    keywordHint: "Verificar si se recuperó el pasaje correcto y actual",
    explanation:
      "Si la respuesta es fluida pero el dato fáctico es incorrecto, el fallo suele estar en la fase de recuperación (se inyectó un documento desactualizado o erróneo).",
  },
];
