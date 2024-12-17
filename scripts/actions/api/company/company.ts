"use server";

import { axiosService } from "@/config/axiosConfiguration";
import { axiosErrorHandler } from "@/scripts/helpers/axiosErrorHandler";
import { responseValidator } from "@/scripts/helpers/responseValidator";

export async function getCompany() {
  try {
    const res = await axiosService.get("/v1/companies/me", {
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

export async function createCompany(payload: CompanyCreationRequest) {
  try {
    const res = await axiosService.post("/v1/companies", payload, {
      cache: false,
      requiresAuth: true,
      hasDefaultHeaders: true,
    });

    const validatedResponse = responseValidator<Company>(res.status);
    return validatedResponse;
  } catch (error) {
    return await axiosErrorHandler(error);
  }
}
