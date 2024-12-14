import { ArrowLeft, Building2, ListOrdered, Package, Users } from "lucide-react";
import Link from "next/link";
import React from "react";
import LogoutButton from "../auth/logout-button";

interface Props {
  setBurgerMenu?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Navigation({ setBurgerMenu }: Props) {
  return (
    <>
      <nav className="text-[.85rem] gap-y-3 md:p-2 font-medium flex flex-col flex-grow">
        <button
          onClick={() => setBurgerMenu!(false)}
          className="whitespace-nowrap gap-x-2 hover:bg-gray-200 flex md:hidden rounded-md duration-100 ease-in-out py-2 md:p-2 md:text-black text-white"
        >
          <ArrowLeft size={15} />
        </button>
        <button className="flex whitespace-nowrap gap-x-2 hover:bg-gray-200 rounded-md duration-100 ease-in-out py-2 md:p-2 md:text-black text-white">
          <Package size={15} />
          <Link href={"/products"}>Products</Link>
        </button>
        <button className="flex whitespace-nowrap gap-x-2 hover:bg-gray-200 rounded-md duration-100 ease-in-out py-2 md:p-2 md:text-black text-white">
          <Building2 size={15} />
          <Link href={"/companies"}>Companies</Link>
        </button>
        <button className="flex whitespace-nowrap gap-x-2 hover:bg-gray-200 rounded-md duration-100 ease-in-out py-2 md:p-2 md:text-black text-white">
          <Users size={15} />
          <Link href={"/users"}>Users</Link>
        </button>
        <button className="flex whitespace-nowrap gap-x-2 hover:bg-gray-200 rounded-md duration-100 ease-in-out py-2 md:p-2 md:text-black text-white">
          <ListOrdered size={15} />
          <Link href={"/orders"}>Orders</Link>
        </button>
        <LogoutButton />
      </nav>
    </>
  );
}
