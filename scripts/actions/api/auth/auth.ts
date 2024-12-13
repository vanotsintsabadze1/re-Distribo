"use server";

import { axiosService } from "@/config/axiosConfiguration";
import { axiosErrorHandler } from "@/scripts/helpers/axiosErrorHandler";
import { responseValidator } from "@/scripts/helpers/responseValidator";

export async function getCurrentUser(): Promise<ResponseCheckerPayload<User | ResponseError>> {
  try {
    const res = await axiosService.get("/v1/User/GetCurrentUser", {
      id: "getCurrentUser",
      cache: {
        ttl: 1000 * 60 * 5,
      },
      requiresAuth: true,
      hasDefaultHeaders: true,
    });

    const validatedResponse = responseValidator<User>(res.status, res.data);
    return validatedResponse;
  } catch (error) {
    return await axiosErrorHandler(error);
  }
}
