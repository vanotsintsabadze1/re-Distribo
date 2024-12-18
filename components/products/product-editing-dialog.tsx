import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { getImage } from "@/scripts/actions/images/images";
import { productSchema } from "@/types/validators/productValidator";
import { validationErrorAssigner } from "@/scripts/helpers/validationErrorAssigner";
import { editProduct } from "@/scripts/actions/api/products/products";
import { HttpStatusTypes } from "@/config/constants";
import { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ProductCreationFormFields from "./product-creation-form-fields";
import CustomDialog from "../ui/custom-dialog";
import ProductCreationImagePreviews from "./product-creation-image-previews";
import { Spinner } from "../ui/spinner";

interface Props {
  product: Product;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  images: {
    url: string;
  }[];
}

export default function ProductEditingDialog({ product: initProduct, open, setOpen, images }: Props) {
  const [product, setProduct] = useState<ProductCreationRequest>({
    Name: initProduct.name,
    Description: initProduct.description,
    Price: initProduct.price,
    Stock: initProduct.stock,
    ImageFiles: [],
  });

  const initialized = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();
  const [imageUrls, setImageUrls] = useState<string[]>([]);

  const [errorSubjects, setErrorSubjects] = useState<ProductCreationRequestSchema>({
    Name: "",
    Description: "",
    Price: "",
    Stock: "",
    ImageFiles: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialized.current) return;

    images.forEach(async (image) => {
      const res = await getImage(image.url);

      if (!res) {
        toast.error("Failed to fetch images, do not make any updates!");
        return;
      }

      const url = URL.createObjectURL(res);

      setImageUrls((prev) => [...prev, url]);

      if (res) {
        setProduct((prev) => ({ ...prev, ImageFiles: [...prev.ImageFiles, res] }));
      }
    });

    initialized.current = true;

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(product.ImageFiles);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validation = productSchema.safeParse(product);

    const errors = validation.error?.issues;

    if (errors) {
      validationErrorAssigner(errors, errorSubjects, setErrorSubjects, { hasTimeout: true });
      return;
    }

    setLoading(true);

    const formData = new FormData(formRef.current!);
    const res = await editProduct(initProduct.id, formData);

    if (res.type === HttpStatusTypes.Success) {
      setProduct({ Name: "", Description: "", Price: 0, Stock: 0, ImageFiles: [] });
      toast.success("Product edited successfully");
      router.refresh();
      setOpen(false);
      setLoading(false);
      return;
    }

    if (res.type === HttpStatusTypes.ClientError) {
      if (res.status === HttpStatusCode.Unauthorized) {
        toast.error("Unauthorized to edit a product");
      }

      if (res.status === HttpStatusCode.BadRequest) {
        toast.error("Bad request. Please check your data");
      }

      setLoading(false);
      return;
    }

    setLoading(false);
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
          <CardTitle>Edit a Product</CardTitle>
          <CardDescription>Edit this product by filling out the form below.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-y-4" ref={formRef} onSubmit={handleSubmit}>
            <ProductCreationFormFields
              errors={errorSubjects}
              images={product.ImageFiles}
              setImageUrls={setImageUrls}
              defaultProductDetails={product}
              setProduct={setProduct}
            />
            {product.ImageFiles.length > 0 && (
              <ProductCreationImagePreviews setProduct={setProduct} imageUrls={imageUrls} setImageUrls={setImageUrls} />
            )}
            <div className="flex flex-col gap-y-2">
              <Button variant={"default"} type="submit" className="w-full text-xs h-8">
                {loading ? <Spinner /> : "Edit Product"}
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
