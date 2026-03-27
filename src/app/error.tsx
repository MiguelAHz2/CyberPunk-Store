"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[NEONTECH ERROR]", error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="font-mono text-xs text-red-400 tracking-widest mb-4">
          // ERROR DEL SISTEMA
        </p>
        <h2 className="font-display text-3xl font-bold uppercase text-text-primary mb-4">
          ALGO FALLÓ
        </h2>
        <p className="font-mono text-xs text-text-muted mb-2">
          {error.message}
        </p>
        {error.digest && (
          <p className="font-mono text-[0.6rem] text-text-dim mb-8">
            Código: {error.digest}
          </p>
        )}
        <div className="flex gap-3 justify-center">
          <button onClick={reset} className="btn-cyber-primary">
            <span>REINTENTAR</span>
          </button>
          <Link href="/" className="btn-cyber-secondary">
            <span>INICIO</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
