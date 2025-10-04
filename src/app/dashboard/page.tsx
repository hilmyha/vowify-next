import { auth } from "@/auth";
import InvitationCard from "@/components/invitation-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import { BanknoteArrowUp, FolderHeart, Wallet } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

export default async function page() {
  const session = await auth();

  if (!session?.user?.id) return redirect("/");

  const invitations = await prisma.invitation.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  const quotas = await prisma.quota.findFirst({
    where: {
      userId: session.user.id,
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="grid lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FolderHeart size={20} className="mr-2" />
              Undangan
            </CardTitle>
            <CardDescription>Total undangan yang kamu punya</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-3xl">{invitations.length || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Wallet size={20} className="mr-2" />
              Kuota
            </CardTitle>
            <CardDescription>
              Total kuota untuk membuat undangan
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-3xl">{quotas?.quota || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BanknoteArrowUp size={20} className="mr-2" />
              Kuota Terpakai
            </CardTitle>
            <CardDescription>Total kuota kamu yang terpakai</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-3xl">{quotas?.usedQuota || 0}</p>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Undangan kamu</CardTitle>
          <CardDescription>
            List undangan kamu, di sini kamu dapat mengelola undangan kamu
          </CardDescription>
        </CardHeader>
        <CardContent>
          {invitations.length === 0 && (
            <p className="text-red-700 text-sm">Kamu belum memiliki undangan</p>
          )}

          {invitations.map((invitation) => (
            <InvitationCard key={invitation.id} invitation={invitation} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
