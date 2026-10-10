# Guía y Documentación: Prisma ORM en NestJS (Para Desarrolladores Juniors)

> Documentación de referencia técnica para el proyecto **DevLearn**.  
> Puedes ver esta guía de forma interactiva en la web navegando a: **`http://localhost:3000/prisma`** (o en la barra lateral, botón **Prisma**).

---

## 1. ¿Qué es Prisma y qué es un ORM?

### 💡 El Modelo Mental (Analogía)
Imagina que vas a comer a un restaurante en Japón. Tú solo hablas español (código TypeScript), mientras que el chef solo habla japonés antiguo (código SQL nativo de PostgreSQL, MySQL o SQLite).
- **Sin traductor:** Tienes que escribir frases en japonés en servilletas (`SELECT * FROM users WHERE...`). Si te equivocas en un símbolo o letra, el chef se confunde o explota un error silencioso.
- **Con Prisma (El ORM):** Prisma es el traductor experto sentado a tu mesa. Tú le pides platos en español (`prisma.usuario.findMany()`), y él le da órdenes perfectas, optimizadas y seguras al chef en SQL.

### ⚙️ Definición Técnica
**ORM** significa *Object-Relational Mapping* (Mapeo Objeto-Relacional).  
Prisma es un ORM moderno para Node.js y TypeScript que sustituye las consultas de texto plano por un cliente 100% tipado con auto-completado intellisense en tu editor de código.

| Característica | SQL Manual (`pg`, `mysql2`) | TypeORM | Prisma ORM |
| :--- | :--- | :--- | :--- |
| **Seguridad de Tipos** | Nula (strings planos) | Media (decoradores en clases) | **Total (Generada desde el schema)** |
| **Migraciones** | Manuales en archivos SQL | Sincronización a veces frágil | **Comando automatizado (`migrate dev`)** |
| **Visualizador de BD** | Necesitas DBeaver / pgAdmin | No incluye | **Prisma Studio integrado (`localhost:5555`)** |
| **Curva de Aprendizaje** | Requiere dominar SQL | Compleja (decoradores y active record) | **Muy amigable para Juniors** |

---

## 2. El archivo central: `schema.prisma`

En Prisma, todo parte de un único archivo: `prisma/schema.prisma`. En él describes:
1. **datasource:** Qué motor de base de datos usas (`postgresql`, `mysql`, `sqlite`).
2. **generator:** Cómo compilar el cliente TypeScript.
3. **models:** Las tablas de tu base de datos y cómo se relacionan entre sí.

### Ejemplo de esquema para DevLearn:

```prisma
// prisma/schema.prisma

datasource db {
  provider = "sqlite" // Ideal para desarrollo local (sin servidores externos)
  url      = "file:./dev.db"
}

generator client {
  provider = "prisma-client-js"
}

// Tabla de usuarios/estudiantes
model Usuario {
  id        Int        @id @default(autoincrement())
  email     String     @unique
  nombre    String
  progresos Progreso[]
  createdAt DateTime   @default(now())
}

// Tabla de progresos de aprendizaje
model Progreso {
  id         Int      @id @default(autoincrement())
  modulo     String   // ej. "nestjs", "prisma", "fundamentos"
  completado Boolean  @default(false)
  usuarioId  Int
  usuario    Usuario  @relation(fields: [usuarioId], references: [id])
  updatedAt  DateTime @updatedAt
}
```

---

## 3. Integración estándar en NestJS: `PrismaService` y `PrismaModule`

La arquitectura recomendada por la documentación oficial de NestJS sigue estos pasos:

### Paso 1: `backend/src/prisma/prisma.service.ts`
Hereda de `PrismaClient` e implementa los hooks del ciclo de vida de NestJS (`OnModuleInit` y `OnModuleDestroy`):

```typescript
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    // Abre la conexión con la base de datos al arrancar NestJS
    await this.$connect();
  }

  async onModuleDestroy() {
    // Cierra la conexión ordenadamente al apagar el servidor
    await this.$disconnect();
  }
}
```

### Paso 2: `backend/src/prisma/prisma.module.ts`
Declarar el módulo como `@Global()` para que esté disponible en cualquier controlador o servicio sin necesidad de reimportarlo en cada módulo:

```typescript
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
```

---

## 4. Cómo usar Prisma dentro de un Servicio de NestJS

En tus servicios de negocio (como `ProgresoService`), inyectas `PrismaService` mediante el constructor. Observa la limpieza de las operaciones:

```typescript
// backend/src/progreso/progreso.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ProgresoService {
  constructor(private readonly prisma: PrismaService) {}

  // 1. OBTENER (READ con JOIN automático)
  async listarProgresos() {
    return this.prisma.progreso.findMany({
      include: {
        usuario: { select: { nombre: true, email: true } }, // JOIN sin escribir SQL
      },
      orderBy: { id: 'desc' },
    });
  }

  // 2. CREAR (CREATE)
  async crearHito(modulo: string, usuarioId: number) {
    return this.prisma.progreso.create({
      data: {
        modulo,
        completado: true,
        usuarioId,
      },
    });
  }

  // 3. ACTUALIZAR (UPDATE)
  async marcarComoCompletado(id: number) {
    return this.prisma.progreso.update({
      where: { id },
      data: { completado: true },
    });
  }
}
```

---

## 5. Herramientas clave de la línea de comandos (CLI)

| Comando | Para qué sirve | Cuándo se usa |
| :--- | :--- | :--- |
| `npx prisma init` | Crea la carpeta `prisma/` con el schema inicial y archivo `.env`. | Al iniciar un proyecto. |
| `npx prisma migrate dev --name <nombre>` | Detecta cambios en el schema, genera el archivo `.sql` histórico y actualiza la BD. | Al crear o cambiar modelos/columnas. |
| `npx prisma generate` | Regenera los tipos TypeScript del cliente `@prisma/client`. | Al instalar o cambiar schema. |
| `npx prisma studio` | Levanta un panel web en `http://localhost:5555` para ver y editar filas interactivamente. | Siempre que quieras depurar datos visualmente. |

---

## 6. Hoja de Ruta para DevLearn (Migración futura)

Actualmente nuestro backend en `backend/src/progreso/progreso.service.ts` lee de `src/data/progreso.json`. Cuando queramos persistencia real en base de datos:

1. Ejecutar en `backend/`:
   ```bash
   npm install @prisma/client
   npm install prisma --save-dev
   npx prisma init --datasource-provider sqlite
   ```
2. Pegar los modelos en `backend/prisma/schema.prisma`.
3. Ejecutar `npx prisma migrate dev --name init`.
4. Crear `backend/src/prisma/prisma.service.ts` y conectarlo a `ProgresoModule`.
5. ¡Listo! Tendrás un backend NestJS profesional con base de datos real.
