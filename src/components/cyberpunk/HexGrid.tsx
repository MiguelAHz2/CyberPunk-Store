"use client";

import { useEffect, useRef } from "react";

interface HexGridProps {
  className?: string;
  opacity?: number;
  color?: string;
}

export function HexGrid({
  className = "",
  opacity = 0.06,
  color = "#00f5ff",
}: HexGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      draw();
    };

    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = color;
      ctx.lineWidth   = 0.5;
      ctx.globalAlpha = opacity;

      const size   = 28;
      const w      = size * 2;
      const h      = Math.sqrt(3) * size;
      const cols   = Math.ceil(canvas.width  / w) + 2;
      const rows   = Math.ceil(canvas.height / h) + 2;

      for (let row = -1; row < rows; row++) {
        for (let col = -1; col < cols; col++) {
          const x = col * w * 0.75;
          const y = row * h + (col % 2 === 0 ? 0 : h / 2);
          hexPath(ctx, x, y, size);
          ctx.stroke();
        }
      }
    }

    function hexPath(
      ctx: CanvasRenderingContext2D,
      x: number,
      y: number,
      size: number
    ) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i - Math.PI / 6;
        const px    = x + size * Math.cos(angle);
        const py    = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(px, py);
        else         ctx.lineTo(px, py);
      }
      ctx.closePath();
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    return () => observer.disconnect();
  }, [color, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden
    />
  );
}
