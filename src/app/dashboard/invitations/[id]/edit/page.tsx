import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { Send, UsersRound } from "lucide-react";
import Link from "next/link";
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
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>
            <p>{invitation?.name}</p>
          </CardTitle>
          <Button className="flex items-center" variant={"outline"}>
            <Send />
            <p>Publish</p>
          </Button>
        </CardHeader>
        <CardContent className="gap-4 grid md:grid-cols-2 lg:grid-cols-4">
          <Link
            href={`/dashboard/invitations/${invitation?.id}/edit/brides`}
            className="p-12 flex flex-col items-center justify-center rounded-2xl bg-accent cursor-pointer"
          >
            <UsersRound size={48} />
            <p>Brides</p>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
