// PrismaService: envuelve el PrismaClient en un servicio inyectable de Nest.
// OnModuleInit → conecta a la BD cuando arranca la app.
// OnModuleDestroy → cierra la conexión limpiamente al apagar.
//
// Patrón oficial de la doc de Prisma + NestJS.

import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
