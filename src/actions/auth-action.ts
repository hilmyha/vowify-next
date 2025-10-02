"use server";

import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";

export async function signInAction(formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");

    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: "Invalid email or password",
      };
    }

    return {
      error: "Something went wrong",
    };
  }
}

export async function signUpAction(formData: FormData) {
  try {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    const user = await prisma.user.findUnique({
      where: {
        email: email as string,
      },
    });

    if (user)
      return {
        error: "User already exists",
      };

    await prisma.user.create({
      data: {
        name: name as string,
        email: email as string,
        password: await bcrypt.hash(password as string, 10),
      },
    });
  } catch (error) {
    return {
      error: error,
    };
  }
}
