"use client";

import { ZodIssue } from "zod";

export function validationErrorAssigner<T>(
  errors: ZodIssue[],
  expectedErrorList: T,
  setErrors: React.Dispatch<React.SetStateAction<T>>,
  timeoutOptions?: { hasTimeout: boolean; timeout?: number }
): void {
  errors.forEach((e) => {
    const subject = e.path[0];

    if (subject in (expectedErrorList as Record<string, string>)) {
      setErrors((prev) => ({ ...prev, [subject]: e.message }));
    }
  });

  if (timeoutOptions?.hasTimeout) {
    for (const key in expectedErrorList) {
      setTimeout(() => {
        setErrors((prev) => ({ ...prev, [key]: "" }));
      }, timeoutOptions.timeout || 3000);
    }
  }
}
