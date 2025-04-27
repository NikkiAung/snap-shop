import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "@/types/login-schema";
import { users } from "./schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: { strategy: "jwt" },
  adapter: DrizzleAdapter(db) as any, // any is a hack to get the types to work
  providers: [
    // can test with http://localhost:PORT/api/auth/signin
    GitHub({
      clientId: process.env.AUTH_GITHUB_ID!,
      clientSecret: process.env.AUTH_GITHUB_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      authorize: async (credentials) => {
        const validatedData = loginSchema.safeParse(credentials);
        if (validatedData.success) {
          const { email, password } = validatedData.data;
          const user = await db.query.users.findFirst({
            where: eq(users.email, email),
          });
          if (!user || !password) return null;

          const isMatch = await bcrypt.compare(password, user.password!);
          if (isMatch) {
            return user;
          }
        }
        return null;
      },
    }),
  ],
});
