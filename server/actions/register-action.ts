"use server"; // don't forget to add this!

import { actionClient } from "./safe-action";
import { registerSchema } from "@/types/register-schema";

export const register = actionClient
  .schema(registerSchema)
  .action(async ({ parsedInput: { username, email, password } }) => {
    console.log("action server", username, email, password);
    return { success: { username, email, password } };
  });
