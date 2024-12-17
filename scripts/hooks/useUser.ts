"use client";

import { AuthenticationContext } from "@/context/AuthenticationContext";
import { useContext } from "react";

export function useUser(): User | null {
  const ctx = useContext(AuthenticationContext);
  const user = ctx?.user;

  return user;
}
