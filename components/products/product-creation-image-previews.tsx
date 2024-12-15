import { X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef } from "react";

interface Props {
  imageUrls: string[];
  setImageUrls: React.Dispatch<React.SetStateAction<string[]>>;
  setProduct: React.Dispatch<React.SetStateAction<ProductCreationRequest>>;
}

export default function ProductCreationImagePreviews({ imageUrls, setImageUrls, setProduct }: Props) {
  const init = useRef(false);

  useEffect(() => {
    if (init.current) return;

    console.log("amogicani", imageUrls);

    init.current = true;
  }, []);

  function handleRemove(index: number) {
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
    setProduct((prev) => ({ ...prev, ImageFiles: prev.ImageFiles.filter((_, i) => i !== index) }));
  }

  return (
    <div className="flex gap-x-2 gap-y-1 flex-wrap">
      {imageUrls.map((src, index) => (
        <div key={index} className="relative">
          <Image src={src} alt="preview" className="object-contain" width={40} height={40} />
          <button type="button" onClick={() => handleRemove(index)} className="absolute top-0 right-0 bg-black/50 rounded-full">
            <X size={12} strokeWidth={2} color="white" />
          </button>
        </div>
      ))}
    </div>
  );
}
