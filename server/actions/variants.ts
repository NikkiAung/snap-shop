"use server"; // don't forget to add this!

import { actionClient } from "./safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import {
  productVariants,
  variantTags,
  variantImages,
  products,
} from "../schema";
import { revalidatePath } from "next/cache";
import { VariantSchema } from "@/types/variant-schema";
import { z } from "zod";

export const createVariant = actionClient
  .schema(VariantSchema)
  .action(
    async ({
      parsedInput: {
        color,
        tags,
        id,
        variantImages: vImgs,
        editMode,
        productID,
        productType,
      },
    }) => {
      try {
        if (editMode && id) {
          const editVariant = await db
            .update(productVariants)
            .set({
              color,
              productType,
              updated: new Date(),
            })
            .where(eq(productVariants.id, id))
            .returning();

          await db
            .delete(variantTags)
            .where(eq(variantTags.variantID, editVariant[0].id));
          await db.insert(variantTags).values(
            tags.map((tag) => {
              return {
                tag,
                variantID: editVariant[0].id,
              };
            })
          );
          await db
            .delete(variantImages)
            .where(eq(variantImages.variantID, editVariant[0].id));
          await db.insert(variantImages).values(
            vImgs.map((img, index) => {
              return {
                image_url: img.url,
                size: img.size.toString(),
                name: img.name,
                variantID: editVariant[0].id,
                order: index,
              };
            })
          );
          revalidatePath("/dashboard/products");
          return { success: `Variants updated.` };
        }

        if (!editMode) {
          const variant = await db
            .insert(productVariants)
            .values({
              color,
              productType,
              productID,
            })
            .returning();

          const product = await db.query.products.findFirst({
            where: eq(products.id, productID),
          });

          await db.insert(variantTags).values(
            tags.map((tag) => {
              return {
                tag,
                variantID: variant[0].id,
              };
            })
          );

          await db.insert(variantImages).values(
            vImgs.map((img, index) => {
              return {
                image_url: img.url,
                size: img.size.toString(),
                name: img.name,
                variantID: variant[0].id,
                order: index,
              };
            })
          );
          revalidatePath("/dashboard/products");
          return { success: `${product?.title}'s variants added.` };
        }
      } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
      }
    }
  );

export const deleteVariant = actionClient
  .schema(z.object({ id: z.number() }))
  .action(async ({ parsedInput: { id } }) => {
    try {
      await db.delete(productVariants).where(eq(productVariants.id, id));
      revalidatePath("/dashboard/products");
      return { success: "Variant deleted" };
    } catch (error) {
      console.log(error);
      return { error: "Something went wrong" };
    }
  });
