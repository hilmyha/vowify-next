import BrideForm from "@/components/bride-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { prisma } from "@/lib/prisma";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const invitation = await prisma.invitation.findUnique({
    where: {
      id: (await params).id as string,
    },
    include: {
      BrideGroom: true,
    }
  });

  if (!invitation) return <div>Undangan tidak ditemukan</div>;

  return (
    <div className="flex flex-col gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Mempelai</CardTitle>
          <CardDescription>Edit data mempelai disini</CardDescription>
        </CardHeader>
        <CardContent>
          <BrideForm data={invitation} />
        </CardContent>
      </Card>
    </div>
  );
}
