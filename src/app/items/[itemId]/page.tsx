import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { database } from "@/db/database";
import { desc, eq } from "drizzle-orm";
import { bids, items } from "@/db/schema";
import Link from "next/link";
import Image from "next/image";
import { format, formatDistance } from "date-fns";
import { formatToDollar } from "@/utils/currency";
import { createBidAction } from "./action";

function formatTimestamp(timestamp: Date) {
  //to find distance from now and bid sub
  return formatDistance(timestamp, new Date(), { addSuffix: true });
}

export default async function ItemPage({
  params: { itemId },
}: {
  params: { itemId: string };
}) {
  const item = await database.query.items.findFirst({
    where: eq(items.id, parseInt(itemId)),
  });

  if (!item) {
    return (
      <div className="space-y-8 flex flex-col items-center justify-center">
        <Image
          src="/package.svg"
          width="200"
          height="200"
          alt="Package"
        ></Image>
        <h1 className="font-bold text-2xl">Item not found</h1>
        <p>The item you are trying to view is invalid</p>
        <Button asChild>
          <Link href="/">View Auctions</Link>
        </Button>
      </div>
    );
  }

  const allBids = await database.query.bids.findMany({
    where: eq(bids.itemId, parseInt(itemId)),
    orderBy: desc(bids.id),
    with: {
      user: {
        columns: {
          image: true,
          name: true,
        },
      },
    },
  });

  const hasBids = allBids.length > 0;

  return (
    <main>
      <div className="grid grid-cols-2">
        <div className="space-y-2">
          <div className="mb-4">
            <h1 className="text-4xl font-bold">
              {" "}
              <span className="font-normal">Auction for</span> {item.name}
            </h1>
            <p className="text-lg font-light">{item.description}</p>
          </div>
          <div className="text-xl">
            Current Bid{" "}
            <span className="text-2xl font-bold animate-pulse">
              ₹{formatToDollar(item.currentBid)}
            </span>
          </div>
          <div>
            Starting price of{" "}
            <span className="font-bold">
              ₹{formatToDollar(item.startingPrice)}
            </span>
          </div>
          <div>
            Bid Interval{" "}
            <span className="font-bold">
              ₹{formatToDollar(item.bidInterval)}
            </span>
          </div>
          <div>
            End Date{" "}
            <span className="font-bold">
              Ends On: {format(item.endDate, "eeee dd/M/yy")}
            </span>
          </div>
        </div>

        <div className="space-y-6 flex-1">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold">Current Bids</h2>
            <form action={createBidAction.bind(null, item.id)}>
              <Button>Place a Bid</Button>
            </form>
          </div>

          {hasBids ? (
            <ul>
              {allBids.map((bid) => (
                <li key={bid.id} className="bg-gray-100 rounded-xl p-8 mb-5">
                  <div>
                    <div className="flex gap-4">
                      <span className="font-bold">
                        ₹{formatToDollar(bid.amount)}
                      </span>
                      <span className="font-bold">{bid.user.name}</span>
                      <Image
                        className="rounded-full"
                        width="35"
                        height="35"
                        src={bid.user.image!}
                        alt="user-image"
                      />
                    </div>
                  </div>
                  <span>{formatTimestamp(bid.timestamp)}</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-4">
              <Image
                src="/package.svg"
                width="200"
                height="200"
                alt="Package"
              ></Image>
              <h2 className="text-2xl font-bold">No bids yet</h2>
              <form action={createBidAction.bind(null, item.id)}>
                <Button>Place a Bid</Button>
              </form>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
