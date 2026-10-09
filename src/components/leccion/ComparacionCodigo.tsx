// Bloque de comparación JS vs TypeScript — reutilizable en cualquier lección.
// Muestra el mismo ejemplo en los dos lenguajes, lado a lado, para que
// quien viene de JS vea exactamente qué se agrega y qué se gana.
//
// Server Component: solo presenta los datos que recibe por props.

interface ComparacionCodigoProps {
  titulo: string; // ej: "Declarar una función"
  codigoJs: React.ReactNode; // código JS coloreado (spans)
  codigoTs: React.ReactNode; // mismo ejemplo en TS
  nota?: string; // conclusión debajo de la comparación
}

function EncabezadoLenguaje({ lenguaje, color }: { lenguaje: string; color: string }) {
  return (
    <div className={`flex items-center gap-1.5 px-3 py-1.5 font-mono text-xs ${color}`}>
      <span className="material-symbols-outlined text-[14px]">code</span>
      {lenguaje}
    </div>
  );
}

export default function ComparacionCodigo({
  titulo,
  codigoJs,
  codigoTs,
  nota,
}: ComparacionCodigoProps) {
  return (
    <div className="flex flex-col gap-2">
      <p className="text-xs font-semibold uppercase tracking-wider text-outline">
        {titulo}
      </p>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {/* JavaScript */}
        <div className="overflow-hidden rounded-lg bg-surface-container-lowest">
          <EncabezadoLenguaje lenguaje="JavaScript" color="text-tertiary" />
          <div className="border-t border-surface-container p-3 font-mono text-xs leading-[20px] text-on-surface">
            {codigoJs}
          </div>
        </div>
        {/* TypeScript */}
        <div className="overflow-hidden rounded-lg bg-surface-container-lowest ring-1 ring-primary/30">
          <EncabezadoLenguaje lenguaje="TypeScript" color="text-secondary" />
          <div className="border-t border-surface-container p-3 font-mono text-xs leading-[20px] text-on-surface">
            {codigoTs}
          </div>
        </div>
      </div>
      {nota && (
        <p className="flex items-start gap-1.5 text-xs text-on-surface-variant">
          <span className="material-symbols-outlined mt-0.5 text-[14px] text-secondary">
            arrow_downward
          </span>
          {nota}
        </p>
      )}
    </div>
  );
}
