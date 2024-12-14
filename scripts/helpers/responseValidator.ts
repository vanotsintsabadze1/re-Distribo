import { HttpStatusTypes } from "@/config/constants";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function responseValidator<T>(status: number, data?: any): ResponseCheckerPayload<T | ResponseError> {
  if (status >= 200 && status < 300) {
    return { status: status, type: HttpStatusTypes.Success, data: data as T };
  }

  if (status >= 400 && status < 500) {
    return { status: status, type: HttpStatusTypes.ClientError, data: data as ResponseError };
  }

  if (status >= 500) {
    return { status: status, type: HttpStatusTypes.InternalServerError, data: data as ResponseError };
  }

  return { status: status, type: HttpStatusTypes.InternalServerError, data: data as ResponseError };
}
