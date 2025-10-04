import GoogleSignIn from "@/components/google-signin";
import LoginForm from "@/components/login-form";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h2 className="font-bold text-2xl">Sign in</h2>
        <p className="text-muted-foreground text-sm">
          Hi, welcome back! Please enter your login credentials to continue.
        </p>
      </div>
      <LoginForm />
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          Don&apos;t have an account?
        </p>
        <Link
          className="text-muted-foreground text-sm hover:underline"
          href="/register"
        >
          Sign up
        </Link>
      </div>
      <span className="border relative">
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-background text-muted-foreground text-sm">
          or
        </p>
      </span>
      <GoogleSignIn />
    </div>
  );
}
