# Genera Apuntes_NextJS_TS.docx a partir del contenido de APUNTES.md
# Uso: .venv-docx/Scripts/python.exe generar_docx.py

from docx import Document
from docx.shared import Pt, RGBColor, Inches
from docx.enum.text import WD_ALIGN_PARAGRAPH

doc = Document()

# ---------- estilos base ----------
normal = doc.styles["Normal"]
normal.font.name = "Calibri"
normal.font.size = Pt(11)

for nivel, tam, color in [("Heading 1", 18, RGBColor(0x1F, 0x4E, 0x79)),
                          ("Heading 2", 14, RGBColor(0x2E, 0x74, 0xB5)),
                          ("Heading 3", 12, RGBColor(0x2E, 0x74, 0xB5))]:
    estilo = doc.styles[nivel]
    estilo.font.name = "Calibri"
    estilo.font.size = Pt(tam)
    estilo.font.color.rgb = color
    estilo.font.bold = True

CODIGO_FONDO = RGBColor(0xF2, 0xF2, 0xF2)


def codigo(texto):
    """Inserta un bloque de código con fondo gris y fuente monoespaciada."""
    for i, linea in enumerate(texto.strip("\n").split("\n")):
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(0)
        p.paragraph_format.space_before = Pt(0)
        p.paragraph_format.left_indent = Inches(0.25)
        run = p.add_run(linea if linea else " ")
        run.font.name = "Consolas"
        run.font.size = Pt(9.5)
        run.font.color.rgb = RGBColor(0x20, 0x20, 0x20)
        from docx.oxml.ns import qn
        from docx.oxml import OxmlElement
        shd = OxmlElement("w:shd")
        shd.set(qn("w:val"), "clear")
        shd.set(qn("w:fill"), "F2F2F2")
        p._p.get_or_add_pPr().append(shd)
    doc.add_paragraph()


def parrafo(texto, negrita=False, cursiva=False):
    p = doc.add_paragraph()
    run = p.add_run(texto)
    run.bold = negrita
    run.italic = cursiva
    return p


def bullets(items):
    for it in items:
        doc.add_paragraph(it, style="List Bullet")


def numerados(items):
    for it in items:
        doc.add_paragraph(it, style="List Number")


def tabla(headers, rows):
    t = doc.add_table(rows=1, cols=len(headers))
    t.style = "Light Grid Accent 1"
    for i, h in enumerate(headers):
        celda = t.rows[0].cells[i]
        celda.text = h
        celda.paragraphs[0].runs[0].bold = True
    for fila in rows:
        celdas = t.add_row().cells
        for i, val in enumerate(fila):
            celdas[i].text = val
    doc.add_paragraph()


# ---------- portada ----------
titulo = doc.add_paragraph()
titulo.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = titulo.add_run("Guía de inicio: Next.js + TypeScript")
run.bold = True
run.font.size = Pt(28)
run.font.color.rgb = RGBColor(0x1F, 0x4E, 0x79)

sub = doc.add_paragraph()
sub.alignment = WD_ALIGN_PARAGRAPH.CENTER
run = sub.add_run("Desde cero · Para quien ya sabe JavaScript")
run.italic = True
run.font.size = Pt(13)

doc.add_paragraph()
parrafo("Este documento resume lo esencial de Next.js y de TypeScript para comenzar "
        "a trabajar con ambos. Acompaña al proyecto de práctica incluido en esta "
        "carpeta, cuyos archivos de ejemplo se mencionan en cada sección.")
doc.add_page_break()

# ---------- 1 ----------
doc.add_heading("1. ¿Qué es Next.js?", level=1)
parrafo("Es un framework construido sobre React. React solo te da la UI por "
        "componentes; Next.js agrega lo que falta para una aplicación completa:")
bullets([
    "Ruteo por archivos: no configuras rutas manualmente, las creas como archivos y carpetas.",
    "Renderizado en servidor (SSR/SSG): el HTML se puede generar en el servidor en vez de solo en el navegador (mejor SEO y velocidad inicial).",
    "API Routes: puedes crear endpoints de backend en el mismo proyecto.",
    "Optimizaciones automáticas: imágenes, fuentes y división de código (code splitting).",
])

# ---------- 2 ----------
doc.add_heading("2. TypeScript en resumen", level=1)
parrafo("TS es JavaScript con tipos estáticos. El código compila a JS normal; los "
        "tipos solo existen en desarrollo para detectar errores ANTES de ejecutar.",
        negrita=False)

doc.add_heading("2.1 Lo que usarás el 90% del tiempo", level=2)
codigo('''// Tipar variables y funciones
const nombre: string = "Ana";
function suma(a: number, b: number): number {
  return a + b;
}

// Interface: la "forma" que debe tener un objeto
interface Usuario {
  id: number;
  nombre: string;
  email?: string; // el ? significa que es OPCIONAL
}

// Tipar las props de un componente React
interface TarjetaProps {
  titulo: string;
  usuario: Usuario;
}

function Tarjeta({ titulo, usuario }: TarjetaProps) {
  return (
    <h1>
      {titulo} — {usuario.nombre}
    </h1>
  );
}''')

