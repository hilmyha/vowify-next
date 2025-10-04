import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { prisma } from "@/lib/prisma";
import { CheckCheck } from "lucide-react";
import React from "react";

export default async function EditLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const invitation = await prisma.invitation.findUnique({
    where: { id: params.id },
    select: { status: true },
  });

  if (!invitation) return <div>Invitation not found</div>;

  if (invitation.status === "PUBLISHED") {
    return (
      <Alert variant={"default"}>
        <CheckCheck />
        <AlertTitle className="font-semibold">
          Undangan sudah dipublikasikan
        </AlertTitle>
        <AlertDescription>
          Kamu tidak bisa merubah undangan yang sudah dipublikasikan
        </AlertDescription>
      </Alert>
    );
  }

  return <>{children}</>;
}
