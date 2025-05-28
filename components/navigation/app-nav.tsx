import UserButton from "./user-button";
import NavLogo from "./nav-logo";
import { auth } from "@/server/auth";
import CartBtn from "../cart/cart-btn";

const AppNav = async () => {
  const session = await auth();
  console.log(session);
  return (
    <div className="flex items-center justify-between py-4">
      <NavLogo />
      <div className="flex items-center gap-4 cursor-pointer">
        <CartBtn />
        <UserButton user={session?.user!} expires={session?.expires!} />
      </div>
    </div>
  );
};

export default AppNav;
