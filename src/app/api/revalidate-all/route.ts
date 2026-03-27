import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");

  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  revalidateTag("products", "max");
  revalidateTag("collections", "max");

  return NextResponse.json({
    ok: true,
    revalidated: ["products", "collections"],
    timestamp: new Date().toISOString(),
  });
}
