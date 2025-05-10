import React from "react";
import CreateProductForm from "./create-product-form";
import { auth } from "@/server/auth";
import { redirect } from "next/navigation";

const CreateProduct = async () => {
  const session = await auth();
  if (session?.user.role !== "admin") return redirect("/dashboard/settings");
  return <CreateProductForm />;
};

export default CreateProduct;
