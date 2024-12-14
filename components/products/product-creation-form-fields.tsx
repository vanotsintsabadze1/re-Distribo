import { Upload } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props {
  images: File[];
  errors: ProductCreationRequestSchema;
  setProduct: React.Dispatch<React.SetStateAction<ProductCreationRequest>>;
}

export default function ProductCreationFormFields({ images, errors, setProduct }: Props) {
  return (
    <>
      <div>
        <Label className="text-xs">Name</Label>
        <Input
          className="text-xs placeholder:text-xs"
          type="text"
          placeholder="Name.."
          name="Name"
          onChange={(e) => setProduct((prev) => ({ ...prev, Name: e.target.value }))}
          error={errors.Name}
        />
      </div>
      <div>
        <Label className="text-xs">Description</Label>
        <Input
          className="text-xs placeholder:text-xs"
          type="text"
          placeholder="Description.."
          name="Description"
          onChange={(e) => setProduct((prev) => ({ ...prev, Description: e.target.value }))}
          error={errors.Description}
        />
      </div>
      <div>
        <Label className="text-xs">Price per KG</Label>
        <Input
          className="text-xs placeholder:text-xs"
          type="number"
          min={0}
          placeholder="Price per kilogram.."
          name="Price"
          onChange={(e) => setProduct((prev) => ({ ...prev, Price: e.target.value as unknown as number }))}
          error={errors.Price}
        />
      </div>
      <div>
        <Label className="text-xs">Stock</Label>
        <Input
          className="text-xs placeholder:text-xs"
          type="number"
          min={0}
          placeholder="Stock"
          name="Stock"
          onChange={(e) => setProduct((prev) => ({ ...prev, Stock: e.target.value as unknown as number }))}
          error={errors.Stock}
        />
      </div>
      <div>
        <Label className="text-xs flex flex-col gap-1" htmlFor="ImageFiles">
          Images
          <div className="w-full rounded-md bg-gray-200 mt-1 cursor-pointer py-6 items-center justify-center flex flex-col gap-4">
            <Upload size={20} className="text-gray-400" />
            <span className="text-gray-400">Upload pictures</span>
          </div>
          {errors.ImageFiles && <span className="text-[.6rem] text-red-500 uppercase font-medium tracking-wider">{errors.ImageFiles}</span>}
        </Label>
        <Input
          className="hidden"
          type="file"
          placeholder="Images.."
          name="ImageFiles"
          multiple
          id="ImageFiles"
          onChange={(e) => {
            if (!e.currentTarget.files || !e.target.files) {
              return;
            }
            const files = Array.from(e.target.files);
            const combinedFileArray = [...images, ...files];

            setProduct((prev) => ({ ...prev, ImageFiles: combinedFileArray }));
          }}
        />
      </div>
    </>
  );
}
