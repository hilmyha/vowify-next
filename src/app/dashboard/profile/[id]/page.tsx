import { show } from "@/actions/user-action";
import SetPasswordForm from "@/components/set-password-form";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircleIcon, Pen } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = (await params).id;
  const user = await show(id);

  if (!user || "error" in user) return <div>User not found</div>;

  return (
    <div className="flex flex-col gap-4">
      {!user.password && (
        <Card suppressHydrationWarning>
          <CardContent>
            <Alert variant={"destructive"} className="mb-6">
              <AlertCircleIcon />
              <AlertTitle>Alert, your password is not set</AlertTitle>
              <AlertDescription>
                Please set your password, to secure your account.
              </AlertDescription>
            </Alert>
            <SetPasswordForm data={user} />
          </CardContent>
        </Card>
      )}
      <Card suppressHydrationWarning>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-black text-xl">Personal Info</h4>
            <Button variant={"outline"} asChild>
              <Link href={`/dashboard/profile/${id}/edit`}>
                <Pen /> Edit
              </Link>
            </Button>
          </div>

          <div className="grid lg:grid-cols-3 gap-3">
            <div className="gap-1 flex flex-col">
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="text-sm">{user.email}</p>
            </div>
            <div className="gap-1 flex flex-col">
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="text-sm">{user.name}</p>
            </div>
            <div className="gap-1 flex flex-col">
              <p className="text-sm text-muted-foreground">Is Verified</p>
              <p className="text-sm">{user.emailVerified ? "Yes" : "No"}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
