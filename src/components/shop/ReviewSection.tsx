import { MessageSquare } from "lucide-react";
import { StarDisplay } from "./StarRating";
import { ReviewForm } from "./ReviewForm";
import { getReviews, getProductRating, getUserReview } from "@/app/actions/reviews";
import { createClient } from "@/lib/supabase/server";
import type { Review } from "@/app/actions/reviews";

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0)  return "Hoy";
  if (days === 1)  return "Ayer";
  if (days < 30)   return `Hace ${days} días`;
  if (days < 365)  return `Hace ${Math.floor(days / 30)} meses`;
  return `Hace ${Math.floor(days / 365)} años`;
}

function ReviewCard({ review }: { review: Review }) {
  const name = review.profiles?.full_name ?? "Usuario";
  const initials = name.slice(0, 2).toUpperCase();

  return (
    <div className="border-b border-border-dim pb-5 last:border-0 last:pb-0">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 flex items-center justify-center border border-border-dim bg-bg-card font-display text-[0.6rem] text-cyan shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="font-mono text-xs text-text-muted">{name}</span>
            <span className="font-mono text-[0.6rem] text-text-dim shrink-0">
              {timeAgo(review.created_at)}
            </span>
          </div>
          <div className="flex items-center gap-2 mb-2">
            {[1,2,3,4,5].map((s) => (
              <span key={s} className={s <= review.rating ? "text-yellow" : "text-text-dim"}>
                ★
              </span>
            ))}
            {review.verified && (
              <span className="font-mono text-[0.55rem] text-green-400 tracking-widest border border-green-500/30 px-1">
                VERIFICADO
              </span>
            )}
          </div>
          {review.title && (
            <p className="font-display text-xs tracking-wide text-text-primary mb-1">
              {review.title}
            </p>
          )}
          {review.body && (
            <p className="font-mono text-xs text-text-muted leading-relaxed">
              {review.body}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export async function ReviewSection({
  productId,
  productHandle,
}: {
  productId:     string;
  productHandle: string;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const [reviews, rating, userReview] = await Promise.all([
    getReviews(productId),
    getProductRating(productId),
    user ? getUserReview(productId) : Promise.resolve(null),
  ]);

  return (
    <section className="mt-16 border-t border-border-dim pt-12">
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <p className="font-mono text-xs text-pink tracking-widest mb-2">
            {"// OPINIONES"}
          </p>
          <h2 className="font-display text-2xl font-bold uppercase text-text-primary">
            Reseñas
          </h2>
        </div>
        {rating && rating.review_count > 0 && (
          <div className="text-right">
            <p className="font-display text-3xl font-black text-yellow">
              {Number(rating.avg_rating).toFixed(1)}
            </p>
            <StarDisplay
              rating={Number(rating.avg_rating)}
              count={rating.review_count}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario */}
        <div>
          <ReviewForm
            productId={productId}
            productHandle={productHandle}
            existingReview={userReview}
            isLoggedIn={Boolean(user)}
          />
        </div>

        {/* Lista */}
        <div className="lg:col-span-2">
          {reviews.length === 0 ? (
            <div className="border border-border-dim p-10 text-center">
              <MessageSquare size={24} className="text-text-dim mx-auto mb-3" />
              <p className="font-mono text-xs text-text-dim">
                {"// Sé el primero en reseñar este producto"}
              </p>
            </div>
          ) : (
            <div className="cyber-card p-6 flex flex-col gap-5">
              {reviews.map((r) => (
                <ReviewCard key={r.id} review={r} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
