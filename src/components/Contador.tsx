// Client Component: corre en el NAVEGADOR.
// "use client" porque usa estado (useState) y eventos (onClick).

"use client";

import { useState } from "react";

export default function Contador() {
  const [clicks, setClicks] = useState(0);

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl bg-surface-container p-6">
      <p className="font-mono text-sm text-on-surface-variant">
        Llevas{" "}
        <span className="text-xl font-bold text-secondary">{clicks}</span> clicks
      </p>
      <button
        onClick={() => setClicks(clicks + 1)}
        className="rounded-full bg-secondary px-6 py-2 text-sm font-bold text-on-secondary shadow-md transition-all hover:brightness-110 active:scale-95"
      >
        Haz click
      </button>
    </div>
  );
}
