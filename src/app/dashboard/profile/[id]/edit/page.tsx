import { show } from "@/actions/user-action";
import EditProfileForm from "@/components/edit-profile-form";
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
      <h2 className="font-bold text-2xl mb-6">Edit Profile</h2>
      <EditProfileForm data={user} />
    </div>
  );
}
