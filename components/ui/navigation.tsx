import { ArrowLeft, Building2, ListOrdered, Package, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import LogoutButton from "../auth/logout-button";

interface Props {
  setBurgerMenu?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navigation({ setBurgerMenu }: Props) {
  return (
    <nav className="text-[.85rem] gap-y-3 md:p-2 font-medium flex flex-col flex-grow">
      <Link
        href="#"
        onClick={() => setBurgerMenu!(false)}
        className="flex items-center gap-x-2 hover:bg-gray-200 rounded-md duration-100 ease-in-out py-2 md:p-2 md:text-black text-white cursor-pointer md:hidden"
      >
        <ArrowLeft size={15} />
        Back
      </Link>
      <Link
        href="/products"
        className="flex items-center gap-x-2 hover:bg-gray-200 rounded-md duration-100 ease-in-out py-2 md:p-2 md:text-black text-white cursor-pointer"
      >
        <Package size={15} />
        Products
      </Link>
      <Link
        href="/companies"
        className="flex items-center gap-x-2 hover:bg-gray-200 rounded-md duration-100 ease-in-out py-2 md:p-2 md:text-black text-white cursor-pointer"
      >
        <Building2 size={15} />
        Companies
      </Link>
      <Link
        href="/users"
        className="flex items-center gap-x-2 hover:bg-gray-200 rounded-md duration-100 ease-in-out py-2 md:p-2 md:text-black text-white cursor-pointer"
      >
        <Users size={15} />
        Users
      </Link>
      <Link
        href="/orders"
        className="flex items-center gap-x-2 hover:bg-gray-200 rounded-md duration-100 ease-in-out py-2 md:p-2 md:text-black text-white cursor-pointer"
      >
        <ListOrdered size={15} />
        Orders
      </Link>
      <LogoutButton />
    </nav>
  );
}
