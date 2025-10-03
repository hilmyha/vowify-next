import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();

  return (
    <div className="container border">
      <h1>Home</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  );
}
