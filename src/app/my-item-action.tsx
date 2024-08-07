"use server";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
export async function deleteItem(itemId: number) {
  await database.delete(items).where(eq(items.id, itemId));
  revalidatePath(`/auctions`);
}

export async function editItem(formData: FormData, itemId: number) {
  const startingPrice = formData.get("startingPrice") as string;
  const bidInt = formData.get("bidInterval") as string;
  const priceAsCents = Math.floor(parseFloat(startingPrice) * 100);
  const bidIntAsCents = Math.floor(parseFloat(bidInt) * 100);

  await database
    .update(items)
    .set({
      name: formData.get("name") as string,
      description: formData.get("desp") as string,
      startingPrice: priceAsCents,
      bidInterval: bidIntAsCents,
      currentBid: priceAsCents,
    })
    .where(eq(items.id, itemId));

  revalidatePath(`/auctions`);
}
