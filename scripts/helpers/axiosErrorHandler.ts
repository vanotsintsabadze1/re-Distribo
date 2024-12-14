"use server";

import { HttpStatusTypes } from "@/config/constants";
import { AxiosError, HttpStatusCode } from "axios";

export async function axiosErrorHandler(error: unknown): Promise<ResponseCheckerPayload<ResponseError>> {
  const axiosError = error as AxiosError;

  const unexpectedError: ResponseError = {
    type: "https://datatracker.ietf.org/doc/html/rfc7231#section-6.6.1",
    title: "Unexpected error happened while sending a request",
    status: 500,
    detail: "Unexpected error happened while sending a request, debugging the application is mandatory",
    code: "UnexpectedErrorWhileRequesting",
  };

  if (axiosError.request) {
    const status = axiosError.status;
    console.log("-----------------");
    console.error(`Error happened while sending a request:`);
    console.error("Message: ", axiosError.message);
    console.error("Status:", axiosError.status);
    console.error("Stack: ", axiosError.stack);
    console.log("-----------------");
    return {
      status: axiosError.status ?? 500,
      type: status
        ? status >= 400 && status < 500
          ? HttpStatusTypes.ClientError
          : HttpStatusTypes.InternalServerError
        : HttpStatusTypes.InternalServerError,
      data: unexpectedError,
    };
  }

  if (axiosError.response) {
    const response = axiosError.response;

    console.error(`Error happened while receiving a response:`);
    console.error(`Code: ${response.status}`);
    console.error(`Title: ${response.statusText}`);
    console.error(`Data: ${response.data ?? "undefined"}`);

    return {
      status: axiosError.response.status,
      type: response.status >= 400 && response.status < 500 ? HttpStatusTypes.ClientError : HttpStatusTypes.InternalServerError,
      data: axiosError.response.data as ResponseError,
    };
  }

  return { status: HttpStatusCode.InternalServerError, type: HttpStatusTypes.InternalServerError, data: unexpectedError };
}
