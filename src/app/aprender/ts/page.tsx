// Módulo completo: TypeScript desde cero (para quien viene de JS).
// La columna central se lee como una historia, en el orden en que se
// aprende: qué es TS → tipos → interfaces → props.
// Cada paso compara JS vs TS con el componente ComparacionCodigo.

import Link from "next/link";
import RutaAprendizaje from "@/components/leccion/RutaAprendizaje";
import ComparacionCodigo from "@/components/leccion/ComparacionCodigo";

const pasos = [
  { numero: 1, titulo: "¿Qué es TypeScript?", detalle: "+30 XP", estado: "completado" as const },
  { numero: 2, titulo: "Tipos básicos", detalle: "+40 XP", estado: "completado" as const },
  { numero: 3, titulo: "Interfaces", detalle: "+40 XP", estado: "completado" as const },
  { numero: 4, titulo: "Props tipadas", detalle: "En progreso actual", estado: "activo" as const },
  { numero: 5, titulo: "Reto Práctico", detalle: "Ejercicio interactivo", estado: "pendiente" as const },
];

/* ---------- Helpers de sección ---------- */

function CabeceraPaso({ paso, total, minutos }: { paso: number; total: number; minutos: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="rounded-full bg-secondary/15 px-2 py-0.5 font-mono text-xs text-secondary">
        Paso {paso} de {total}
      </span>
      <span className="font-mono text-xs text-outline">
        • Lectura estimada: {minutos} min
      </span>
    </div>
  );
}

function TituloLeccion({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-3xl leading-tight tracking-tight text-on-surface">
      {children}
    </h2>
  );
}

