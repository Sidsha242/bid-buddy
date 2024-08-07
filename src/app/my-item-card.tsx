"use client";
import { Button } from "@/components/ui/button";
import { Item, items } from "@/db/schema";
import { formatToDollar } from "@/utils/currency";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteItem, editItem } from "./my-item-action";
import { Input } from "@/components/ui/input";
import { FormEvent, useState } from "react";

export function MyItemCard({ item }: { item: Item }) {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formElement = e.currentTarget;
    const formData = new FormData(formElement);
    editItem(formData, item.id);
  };

  const [name, setName] = useState(item.name);
  const [price, setPrice] = useState(0.0);
  const [desp, setDesp] = useState(item.description || "");
  const [bidInt, setBidInt] = useState(0);

  return (
    <div key={item.id} className="border p-8 rounded-xl flex flex-col">
      <h2 className="text-xl font-bold">{item.name}</h2>
      <div className="text-lg">
        Current Bid:{" "}
        <span className="text-xl font-bold animate-pulse">
          ₹{formatToDollar(item.currentBid)}
        </span>
      </div>
      <p className="text-lg">
        Staring Price: ₹{formatToDollar(item.startingPrice)}
      </p>
      <div className="flex space-x-5">
        <Dialog>
          <DialogTrigger>
            <div className="border p-2 rounded-xl w-fit">
              <Trash2 />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to delete this item?
              </DialogTitle>
              <DialogDescription>
                This action cannot be undone.
              </DialogDescription>
              <form
                className="flex justify-center"
                action={deleteItem.bind(null, item.id)}
              >
                <Button>Yes</Button>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger>
            <div className="border p-2 rounded-xl w-fit">
              <Pencil />
            </div>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Item</DialogTitle>
              <DialogDescription>
                On editing current bid will reset to starting price
              </DialogDescription>
              <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                <Input
                  required
                  name="name"
                  placeholder="Name your item"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <Input
                  required
                  name="desp"
                  placeholder="Desp of your item"
                  value={desp}
                  onChange={(e) => setDesp(e.target.value)}
                />
                <Input
                  required
                  name="startingPrice"
                  type="number"
                  step="0.01"
                  placeholder="What price auction should start"
                  onChange={(e) => setPrice(Number(e.target.value))}
                />
                <Input
                  required
                  name="bidInterval"
                  type="number"
                  placeholder="Bid Interval"
                  onChange={(e) => setBidInt(Number(e.target.value))}
                />
                <Button type="submit">Save</Button>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
