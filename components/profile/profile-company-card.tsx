"use client";

import { AuthenticationContext } from "@/context/AuthenticationContext";
import { AtSign, Building2, IdCard, Phone, Pin } from "lucide-react";
import { useContext } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function ProfileCompanyCard() {
  const user = useContext(AuthenticationContext);
  const company = user?.company;

  if (!company) {
    return <></>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[.9rem]">Company</CardTitle>
        <CardDescription className="text-xs">Here is the information about your company</CardDescription>
      </CardHeader>
      <CardContent className="flex min-w-[36rem] justify-between">
        {company ? (
          <div className="flex flex-col gap-y-2 text-xs">
            <div>
              <IdCard size={12} className="text-gray-400" />
              <span>{company.id}</span>
            </div>
            <div>
              <Building2 size={12} className="text-gray-400" />
              <span>{company.name}</span>
            </div>
            <div>
              <AtSign size={12} className="text-gray-400" />
              <span>{company.email}</span>
            </div>
            <div>
              <Pin size={12} className="text-gray-400" />
              <span>{company.address}</span>
            </div>
            <div>
              <Phone size={12} className="text-gray-400" />
              <span>{company.phone}</span>
            </div>
          </div>
        ) : (
          <div className="flex justify-center items-center w-full flex-col gap-y-6">
            <span className="text-xs uppercase font-medium tracking-wider">No company information found</span>
            <Button className="text-xs h-10">Create Company</Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
