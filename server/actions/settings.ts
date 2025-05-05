"use server"; // don't forget to add this!

import { actionClient } from "./safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { settingSchema, twoFactorAuthSchema } from "@/types/settings-schema";
import { revalidatePath } from "next/cache";

export const updateDisplayName = actionClient
  .schema(settingSchema)
  .action(async ({ parsedInput: { username, email } }) => {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!existingUser) return { error: "User doesn't exist" };
    await db
      .update(users)
      .set({ name: username })
      .where(eq(users.email, email));
    revalidatePath("/dashboard/settings");
    return { success: "Display name updated!" };
  });

export const twoFactorToogler = actionClient
  .schema(twoFactorAuthSchema)
  .action(async ({ parsedInput: { isTwoFactorEnabled, email } }) => {
    const existingUser = await db.query.users.findFirst({
      where: eq(users.email, email),
    });
    if (!existingUser) return { error: "Some went wrong" };

    await db
      .update(users)
      .set({ isTwoFactorEnabled })
      .where(eq(users.email, email));
    revalidatePath("/dashboard/settings");

    return { success: "2FA Setting Saved" };
  });
