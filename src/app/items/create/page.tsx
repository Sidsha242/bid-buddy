"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth } from "@/auth";
import { createItemAction, isLoggedIn } from "./actions";
import { redirect } from "next/navigation";
import { DatePickerDemo } from "@/components/date-picker";
import { useState } from "react";
import Image from "next/image";

export default function CreatePage() {
  const [date, setDate] = useState<Date | undefined>();
  return (
    <main className="space-y-8">
      <h1 className="text-4xl font-bold">Post an Item</h1>
      <div className="grid grid-cols-2">
        <form
          className="flex flex-col border p-8 rounded-xl space-y-4 max-w-lg"
          onSubmit={async (e) => {
            e.preventDefault();

            if (!date) {
              return;
            }

            const form = e.currentTarget as HTMLFormElement;
            const formData = new FormData(form);

            const name = formData.get("name") as string;
            const desp = formData.get("desp") as string;
            const bidInt = parseInt(formData.get("bidInv") as string);
            const startingPrice = parseInt(
              formData.get("startingPrice") as string
            );
            const startingPriceInCents = Math.floor(startingPrice * 100);
            const bidIntervalInCents = Math.floor(bidInt * 100);

            await createItemAction({
              name,
              desp,
              startingPrice: startingPriceInCents,
              bidInterval: bidIntervalInCents,
              endDate: date,
            });
          }}
        >
          <Input required name="name" placeholder="Name your item" />
          <Input required name="desp" placeholder="Description of item" />
          <Input
            required
            name="startingPrice"
            type="number"
            step="0.01"
            placeholder="What price auction should start (in ₹)"
          />
          <Input required name="bidInv" placeholder="Bid Interval of Item" />
          <DatePickerDemo date={date} setDate={setDate} />
          <Button type="submit" className="self-end">
            Post Item
          </Button>
        </form>
        <Image src="/create.svg" alt="create" width="400" height="400" />
      </div>
    </main>
  );
}