doc.add_heading("2.2 Tipos básicos de TS", level=2)
tabla(
    ["Tipo", "Ejemplo", "Significa"],
    [
        ["string", '"hola"', "texto"],
        ["number", "42, 3.14", "números"],
        ["boolean", "true", "verdadero / falso"],
        ["string[]", '["a", "b"]', "arreglo de strings"],
        ["X | null", "valor o null", "unión de tipos"],
        ["any", "cualquier cosa", "EVÍTALO: desactiva el chequeo de tipos"],
    ],
)
p = doc.add_paragraph()
r = p.add_run("Regla práctica: ")
r.bold = True
p.add_run("tipa todo lo que cruce una frontera (props de componentes, datos que "
          "vienen de una API, funciones públicas). Dentro de una función, TS "
          "normalmente infiere el tipo solo y no necesitas escribirlo.")

# ---------- 3 ----------
doc.add_heading("3. Las 4 ideas clave de Next.js (App Router)", level=1)

doc.add_heading("3.1 Las rutas son carpetas y archivos", level=2)
codigo('''src/app/page.tsx            ->  /           (la página principal)
src/app/about/page.tsx      ->  /about      (página "acerca de")
src/app/blog/[id]/page.tsx  ->  /blog/123   (ruta dinámica, id = "123")
src/app/layout.tsx          ->  envuelve TODAS las páginas (header, footer)
src/app/not-found.tsx       ->  página 404 personalizada''')

doc.add_heading("3.2 Server Components (por defecto)", level=2)
parrafo("Todos los archivos dentro de app/ corren en el SERVIDOR salvo que digas "
        "lo contrario. En el servidor puedes:")
bullets([
    "Hacer await fetch(...) directo en el cuerpo del componente.",
    "Leer archivos y conectarte a una base de datos.",
    "Mantener código privado: nunca llega al navegador del usuario.",
])
parrafo("Limitación: NO pueden usar hooks (useState, useEffect) ni manejar "
        "eventos (onClick).", cursiva=True)

doc.add_heading("3.3 Client Components (para interactividad)", level=2)
parrafo('Cuando necesites estado o eventos, agrega "use client" en la PRIMERA '
        "línea del archivo:")
codigo('''"use client";

import { useState } from "react";

export default function Contador() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>Clicks: {n}</button>;
}''')
p = doc.add_paragraph()
r = p.add_run("Patrón mental: ")
r.bold = True
p.add_run("el servidor trae los datos, el cliente maneja la interacción. Un "
          "Server Component puede importar y renderizar Client Components, y viceversa.")

doc.add_heading("3.4 Data fetching en el servidor + Suspense", level=2)
codigo('''// src/app/usuarios/page.tsx  (Server Component)
interface Usuario {
  id: number;
  name: string;
}

async function ListaUsuarios() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const usuarios: Usuario[] = await res.json(); // tipamos la respuesta
  return (
    <ul>
      {usuarios.map((u) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}

export default function UsuariosPage() {
  return (
    // Suspense muestra el fallback mientras el fetch termina
    <Suspense fallback={<p>Cargando...</p>}>
      <ListaUsuarios />
    </Suspense>
  );
}''')
p = doc.add_paragraph()
r = p.add_run("Ojo con Next.js 16: ")
r.bold = True
p.add_run("un fetch sin caché (o un await params en rutas dinámicas) NO puede "
          "estar directo en el cuerpo de la página durante el build: bloquea el "
          "prerender. La solución es mover lo asíncrono a un componente hijo y "
          "envolverlo en <Suspense>. Ver los archivos src/app/practica/page.tsx "
          "y src/app/saludo/[nombre]/page.tsx del proyecto de práctica.")

# ---------- 4 ----------
doc.add_heading("4. Estructura típica del proyecto", level=1)
codigo('''devlearn/
├─ src/
│  ├─ app/                 # rutas y páginas (App Router)
│  │  ├─ layout.tsx        # plantilla global
│  │  ├─ page.tsx          # página principal (/)
│  │  ├─ practica/         # ejemplo: fetch + Client Component
│  │  └─ saludo/[nombre]/  # ejemplo: ruta dinámica
│  └─ components/          # componentes reutilizables (ej. Contador.tsx)
├─ public/                 # archivos estáticos (imágenes, favicon)
├─ next.config.ts          # configuración de Next
├─ tsconfig.json           # configuración de TypeScript
└─ package.json            # dependencias y scripts''')

# ---------- 5 ----------
doc.add_heading("5. Comandos útiles", level=1)
tabla(
    ["Comando", "Qué hace"],
    [
        ["npm run dev", "Servidor de desarrollo en http://localhost:3000 (hot reload)"],
        ["npm run build", "Compila la aplicación para producción"],
        ["npm start", "Sirve la build de producción"],
        ["npm run lint", "Revisa errores y malas prácticas en el código"],
    ],
)

# ---------- 6 ----------
doc.add_heading("6. Plan de aprendizaje sugerido", level=1)
numerados([
    "Modifica src/app/page.tsx y observa el cambio en el navegador (hot reload).",
    "Crea src/app/about/page.tsx con texto simple y visítala en /about.",
    "Crea la ruta dinámica src/app/saludo/[nombre]/page.tsx que lea el parámetro de la URL.",
    "Haz un Server Component que haga fetch a una API pública y liste los datos.",
    "Crea un Client Component con un botón o contador e impórtalo en una página.",
    "Aprende a navegar sin recargar con next/link: <Link href=\"/about\">.",
])

# ---------- 7 ----------
doc.add_heading("7. Recursos oficiales", level=1)
bullets([
    "Documentación Next.js: https://nextjs.org/docs",
    "Tutorial interactivo oficial: https://nextjs.org/learn",
    "Documentación TypeScript: https://www.typescriptlang.org/docs/",
])

doc.save("Apuntes_NextJS_TS.docx")
print("Documento creado: Apuntes_NextJS_TS.docx")
