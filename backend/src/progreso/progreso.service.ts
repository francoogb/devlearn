// Servicio: la "cocina" del backend. Por ahora los datos siguen viviendo en
// el JSON del frontend (src/data/progreso.json), así hay UNA sola fuente de
// verdad. Cuando haya base de datos, este es el único archivo que cambia.

import { Injectable } from "@nestjs/common";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

@Injectable()
export class ProgresoService {
  // backend/src/progreso -> subir 3 niveles = raíz del repo -> src/data/...
  private readonly dataPath = resolve(
    __dirname,
    "../../../src/data/progreso.json"
  );

  getProgreso() {
    const raw = readFileSync(this.dataPath, "utf-8");
    return JSON.parse(raw);
  }
}
