import ProductTable from "@/components/products/products-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProducts } from "@/scripts/actions/api/products/products";

export default async function ProductPage() {
  const products = await getProducts();

  return (
    <section className="w-full flex items-center justify-center flex-grow">
      <Card className="md:min-w-[45rem]">
        <CardHeader className="pb-0">
          <CardTitle>Products</CardTitle>
          <CardDescription>Here you can see all the products</CardDescription>
        </CardHeader>
        <CardContent>
          {!("Code" in products.data) ? (
            <ProductTable products={products.data as Product[]} />
          ) : (
            <div className="w-full h-full text-xs uppercase font-medium tracking-wider flex items-center justify-center">Loading..</div>
          )}
        </CardContent>
      </Card>
    </section>
  );
}
