"use client";

import { useUser } from "@/scripts/hooks/useUser";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function NavigationBar() {
  const router = useRouter();
  const user = useUser();

  return (
    <section className="w-full">
      <nav className=" flex items-center justify-end px-4 py-2 w-full">
        <button onClick={() => router.push("/profile")}>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="border border-black">{user?.email[0].toUpperCase()}</AvatarFallback>
          </Avatar>
        </button>
      </nav>
    </section>
  );
}
