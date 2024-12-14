"use client";

import { AuthenticationContext } from "@/context/AuthenticationContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Eye, MoreHorizontal } from "lucide-react";
import { useContext, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { HttpStatusTypes, UserRole } from "@/config/constants";
import { deleteProduct } from "@/scripts/actions/api/products/products";
import toast from "react-hot-toast";
import ConfirmationDialog from "../ui/confirmation-dialog";

interface Props {
  itemId: string;
}

export default function ProductTableItemActions({ itemId }: Props) {
  const user = useContext(AuthenticationContext);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const res = await deleteProduct(itemId);

    if (res.type === HttpStatusTypes.Success) {
      router.refresh();
      toast.success("Product deleted successfully");
      return;
    }

    if (res.type === HttpStatusTypes.ClientError) {
      toast.error("Unauthorized");
      return;
    }

    toast.error("An error occurred while deleting the product, contact support.");
  }

  return (
    <>
      <ConfirmationDialog open={confirmationModal} setOpen={setConfirmationModal} callback={handleDelete} />
      {user?.role && user?.role.name === UserRole.Admin ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem className="text-xs cursor-pointer">Edit</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setConfirmationModal(true)} className="text-xs text-red-600 cursor-pointer">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <button className="p-1 rounded-md bg-gray-300 hover:bg-gray-400 duration-100 ease-in-out">
          <Eye size={19} className="text-white" />
        </button>
      )}
    </>
  );
}