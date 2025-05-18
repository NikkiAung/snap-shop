import UserButton from "./user-button";
import NavLogo from "./nav-logo";
import { auth } from "@/server/auth";
const AppNav = async () => {
  const session = await auth();
  console.log(session);
  return (
    <div className="flex items-center justify-between py-4">
      <NavLogo />
      <UserButton user={session?.user!} expires={session?.expires!} />
    </div>
  );
};

export default AppNav;
