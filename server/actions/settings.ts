"use server"; // don't forget to add this!

import { actionClient } from "./safe-action";
import { db } from "..";
import { eq } from "drizzle-orm";
import { users } from "../schema";
import { settingSchema } from "@/types/settings-schema";

export const register = actionClient
  .schema(settingSchema)
  .action(async ({ parsedInput: { username, email } }) => {
    return { success: "Name is changed successfully" };
  });
