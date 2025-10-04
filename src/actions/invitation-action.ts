"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createInvitation(formData: FormData) {
  try {
    const session = await auth();
    const name = formData.get("name");

    if (!session) {
      return {
        error: "You must be logged in to create an invitation",
      };
    }

    // cari kuota user
    const quota = await prisma.quota.findFirst({
      where: { userId: session.user!.id },
    });

    if (!quota) {
      return { error: "Kuota belum tersedia untuk user ini." };
    }

    if (quota.quota <= 0) {
      return {
        error:
          "Kuota kamu sudah habis, silahkan tambahkan kuota terlebih dahulu.",
      };
    }

    await prisma.$transaction([
      prisma.invitation.create({
        data: {
          name: name as string,
          user: {
            connect: { id: session.user!.id },
          },
        },
      }),
      prisma.quota.update({
        where: { id: quota.id },
        data: { quota: { decrement: 1 }, usedQuota: { increment: 1 } },
      }),
    ]);

    revalidatePath("/dashboard/invitations");

    return {
      message: "Invitation created successfully",
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
