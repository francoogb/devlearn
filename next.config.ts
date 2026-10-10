import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  experimental: {
    // En desarrollo, Next cachea las respuestas de fetch entre recargas HMR
    // (incluso con cache: "no-store"), así la página /progreso mostraría
    // datos viejas del backend tras editar progreso.json. Lo desactivamos:
    // en este proyecto siempre queremos datos frescos del backend NestJS.
    serverComponentsHmrCache: false,
  },
};

export default nextConfig;
