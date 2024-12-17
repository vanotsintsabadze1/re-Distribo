"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { HttpStatusTypes, UserRole } from "@/config/constants";
import { deleteProduct } from "@/scripts/actions/api/products/products";
import { useUser } from "@/scripts/hooks/useUser";
import { Eye, MoreHorizontal } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import ConfirmationDialog from "../ui/confirmation-dialog";
import ProductEditingDialog from "./product-editing-dialog";

interface Props {
  product: Product;
}

export default function ProductTableItemActions({ product }: Props) {
  const user = useUser();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    const res = await deleteProduct(product.id);

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
      {confirmationModal && <ConfirmationDialog open={confirmationModal} setOpen={setConfirmationModal} callback={handleDelete} />}
      {editModal && <ProductEditingDialog open={editModal} setOpen={setEditModal} product={product} images={product.images} />}

      <button
        onClick={() => router.push(`/products/${product.id}`)}
        className="p-1 rounded-md bg-gray-300 hover:bg-gray-400 duration-100 ease-in-out"
      >
        <Eye size={19} className="text-white" />
      </button>
      {user?.role.name && user?.role.name === UserRole.Admin && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setEditModal(true)} className="text-xs cursor-pointer">
              Edit
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setConfirmationModal(true)} className="text-xs text-red-600 cursor-pointer">
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </>
  );
}
