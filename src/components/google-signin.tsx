"use client";

import { signIn } from "next-auth/react";
import { Button } from "./ui/button";
import Image from "next/image";

export default function GoogleSignIn() {
  return (
    <Button onClick={() => signIn("google", { callbackUrl: "/" })}>
      Continue with Google
      <Image
        width="24"
        height="24"
        src="https://img.icons8.com/fluency/24/google-logo.png"
        alt="google-logo"
      />
    </Button>
  );
}
