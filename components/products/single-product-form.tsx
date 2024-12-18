"use client";

import { HttpStatusTypes, UserRole } from "@/config/constants";
import { createOrder } from "@/scripts/actions/api/orders/orders";
import { useUser } from "@/scripts/hooks/useUser";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Spinner } from "../ui/spinner";

interface Props {
  PRICE_PER_KG: number;
  productId: string;
  stock: number;
}

export default function SingleProductForm({ PRICE_PER_KG, productId, stock }: Props) {
  const [quantity, setQuantity] = useState<string>("1");
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const user = useUser();
  const router = useRouter();

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;

    // Allow only numeric values, removing leading zeros
    const cleanedValue = val.replace(/^0+(?=\d)/, "").replace(/\D/g, "");

    setQuantity(cleanedValue);
  }

  const totalPrice = isNaN(parseInt(quantity)) ? 0 : (parseInt(quantity) * PRICE_PER_KG).toFixed(2);

  async function handleSubmitOrder() {
    if (isNaN(parseInt(quantity))) {
      toast.error("Please enter a valid quantity.");
      return;
    }

    if (!date) {
      toast.error("Please select a delivery date.");
      return;
    }

    if (parseInt(quantity) <= 0) {
      toast.error("Quantity must be greater than 0.");
      setQuantity("1");
      return;
    }

    if (parseInt(quantity) > stock) {
      toast.error("Not enough stock available.");
      return;
    }

    setLoading(true);

    const res = await createOrder(date, { productId: productId, quantity: parseInt(quantity) });

    console.log(res.data);

    if (res.type === HttpStatusTypes.Success) {
      toast.success("Order placed successfully.");
      router.push("/products");
      setLoading(false);
      return;
    }

    toast.error("Failed to place order. Please try again or contact support.");
    setLoading(false);
  }

  return (
    <>
      <div className="mb-4">
        <Label htmlFor="quantity" className="text-xs mb-1 block">
          Quantity (kg)
        </Label>
        <Input
          id="quantity"
          placeholder="Enter amount.."
          type="text"
          inputMode="numeric"
          min="0"
          step="0.5"
          max={stock}
          value={quantity}
          onChange={handleQuantityChange}
          className="w-24 text-xs"
        />
      </div>
      <div className="mb-4">
        <Label className="text-xs mb-1 block">Delivery Date</Label>
        <div className="w-fit">
          <Calendar fromDate={new Date()} mode="single" selected={date} onSelect={setDate} className="rounded-md border text-xs" />
        </div>
      </div>
      <Card className="mb-4">
        <CardContent className="p-4">
          <div className="flex justify-between items-center text-xs">
            <span>Total Price:</span>
            <span className="font-bold">${totalPrice}</span>
          </div>
        </CardContent>
      </Card>
      {user?.role.name === UserRole.Admin && (
        <span className="text-red-600 font-medium text-[.6rem] uppercase tracking-wide">You are a staff member, you can not place an order.</span>
      )}
      <Button onClick={handleSubmitOrder} className="w-full mb-2 mt-1" disabled={user?.role.name === UserRole.Admin}>
        <ShoppingCart className="w-4 h-4" />
        {loading ? <Spinner /> : "Place Order"}
      </Button>
    </>
  );
}
