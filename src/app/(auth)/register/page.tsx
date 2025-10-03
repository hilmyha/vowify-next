import GoogleSignIn from "@/components/google-signin";
import RegisterForm from "@/components/register-form";
import Link from "next/link";

export default function page() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col">
        <h2 className="font-bold text-2xl">Registration</h2>
        <p className="text-muted-foreground text-sm">
          Welcome to Vowify! Please enter your details to create an account.
        </p>
      </div>
      <RegisterForm />
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground text-sm">
          Already have an account?
        </p>
        <Link
          className="text-muted-foreground text-sm hover:underline"
          href="/login"
        >
          Sign in
        </Link>
      </div>
      <span className="border relative">
        <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 bg-background text-muted-foreground text-sm">or</p>
      </span>
      <GoogleSignIn />
    </div>
  );
}
