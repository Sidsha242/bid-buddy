import { auth, signIn } from "@/auth";
import { SignIn } from "@/components/sign-in";
import { SignOut } from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { FaGoogle } from "react-icons/fa";

export default async function LoginPage() {
  const session = await auth();
  return (
    <div className="space-y-8 flex flex-col items-center justify-center">
      <Image src="/login.svg" width="200" height="200" alt="Package"></Image>
      {session ? (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex justify-center">LogOut</h2>
          <SignOut />
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-bold flex justify-center">
            Please Login
          </h2>
          <SignIn />
        </div>
      )}
    </div>
  );
}
