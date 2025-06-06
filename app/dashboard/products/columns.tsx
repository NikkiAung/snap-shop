"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CirclePlus, MoreHorizontalIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { deleteProduct } from "@/server/actions/products";
import { toast } from "sonner";
import { VariantsWithImagesTags } from "@/lib/inter-types";
import VariantDialog from "../../../components/products/variant-dialog";
// import { VariantsWithImagesTags } from "@/lib/inter-types";
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Product = {
  id: number;
  price: number;
  title: string;
  description: string;
  image: string;
  variants: VariantsWithImagesTags[];
};

const ActionShell = (row: Row<Product>) => {
  const product = row.original;
  const { execute } = useAction(deleteProduct, {
    onSuccess: ({ data }) => {
      if (data?.error) {
        toast.error(data.error);
      }
      if (data?.success) {
        toast.success(data.success);
      }
    },
  });
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontalIcon className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem className="cursor-pointer text-primary focus:bg-primary/20 focus:text-primary font-medium duration-300">
          <Link href={`/dashboard/create-product?edit_id=${product.id}`}>
            Edit Product
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer text-red-600 focus:bg-red-200 focus:text-red-600 font-medium duration-300"
          onClick={() => execute({ id: product.id })}
        >
          Delete Product
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const columns: ColumnDef<Product>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const image = row.getValue("image") as string;
      const title = row.getValue("title") as string;
      return (
        <div className="w-12 h-12 overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={50}
            height={50}
            className="w-full h-full object-cover"
          />
          ;
        </div>
      );
    },
  },
  {
    accessorKey: "variants",
    header: "Variants",
    cell: ({ row }) => {
      const variants = row.getValue("variants") as VariantsWithImagesTags[];
      return (
        <div className="flex gap-1">
          {variants.map((v, i) => {
            return (
              <VariantDialog
                editMode={true}
                productID={row.original.id}
                variant={v}
                key={i}
              >
                <div
                  className="w-5 h-5 rounded-full cursor-pointer"
                  style={{ backgroundColor: v.color }}
                />
              </VariantDialog>
            );
          })}
          <VariantDialog editMode={false} productID={row.original.id}>
            <CirclePlus className="w-5 h-5 text-gray-500 hover:text-black duration-200 cursor-pointer" />
          </VariantDialog>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string;
      return <span className="text-sm font-medium">{title}</span>;
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <span className="text-sm font-medium">{formatted}</span>;
    },
  },
  {
    accessorKey: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return ActionShell(row);
    },
  },
];
