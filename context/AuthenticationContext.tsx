"use client";

import { useUser_USED_FOR_CONTEXT } from "@/scripts/helpers/useUser_USED_FOR_CONTEXT";
import { createContext, useState } from "react";

export const AuthenticationContext = createContext<{ user: User | null; refreshUser: () => void }>({ user: null, refreshUser: () => {} });

export default function AuthenticationContextProvider({ children }: { children: React.ReactNode }) {
  const [trigger, setTrigger] = useState(0);
  const user = useUser_USED_FOR_CONTEXT(trigger);

  function refreshUser() {
    setTrigger((prev) => prev + 1);
  }

  return <AuthenticationContext.Provider value={{ user, refreshUser }}>{children}</AuthenticationContext.Provider>;
}
