"use server"; // don't forget to add this!

import { actionClient } from "./safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { settingSchema } from "@/types/settings-schema";
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
