import { HttpStatusTypes } from "@/config/constants";
import { createProduct } from "@/scripts/actions/api/products/products";
import { validationErrorAssigner } from "@/scripts/helpers/validationErrorAssigner";
import { productSchema } from "@/types/validators/productValidator";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import toast from "react-hot-toast";
import CustomDialog from "../ui/custom-dialog";
import ProductCreationFormFields from "./product-creation-form-fields";
import ProductCreationImagePreviews from "./product-creation-image-previews";

interface Props {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProductCreationDialog({ open, setOpen }: Props) {
  const [product, setProduct] = useState<ProductCreationRequest>({
    Name: "",
    Description: "",
    Price: 0,
    Stock: 0,
    ImageFiles: [],
  });

  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  // Since our custom approach needs every property to be a string we need to create a new instance.
  // While a better approach is to not end up in this situation, this is a quick and probably the only time, except editing where we're going to need it.

  const [errorSubjects, setErrorSubjects] = useState<ProductCreationRequestSchema>({
    Name: "",
    Description: "",
    Price: "",
    Stock: "",
    ImageFiles: "",
  });

  async function handleCreateProduct(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validatedData = productSchema.safeParse(product);
    const errors = validatedData.error?.issues;

    if (errors) {
      validationErrorAssigner(errors, errorSubjects, setErrorSubjects, { hasTimeout: true });
      return;
    }

    const formData = new FormData(formRef.current!);

    const res = await createProduct(formData);

    if (res.type === HttpStatusTypes.Success) {
      router.refresh();
      toast.success("Product created successfully");
      setOpen(false);
      return;
    }

    if (res.type === HttpStatusTypes.ClientError) {
      toast.error("Unauthorized to create a product");
      console.log(res.data);
      return;
    }

    toast.error("Something went wrong. Please contact support");
  }

  function handleCancel(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    if (product.ImageFiles.length > 0) {
      setProduct((prev) => ({ ...prev, ImageFiles: [] }));
    }
    setOpen(false);
  }

  return (
    <CustomDialog open={open} setOpen={setOpen}>
      <Card>
        <CardHeader>
          <CardTitle>Create Product</CardTitle>
          <CardDescription>Create a new product by filling out the form below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleCreateProduct} ref={formRef} className="flex flex-col gap-y-4">
            <ProductCreationFormFields errors={errorSubjects} images={product.ImageFiles} setProduct={setProduct} />
            {product.ImageFiles.length > 0 && <ProductCreationImagePreviews images={product.ImageFiles} />}
            <div className="flex flex-col gap-y-2">
              <Button variant={"default"} type="submit" className="w-full text-xs h-8">
                Create
              </Button>
              <Button onClick={handleCancel} variant={"outline"} className="w-full text-xs h-8">
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </CustomDialog>
  );
}
