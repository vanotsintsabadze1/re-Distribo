"use client";

import { UserRole } from "@/config/constants";
import { useUser } from "@/scripts/hooks/useUser";
import { AtSign, Building2, IdCard, Phone, Pin } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { useState } from "react";
import CompanyCreationDialog from "../company/company-creation-dialog";

export default function ProfileCompanyCard() {
  const user = useUser();
  const company = user?.company;
  const [companyCreationModal, setCompanyCreationModal] = useState(false);

  if (!user) return null;

  if (user?.role.name === UserRole.Admin || user?.role.name === UserRole.Employee) {
    return <></>;
  }

  return (
    <>
      {companyCreationModal && <CompanyCreationDialog open={companyCreationModal} setOpen={setCompanyCreationModal} />}
      <Card>
        <CardHeader>
          <CardTitle className="text-[.9rem]">Company</CardTitle>
          <CardDescription className="text-xs">Here is the information about your company</CardDescription>
        </CardHeader>
        <CardContent className="flex min-w-[36rem] justify-between">
          {company ? (
            <div className="flex flex-col gap-y-2 text-xs">
              <div className="flex items-center gap-x-2">
                <IdCard size={15} className="text-gray-400" />
                <span>{company.id}</span>
              </div>
              <div className="flex items-center gap-x-2">
                <Building2 size={15} className="text-gray-400" />
                <span>{company.name}</span>
              </div>
              <div className="flex items-center gap-x-2">
                <AtSign size={15} className="text-gray-400" />
                <span>{company.email}</span>
              </div>
              <div className="flex items-center gap-x-2">
                <Pin size={15} className="text-gray-400" />
                <span>{company.address}</span>
              </div>
              <div className="flex items-center gap-x-2">
                <Phone size={15} className="text-gray-400" />
                <span>{company.phone}</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center w-full flex-col gap-y-6">
              <span className="text-xs uppercase font-medium tracking-wider">No company information found</span>
              <Button type="button" onClick={() => setCompanyCreationModal(true)} className="text-xs h-8">
                Create Company
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </>
  );
}
