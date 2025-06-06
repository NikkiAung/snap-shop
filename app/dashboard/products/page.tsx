import { db } from "@/server";
import React from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import placeHolderImage from "@/public/placeholder.jpg";

const Products = async () => {
  const products = await db.query.products.findMany({
    with: {
      productVariants: { with: { variantImages: true, variantTags: true } },
    },
    orderBy: (products, { desc }) => [desc(products.id)],
  });
  console.log("products", products);
  const productData = products.map((product) => {
    if (product.productVariants.length === 0) {
      return {
        id: product.id,
        price: product.price,
        title: product.title,
        description: product.description,
        variants: [],
        image: placeHolderImage.src,
      };
    }
    // Need to handle the case when productVariants.length > 0
    return {
      id: product.id,
      price: product.price,
      title: product.title,
      description: product.description,
      variants: product.productVariants,
      image: product.productVariants[0]?.variantImages[0]?.image_url,
    };
  });
  console.log(productData);
  return (
    <main>
      <DataTable columns={columns} data={productData} />
    </main>
  );
};

export default Products;
