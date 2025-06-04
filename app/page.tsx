import { db } from "@/server";
import Products from "@/components/products/index";
import SearchBox from "@/components/products/search-box";
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
      <SearchBox productWithVariants={productwithVariants} />
      <Products productWithVariants={productwithVariants} />
    </main>
  );
}
