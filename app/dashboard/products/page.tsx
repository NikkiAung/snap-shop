import { db } from "@/server";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import placeHolderImage from "@/public/placeholder.jpg";

const Products = async () => {
  const products = await db.query.products.findMany({
    orderBy: (products, { desc }) => [desc(products.id)],
  });
  console.log("products", products);
  const productData = products.map((product) => ({
    id: product.id,
    price: product.price,
    title: product.title,
    description: product.description,
    variants: [],
    image: placeHolderImage.src,
  }));
  console.log(productData);
  return (
    <main>
      <DataTable columns={columns} data={productData} />
    </main>
  );
};

export default Products;
