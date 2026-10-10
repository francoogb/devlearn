// PrismaModule: expone PrismaService a toda la app.
// @Global hace que no haga falta importarlo en cada módulo que lo use;
// se registra una sola vez en AppModule y queda disponible via DI.

import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
