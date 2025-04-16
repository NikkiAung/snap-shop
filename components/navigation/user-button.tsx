"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { LogIn } from "lucide-react";

const UserButton = ({ user }: Session) => {
  return (
    <div>
      {user?.email}
      {user?.email ? (
        <Button variant={"destructive"} onClick={() => signOut()}>
          Logout
        </Button>
      ) : (
        <Button asChild>
          <Link href={"/auth/login"}>
            <LogIn size={16} /> <span>Login</span>{" "}
          </Link>
        </Button>
      )}
    </div>
  );
};

export default UserButton;
