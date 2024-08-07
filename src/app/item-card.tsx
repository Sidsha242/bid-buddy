import { Button } from "@/components/ui/button";
import { Item } from "@/db/schema";
import { isBidOver } from "@/utils/bids";
import { formatToDollar } from "@/utils/currency";
import Link from "next/link";
import { format } from "date-fns";

export function ItemCard({ item }: { item: Item }) {
  return (
    <div
      key={item.id}
      className="border p-8 rounded-xl flex flex-col space-y-1"
    >
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
      {isBidOver(item) ? (
        <p className="text-lg">Bidding is Over</p>
      ) : (
        <p className="text-lg">
          Ends On: {format(item.endDate, "eeee dd/M/yy")}
        </p>
      )}
      <Button asChild variant={isBidOver(item) ? "outline" : "default"}>
        <Link href={`/items/${item.id}`}>
          {isBidOver(item) ? "View Bid" : "Place Bid"}
        </Link>
      </Button>
    </div>
  );
}
