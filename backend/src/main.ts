// Punto de entrada del backend NestJS.
// Arranca la aplicación Nest con el prefijo global "api", así todos los
// endpoints quedan bajo http://localhost:3001/api/...

import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors(); // permite que el navegador (frontend) consulte el backend
  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`Backend NestJS escuchando en http://localhost:${port}/api`);
}

bootstrap();
