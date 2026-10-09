// Layout raíz: carga las 3 fuentes del diseño (Space Grotesk para títulos,
// Plus Jakarta Sans para texto, JetBrains Mono para código) y el shell
// de la app: sidebar a la izquierda + contenido a la derecha.

import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Sidebar from "@/components/Sidebar";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  weight: ["600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "DevLearn — Mi espacio de aprendizaje",
  description: "Proyecto para aprender Next.js con TypeScript",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${grotesk.variable} ${jakarta.variable} ${jetbrains.variable}`}
    >
      <head>
        {/* Iconos Material Symbols usados en el diseño */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </head>
      <body className="font-sans antialiased">
        <div className="flex min-h-screen">
          {/* Suspense: usePathname() es dinámico; el fallback se muestra
              durante el prerender y el sidebar real llega en streaming */}
          <Suspense
            fallback={<div className="w-64 shrink-0 bg-surface-container-low" />}
          >
            <Sidebar />
          </Suspense>
          <main className="flex-1 p-6">{children}</main>
        </div>
      </body>
    </html>
  );
}
