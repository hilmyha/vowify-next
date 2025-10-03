"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignOutButton() {
  return (
    <Button className="w-full cursor-pointer" variant={"destructive"} onClick={() => signOut()}>
      Logout
    </Button>
  );
}
