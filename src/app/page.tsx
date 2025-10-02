import { auth } from "@/auth";
import SignOutButton from "@/components/signout-button";

export default async function Home() {
  const session = await auth();

  if (!session?.user) return <p>belum login</p>;
  return (
    <div className="">
      <h1>Home</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>

      <SignOutButton />
    </div>
  );
}
