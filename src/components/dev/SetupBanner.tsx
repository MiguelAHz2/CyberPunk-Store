import { AlertTriangle, CheckCircle } from "lucide-react";

interface Check {
  label: string;
  ok: boolean;
  hint: string;
}

interface SetupBannerProps {
  checks: Check[];
}

export function SetupBanner({ checks }: SetupBannerProps) {
  const allOk = checks.every((c) => c.ok);
  if (allOk) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[200] max-w-sm border border-yellow-500/40 bg-yellow-500/10 backdrop-blur-md p-4 font-mono text-xs">
      <div className="flex items-center gap-2 mb-3 text-yellow-400">
        <AlertTriangle size={14} />
        <span className="uppercase tracking-widest font-bold">Configuración pendiente</span>
      </div>
      <ul className="flex flex-col gap-2">
        {checks.map(({ label, ok, hint }) => (
          <li key={label} className="flex items-start gap-2">
            {ok ? (
              <CheckCircle size={12} className="text-green-400 mt-0.5 flex-shrink-0" />
            ) : (
              <AlertTriangle size={12} className="text-yellow-400 mt-0.5 flex-shrink-0" />
            )}
            <div>
              <span className={ok ? "text-green-400" : "text-yellow-300"}>{label}</span>
              {!ok && (
                <p className="text-yellow-500/70 mt-0.5">{hint}</p>
              )}
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-3 text-yellow-500/50 text-[0.6rem]">
        Solo visible en desarrollo. Desaparece cuando configures .env.local
      </p>
    </div>
  );
}
