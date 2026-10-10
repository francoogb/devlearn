// Contenido de la sección /nestjs — Fundamentos de NestJS para el backend.
// Mismo formato pedagógico que /fundamentos: analogía cotidiana, explicación
// con términos en inglés, diagrama de flujo paso a paso, código real
// (tomado del backend de este propio proyecto, carpeta backend/) y mini quiz.

export interface FlowStep {
  label: string;
  type: "start" | "process" | "decision" | "end" | "api_req" | "api_res";
  detail?: string;
}

export interface NestjsConcept {
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

export const nestjsConcepts: NestjsConcept[] = [
  // 1. ¿QUÉ ES NESTJS?
  {
    id: "que-es-nestjs",
    title: "¿Qué es NestJS?",
    englishTerm: "What is NestJS?",
    tag: "NestJS 01",
    icon: "layers",
    analogy:
      "Construir un backend solo con Node.js puro es como cocinar con ingredientes sueltos: tienes todo, pero decides TÚ cada paso. NestJS es como un kit de cocina con instrucciones: los recipientes (estructura de carpetas), los tiempos (convenciones) y el orden ya vienen decididos. Tú solo pones la receta (tu lógica).",
    explanation:
      "NestJS es un framework (marco de trabajo) para construir aplicaciones de servidor (backend) con Node.js y TypeScript. A diferencia de Express, que es minimalista y te deja decidir todo, NestJS es 'opinado': impone una arquitectura organizada en módulos, controladores y servicios. Eso significa que cualquier equipo de NestJS encuentra las cosas en el mismo sitio, y eso escala bien en proyectos grandes y en empresas.",
    flowTitle: "Diagrama de Flujo: Dónde vive NestJS en tu aplicación",
    flowSteps: [
      { label: "El usuario abre una página en el navegador", type: "start", detail: "localhost:3000/progreso" },
      { label: "Next.js (frontend) necesita datos", type: "process", detail: "Server Component hace fetch()" },
      { label: "Petición HTTP al backend", type: "api_req", detail: "GET /api/progreso" },
      { label: "NestJS recibe, procesa y responde JSON", type: "process", detail: "controller → service → JSON" },
      { label: "Next.js pinta la página con los datos", type: "api_res", detail: "status 200 + body JSON" },
    ],
    codeExample: {
      language: "TypeScript (NestJS)",
      code: `// backend/src/main.ts — El punto de entrada de TODO backend NestJS
import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api"); // todos los endpoints bajo /api/...
  await app.listen(3001);     // el backend escucha en su propio puerto
}

bootstrap();`,
      description: "El frontend (Next.js, puerto 3000) y el backend (NestJS, puerto 3001) son procesos independientes que se hablan por HTTP.",
    },
    exercise: {
      question: "¿Sobre qué tecnología corre NestJS?",
      options: [
        "Solo sobre el navegador, como React.",
        "Sobre Node.js, en el servidor.",
        "Sobre Python, como Django.",
      ],
      correctIndex: 1,
      explanation: "NestJS es un framework de Node.js: corre en el servidor, no en el navegador. TypeScript se compila a JavaScript y lo ejecuta Node.",
    },
  },

  // 2. MÓDULOS
  {
    id: "modulos",
    title: "Módulos (Modules)",
    englishTerm: "Modules",
    tag: "NestJS 02",
    icon: "widgets",
    analogy:
      "Un módulo es como un cajón de un archivador: el cajón de 'facturas' contiene todo lo de facturas, el de 'clientes' lo de clientes. Si necesitas algo de facturas, abres ESE cajón. En NestJS, cada funcionalidad de tu app (usuarios, progreso, pagos) vive en su propio módulo, con sus archivos dentro.",
    explanation:
      "Un módulo es una clase con el decorador @Module() que agrupa lo que una funcionalidad necesita: controladores (routes), servicios (lógica) e incluso otros módulos. Todo arranca en el AppModule (módulo raíz), que importa los demás. NestJS lee estos decoradores al arrancar y conecta todo el grafo de dependencias automáticamente.",
    flowTitle: "Diagrama de Flujo: Cómo NestJS arranca los módulos",
    flowSteps: [
      { label: "Arranca: node dist/main.js", type: "start", detail: "npm run start:dev" },
      { label: "Lee AppModule (la raíz)", type: "process", detail: "@Module({ imports: [...] })" },
      { label: "¿Hay más módulos importados?", type: "decision", detail: "ProgresoModule, UsersModule..." },
      { label: "Registra rutas y servicios de cada módulo", type: "process", detail: "ProgresoController → /api/progreso" },
      { label: "Servidor listo para recibir peticiones", type: "end", detail: "Escuchando en :3001" },
    ],
    codeExample: {
      language: "TypeScript (NestJS)",
      code: `// backend/src/app.module.ts — La raíz: aquí se "enchufan" los módulos
import { Module } from "@nestjs/common";
import { ProgresoModule } from "./progreso/progreso.module";

@Module({
  imports: [ProgresoModule], // ← cada funcionalidad nueva se añade aquí
})
export class AppModule {}

// backend/src/progreso/progreso.module.ts — Un módulo concreto
@Module({
  controllers: [ProgresoController], // la "recepción" (rutas HTTP)
  providers: [ProgresoService],     // la "cocina" (lógica y datos)
})
export class ProgresoModule {}`,
      description: "Regla práctica: una funcionalidad = una carpeta = un módulo. Nuestro backend tiene de momento solo ProgresoModule.",
    },
    exercise: {
      question: "¿Dónde se 'enchufan' los módulos de la aplicación?",
      options: [
        "En el AppModule, dentro de su array imports.",
        "En el package.json, dentro de dependencies.",
        "En el main.ts, llamando a app.use() por cada módulo.",
      ],
      correctIndex: 0,
      explanation: "El AppModule es la raíz: su array imports lista todos los módulos de la app. NestJS recorre ese árbol al arrancar.",
    },
  },

  // 3. CONTROLADORES
  {
    id: "controladores",
    title: "Controladores (Controllers)",
    englishTerm: "Controllers",
    tag: "NestJS 03",
    icon: "route",
    analogy:
      "El controlador es el recepcionista de un hotel: no cocina ni limpia, pero recibe tu solicitud ('quiero habitación 204'), la anota y te da una respuesta. Si necesita algo más, se lo pide al servicio correspondiente. Nunca hace el trabajo pesado él mismo.",
    explanation:
      "Un controlador es una clase con el decorador @Controller('ruta') que define LOS ENDPOINTS de tu API: qué pasa cuando llega un GET, POST, PUT o DELETE a una URL. Cada método decorado con @Get(), @Post(), etc. maneja una petición concreta. Su única responsabilidad es recibir la petición y delegar en un servicio; la lógica de negocio NO va aquí.",
    flowTitle: "Diagrama de Flujo: Una petición llega al controlador",
    flowSteps: [
      { label: "Llega la petición HTTP", type: "api_req", detail: "GET http://localhost:3001/api/progreso" },
      { label: "NestJS busca el controlador de esa ruta", type: "process", detail: "@Controller('progreso')" },
      { label: "¿Ruta registrada con @Get()?", type: "decision", detail: "Si no existe → error 404" },
      { label: "Ejecuta el método y pide datos al servicio", type: "process", detail: "this.progresoService.getProgreso()" },
      { label: "Devuelve la respuesta JSON", type: "api_res", detail: "{ concepts: [...], exercises: [...] }" },
    ],
    codeExample: {
      language: "TypeScript (NestJS)",
      code: `// backend/src/progreso/progreso.controller.ts — La "recepción"
import { Controller, Get } from "@nestjs/common";
import { ProgresoService } from "./progreso.service";

@Controller("progreso") // + el prefijo global = ruta /api/progreso
export class ProgresoController {
  constructor(private readonly progresoService: ProgresoService) {}

  @Get() // responde a GET /api/progreso
  getProgreso() {
    return this.progresoService.getProgreso(); // delega en el servicio
  }
}`,
      description: "Fíjate: el controlador NO lee archivos ni consulta bases de datos. Recibe, delega y responde. Eso se llama separación de responsabilidades (separation of concerns).",
    },
    exercise: {
      question: "¿Qué URL completa atiende el método getProgreso() del ejemplo?",
      options: [
        "http://localhost:3001/progreso",
        "http://localhost:3001/api/progreso",
        "http://localhost:3000/api/progreso",
      ],
      correctIndex: 1,
      explanation: "El prefijo global 'api' (setGlobalPrefix en main.ts) se suma al @Controller('progreso'): /api + /progreso. Y el backend vive en el puerto 3001, no en el 3000 del frontend.",
    },
  },

  // 4. SERVICIOS E INYECCIÓN DE DEPENDENCIAS
  {
    id: "servicios-y-di",
    title: "Servicios e Inyección de Dependencias",
    englishTerm: "Providers & Dependency Injection",
    tag: "NestJS 04",
    icon: "construction",
    analogy:
      "La inyección de dependencias es como pedir delivery en vez de cocinar: tú no fabricas la comida; alguien te la trae lista al llamar a la puerta. En NestJS, cuando un controlador necesita datos, no crea el servicio a mano (new ProgresoService()): se lo declara en el constructor y NestJS se lo 'entrega' ya listo, como el repartidor.",
    explanation:
      "Un servicio (service) es una clase 'provider' con el decorador @Injectable() donde vive la lógica de negocio: leer archivos, consultar bases de datos, calcular, validar. La inyección de dependencias (dependency injection) es el mecanismo con el que NestJS crea UNA instancia de cada servicio y la reparte a quien la pida en su constructor. Ventaja: el controlador no depende de los detalles de dónde salen los datos — cuando haya base de datos, solo cambia el servicio.",
    flowTitle: "Diagrama de Flujo: NestJS 'reparte' las dependencias",
    flowSteps: [
      { label: "Arranca NestJS", type: "start", detail: "Lee todos los @Module()" },
      { label: "Crea una instancia de cada provider", type: "process", detail: "new ProgresoService() — una sola vez" },
      { label: "¿Alguien lo pide en un constructor?", type: "decision", detail: "constructor(private progresoService: ProgresoService)" },
      { label: "NestJS le inyecta la instancia lista", type: "process", detail: "El controlador la recibe y la usa" },
      { label: "El método del servicio devuelve los datos", type: "end", detail: "JSON hacia el controlador → al cliente" },
    ],
    codeExample: {
      language: "TypeScript (NestJS)",
      code: `// backend/src/progreso/progreso.service.ts — La "cocina"
import { Injectable } from "@nestjs/common";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

@Injectable() // ← este decorador hace que NestJS pueda inyectarla
export class ProgresoService {
  private readonly dataPath = resolve(__dirname, "../../../src/data/progreso.json");

  getProgreso() {
    const raw = readFileSync(this.dataPath, "utf-8");
    return JSON.parse(raw); // hoy lee un JSON; mañana, una base de datos
  }
}

// Y en el controlador, NestJS se la entrega sola:
constructor(private readonly progresoService: ProgresoService) {}`,
      description: "El controlador nunca escribe 'new ProgresoService()'. Declara la dependencia en el constructor y NestJS la resuelve. Eso desacopla las capas.",
    },
    exercise: {
      question: "¿Qué decorador convierte una clase en un servicio inyectable?",
      options: ["@Controller()", "@Injectable()", "@Module()"],
      correctIndex: 1,
      explanation: "@Injectable() marca la clase como 'provider': NestJS puede crearla, inyectarla en otras clases y gestionar su ciclo de vida.",
    },
  },

  // 5. NUESTRO BACKEND DEVLEARN
  {
    id: "nuestro-backend",
    title: "Nuestro backend DevLearn (caso real)",
    englishTerm: "The DevLearn backend (real case)",
    tag: "NestJS 05",
    icon: "dns",
    analogy:
      "Todo lo anterior no es teoría: es el backend que YA ESTÁ corriendo en tu proyecto. Es como tener el motor de tu coche abierto mientras aprendes mecánica: cada pieza que estudias, la puedes tocar en la carpeta backend/.",
    explanation:
      "El backend de este proyecto sirve los datos de la página /progreso. Cadena completa: el Server Component de Next.js hace fetch a http://localhost:3001/api/progreso → el ProgresoController recibe el GET → delega en ProgresoService → este lee src/data/progreso.json → el JSON vuelve por la red → Next.js pinta la página. Si el backend está apagado, la página lo detecta y usa los datos locales (degradación elegante / graceful degradation).",
    flowTitle: "Diagrama de Flujo: Petición real de /progreso a tu backend",
    flowSteps: [
      { label: "Visitas localhost:3000/progreso", type: "start", detail: "Next.js renderiza la página" },
      { label: "fetch('http://localhost:3001/api/progreso')", type: "api_req", detail: "cache: 'no-store' = datos frescos" },
      { label: "ProgresoController → ProgresoService", type: "process", detail: "Delegación en el servicio" },
      { label: "Lee src/data/progreso.json", type: "process", detail: "Una sola fuente de verdad" },
      { label: "La página pinta conceptos y ejercicios", type: "api_res", detail: "Si falla → fallback al JSON local" },
    ],
    codeExample: {
      language: "Bash + TypeScript",
      code: `# 1. Arrancar el backend (desde la raíz del proyecto)
cd backend
npm run start:dev   # tsx watch: reinicia solo al guardar cambios

# 2. Probar el endpoint directamente
curl http://localhost:3001/api/progreso
# → {"concepts":[...],"exercises":[...]}

# 3. El frontend (otra terminal, en la raíz)
npm run dev         # http://localhost:3000/progreso`,
      description: "Dos procesos, dos puertos: 3000 (Next.js) y 3001 (NestJS). El endpoint siempre se puede probar a pelo con curl, sin necesidad del navegador.",
    },
    exercise: {
      question: "Editas progreso.json mientras el backend corre con npm run start:dev. ¿Qué pasa al recargar /progreso?",
      options: [
        "Nada: hay que reiniciar el backend a mano.",
        "Se ven los cambios: el servicio lee el archivo en cada petición y tsx watch reinicia si tocas el código.",
        "Hay que reiniciar también el frontend.",
      ],
      correctIndex: 1,
      explanation: "El servicio lee el JSON en cada GET, así que los cambios de datos se ven al instante. tsx watch solo reinicia cuando cambia el CÓDIGO del backend.",
    },
  },
];
