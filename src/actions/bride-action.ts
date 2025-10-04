"use server";

import { prisma } from "@/lib/prisma";

export async function createBrides(formData: FormData) {
  try {
    const brideName = formData.get("brideName");
    const groomName = formData.get("groomName");
    const brideParent = formData.get("brideParent");
    const groomParent = formData.get("groomParent");
    const invitationId = formData.get("invitationId");

    await prisma.brideGroom.upsert({
      where: {
        invitationId: formData.get("invitationId") as string,
      },
      update: {
        brideName: brideName as string,
        groomName: groomName as string,
        brideParent: brideParent as string,
        groomParent: groomParent as string,
      },
      create: {
        brideName: brideName as string,
        groomName: groomName as string,
        brideParent: brideParent as string,
        groomParent: groomParent as string,
        invitationId: invitationId as string,
      },
    });

    return {
      message: "Brides created successfully",
    };
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
