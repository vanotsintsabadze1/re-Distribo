"use client";

import { useState, useEffect } from "react";
import { getCurrentUser } from "../actions/api/auth/auth";

export function useUser(): User | null {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function fetcher() {
      try {
        const res = await getCurrentUser();
        if (!("code" in res.data)) {
          setUser(res.data as User);
        } else {
          setUser(null);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        setUser(null);
      }
    }

    fetcher();
  }, []); //

  return user;
}
