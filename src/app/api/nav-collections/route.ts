import { NextResponse } from "next/server";
import { getCollections } from "@/lib/shopify";

export const revalidate = 60;

export async function GET() {
  const collections = await getCollections(8).catch(() => []);
  return NextResponse.json(
    collections.map((c) => ({ handle: c.handle, title: c.title }))
  );
}
