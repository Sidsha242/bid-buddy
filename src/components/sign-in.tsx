import { signIn } from "@/auth";
import { Button } from "./ui/button";
import { FaGoogle } from "react-icons/fa";
export function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <Button type="submit" className="flex gap-4">
        <FaGoogle />
        Signin with Google
      </Button>
    </form>
  );
}
