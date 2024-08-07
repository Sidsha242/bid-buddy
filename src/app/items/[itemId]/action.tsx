"use server";

import { auth } from "@/auth";
import { database } from "@/db/database";
import { bids, items } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export async function createBidAction(itemId: number) {
  const session = await auth();

  const userId = session?.user?.id;

  if (!userId) {
    redirect("/login");
    //throw new Error("You must be logged in to place a bid");
  }

  const item = await database.query.items.findFirst({
    where: eq(items.id, itemId),
  });

  if (!item) {
    throw new Error("Item not found");
  }

  const latestBidValue = item.currentBid + item.bidInterval; //highest bid plus interval

  await database.insert(bids).values({
    amount: latestBidValue,
    itemId,
    userId,
    timestamp: new Date(),
  });

  await database
    .update(items)
    .set({
      currentBid: latestBidValue,
    })
    .where(eq(items.id, itemId));

  //send notfn to everyone else on this item

  revalidatePath(`/items/${itemId}`);
}
