import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import CartItem from "./cart-item";
import { useCartStore } from "@/store/cart-store";
import Payment from "./payment";
import Success from "./success";
import CartStatus from "./cart-status";

type CartDrawerProps = {
  children: React.ReactNode;
};
const CartDrawer = ({ children }: CartDrawerProps) => {
  const cartPosition = useCartStore((state) => state.cartPosition);
  return (
    <>
      <Drawer>
        <DrawerTrigger className="cursor-pointer">{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="text-center">Your Cart</DrawerTitle>
            <DrawerDescription className="text-center mb-10">
              Stay home. Stay safe.
            </DrawerDescription>
            <CartStatus />
          </DrawerHeader>
          {cartPosition === "Order" && <CartItem />}
          {cartPosition === "Checkout" && <Payment />}
          {cartPosition === "Success" && <Success />}
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default CartDrawer;
