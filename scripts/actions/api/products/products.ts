"use server";

import { axiosService } from "@/config/axiosConfiguration";
import { axiosErrorHandler } from "@/scripts/helpers/axiosErrorHandler";
import { responseValidator } from "@/scripts/helpers/responseValidator";

export async function getProducts() {
  try {
    const res = await axiosService.get("/v1/products", {
      requiresAuth: true,
      cache: false,
      hasDefaultHeaders: true,
    });

    const validatedResponse = responseValidator<Product[]>(res.status, res.data);
    return validatedResponse;
  } catch (error) {
    return await axiosErrorHandler(error);
  }
}

export async function deleteProduct(id: string) {
  try {
    const res = await axiosService.delete(`/v1/products/${id}`, {
      requiresAuth: true,
      cache: false,
      hasDefaultHeaders: true,
    });

    const validatedResponse = responseValidator<Product>(res.status);

    return validatedResponse;
  } catch (error) {
    return await axiosErrorHandler(error);
  }
}

export async function createProduct(formData: FormData) {
  try {
    const res = await axiosService.post("/v1/products", formData, {
      requiresAuth: true,
      cache: false,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const validatedResponse = responseValidator<Product>(res.status);
    return validatedResponse;
  } catch (error) {
    return await axiosErrorHandler(error);
  }
}

export async function editProduct(id: string, formData: FormData) {
  try {
    const res = await axiosService.put(`/v1/products/${id}`, formData, {
      cache: false,
      requiresAuth: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const validatedResponse = responseValidator(res.status);
    return validatedResponse;
  } catch (error) {
    return await axiosErrorHandler(error);
  }
}

export async function getProductById(id: string) {
  try {
    const res = await axiosService.get(`/v1/products/${id}`, {
      requiresAuth: true,
      cache: false,
      hasDefaultHeaders: true,
    });

    const validatedResponse = responseValidator<Product>(res.status, res.data);
    return validatedResponse;
  } catch (error) {
    return await axiosErrorHandler(error);
  }
}
