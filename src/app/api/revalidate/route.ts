import { revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

/**
 * Webhook endpoint para revalidar caché desde Shopify.
 * Configura en Shopify: Admin > Settings > Notifications > Webhooks
 * URL: https://tu-dominio.com/api/revalidate?secret=TU_SECRET
 */
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.REVALIDATION_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const body = await request.json().catch(() => ({}));
  const topic = request.headers.get("x-shopify-topic") ?? "";

  if (topic.startsWith("products/")) {
    const handle = (body as { handle?: string }).handle;
    revalidateTag("products", "max");
    if (handle) revalidateTag(`product-${handle}`, "max");
  }

  if (topic.startsWith("collections/")) {
    const colHandle = (body as { handle?: string }).handle;
    revalidateTag("collections", "max");
    if (colHandle) revalidateTag(`collection-${colHandle}`, "max");
  }

  return NextResponse.json({ revalidated: true, timestamp: Date.now() });
}
