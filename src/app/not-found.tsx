import { MoveLeft, TriangleAlert } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function NotFound() {
  return (
    <div className="container flex flex-col gap-2 min-h-screen items-center justify-center">
      <div className="flex items-center gap-4 mb-4">
        <TriangleAlert className="text-red-600" size={48} />
        <h1 className="text-4xl font-bold">404 - Not Found</h1>
      </div>
      <p className="text-lg text-muted-foreground">
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        className="flex items-center text-indigo-600 hover:underline"
      >
        <MoveLeft className="mr-2" /> Go back to the homepage
      </Link>
    </div>
  );
}
