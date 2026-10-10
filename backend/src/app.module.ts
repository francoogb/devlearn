// Módulo raíz: aquí se "enchufan" los módulos del backend.
// Por ahora solo el de progreso; los nuevos dominios se añaden a imports.

import { Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { ProgresoModule } from "./progreso/progreso.module";

@Module({
  imports: [PrismaModule, ProgresoModule],
})
export class AppModule {}
