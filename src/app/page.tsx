import { database } from "@/db/database";
import { ItemCard } from "./item-card";
import PaginationControls from "@/components/PaginationControls";
import SearchBar from "@/components/search-bar";

export default async function HomePage({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
  //searchParams: { [key: string]: string | string[] | undefined };
}) {
  const allItems = await database.query.items.findMany();
  const query = searchParams?.query || "";

  // const page = searchParams["page"] ?? "1";
  // const per_page = searchParams["per_page"] ?? "2";

  // const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ...
  // const end = start + Number(per_page); // 5, 10, 15 ...

  //const entries = allItems.slice(start, end);

  const displayedData = query
    ? allItems.filter((element) =>
        element?.name.toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  return (
    <main className="space-y-8">
      <h1 className="text-4xl font-bold">Items for Sale</h1>
      <SearchBar placeholder="Search for Item.." />
      <div className="grid grid-cols-3 gap-8">
        {displayedData.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
      <div className="flex justify-center">
        {/* <PaginationControls
          hasNextPage={end < allItems.length}
          hasPrevPage={start > 0}
        /> */}
      </div>
    </main>
  );
}
