import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { companySchema } from "@/types/validators/companyValidator";
import { validationErrorAssigner } from "@/scripts/helpers/validationErrorAssigner";
import { createCompany } from "@/scripts/actions/api/company/company";
import { HttpStatusTypes } from "@/config/constants";
import { useRouter } from "next/navigation";
import { HttpStatusCode } from "axios";
import { invalidateUserCache } from "@/config/axiosConfiguration";
import { AuthenticationContext } from "@/context/AuthenticationContext";
import toast from "react-hot-toast";
import CustomDialog from "../ui/custom-dialog";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function CompanyCreationDialog({ open, setOpen }: Props) {
  const [company, setCompany] = useState<CompanyCreationRequest>({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const [errorSubjects, setErrorSubjects] = useState<CompanyCreationRequest>({
    name: "",
    address: "",
    phone: "",
    email: "",
  });
  const router = useRouter();
  const authCtx = useContext(AuthenticationContext);

  async function handleCreateCompany(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validateData = companySchema.safeParse(company);

    const errors = validateData.error?.issues;

    if (errors) {
      validationErrorAssigner(errors, errorSubjects, setErrorSubjects, { hasTimeout: true });
      return;
    }

    const res = await createCompany(company);

    if (res.type === HttpStatusTypes.Success) {
      await invalidateUserCache();
      authCtx.refreshUser();

      setOpen(false);
      toast.success("Company created successfully");
      router.refresh();

      return;
    }

    if (res.type === HttpStatusTypes.ClientError) {
      if (res.status === HttpStatusCode.Conflict) {
        if ("Code" in res.data) {
          switch (res.data.Code) {
            case "NameIsTaken":
              toast.error("Company name is already taken");
              return;
            case "EmailIsTaken":
              toast.error("Company email is already taken");
              return;
            default:
              toast.error("Company already exists with these credentials");
              return;
          }
        }
        return;
      }

      if (res.status === HttpStatusCode.Unauthorized) {
        toast.error("Unauthorized");
        return;
      }

      console.log(res.data);
      toast.error("Invalid data, please check your inputs");
      return;
    }

    toast.error("Something went wrong, please contact support");
  }

  return (
    <CustomDialog open={open} setOpen={setOpen}>
      <Card>
        <CardHeader>
          <CardTitle>Create your company</CardTitle>
          <CardDescription>Fill the form below to create a company</CardDescription>
        </CardHeader>
        <CardContent className="md:min-w-[35rem]">
          <form className="w-full flex flex-col gap-4" onSubmit={handleCreateCompany}>
            <div className="w-full">
              <Label className="block mb-2">Company Name</Label>
              <Input
                placeholder="Enter company name.."
                className="w-full text-xs placeholder:text-xs"
                onChange={(e) => setCompany((prev) => ({ ...prev, name: e.target.value }))}
              />
            </div>
            <div className="w-full">
              <Label className="block mb-2">Company Email</Label>
              <Input
                placeholder="Enter company mail.."
                className="w-full text-xs placeholder:text-xs"
                onChange={(e) => setCompany((prev) => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div className="w-full">
              <Label className="block mb-2">Company Address</Label>
              <Input
                placeholder="Enter company address.."
                className="w-full text-xs placeholder:text-xs"
                onChange={(e) => setCompany((prev) => ({ ...prev, address: e.target.value }))}
              />
            </div>
            <div className="w-full">
              <Label className="block mb-2">Company Phone</Label>
              <Input
                placeholder="Enter company phone.."
                className="w-full text-xs placeholder:text-xs"
                onChange={(e) => setCompany((prev) => ({ ...prev, phone: e.target.value }))}
              />
            </div>
            <div className="w-full flex items-center flex-col gap-y-4 justify-center mt-2">
              <Button type="submit" variant={"default"} className="text-xs h-8 w-full">
                Create
              </Button>
              <Button type="button" onClick={() => setOpen(false)} variant={"ghost"} className="text-xs h-8 w-full border border-black">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </CustomDialog>
  );
}
