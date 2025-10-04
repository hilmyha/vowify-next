"use client";

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";

export default function SignOutButton() {
  return (
    <Button className="w-full px-2 text-sm justify-start hover:text-white hover:bg-red-700" variant={"ghost"} onClick={() => signOut()}>
      Logout
    </Button>
  );
}
