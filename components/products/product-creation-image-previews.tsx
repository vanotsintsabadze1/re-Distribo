import Image from "next/image";
import { useEffect, useRef } from "react";

interface Props {
  imageUrls: string[];
}

export default function ProductCreationImagePreviews({ imageUrls }: Props) {
  const init = useRef(false);

  useEffect(() => {
    if (init.current) return;

    console.log("amogicani", imageUrls);

    init.current = true;
  }, []);

  return (
    <div className="flex gap-x-2 gap-y-1 flex-wrap">
      {imageUrls.map((src, index) => (
        <Image src={src} key={index} alt="preview" className="object-contain" width={40} height={40} />
      ))}
    </div>
  );
}
