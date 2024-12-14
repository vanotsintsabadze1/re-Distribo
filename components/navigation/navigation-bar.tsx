"use client";

import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export default function NavigationBar() {
  return (
    <section className="w-full">
      <nav className=" flex items-center justify-end px-4 py-2 w-full">
        <button>
          <Avatar>
            <AvatarImage src="" />
            <AvatarFallback className="border border-black">V</AvatarFallback>
          </Avatar>
        </button>
      </nav>
    </section>
  );
}
