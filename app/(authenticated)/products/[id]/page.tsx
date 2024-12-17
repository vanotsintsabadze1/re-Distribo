import SingleProductAdditionalInformation from "@/components/products/single-product-additional-information";
import SingleProductForm from "@/components/products/single-product-form";
import { ImageSlider } from "@/components/ui/image-slider";
import { getProductById } from "@/scripts/actions/api/products/products";

interface Props {
  params: Promise<{ id: string }>;
}

const PRICE_PER_KG = 2.99;
const DAYS_AGO_GATHERED = 2;
const STOCK_AMOUNT = 50;
const STORAGE_TEMPERATURE = 4;
const HUMIDITY_LEVEL = 95;

export default async function ProductPage({ params }: Props) {
  const id = (await params).id;
  const product = await getProductById(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center flex-wrap gap-x-24 gap-y-8">
        <div className="max-w-md w-full">{!("Code" in product.data) && <ImageSlider images={product.data.images} />}</div>
        <div>
          <SingleProductAdditionalInformation
            PRICE_PER_KG={PRICE_PER_KG}
            DAYS_AGO_GATHERED={DAYS_AGO_GATHERED}
            STOCK_AMOUNT={STOCK_AMOUNT}
            STORAGE_TEMPERATURE={STORAGE_TEMPERATURE}
            HUMIDITY_LEVEL={HUMIDITY_LEVEL}
          />
          <SingleProductForm PRICE_PER_KG={PRICE_PER_KG} />
        </div>
      </div>
    </div>
  );
}
