// Módulo raíz: aquí se "enchufan" los módulos del backend.
// Por ahora solo el de progreso; los nuevos dominios se añaden a imports.

import { Module } from "@nestjs/common";
import { ProgresoModule } from "./progreso/progreso.module";

@Module({
  imports: [ProgresoModule],
})
export class AppModule {}
