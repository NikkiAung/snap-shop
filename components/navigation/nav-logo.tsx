import { ShoppingBasket, Apple } from "lucide-react";
import Link from "next/link";
const NavLogo = () => {
  return (
    <Link
      href={"/"}
      className="text-3xl font-bold text-primary font-mono text-bold flex gap-1"
    >
      <Apple size={44} fill="" />
      <span className="text-5xl">iCore</span>
    </Link>
  );
};

export default NavLogo;
