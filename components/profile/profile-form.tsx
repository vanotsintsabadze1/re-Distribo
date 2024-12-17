"use client";

import { useUser } from "@/scripts/hooks/useUser";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

export default function ProfileForm() {
  const user = useUser();

  return (
    <form className="flex flex-col gap-y-4 w-full">
      <div className="w-full flex items-center justify-center p-2">
        <div className="w-16 h-16 border border-black bg-gray-200 text-center shadow-sm rounded-full flex items-center justify-center text-lg">
          {user?.email[0].toUpperCase()}
        </div>
      </div>
      <div className="w-full">
        <Label className="text-xs">Id</Label>
        <Input type="text" placeholder="Username.." className="text-xs placeholder:text-xs w-full" defaultValue={user?.id} disabled />
      </div>
      <div className="w-full">
        <Label className="text-xs">Email</Label>
        <Input type="text" placeholder="Username.." className="text-xs placeholder:text-xs w-full" defaultValue={user?.email} disabled />
      </div>
      <div className="w-full">
        <Label className="text-xs">Role</Label>
        <Input
          type="text"
          placeholder="Username.."
          className="text-xs placeholder:text-xs w-full"
          defaultValue={user?.role.name === "RootUser" ? "User" : user?.role.name}
          disabled
        />
      </div>
      <div className="w-full mt-2">
        <Button type="button" className="text-xs h-8">
          Change Password
        </Button>
      </div>
    </form>
  );
}
