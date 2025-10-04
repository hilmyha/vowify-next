import { auth } from "@/auth";
import CreateInvitationDialog from "@/components/create-invitation-dialog";
import InvitationCard from "@/components/invitation-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function page() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const invitations = await prisma.invitation.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader className="flex items-center justify-between">
          <CardTitle>Undangan kamu</CardTitle>
          <CreateInvitationDialog />
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
