"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { userSchema } from "@/types/validators/userValidators";
import { validationErrorAssigner } from "@/scripts/helpers/validationErrorAssigner";
import { login } from "@/scripts/actions/api/auth/auth";
import { HttpStatusTypes } from "@/config/constants";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AuthenticationContext } from "@/context/AuthenticationContext";
import { invalidateUserCache } from "@/config/axiosConfiguration";

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
  const [userDetails, setUserDetails] = useState<UserLoginRequest>({
    email: "",
    password: "",
  });
  const [errorSubjects, setErrorSubjects] = useState<UserLoginRequest>({
    email: "",
    password: "",
  });
  const router = useRouter();
  const authCtx = useContext(AuthenticationContext);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validateData = userSchema.safeParse(userDetails);

    const errors = validateData.error?.issues;

    if (errors) {
      validationErrorAssigner(errors, errorSubjects, setErrorSubjects, { hasTimeout: true });
      return;
    }

    const res = await login(userDetails);

    if (res.type === HttpStatusTypes.Success) {
      await invalidateUserCache();
      authCtx.refreshUser();
      toast.success("Welcome back!");
      router.refresh();
      return;
    }

    if (res.type === HttpStatusTypes.ClientError) {
      toast.error("Invalid email or password");
      return;
    }

    if (res.type === HttpStatusTypes.InternalServerError) {
      toast.error("Something went wrong. Please contact support");
      return;
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="py-6">
          <CardTitle className="text-xl font-light uppercase tracking-wider">Login</CardTitle>
          <CardDescription className="text-xs">Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent className="">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-xs">
                  Email
                </Label>
                <Input
                  onChange={(e) => setUserDetails((prev) => ({ ...prev, email: e.target.value }))}
                  id="email"
                  placeholder="m@example.com"
                  error={errorSubjects.email}
                  className="text-xs"
                />
              </div>
              <div className="grid gap-1">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-xs">
                    Password
                  </Label>
                  <Link href="#" className="ml-auto inline-block text-xs underline-offset-4 hover:underline">
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  onChange={(e) => setUserDetails((prev) => ({ ...prev, password: e.target.value }))}
                  id="password"
                  type="password"
                  error={errorSubjects.password}
                  placeholder="Enter your password.."
                  className="text-xs"
                />
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
              <Button variant="outline" className="w-full">
                Login with Google
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
