"use server";

import { axiosService } from "@/config/axiosConfiguration";
import { HttpStatusTypes } from "@/config/constants";
import { axiosErrorHandler } from "@/scripts/helpers/axiosErrorHandler";
import { responseValidator } from "@/scripts/helpers/responseValidator";
import { cookies } from "next/headers";

const domain = process.env.NODE_ENV === "production" ? process.env.DOMAIN : "localhost";

export async function getCurrentUser(): Promise<ResponseCheckerPayload<User | ResponseError>> {
  try {
    const res = await axiosService.get("/v1/users/me", {
      id: "getCurrentUser",
      cache: false,
      requiresAuth: true,
      hasDefaultHeaders: true,
    });

    const validatedResponse = responseValidator<User>(res.status, res.data);
    return validatedResponse;
  } catch (error) {
    return await axiosErrorHandler(error);
  }
}

export async function login(payload: UserLoginRequest): Promise<ResponseCheckerPayload<string | ResponseError>> {
  try {
    const res = await axiosService.post(
      "/v1/users/login",
      { email: payload.email, password: payload.password },
      {
        hasDefaultHeaders: true,
        cache: false,
      }
    );

    const validatedResponse = responseValidator<string>(res.status, res.data);

    if (validatedResponse.type === HttpStatusTypes.Success) {
      const today = new Date();
      const cookieStore = await cookies();
      cookieStore.set("token", validatedResponse.data as string, {
        expires: new Date(today.setDate(today.getDate() + 9)),
        httpOnly: true,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        domain: domain as string,
      });
    }
    return validatedResponse;
  } catch (error) {
    return await axiosErrorHandler(error);
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
}
