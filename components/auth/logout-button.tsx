"use client";

import { logout } from "@/scripts/actions/api/auth/auth";
import { LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="flex whitespace-nowrap gap-x-2 hover:bg-gray-200 rounded-md duration-100 ease-in-out py-2 md:p-2 md:text-black text-white"
    >
      <LogOutIcon size={15} />
      <span>Log out</span>
    </button>
  );
}
