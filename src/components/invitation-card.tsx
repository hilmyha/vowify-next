"use client";

import React from "react";
import { Card, CardContent } from "./ui/card";
import { FileHeart } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";

type InvitationProps = {
  id: string;
  name: string;
  status: string;
};

export default function InvitationCard({
  invitation,
}: {
  invitation: InvitationProps;
}) {
  return (
    <Card key={invitation.id} className="my-3 py-2 bg-accent">
      <CardContent className="px-3 flex items-center justify-between">
        <div className="flex items-center">
          <FileHeart size={18} className="mr-2" />
          <p className="font-bold text-sm">{invitation.name}</p>
        </div>
        <div className="flex items-center gap-1">
          {invitation.status === "PUBLISHED" ? (
            <p className="text-sm text-green-700">Published</p>
          ) : (
            <Button className="text-sm" variant={"link"} asChild>
              <Link href={`/dashboard/invitations/${invitation.id}/edit`}>
                Edit
              </Link>
            </Button>
          )}
          <Button className="text-sm" variant={"link"} asChild>
            <Link href={`/dashboard/invitations/${invitation.id}`}>Lihat</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
