"use client";
import { auth } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import {
  NotificationFeedPopover,
  NotificationIconButton,
} from "@knocklabs/react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRef, useState } from "react";

export function Header() {
  const session = useSession();
  const [isVisible, setIsVisible] = useState(false);
  const notifButtonRef = useRef(null);

  return (
    <div className="bg-gray-200 rounded-b-xl py-4">
      <div className="container flex justify-between items-center">
        <div className="flex items-center gap-12">
          {/* <Image src="/logo.png" width="50" height="50" alt="logo"></Image> */}
          <Link
            className="font-bold text-2xl p-2 bg-blue-400 rounded-lg text-white"
            href="/"
          >
            Bidify
          </Link>

          <Link className="font-semibold text-md" href="/items/create">
            Create Auction
          </Link>
          <Link className="font-semibold text-md" href="/">
            All Auctions
          </Link>

          <Link className="font-semibold text-md" href="/auctions">
            My Auctions
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <NotificationIconButton
            ref={notifButtonRef}
            onClick={(e) => setIsVisible(!isVisible)}
          />
          <NotificationFeedPopover
            buttonRef={notifButtonRef}
            isVisible={isVisible}
            onClose={() => setIsVisible(false)}
          />
          <div>{session?.data?.user?.name}</div>
          <div>
            {session.data ? (
              <Button asChild>
                <Link href={`/login`}>Sign Out</Link>
              </Button>
            ) : (
              <Button asChild>
                <Link href={`/login`}>Sign In</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
