"use client";

import { useState, useTransition } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { StarRating } from "./StarRating";
import { submitReview, deleteReview } from "@/app/actions/reviews";
import { useToast } from "@/store/toast";
import type { Review } from "@/app/actions/reviews";

interface ReviewFormProps {
  productId:     string;
  productHandle: string;
  existingReview: Review | null;
  isLoggedIn:    boolean;
}

export function ReviewForm({
  productId,
  productHandle,
  existingReview,
  isLoggedIn,
}: ReviewFormProps) {
  const toast = useToast();
  const [isPending, start] = useTransition();
  const [editing, setEditing] = useState(!existingReview);
  const [rating,  setRating]  = useState(existingReview?.rating  ?? 0);
  const [title,   setTitle]   = useState(existingReview?.title   ?? "");
  const [body,    setBody]     = useState(existingReview?.body    ?? "");

  if (!isLoggedIn) {
    return (
      <div className="border border-border-dim bg-bg-card p-5 text-center">
        <p className="font-mono text-xs text-text-muted mb-3">
          {"// Inicia sesión para dejar una reseña"}
        </p>
        <a href="/login" className="btn-cyber-secondary text-sm">
          <span>INICIAR SESIÓN</span>
        </a>
      </div>
    );
  }

  if (existingReview && !editing) {
    return (
      <div className="border border-border-dim bg-bg-card p-5">
        <div className="flex items-center justify-between mb-3">
          <p className="font-mono text-[0.6rem] text-cyan tracking-widest uppercase">
            Tu reseña
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setEditing(true)}
              className="text-text-dim hover:text-cyan transition-colors"
              aria-label="Editar reseña"
            >
              <Pencil size={12} />
            </button>
            <button
              onClick={() =>
                start(async () => {
                  const r = await deleteReview(productHandle);
                  if (r.ok) {
                    toast.info("Reseña eliminada");
                    setEditing(true);
                    setRating(0); setTitle(""); setBody("");
                  } else {
                    toast.error("Error", r.error);
                  }
                })
              }
              className="text-text-dim hover:text-red-400 transition-colors"
              aria-label="Eliminar reseña"
            >
              <Trash2 size={12} />
            </button>
          </div>
        </div>
        <StarRating value={existingReview.rating} readonly size={14} />
        {existingReview.title && (
          <p className="font-display text-xs tracking-wide text-text-primary mt-2">
            {existingReview.title}
          </p>
        )}
        {existingReview.body && (
          <p className="font-mono text-xs text-text-muted mt-1 leading-relaxed">
            {existingReview.body}
          </p>
        )}
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) { toast.warning("Selecciona una puntuación"); return; }
    start(async () => {
      const r = await submitReview({ product_id: productId, product_handle: productHandle, rating, title, body });
      if (r.ok) {
        toast.success(existingReview ? "Reseña actualizada" : "Reseña publicada");
        setEditing(false);
      } else {
        toast.error("Error al publicar", r.error);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="border border-border-dim bg-bg-card p-5 flex flex-col gap-4">
      <p className="font-mono text-[0.6rem] text-cyan tracking-widest uppercase">
        {existingReview ? "Editar reseña" : "Escribe una reseña"}
      </p>

      <div className="flex flex-col gap-1">
        <label className="font-mono text-[0.6rem] text-text-dim tracking-widest uppercase">
          Puntuación *
        </label>
        <StarRating value={rating} onChange={setRating} size={20} />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-mono text-[0.6rem] text-text-dim tracking-widest uppercase">
          Título
        </label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Resumen de tu experiencia"
          className="cyber-input"
          maxLength={100}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="font-mono text-[0.6rem] text-text-dim tracking-widest uppercase">
          Comentario
        </label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Cuéntanos más sobre el producto..."
          className="cyber-input resize-none"
          rows={4}
          maxLength={1000}
        />
      </div>

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending || rating === 0}
          className="btn-cyber-primary disabled:opacity-50"
        >
          <span>{isPending ? "PUBLICANDO..." : "PUBLICAR RESEÑA"}</span>
        </button>
        {existingReview && (
          <button
            type="button"
            onClick={() => setEditing(false)}
            className="font-mono text-xs text-text-dim hover:text-text-muted transition-colors"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}
