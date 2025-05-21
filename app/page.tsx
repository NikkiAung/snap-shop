import { db } from "@/server";
import Products from "@/components/products/index";
export default async function Home() {
  const productwithVariants = await db.query.productVariants.findMany({
    with: {
      variantImages: true,
      variantTags: true,
      product: true,
    },
  });
  return (
    <main>
      <h2>Nav</h2>
      <Products productWithVariants={productwithVariants} />
    </main>
  );
}
