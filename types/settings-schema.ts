import { z } from "zod";

export const settingSchema = z.object({
  username: z.string().min(4, {
    message: "Please enter a valid name - at least 4 characters long",
  }),
  email: z.string(),
});

export const twoFactorAuthSchema = z.object({
  isTwoFactorEnabled: z.boolean(),
  email: z.string().email(),
});
