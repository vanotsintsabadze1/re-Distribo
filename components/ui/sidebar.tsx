"use client";

import { useEffect, useState } from "react";
import { LucideTurtle, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import Navigation from "./navigation";
import { AnimatePresence } from "framer-motion";
import MobileSidebar from "./mobile-sidebar";

export default function Sidebar() {
  const [isBurgerMenuOpen, setIsBurgerMenuOpen] = useState(false);
  const pathname = usePathname();

  function burgerMenuToggle() {
    setIsBurgerMenuOpen(!isBurgerMenuOpen);
  }

  useEffect(() => {
    if (isBurgerMenuOpen) {
      setIsBurgerMenuOpen(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      {/* mobile */}
      <div className="absolute w-full p-2 lg:hidden">
        <div className="">
          {!isBurgerMenuOpen && (
            <button
              onClick={burgerMenuToggle}
              className={`absolute left-2 top-2 z-50 md:hidden cursor-pointer ${
                isBurgerMenuOpen ? "text-white" : "text-black"
              }`}
            >
              <Menu size={25} />
            </button>
          )}
          <AnimatePresence>
            {isBurgerMenuOpen && (
              <MobileSidebar setBurgerMenu={setIsBurgerMenuOpen} />
            )}
          </AnimatePresence>
        </div>
      </div>
      {/*  */}

      {/* Desktop */}
      <aside
        className={`hidden min-h-[100dvh] self-stretch border-r-2 border-gray-100 bg-[#fdf9f7] transition-all duration-300 ease-in-out lg:block w-44`}
      >
        <div className="relative flex h-full flex-col">
          <div className="flex h-16 items-center px-4">
            <LucideTurtle size={20} />
          </div>
          <Navigation />
        </div>
      </aside>
    </>
  );
}
