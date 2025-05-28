import UserButton from "./user-button";
import NavLogo from "./nav-logo";
import { auth } from "@/server/auth";
import CartDrawer from "../cart/cart-drawer";
import { ShoppingCart } from "lucide-react";
const AppNav = async () => {
  const session = await auth();
  console.log(session);
  return (
    <div className="flex items-center justify-between py-4">
      <NavLogo />
      <div className="flex items-center gap-4 cursor-pointer">
        <CartDrawer>
          <div className="relative">
            <ShoppingCart size={24} strokeWidth="3" />
            <span className="absolute top-[-8px] right-[-8px] inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white bg-primary rounded-full">
              1
            </span>
          </div>
        </CartDrawer>
        <UserButton user={session?.user!} expires={session?.expires!} />
      </div>
    </div>
  );
};

export default AppNav;
