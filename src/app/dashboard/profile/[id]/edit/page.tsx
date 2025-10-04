import { show } from "@/actions/user-action";
import EditProfileForm from "@/components/edit-profile-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
    <div suppressHydrationWarning>
      <Card>
        <CardHeader>
          <CardTitle>Edit Profile</CardTitle>
          <CardDescription>Edit profile kamu</CardDescription>
        </CardHeader>
        <CardContent>
          <EditProfileForm data={user} />
        </CardContent>
      </Card>
    </div>
  );
}
