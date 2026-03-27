export function ScanlineOverlay() {
  return (
    <>
      {/* Scanlines */}
      <div className="scanlines" aria-hidden />
      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-[9998]"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)",
        }}
      />
    </>
  );
}
