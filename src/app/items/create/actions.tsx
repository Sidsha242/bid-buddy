"use server";
import { database } from "@/db/database";
import { items } from "@/db/schema";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";

export async function createItemAction({
  name,
  desp,
  startingPrice,
  bidInterval,
  endDate,
}: {
  name: string;
  desp: string;
  startingPrice: number;
  bidInterval: number;
  endDate: Date;
}) {
  const session = await auth();
  if (!session) {
    throw new Error("Unathorized");
  }
  const user = session.user;

  if (!user || !user.id) {
    //or else you have to add ? and !
    toast.error("Unathorized");
    throw new Error("Unathorized");
  }

  await database.insert(items).values({
    name: name,
    description: desp,
    startingPrice,
    currentBid: startingPrice,
    bidInterval: bidInterval,
    userId: user.id,
    endDate,
  });
  redirect("/");
}

export async function isLoggedIn() {
  const session = await auth();
  if (!session) {
    return false;
  } else {
    return true;
  }
}