export default function ModuloTSPage() {
  return (
    <div className="flex flex-col gap-4">
      {/* ---------- Barra de contexto ---------- */}
      <div className="flex w-full flex-wrap items-center justify-between rounded-xl bg-surface-container-low px-6 py-2 shadow-md">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant">
            <span className="flex cursor-pointer items-center gap-1 text-primary hover:underline">
              <span className="material-symbols-outlined text-[16px]">data_object</span>
              TypeScript
            </span>
            <span className="text-outline">/</span>
            <span className="cursor-pointer hover:text-on-surface">
              Módulo 01: Fundamentos
            </span>
            <span className="text-outline">/</span>
            <span className="flex items-center gap-1 font-semibold text-on-surface">
              <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
              Del JS que sabes al TS que necesitas
            </span>
          </div>
          <span className="rounded-full bg-tertiary-container/30 px-1.5 py-0.5 font-mono text-xs uppercase tracking-wider text-tertiary">
            Nivel Básico
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <div className="flex items-center gap-1.5 rounded-lg bg-surface-container px-2 py-1 font-mono text-xs text-secondary">
            <span className="h-2 w-2 rounded-full bg-secondary" />
            ts-engine v5.4.2 [online]
          </div>
          <Link
            href="/"
            className="flex items-center gap-1 rounded-lg bg-surface-container-high px-2 py-1 font-mono text-xs text-on-surface-variant transition-colors hover:bg-surface-bright hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[16px]">keyboard</span>
            Inicio
          </Link>
        </div>
      </div>

      {/* ---------- Grid de 3 columnas ---------- */}
      <div className="grid grid-cols-12 items-start gap-4">
        {/* COLUMNA DERECHA (ruta + chuleta): en pantallas grandes va a la derecha */}
        <div className="col-span-12 flex flex-col gap-4 lg:order-2 lg:col-span-3">
          <RutaAprendizaje pasos={pasos} activo={4} />

          <div className="flex flex-col gap-3 rounded-xl bg-surface-container-low p-4 shadow-md">
            <div className="flex items-center gap-2 text-primary">
              <span className="material-symbols-outlined text-[20px]">sticky_note_2</span>
              <span className="font-display text-xl text-on-surface">
                Chuleta del Módulo
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1 rounded-lg bg-surface-container p-2.5">
                <span className="font-mono text-xs text-secondary">variable: tipo</span>
                <span className="text-xs text-on-surface-variant">
                  Anotación básica de tipos.
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg bg-surface-container p-2.5">
                <span className="font-mono text-xs text-tertiary">interface {"{ ... }"}</span>
                <span className="text-xs text-on-surface-variant">
                  La ficha que define un objeto.
                </span>
              </div>
              <div className="flex flex-col gap-1 rounded-lg bg-surface-container p-2.5">
                <span className="font-mono text-xs text-primary">prop?: tipo</span>
                <span className="text-xs text-on-surface-variant">
                  El ? marca algo como opcional.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* CONTENIDO PRINCIPAL: el módulo completo, en orden, scrolleando */}
        <div className="col-span-12 flex flex-col gap-4 lg:order-1 lg:col-span-9">
          <article className="flex flex-col gap-10 rounded-xl bg-surface-container-low p-6 shadow-md">
            {/* ============ PASO 1: ¿Qué es TS? ============ */}
            <section className="flex flex-col gap-4">
              <CabeceraPaso paso={1} total={5} minutos={3} />
              <TituloLeccion>
                TypeScript es tu JavaScript...{" "}
                <span className="text-primary">con un corrector ortográfico</span>
              </TituloLeccion>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                No estás aprendiendo un lenguaje nuevo: estás aprendiendo a
                anotar tu JS. Todo código JS válido ES código TS válido. Lo que
                agrega TS es una capa de <strong className="text-on-surface">tipos que se
                revisan antes de ejecutar</strong> — como un corrector que subraya
                errores mientras escribes, en vez de que el programa falle
                delante del usuario.
              </p>

              <ComparacionCodigo
                titulo="La misma función en ambos lenguajes"
                codigoJs={
                  <>
                    <span className="text-tertiary">function</span>{" "}
                    <span className="text-primary">saludar</span>(nombre) {"{"}
                    {"\n"}  <span className="text-tertiary">return</span>{" "}
                    <span className="text-secondary">&quot;Hola &quot;</span> + nombre;
                    {"\n"}{"}"}
                    {"\n"}
                    {"\n"}
                    <span className="text-outline">
                      {"// saludar(42) funciona... y devuelve tonterías"}
                    </span>
                  </>
                }
                codigoTs={
                  <>
                    <span className="text-tertiary">function</span>{" "}
                    <span className="text-primary">saludar</span>(nombre:{" "}
                    <span className="text-tertiary">string</span>):{" "}
                    <span className="text-tertiary">string</span> {"{"}
                    {"\n"}  <span className="text-tertiary">return</span>{" "}
                    <span className="text-secondary">&quot;Hola &quot;</span> + nombre;
                    {"\n"}{"}"}
                    {"\n"}
                    {"\n"}
                    <span className="text-outline">
                      {"// saludar(42) ✗ error ANTES de ejecutar"}
                    </span>
                  </>
                }
                nota="Lo único que se agregó: nombre: string y : string. Con eso, el editor te avisa al pasar un número por error."
              />

              <div className="flex items-center gap-3 rounded-lg bg-surface-container p-3">
                <span className="material-symbols-outlined text-[20px] text-tertiary">
                  lightbulb
                </span>
                <p className="text-xs text-on-surface">
                  <strong>Recuerda:</strong> el navegador nunca ve TypeScript.
                  Se compila a JS normal. Los tipos son entrenamiento para ti y
                  seguridad en desarrollo, no código extra en producción.
                </p>
              </div>
            </section>

            {/* ============ PASO 2: Tipos básicos ============ */}
            <section className="flex flex-col gap-4 border-t border-surface-container-high pt-8">
              <CabeceraPaso paso={2} total={5} minutos={4} />
              <TituloLeccion>
                Los 4 tipos que usarás el{" "}
                <span className="text-primary">90% del tiempo</span>
              </TituloLeccion>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                <code className="font-mono text-secondary">string</code>,{" "}
                <code className="font-mono text-secondary">number</code>,{" "}
                <code className="font-mono text-secondary">boolean</code> y{" "}
                <code className="font-mono text-secondary">{"Tipo[]"}</code>{" "}
                (arreglos). Todo lo demás son combinaciones de estos. La regla
                de oro: <strong className="text-on-surface">tipa lo que cruza una
                frontera</strong> (props, APIs); dentro de una función, TS
                infiere el tipo solo.
              </p>

              <ComparacionCodigo
                titulo="Declarar variables"
                codigoJs={
                  <>
                    <span className="text-tertiary">const</span> edad ={" "}
                    <span className="text-secondary">25</span>;
                    {"\n"}
                    <span className="text-tertiary">const</span> nombre ={" "}
                    <span className="text-secondary">&quot;Ana&quot;</span>;
                    {"\n"}
                    {"\n"}
                    <span className="text-outline">
                      {"// JS no sabe (ni le importa)"}
                    </span>
                    {"\n"}
                    <span className="text-tertiary">const</span> total ={" "}
                    <span className="text-secondary">&quot;10&quot;</span> +{" "}
                    <span className="text-secondary">5</span>;{" "}
                    <span className="text-outline">{"// \"105\" 😱"}</span>
                  </>
                }
                codigoTs={
                  <>
                    <span className="text-tertiary">const</span> edad:{" "}
                    <span className="text-tertiary">number</span> ={" "}
                    <span className="text-secondary">25</span>;
                    {"\n"}
                    <span className="text-tertiary">const</span> nombre:{" "}
                    <span className="text-tertiary">string</span> ={" "}
                    <span className="text-secondary">&quot;Ana&quot;</span>;
                    {"\n"}
                    {"\n"}
                    <span className="text-tertiary">const</span> total:{" "}
                    <span className="text-tertiary">number</span> ={" "}
                    <span className="text-secondary">&quot;10&quot;</span> +{" "}
                    <span className="text-secondary">5</span>;{" "}
                    <span className="text-error">{"// ✗ error al escribir"}</span>
                  </>
                }
                nota={'El clásico "10" + 5 = "105" de JavaScript. En TS, si prometes que total es number, el editor te frena en el momento de escribirlo.'}
              />

              <div className="flex items-start gap-3 rounded-xl bg-surface-container-high p-4">
                <span className="material-symbols-outlined text-[22px] text-error">warning</span>
                <p className="text-xs leading-relaxed text-on-surface-variant">
                  <strong className="text-on-surface">Trampa común — el tipo any:</strong>{" "}
                  cuando TS marca un error, cambiar el tipo a{" "}
                  <code className="font-mono text-error">any</code> silencia el
                  aviso... y desactiva TODA la protección. Es como tapar el
                  detector de humo en vez de apagar el fuego.
                </p>
              </div>
            </section>

            {/* ============ PASO 3: Interfaces ============ */}
            <section className="flex flex-col gap-4 border-t border-surface-container-high pt-8">
              <CabeceraPaso paso={3} total={5} minutos={4} />
              <TituloLeccion>
                Interfaces: la{" "}
                <span className="text-primary">ficha del objeto</span>
              </TituloLeccion>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Cuando un dato tiene varias propiedades (un usuario, un
                producto, una tarea), en vez de anotar propiedad por propiedad
                defines una <code className="font-mono text-tertiary">interface</code>:
                un contrato que dice qué campos existen y de qué tipo son. El{" "}
                <code className="font-mono text-secondary">?</code> marca campos
                opcionales.
              </p>

              <ComparacionCodigo
                titulo="Describir un usuario"
                codigoJs={
                  <>
                    <span className="text-tertiary">const</span> usuario = {"{"}
                    {"\n"}  id: <span className="text-secondary">1</span>,
                    {"\n"}  nombre:{" "}
                    <span className="text-secondary">&quot;Ana&quot;</span>,
                    {"\n"}{"}"};
                    {"\n"}
                    {"\n"}
                    <span className="text-outline">
                      {"// ¿qué campos tiene un usuario?"}
                    </span>
                    {"\n"}
                    <span className="text-outline">
                      {"// hay que leer TODO el código para saberlo"}
                    </span>
                  </>
                }
                codigoTs={
                  <>
                    <span className="text-tertiary">interface</span>{" "}
                    <span className="text-primary">Usuario</span> {"{"}
                    {"\n"}  id: <span className="text-tertiary">number</span>;
                    {"\n"}  nombre: <span className="text-tertiary">string</span>;
                    {"\n"}  email?: <span className="text-tertiary">string</span>;{" "}
                    <span className="text-outline">{"// ? opcional"}</span>
                    {"\n"}{"}"}
                    {"\n"}
                    {"\n"}
                    <span className="text-tertiary">const</span> usuario:{" "}
                    <span className="text-primary">Usuario</span> = {"{ id: "}
                    <span className="text-secondary">1</span>
                    {", nombre: "}
                    <span className="text-secondary">&quot;Ana&quot;</span>
                    {" };"}
                  </>
                }
                nota="La interface es documentación viva: cualquier editor te autocompleta usuario. y te avisa si escribes usuario.edad (no existe en la ficha)."
              />

              <div className="flex items-center gap-3 rounded-lg bg-surface-container p-3">
                <span className="material-symbols-outlined text-[20px] text-tertiary">
                  lightbulb
                </span>
                <p className="text-xs text-on-surface">
                  <strong>Recuerda:</strong> si un error dice{" "}
                  <em>Property &quot;edad&quot; does not exist on type &quot;Usuario&quot;</em>,
                  no es un bug de TS — es TS haciendo su trabajo. O falta en la
                  ficha, o sobra en el uso.
                </p>
              </div>
            </section>

            {/* ============ PASO 4: Props tipadas ============ */}
            <section className="flex flex-col gap-4 border-t border-surface-container-high pt-8">
              <CabeceraPaso paso={4} total={5} minutos={4} />
              <TituloLeccion>
                Props: el lugar donde{" "}
                <span className="text-primary">TS brilla en React</span>
              </TituloLeccion>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Un componente es una función; las props son sus parámetros. En
                TypeScript, defines la <strong className="text-on-surface">interface de las
                props</strong> y el compilador verifica cada lugar donde usas el
                componente. El editor te autocompleta las props disponibles.
              </p>

              <ComparacionCodigo
                titulo="Un componente Tarjeta"
                codigoJs={
                  <>
                    <span className="text-tertiary">function</span>{" "}
                    <span className="text-primary">Tarjeta</span>({"{ titulo }"}) {"{"}
                    {"\n"}  <span className="text-tertiary">return</span>{" "}
                    <span className="text-primary-fixed-dim">{"<h1>"}</span>
                    {"{titulo}"}
                    <span className="text-primary-fixed-dim">{"</h1>"}</span>;
                    {"\n"}{"}"}
                    {"\n"}
                    {"\n"}
                    <span className="text-outline">
                      {"// <Tarjeta /> sin titulo? falla en el navegador"}
                    </span>
                  </>
                }
                codigoTs={
                  <>
                    <span className="text-tertiary">interface</span>{" "}
                    <span className="text-primary">TarjetaProps</span> {"{"}
                    {"\n"}  titulo: <span className="text-tertiary">string</span>;
                    {"\n"}{"}"}
                    {"\n"}
                    {"\n"}
                    <span className="text-tertiary">function</span>{" "}
                    <span className="text-primary">Tarjeta</span>(
                    {"{ titulo }: TarjetaProps"}) {"{"}
                    {"\n"}  <span className="text-tertiary">return</span>{" "}
                    <span className="text-primary-fixed-dim">{"<h1>"}</span>
                    {"{titulo}"}
                    <span className="text-primary-fixed-dim">{"</h1>"}</span>;
                    {"\n"}{"}"}
                    {"\n"}
                    {"\n"}
                    <span className="text-outline">
                      {"// <Tarjeta /> sin titulo? ✗ error al escribir"}
                    </span>
                  </>
                }
                nota="Olvidar una prop obligatoria es el error más común de un JR en React. TS lo convierte en un aviso inmediato en el editor, no en una pantalla rota para el usuario."
              />
            </section>

            {/* ============ PASO 5: Reto ============ */}
            <section className="flex flex-col gap-4 border-t border-surface-container-high pt-8">
              <CabeceraPaso paso={5} total={5} minutos={10} />
              <TituloLeccion>
                Reto práctico:{" "}
                <span className="text-secondary">tu primer código tipado</span>
              </TituloLeccion>
              <p className="text-sm leading-relaxed text-on-surface-variant">
                Abre tu editor y crea una interface{" "}
                <code className="font-mono text-primary">Usuario</code> con las
                propiedades{" "}
                <code className="font-mono text-secondary">id: number</code>,{" "}
                <code className="font-mono text-secondary">nombre: string</code>{" "}
                y{" "}
                <code className="font-mono text-secondary">email?: string</code>{" "}
                (opcional). Luego escribe un componente que la reciba como prop
                e intenta usar{" "}
                <code className="font-mono text-secondary">usuario.edad</code> —{" "}
                <strong className="text-on-surface">observa el error que TS te
                muestra antes de ejecutar nada.</strong> En el laboratorio (
                <code className="font-mono text-primary">/practica</code>) puedes
                tocar un componente con estado real.
              </p>
              <div className="flex items-center gap-3 rounded-lg bg-surface-container p-3 text-secondary">
                <span className="material-symbols-outlined text-[20px] text-secondary">
                  verified
                </span>
                <span className="text-xs text-on-surface">
                  <strong>Buena Práctica:</strong> tipa primero los datos que
                  vienen de afuera (APIs, props). El interior de las funciones
                  déjalo que TS lo infiera.
                </span>
              </div>
            </section>
          </article>
        </div>
      </div>

      {/* ---------- Dock inferior ---------- */}
      <footer className="mt-1 flex w-full flex-wrap items-center justify-between gap-2 rounded-xl bg-surface-container-low px-6 py-2 shadow-lg">
        <div className="flex items-center gap-3">
          <Link
            href="/aprender/next"
            className="flex items-center gap-1.5 rounded-lg bg-surface-container px-4 py-2 text-sm text-on-surface transition-colors hover:bg-surface-container-high"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            Paso Anterior
          </Link>
          <Link
            href="/practica"
            title="Ir al laboratorio"
            className="rounded-lg bg-surface-container p-2 text-on-surface-variant transition-colors hover:bg-surface-container-high hover:text-on-surface"
          >
            <span className="material-symbols-outlined text-[18px]">bookmark_add</span>
          </Link>
        </div>

        <div className="flex min-w-72 items-center gap-4">
          <div className="flex w-full flex-col gap-1">
            <div className="flex items-center justify-between font-mono text-xs text-on-surface-variant">
              <span className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px] text-secondary">
                  trending_up
                </span>
                Progreso del Módulo 01
              </span>
              <span className="font-semibold text-secondary">80% completado</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-surface-container-highest">
              <div className="h-full w-[80%] rounded-full bg-gradient-to-r from-primary via-secondary to-secondary-container transition-all duration-500" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="mr-1 hidden flex-col items-end sm:flex">
            <span className="font-mono text-xs font-bold text-secondary">+50 XP</span>
            <span className="text-[11px] text-outline">Recompensa por paso</span>
          </div>
          <Link
            href="/aprender/next"
            className="flex items-center gap-2 rounded-full bg-secondary px-6 py-2.5 text-sm font-bold text-on-secondary shadow-md transition-all hover:brightness-110 active:scale-95"
          >
            Validar y Continuar
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}
