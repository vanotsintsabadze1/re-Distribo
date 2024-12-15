"use server";

import { axiosService } from "@/config/axiosConfiguration";
import { axiosErrorHandler } from "@/scripts/helpers/axiosErrorHandler";
import { responseValidator } from "@/scripts/helpers/responseValidator";

export async function getCompany() {
  try {
    const res = await axiosService.get("/v1/Company", {
      cache: false,
      requiresAuth: true,
      hasDefaultHeaders: true,
    });

    const validatedResponse = responseValidator<Company>(res.status, res.data);
    return validatedResponse;
  } catch (error) {
    return await axiosErrorHandler(error);
  }
}
