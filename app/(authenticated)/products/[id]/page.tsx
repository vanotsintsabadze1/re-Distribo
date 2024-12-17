import SingleProductAdditionalInformation from "@/components/products/single-product-additional-information";
import SingleProductForm from "@/components/products/single-product-form";
import { ImageSlider } from "@/components/ui/image-slider";
import { getProductById } from "@/scripts/actions/api/products/products";

interface Props {
  params: Promise<{ id: string }>;
}

const DAYS_AGO_GATHERED = 2;
const STORAGE_TEMPERATURE = 4;
const HUMIDITY_LEVEL = 95;

export default async function ProductPage({ params }: Props) {
  const id = (await params).id;
  const product = await getProductById(id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center flex-wrap gap-x-24 gap-y-8">
        {!("Code" in product.data) && (
          <>
            <div className="max-w-md w-full">
              <ImageSlider images={product.data.images} />
            </div>
            <div className="md:min-w-96">
              <SingleProductAdditionalInformation
                name={product.data.name}
                description={product.data.description}
                PRICE_PER_KG={product.data.price}
                DAYS_AGO_GATHERED={DAYS_AGO_GATHERED}
                STOCK_AMOUNT={product.data.stock}
                STORAGE_TEMPERATURE={STORAGE_TEMPERATURE}
                HUMIDITY_LEVEL={HUMIDITY_LEVEL}
              />
              <SingleProductForm stock={product.data.stock} PRICE_PER_KG={product.data.price} productId={product.data.id} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
