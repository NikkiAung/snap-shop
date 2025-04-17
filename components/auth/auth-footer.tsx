import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";

type AuthFooterProps = {
  footerLabel: string;
  footerHref: string;
};
const AuthFooter = ({ footerLabel, footerHref }: AuthFooterProps) => {
  return (
    <Button variant={"link"} asChild>
      <Link href={footerHref}>{footerLabel}</Link>
    </Button>
  );
};

export default AuthFooter;
