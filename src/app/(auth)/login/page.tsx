import GoogleSignIn from "@/components/google-signin";
import LoginForm from "@/components/login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function page() {
  return (
    <Card className="w-full md:w-1/2 lg:w-1/3">
      <CardHeader>
        <CardTitle>Masuk</CardTitle>
        <CardDescription>
          Hai, selamat datang kembali! Silahkan masuk untuk melanjutkan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginForm />
        <div className="flex items-center justify-between mt-4">
          <p className="text-muted-foreground text-sm">Belum punya akun?</p>
          <Link
            className="text-muted-foreground text-sm hover:underline"
            href="/register"
          >
            Daftar
          </Link>
        </div>
      </CardContent>
      <CardFooter>
        <GoogleSignIn />
      </CardFooter>
    </Card>
  );
}
