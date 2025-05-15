import React from "react";
import { VariantsWithImagesTags } from "@/lib/inter-types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";

type VariantDialogProps = {
  children: React.ReactNode;
  editMode: boolean;
  productId?: number;
  variant?: VariantsWithImagesTags;
};

const VariantDialog = ({
  children,
  editMode,
  productId,
  variant,
}: VariantDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {editMode ? "Update an existing" : "Create new"} product's variant
          </DialogTitle>
          <DialogDescription>Manage your products variants.</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default VariantDialog;
