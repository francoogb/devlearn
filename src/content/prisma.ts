// Contenido interactivo y pedagógico para /prisma
// Explicación profunda de Prisma ORM + NestJS para desarrolladores Juniors.

export interface FlowStep {
  label: string;
  type: "start" | "process" | "decision" | "end" | "api_req" | "api_res";
  detail?: string;
}

export interface PrismaConcept {
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

export const prismaConcepts: PrismaConcept[] = [
  // 1. ¿QUÉ ES PRISMA Y QUÉ ES UN ORM?
  {
    id: "que-es-prisma",
    title: "¿Qué es Prisma y qué es un ORM?",
    englishTerm: "What is Prisma & What is an ORM?",
    tag: "Prisma 01",
    icon: "dataset",
    analogy:
      "Imagina que vas a un restaurante en Japón y tú solo hablas español, mientras el chef solo habla japonés antiguo (SQL nativo). Un ORM (Object-Relational Mapping) como Prisma es el traductor experto que se sienta a tu mesa: tú le pides platos en tu idioma habitual (objetos y funciones de TypeScript como prisma.user.findMany()), y él le da órdenes perfectas y sin errores gramaticales al chef (PostgreSQL / MySQL / SQLite).",
    explanation:
      "Prisma es un ORM (Object-Relational Mapper) de última generación para Node.js y TypeScript. Su trabajo es conectar tu código TypeScript con una base de datos relacional (PostgreSQL, MySQL, SQLite, SQL Server) o documental (MongoDB). En lugar de escribir cadenas de texto SQL propensas a errores de tipeo e inyecciones SQL ('SELECT * FROM users WHERE...'), Prisma genera automáticamente clientes tipados al 100% basados en tu esquema, con autocompletado en tu editor y validación en tiempo de compilación.",
    flowTitle: "Diagrama de Flujo: Cómo viaja una consulta con Prisma",
    flowSteps: [
      { label: "Tu servicio NestJS llama a Prisma", type: "start", detail: "prisma.user.findMany({ where: { activo: true } })" },
      { label: "Prisma Client (TypeScript) valida tipos", type: "process", detail: "Autocompletado y seguridad de tipos antes de ejecutar" },
      { label: "Prisma Engine traduce a SQL optimizado", type: "process", detail: "SELECT id, email FROM \"User\" WHERE activo = true;" },
      { label: "Base de Datos ejecuta y retorna filas", type: "api_req", detail: "PostgreSQL / MySQL / SQLite procesa la consulta" },
      { label: "Prisma mapea filas a objetos TypeScript tipados", type: "api_res", detail: "User[] listos para retornar al cliente" },
    ],
    codeExample: {
      language: "TypeScript vs SQL",
      code: `// ❌ SIN ORM: SQL manual como string (si te equivocas en una letra, explota en producción)
const result = await db.query("SELECT id, username, email FROM usres WHERE is_active = true");

// ✅ CON PRISMA EN NESTJS: Autocompletado completo y tipado estricto
const users = await this.prisma.user.findMany({
  where: { isActive: true },
  select: { id: true, username: true, email: true },
});
// 'users' tiene tipo exacto { id: number; username: string; email: string }[]`,
      description: "Prisma sabe exactamente qué campos existen en tu base de datos gracias al archivo schema.prisma. Si cambias el nombre de una columna, TypeScript te avisa de inmediato.",
    },
    exercise: {
      question: "¿Cuál es la principal ventaja de Prisma frente a escribir SQL en texto plano en TypeScript?",
      options: [
        "Que elimina la necesidad de tener una base de datos.",
        "Seguridad de tipos (Type-Safety), autocompletado inteligente y prevención de errores tipográficos en consultas.",
        "Que solo funciona para aplicaciones frontend como React.",
      ],
      correctIndex: 1,
      explanation: "Prisma genera tipos de TypeScript derivados de tu esquema. Si escribes mal el nombre de una tabla o columna, el compilador no te dejará avanzar, evitando fallos en producción.",
    },
  },

  // 2. EL ARCHIVO SCHEMA.PRISMA Y MIGRACIONES
  {
    id: "schema-y-migraciones",
    title: "El schema.prisma y Migraciones",
    englishTerm: "Schema Definition & Migrations",
    tag: "Prisma 02",
    icon: "account_tree",
    analogy:
      "El archivo 'schema.prisma' es el plano arquitectónico de tu casa. Las migraciones ('prisma migrate') son el registro histórico de remodelaciones: si hoy decides agregar un segundo piso (una nueva columna o tabla), el arquitecto deja una carpeta fechada con los cambios exactos para que cualquier obrero pueda reconstruir la casa exactamente igual.",
    explanation:
      "Toda la configuración de Prisma se define en prisma/schema.prisma. Aquí declaras tres cosas clave: 1) El datasource (qué motor de BD usas, ej. sqlite o postgresql), 2) El generator (prisma-client-js para generar código TypeScript), y 3) Tus modelos (las tablas y sus relaciones). Con el comando 'npx prisma migrate dev', Prisma compara tu schema con la base de datos real, genera un script SQL de migración y actualiza las tablas automáticamente.",
    flowTitle: "Diagrama de Flujo: Ciclo de vida de una migración",
    flowSteps: [
      { label: "Editas prisma/schema.prisma", type: "start", detail: "Añades el modelo Curso o campos nuevos" },
      { label: "Ejecutas npx prisma migrate dev", type: "process", detail: "Prisma detecta las diferencias" },
      { label: "Crea archivo de migración SQL", type: "process", detail: "prisma/migrations/20261010_add_curso/migration.sql" },
      { label: "Aplica los cambios en la BD real", type: "api_req", detail: "Ejecuta ALTER TABLE o CREATE TABLE" },
      { label: "Regenera el cliente (@prisma/client)", type: "end", detail: "Tus servicios NestJS ya ven los nuevos campos" },
    ],
    codeExample: {
      language: "Prisma Schema",
      code: `// prisma/schema.prisma
datasource db {
  provider = "postgresql" // o "sqlite" para pruebas locales
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Usuario {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  nombre    String
  rol       String   @default("ESTUDIANTE")
  progreso  Progreso[]
  createdAt DateTime @default(now())
}

model Progreso {
  id        Int      @id @default(autoincrement())
  modulo    String
  completado Boolean  @default(false)
  usuarioId Int
  usuario   Usuario  @relation(fields: [usuarioId], references: [id])
}`,
      description: "Las relaciones entre tablas se declaran con @relation. Prisma maneja las claves foráneas (Foreign Keys) de forma intuitiva.",
    },
    exercise: {
      question: "¿Qué comando crea la migración SQL y actualiza las tablas de tu base de datos durante el desarrollo?",
      options: [
        "npx prisma generate",
        "npx prisma migrate dev --name <nombre>",
        "npm run build",
      ],
      correctIndex: 1,
      explanation: "'prisma migrate dev' detecta cambios en schema.prisma, crea el archivo .sql de migración histórica y sincroniza la base de datos de desarrollo.",
    },
  },

  // 3. INTEGRACIÓN CON NESTJS: PRISMASERVICE Y PRISMAMODULE
  {
    id: "integracion-nestjs",
    title: "PrismaService y el Ciclo de Vida NestJS",
    englishTerm: "PrismaService & NestJS Lifecycle",
    tag: "Prisma 03",
    icon: "extension",
    analogy:
      "Imagina que Prisma es una línea telefónica directa con la bodega central (BD). En NestJS no creas un teléfono nuevo cada vez que alguien pide algo; creas una centralita compartida (@Injectable() PrismaService) que se conecta al abrir la oficina (onModuleInit) y cuelga prolijamente al cerrar la oficina (onModuleDestroy).",
    explanation:
      "La mejor práctica recomendada por el equipo de NestJS es crear un servicio 'PrismaService' que hereda de 'PrismaClient' e implementa la interfaz 'OnModuleInit'. Esto permite que la conexión a la base de datos se establezca limpiamente cuando NestJS inicia su ciclo de vida. Luego, empaquetas este servicio en un 'PrismaModule' con exports: [PrismaService], permitiendo que cualquier otro módulo (como ProgresoModule o UsersModule) lo inyecte directamente en su constructor.",
    flowTitle: "Diagrama de Flujo: Inyección de Dependencias de Prisma en NestJS",
    flowSteps: [
      { label: "NestJS arranca (bootstrap)", type: "start", detail: "Lee AppModule y PrismaModule" },
      { label: "PrismaService ejecuta onModuleInit()", type: "process", detail: "await this.$connect() a la BD" },
      { label: "ProgresoService solicita PrismaService", type: "process", detail: "constructor(private prisma: PrismaService)" },
      { label: "Petición HTTP llega al Controller", type: "api_req", detail: "GET /api/progreso" },
      { label: "Service consulta via this.prisma", type: "api_res", detail: "this.prisma.progreso.findMany()" },
    ],
    codeExample: {
      language: "TypeScript (NestJS)",
      code: `// backend/src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    // Se conecta a la base de datos cuando el módulo arranca
    await this.$connect();
  }

  async onModuleDestroy() {
    // Cierra la conexión ordenadamente cuando el servidor se apaga
    await this.$disconnect();
  }
}

// backend/src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // @Global hace que esté disponible en toda la app sin reimportarlo
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}`,
      description: "Con @Global(), puedes inyectar PrismaService en cualquier servicio de tu backend simplemente declarándolo en el constructor.",
    },
    exercise: {
      question: "¿Por qué PrismaService implementa la interfaz OnModuleInit de NestJS?",
      options: [
        "Para compilar el código TypeScript a JavaScript.",
        "Para ejecutar await this.$connect() y asegurar la conexión con la base de datos antes de recibir peticiones.",
        "Para crear la interfaz de usuario en el navegador.",
      ],
      correctIndex: 1,
      explanation: "OnModuleInit es un hook del ciclo de vida de NestJS. Garantiza que la conexión con la base de datos esté lista antes de que lleguen solicitudes HTTP.",
    },
  },

  // 4. OPERACIONES CRUD Y RELACIONES EN UN SERVICIO NESTJS
  {
    id: "crud-y-relaciones",
    title: "CRUD y Relaciones en Servicios",
    englishTerm: "CRUD Operations & Relations in Services",
    tag: "Prisma 04",
    icon: "sync_alt",
    analogy:
      "Hacer un CRUD con Prisma es como tener un asistente de biblioteca: le dices 'búscame el estudiante con ID 5 y tráeme también todos los libros que tiene prestados' (include: { libros: true }). No tienes que hacer 5 viajes ni escribir JOINs complicados de SQL; el asistente te entrega el paquete completo en una sola respuesta estructurada.",
    explanation:
      "Prisma hace que las 4 operaciones fundamentales de base de datos (Create, Read, Update, Delete) sean métodos intuitivos: findMany, findUnique, create, update y delete. Además, la cláusula 'include' resuelve JOINs relacionales automáticamente sin necesidad de escribir SQL complejo, devolviendo objetos TypeScript perfectamente anidados.",
    flowTitle: "Diagrama de Flujo: Cómo funciona un create y un findMany con relaciones",
    flowSteps: [
      { label: "POST /api/progreso con DTO validado", type: "start", detail: "{ modulo: 'nestjs', completado: true }" },
      { label: "ProgresoController pasa datos al Service", type: "process", detail: "progresoService.completarModulo(dto)" },
      { label: "Prisma ejecuta create() con relaciones", type: "process", detail: "prisma.progreso.create({ data: { ... } })" },
      { label: "O consulta findMany con include", type: "api_req", detail: "include: { usuario: true }" },
      { label: "Retorna objeto listo en JSON al cliente", type: "end", detail: "Status 201 Created o 200 OK" },
    ],
    codeExample: {
      language: "TypeScript (NestJS Service)",
      code: `// backend/src/progreso/progreso.service.ts usando PrismaService
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgresoService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. Obtener todos los progresos junto con el usuario dueño
  async obtenerProgresos() {
    return this.prisma.progreso.findMany({
      include: {
        usuario: { select: { nombre: true, email: true } }, // JOIN automático
      },
      orderBy: { id: 'desc' },
    });
  }

  // 2. Crear un nuevo hito de estudio
  async registrarHito(modulo: string, usuarioId: number) {
    return this.prisma.progreso.create({
      data: {
        modulo,
        completado: true,
        usuarioId,
      },
    });
  }
}`,
      description: "Fíjate qué limpio es el código: sin strings SQL, con autocompletado para 'usuario', 'modulo', etc., y validado en tiempo real.",
    },
    exercise: {
      question: "¿Qué propiedad se usa en Prisma para traer datos de una tabla relacionada (equivalente a un SQL JOIN)?",
      options: [
        "join: { tabla: true }",
        "include: { relacion: true }",
        "merge: { tabla: true }",
      ],
      correctIndex: 1,
      explanation: "La opción 'include' le indica a Prisma que incluya registros de tablas vinculadas mediante relaciones de clave foránea en la misma consulta.",
    },
  },

  // 5. PRISMA STUDIO: TU PANEL VISUAL DE DATOS
  {
    id: "prisma-studio",
    title: "Prisma Studio: GUI para Desarrolladores",
    englishTerm: "Prisma Studio: Visual Database Browser",
    tag: "Prisma 05",
    icon: "table_chart",
    analogy:
      "Prisma Studio es como abrir una hoja de cálculo estilo Excel en tu navegador, pero conectada en tiempo real a tu base de datos de desarrollo. Puedes ver filas, editarlas con doble clic, filtrar registros y crear datos de prueba sin necesidad de instalar programas pesados como pgAdmin o DBeaver.",
    explanation:
      "Una de las herramientas más queridas por los desarrolladores Juniors y Seniors es Prisma Studio. Al ejecutar 'npx prisma studio', se abre una interfaz web interactiva en http://localhost:5555. Desde allí puedes inspeccionar tus tablas, crear usuarios falsos para probar tu backend, editar registros y verificar que tus endpoints de NestJS guardaron la información correctamente.",
    flowTitle: "Diagrama de Flujo: Inspección visual con Prisma Studio",
    flowSteps: [
      { label: "Terminal: npx prisma studio", type: "start", detail: "Se ejecuta en tu proyecto" },
      { label: "Abre navegador en localhost:5555", type: "process", detail: "Interfaz web moderna y rápida" },
      { label: "Eliges el modelo (Usuario, Progreso...)", type: "process", detail: "Vista en tabla interactiva" },
      { label: "Editas, creas o borras filas", type: "api_req", detail: "Cambios guardados directamente en la BD" },
      { label: "Tu backend NestJS lee los datos actualizados", type: "end", detail: "Perfecto para depurar en local" },
    ],
    codeExample: {
      language: "Bash",
      code: `# 1. En la carpeta backend/ de tu proyecto:
cd backend

# 2. Abrir Prisma Studio
npx prisma studio

# Salida en la consola:
# Prisma Studio is up on http://localhost:5555
# ✨ Puedes abrir esa URL en Chrome y ver todas tus tablas visualmente`,
      description: "Prisma Studio no requiere configuración extra. Lee automáticamente tu schema.prisma y tu base de datos configurada.",
    },
    exercise: {
      question: "¿Qué comando ejecuta el panel visual interactivo en el navegador para ver y editar datos?",
      options: [
        "npx prisma run gui",
        "npx prisma studio",
        "npm run start:db",
      ],
      correctIndex: 1,
      explanation: "'npx prisma studio' levanta un servidor web local (por defecto en el puerto 5555) que te permite inspeccionar y modificar tablas con clics visuales.",
    },
  },

  // 6. ROADMAP DE IMPLEMENTACIÓN EN DEVLEARN
  {
    id: "roadmap-devlearn",
    title: "Paso a Paso: Cómo sumarlo a este proyecto",
    englishTerm: "DevLearn Implementation Roadmap",
    tag: "Prisma 06",
    icon: "checklist",
    analogy:
      "Hoy nuestro backend en 'backend/src/progreso/progreso.service.ts' lee de un archivo 'progreso.json'. Integrar Prisma es como pasar de guardar tus ahorros en un frasco de vidrio en la cocina (un JSON plano) a abrir una cuenta bancaria con tarjeta de débito y estados de cuenta automáticos (Base de datos profesional con Prisma).",
    explanation:
      "Para dar el salto en DevLearn cuando quieras persistencia real en PostgreSQL o SQLite, el proceso en NestJS son solo 4 pasos claros: 1) Instalar dependencias (@prisma/client y prisma CLI), 2) Inicializar con 'npx prisma init', 3) Crear el PrismaService con el ciclo de vida de NestJS, y 4) Reemplazar la lectura de archivos JSON en ProgresoService por llamadas a 'this.prisma.progreso.findMany()'.",
    flowTitle: "Diagrama de Flujo: Migración de JSON plano a Prisma ORM",
    flowSteps: [
      { label: "Estado Actual: JSON plano en disco", type: "start", detail: "ProgresoService lee fs.readFileSync(progreso.json)" },
      { label: "Paso 1: npm i @prisma/client & npx prisma init", type: "process", detail: "Crea prisma/schema.prisma y .env" },
      { label: "Paso 2: Definir modelos y migrar", type: "process", detail: "npx prisma migrate dev --name init" },
      { label: "Paso 3: Crear PrismaService en backend/src", type: "process", detail: "extends PrismaClient implements OnModuleInit" },
      { label: "Estado Final: NestJS conectado a BD via Prisma", type: "end", detail: "Consultas tipadas, relaciones y migraciones" },
    ],
    codeExample: {
      language: "Bash (Comandos para el proyecto)",
      code: `# En la terminal, dentro de la carpeta backend:
cd backend

# 1. Instalar cliente y herramienta de desarrollo
npm install @prisma/client
npm install prisma --save-dev

# 2. Inicializar Prisma (crea /prisma/schema.prisma y .env)
npx prisma init --datasource-provider sqlite

# 3. Tras escribir tus modelos en schema.prisma:
npx prisma migrate dev --name init_db

# 4. Ver los datos visualmente:
npx prisma studio`,
      description: "Con SQLite no necesitas instalar ningún servidor de base de datos extra; se guarda en un archivo .db local ideal para aprender y prototipar.",
    },
    exercise: {
      question: "Si queremos empezar a usar Prisma en local sin instalar bases de datos complejas en nuestra máquina, ¿qué provider es el más sencillo?",
      options: [
        "Oracle Enterprise Database",
        "sqlite (guarda todo en un archivo local sin configurar servidores)",
        "Cassandra Cluster",
      ],
      correctIndex: 1,
      explanation: "SQLite es excelente para aprender desarrollo local porque es un motor embebido que guarda los datos en un simple archivo en tu disco sin requerir servicios externos corriendo.",
    },
  },
];
