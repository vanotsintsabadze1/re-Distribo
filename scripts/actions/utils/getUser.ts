"use server";

import { getCurrentUser } from "../api/auth/auth";

export async function getUser(): Promise<User | null> {
  const user = await getCurrentUser();

  if ("Code" in user.data) {
    return null;
  } else {
    return user.data;
  }
}
