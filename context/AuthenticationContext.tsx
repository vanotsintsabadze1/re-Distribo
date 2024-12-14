"use client";

import { useUser } from "@/scripts/hooks/useUser";
import { createContext } from "react";

export const AuthenticationContext = createContext<User | null>(null);

export default function AuthenticationContextProvider({ children }: { children: React.ReactNode }) {
  const user = useUser();
  return <AuthenticationContext.Provider value={user}>{children}</AuthenticationContext.Provider>;
}
