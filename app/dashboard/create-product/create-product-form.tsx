"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { productSchema } from "@/types/product-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DollarSign } from "lucide-react";
import Tiptap from "./tip-tap";
import { useAction } from "next-safe-action/hooks";
import { getSingleProduct, updateProduct } from "@/server/actions/products";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const CreateProductForm = () => {
  const searchParams = useSearchParams();
  const isEditMode = searchParams.get("edit_id");
  const [editProduct, setEditProduct] = useState<string>("");
  const router = useRouter();
  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: "",
      description: "",
      price: 0,
    },
  });
  const { execute, status, result } = useAction(updateProduct, {
    onSuccess({ data }) {
      form.reset();
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        toast.success(data?.success);
        form.reset();
        router.push("/dashboard/products");
      }
    },
  });

  function onSubmit(values: z.infer<typeof productSchema>) {
    const { title, id, description, price } = values;
    execute({ title, id, description, price });
  }

  const isProductExist = async (id: number) => {
    if (isEditMode) {
      const response = await getSingleProduct(id);
      if (response?.error) {
        toast.error(response?.error);
        router.push("/dashboard/products");
        return;
      }
      if (response?.success) {
        setEditProduct(response?.success?.title);
        form.setValue("title", response?.success?.title);
        form.setValue("description", response?.success?.description);
        form.setValue("price", response?.success?.price);
        form.setValue("id", response?.success?.id);
      }
    }
  };

  useEffect(() => {
    form.setValue("description", "");
  }, [form]);

  useEffect(() => {
    if (isEditMode) {
      isProductExist(Number(isEditMode));
    }
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{editProduct ? "Update" : "Create"} Product</CardTitle>
        <CardDescription>
          {editProduct ? "Update an existing" : "Create a new"} Product
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product title</FormLabel>
                  <FormControl>
                    <Input placeholder="T-shirt" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product description</FormLabel>
                  <FormControl>
                    <Tiptap val={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product price</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <DollarSign
                        className="p-2 bg-muted rounded-md "
                        size={36}
                      />
                      <Input
                        placeholder="100"
                        step={100}
                        {...field}
                        type="number"
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              disabled={status === "executing"}
            >
              {editProduct ? "Update" : "Create A"} Product
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default CreateProductForm;
