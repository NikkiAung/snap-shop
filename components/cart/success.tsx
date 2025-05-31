import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { PartyPopper } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import Link from "next/link";

const Success = () => {
  const setCartPosition = useCartStore((state) => state.setCartPosition);
  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);

  useEffect(() => {
    if (cart.length === 0) setCartPosition("Order");
    setTimeout(() => {
      clearCart();
      setCartPosition("Order");
    }, 3000);
  }, []);
  return (
    <main className="max-w-4xl mx-auto my-10 text-center">
      <PartyPopper size={40} className="mx-auto animate-bounce" />
      <h2 className="text-4xl font-bold my-4">Your payment was successful</h2>
      <p className="text-sm font-medium text-muted-foreground mb-4">
        Thank you for your purchase
      </p>
      <Button className="mx-auto" asChild>
        Add commentMore actions
        <Link href="/dashboard/orders">View orders</Link>
      </Button>
    </main>
  );
};

export default Success;
