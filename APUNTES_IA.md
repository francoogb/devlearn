# Apuntes: Introducción a los Conceptos de IA (Microsoft)

Curso: ruta de aprendizaje oficial de Microsoft ("Introducción a los conceptos de IA").
Relacionado con la certificación AI-901 (ver `src/content/ai901.ts`).

---

## Unidad 1. Introducción a la Inteligencia Artificial

- Fundamentos sobre qué es la inteligencia artificial (AI).
- Cómo simula capacidades humanas para resolver problemas y automatizar procesos.

## Unidad 2. Inteligencia artificial y agentes generativos

- Modelos capaces de **generar contenido nuevo** (texto, código, imágenes) a partir de instrucciones.
- Sirven como asistentes y **agentes conversacionales**.

## Unidad 3. Procesamiento de Lenguaje Natural (PLN / NLP)

- Permite a las computadoras entender, analizar y generar lenguaje humano.
- **Análisis de sentimientos**: evaluación de opiniones y tono emocional (positivo, negativo, neutro).
- **Extracción de términos clave (Key Phrase Extraction)**: localización de conceptos e ideas centrales.
- **Reconocimiento de entidades nombradas (NER)**: identificación de nombres, lugares, organizaciones y fechas.
- **Detección y censura de PII**: protección de información de identificación personal para cumplimiento y privacidad.

## Unidad 4. Traducción de Idiomas y Speech (Discurso)

- **Traducción automática**: traducción de texto entre decenas de lenguas preservando el contexto.
- **Voz a texto (Speech-to-Text)**: transcripción rápida de audio humano a texto escrito.
- **Texto a voz (Text-to-Speech)**: conversión de información escrita en voz natural sintetizada.
- Aplicaciones clave: accesibilidad universal, subtitulado en tiempo real y asistentes virtuales.

## Unidad 5. Visión por ordenador (Computer Vision)

- **Clasificación de imágenes**: predicción de la etiqueta o asunto principal de una imagen.
- **Detección de objetos**: localización de elementos específicos marcándolos con cuadros (bounding boxes).
- **Segmentación semántica**: identificación precisa a nivel de **píxeles** de los objetos detectados.
- **Modelos multimodales**: combinación de elementos visuales y texto para generar explicaciones completas.

## Unidad 6. Modelos de Lenguaje Grande (LLMs) y Azure OpenAI

- Modelos generativos avanzados (GPT-4o, Codex) capaces de redactar, resumir, escribir código y mantener conversaciones complejas.
- **Ingeniería de prompts**: diseño de instrucciones claras, definición de roles en el sistema (system prompt) y ejemplos guiados.
- **Control de parámetros**: ajuste de temperatura (creatividad vs determinismo), top_p y ventana de tokens.
- Despliegue empresarial seguro con las garantías corporativas de Azure OpenAI Service.

## Unidad 7. IA Generativa Responsable y Mejores Prácticas

- Los 6 principios éticos de Microsoft: **Equidad, Confiabilidad y Seguridad, Privacidad y Seguridad, Inclusión, Transparencia y Responsabilidad**.
- Gestión activa de riesgos: prevención de alucinaciones, fuga de datos sensibles y ataques de prompt injection.
- Mitigación de sesgos algorítmicos.
- **Barandillas de seguridad (Content Filters)**: Azure AI Content Safety para detección y bloqueo de contenido nocivo o infractor.

---

## 📌 Resumen Breve y Consolidado de Todo lo Visto

La ruta de Microsoft AI-901 estructura la inteligencia artificial moderna en tres grandes pilares integrados:

1. **Percepción & Lenguaje (Computer Vision, Speech y NLP):** Capacidades para percibir el mundo físico y digital: ver (clasificación, detección y segmentación de imágenes), escuchar/hablar (Speech-to-Text y Text-to-Speech) y comprender el lenguaje humano (análisis de sentimiento, extracción de entidades clave y traducción automática).
2. **Generación & Razonamiento (LLMs con Azure OpenAI):** Modelos fundacionales que van más allá del análisis tradicional, permitiendo crear texto, resumir, razonar y autogenerar código gobernados mediante ingeniería de prompts y calibración de parámetros.
3. **Gobernanza & IA Responsable:** Toda solución de IA debe implementar filtros de contenido activos (Content Filters), protección de PII, mitigación de sesgos y adherencia estricta a los 6 principios éticos para garantizar sistemas justos, transparentes y seguros.

---

## Próximo paso

- **Laboratorios Prácticos en Microsoft Foundry y Simulador de Examen AI-901**.

