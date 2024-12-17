"use client";

import { useState } from "react";
import Image from "next/image";

interface Props {
  images: { url: string }[];
}

export function ImageSlider({ images }: Props) {
  const [mainImage, setMainImage] = useState(images[0].url);

  return (
    <div>
      <div className="mb-4 max-w-md mx-auto">
        <Image src={mainImage} alt="Main product image" width={400} height={300} className="w-full h-auto rounded-lg" />
      </div>
      <div className="flex justify-center items-center gap-x-3 gap-y-4">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setMainImage(img.url)}
            className={`w-12 h-12 px-1 ${mainImage === img.url ? "ring-2 ring-primary" : ""}`}
          >
            <Image src={img.url} alt={`Product image ${index + 1}`} width={100} height={75} className="w-full h-auto rounded-md" />
          </button>
        ))}
      </div>
    </div>
  );
}
