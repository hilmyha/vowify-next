"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { revalidatePath } from "next/cache";

export async function show(id: string) {
  try {
    return await prisma.user.findUnique({
      where: {
        id: id as string,
      },
    });
  } catch (error) {
    return {
      error: error,
    };
  }
}

export async function updateProfile(formData: FormData) {
  try {
    const id = formData.get("id");
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    let hashedPassword: string | undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password as string, 10);
    }

    await prisma.user.update({
      where: {
        id: id as string,
      },
      data: {
        name: name as string,
        email: email as string,
        password: hashedPassword,
      },
    });

    revalidatePath(`/profile/${id}`);
    return {
      message: "User updated successfully",
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

export async function setPassword(formData: FormData) {
  try {
    const id = formData.get("id");
    const password = formData.get("password");

    const hashedPassword = await bcrypt.hash(password as string, 10);

    await prisma.user.update({
      where: {
        id: id as string,
      },
      data: {
        password: hashedPassword,
      },
    });

    revalidatePath(`/profile/${id}`);
    return {
      message: "Password set successfully",
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
