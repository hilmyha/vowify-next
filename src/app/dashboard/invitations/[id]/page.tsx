import { prisma } from "@/lib/prisma";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const invitation = await prisma.invitation.findUnique({
    where: {
      id: id as string,
    },
    include: {
      user: true,
      BrideGroom: true,
    },
  });
  return (
    <div>
      <p>{JSON.stringify(invitation, null, 2)}</p>
    </div>
  );
}
