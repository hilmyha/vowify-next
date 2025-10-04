import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FileHeart, FolderHeart, Wallet } from "lucide-react";
import React from "react";

const dummyInvitations = [
  { id: 1, name: "Invitation 1" },
  { id: 2, name: "Invitation 2" },
  { id: 3, name: "Invitation 3" },
  { id: 4, name: "Invitation 4" },
  { id: 5, name: "Invitation 5" },
];

export default async function page() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FolderHeart size={20} className="mr-2" />
              Undangan
            </CardTitle>
            <CardDescription>Total undangan yang kamu punya</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="font-bold text-3xl">5</p>
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
            <p className="font-bold text-3xl">2</p>
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
          {dummyInvitations.map((invitation) => (
            <Card key={invitation.id} className="my-3 py-2">
              <CardContent className="px-3 flex items-center justify-between">
                <div className="flex items-center">
                  <FileHeart size={18} className="mr-2" />
                  <p className="font-bold text-sm">{invitation.name}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Button className="text-sm" variant={"link"}>
                    Edit
                  </Button>
                  <Button className="text-sm" variant={"link"}>
                    Lihat
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
