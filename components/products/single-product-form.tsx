"use client";

import { ShoppingCart } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface Props {
  PRICE_PER_KG: number;
}

export default function SingleProductForm({ PRICE_PER_KG }: Props) {
  const [quantity, setQuantity] = useState<string>("1");
  const [date, setDate] = useState<Date | undefined>(new Date());

  function handleQuantityChange(e: React.ChangeEvent<HTMLInputElement>) {
    const val = e.target.value;

    // Allow only numeric values, removing leading zeros
    const cleanedValue = val.replace(/^0+(?=\d)/, "").replace(/\D/g, "");

    setQuantity(cleanedValue);
  }

  const totalPrice = isNaN(parseInt(quantity)) ? 0 : (parseInt(quantity) * PRICE_PER_KG).toFixed(2);

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
      <Button className="w-full mb-2">
        <ShoppingCart className="w-4 h-4" />
        Order
      </Button>
    </>
  );
}
