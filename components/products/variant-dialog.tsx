import React, { useEffect, useState } from "react";
import { VariantsWithImagesTags } from "@/lib/inter-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

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
import { VariantSchema } from "@/types/variant-schema";
import TagsInput from "./tags-input";
import VariantImages from "./variant-images";
import { useAction } from "next-safe-action/hooks";
import { toast } from "sonner";
import { createVariant, deleteVariant } from "@/server/actions/variants";
import { cn } from "@/lib/utils";

type VariantDialogProps = {
  children: React.ReactNode;
  editMode: boolean;
  productID?: number;
  variant?: VariantsWithImagesTags;
};

const VariantDialog = ({
  children,
  editMode,
  productID,
  variant,
}: VariantDialogProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof VariantSchema>>({
    resolver: zodResolver(VariantSchema),
    defaultValues: {
      tags: [
        "iPhone",
        "iPad",
        "MacBook",
        "Apple Watch",
        "Accessories",
        "Cover",
      ],
      variantImages: [],
      color: "#000000",
      productID,
      id: undefined,
      productType: "Black",
      editMode,
    },
  });

  const { execute, status, result } = useAction(createVariant, {
    onSuccess({ data }) {
      form.reset();
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        toast.success(data?.success);
        setOpen(false);
      }
    },
  });

  const variantDelete = useAction(deleteVariant, {
    onSuccess({ data }) {
      form.reset();
      if (data?.error) {
        toast.error(data?.error);
      }
      if (data?.success) {
        toast.success(data?.success);
        setOpen(false);
      }
    },
  });

  function onSubmit(values: z.infer<typeof VariantSchema>) {
    // console.log(values);
    const { color, tags, id, variantImages, editMode, productID, productType } =
      values;
    execute({
      color,
      tags,
      id,
      variantImages,
      editMode,
      productID,
      productType,
    });
  }

  const getOldData = () => {
    if (!editMode) {
      form.reset();
      return;
    }
    if (editMode && variant) {
      form.setValue("editMode", true);
      form.setValue("id", variant?.id);
      form.setValue("color", variant?.color);
      form.setValue(
        "tags",
        variant?.variantTags.map((t) => t.tag)
      ),
        form.setValue(
          "variantImages",
          variant?.variantImages.map((img) => {
            return {
              url: img.image_url,
              size: Number(img.size),
              name: img.name,
            };
          })
        ),
        form.setValue("productType", variant?.productType);
      form.setValue("productID", variant.productID);
    }
  };

  useEffect(() => {
    if (open) {
      getOldData();
    }
  }, [open]);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="h-[40rem] overflow-scroll">
        <DialogHeader>
          <DialogTitle>
            {editMode ? "Update an existing" : "Create new"} product's variant
          </DialogTitle>
          <DialogDescription>Manage your products variants.</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your variant's title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant color</FormLabel>
                  <FormControl>
                    <Input type="color" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variant tags</FormLabel>
                  <FormControl>
                    <TagsInput
                      {...field}
                      handleOnChange={(e) => field.onChange(e)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <VariantImages />
            <div className={cn(editMode ? "flex gap-2" : "")}>
              <Button
                type="submit"
                className={cn(editMode ? "flex-1" : "w-full")}
                disabled={
                  status === "executing" ||
                  !form.formState.isValid ||
                  !form.formState.isDirty
                }
              >
                {editMode
                  ? "Update product's variant"
                  : "Create product's variant"}
              </Button>
              {editMode && (
                <Button
                  type="button"
                  className="flex-1"
                  variant={"destructive"}
                  disabled={status === "executing" || !form.formState.isValid}
                  onClick={(e) => {
                    e.preventDefault();
                    variantDelete.execute({ id: variant?.id! });
                  }}
                >
                  Delete product's variant
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default VariantDialog;
