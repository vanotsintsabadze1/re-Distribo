"use client";

import { useRouter } from "next/navigation";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function NavigationBar() {
  const router = useRouter();

  return (
    <section className="w-full">
      <nav className=" flex items-center justify-end px-4 py-2 w-full">
        <button onClick={() => router.push("/profile")}>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="border border-black">V</AvatarFallback>
          </Avatar>
        </button>
      </nav>
    </section>
  );
}
