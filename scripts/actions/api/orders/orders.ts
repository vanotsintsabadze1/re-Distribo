"use server";

import { axiosService } from "@/config/axiosConfiguration";
import { axiosErrorHandler } from "@/scripts/helpers/axiosErrorHandler";
import { responseValidator } from "@/scripts/helpers/responseValidator";
import { toZonedTime } from "date-fns-tz";

export async function createOrder(date: Date, order: { productId: string; quantity: number }) {
  const zonedDate = toZonedTime(date, "Asia/Tbilisi");

  const payload = {
    deliveryDateDeadline: zonedDate,
    items: [
      {
        productId: order.productId,
        quantity: order.quantity,
      },
    ],
  };

  try {
    const res = await axiosService.post("/v1/orders", payload, {
      requiresAuth: true,
      hasDefaultHeaders: true,
      cache: false,
    });

    const validatedResponse = responseValidator<Order>(res.status, res.data);
    return validatedResponse;
  } catch (error) {
    return await axiosErrorHandler(error);
  }
}
