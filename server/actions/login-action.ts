"use server"; // don't forget to add this!

import { actionClient } from "./safe-action";
import { loginSchema } from "@/types/login-schema";

export const login = actionClient
  .schema(loginSchema)
  .action(async ({ parsedInput: { email, password } }) => {
    console.log("Received input:", email, password);
    return { success: { email, password } };
  });
