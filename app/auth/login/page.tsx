"use client";
import React from "react";
import AuthForm from "@/components/auth/auth-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginSchema } from "@/types/login-schema";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useAction } from "next-safe-action/hooks";
import { login } from "@/server/actions/login-action";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const LoginPage = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { execute, status } = useAction(login, {
    onSuccess: ({ data }) => {
      form.reset();
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        toast.success(data?.success);
      }
    },
  });

  function onSubmit(values: z.infer<typeof loginSchema>) {
    const { email, password } = values;
    console.log({ email, password });
    execute({ email, password });
  }
  return (
    <AuthForm
      formTitle="Login to your account"
      footerLabel="Don't have an account"
      footerHref="/auth/register"
      showProvider
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="******" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button size={"sm"} variant={"link"} className="pl-0 mb-1">
              <Link href={"/auth/reset"}>Forgot password</Link>
            </Button>
          </div>
          <Button
            className={cn(
              "w-full mb-4",
              status === "executing" && "animate-pulse"
            )}
            disabled={status === "executing"}
          >
            Login
          </Button>
        </form>
      </Form>
    </AuthForm>
  );
};

export default LoginPage;
