"use server";

import { createOrderSchema } from "@/types/order-schema";
import { auth } from "../auth";
import { db } from "..";
import { orderProduct, orders } from "../schema";
import { actionClient } from "./safe-action";

export const createOrder = actionClient
  .schema(createOrderSchema)
  .action(async ({ parsedInput: { products, totalPrice, status } }) => {
    const session = await auth();
    if (!session) return { error: "You need to be logged in" };

    const order = await db
      .insert(orders)
      .values({
        total: totalPrice,
        status,
        userID: session.user.id as string,
      })
      .returning();

    products.map(async ({ productId, quantity, variantId }) => {
      await db.insert(orderProduct).values({
        quantity,
        productID: productId,
        productVariantID: variantId,
        orderID: order[0].id,
      });
    });
    return { success: "Order added." };
  });
