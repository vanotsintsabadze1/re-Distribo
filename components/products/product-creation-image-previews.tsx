import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface Props {
  images: File[];
}

export default function ProductCreationImagePreviews({ images }: Props) {
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) {
      return;
    }

    images.forEach((image) => {
      const url = URL.createObjectURL(image);
      setImagePreviews((prev) => [...prev, url]);
    });

    initialized.current = true;

    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images]);

  return (
    <div className="flex gap-x-2 gap-y-1 flex-wrap">
      {imagePreviews.map((preview, index) => (
        <Image src={preview} key={index} alt="preview" width={40} height={40} />
      ))}
    </div>
  );
}
