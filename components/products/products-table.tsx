"use client";

import Image from "next/image";
import { ArrowUpDown, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import ProductTableItemActions from "./product-table-item-actions";
import { useState } from "react";
import ProductCreationDialog from "./product-creation-dialog";

interface Props {
  products: Product[];
}

export default function ProductTable({ products }: Props) {
  const [searchTerm, setSearchTerm] = useState("");
  const [open, setOpen] = useState(false);
  const filteredProducts = products.filter((product) => product.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <>
      <ProductCreationDialog open={open} setOpen={setOpen} />
      <div className="container mx-auto py-10">
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full flex items-center justify-between flex-wrap">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-8 text-xs"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className="flex justify-center items-center gap-x-2 text-xs h-8" onClick={() => setOpen(true)}>
              + Create Product
            </Button>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 text-xs font-bold">
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 text-xs font-bold">
                  Price
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button variant="ghost" className="p-0 text-xs font-bold">
                  Stock
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.map((product) => (
              <TableRow key={product.id}>
                <TableCell>
                  <Image src={product.images[0].url} alt={product.name} width={50} height={50} className="rounded-md object-cover" />
                </TableCell>
                <TableCell className="font-medium text-xs">{product.name}</TableCell>
                <TableCell className="text-xs">${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-xs">{product.stock}</TableCell>
                <TableCell className="text-right">
                  <ProductTableItemActions itemId={product.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
