// Controlador: la "recepción" del backend. Recibe la petición HTTP GET
// /api/progreso y se la pasa al servicio, que sabe de dónde salen los datos.

import { Controller, Get } from "@nestjs/common";
import { ProgresoService } from "./progreso.service";

@Controller("progreso")
export class ProgresoController {
  constructor(private readonly progresoService: ProgresoService) {}

  @Get()
  getProgreso() {
    return this.progresoService.getProgreso();
  }
}
