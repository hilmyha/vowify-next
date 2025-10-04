import GoogleSignIn from "@/components/google-signin";
import RegisterForm from "@/components/register-form";
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
        <CardTitle>Daftar</CardTitle>
        <CardDescription>
          Selamat datang di Vowify! Silahkan masukkan detail akun kamu
          untuk melanjutkan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RegisterForm />
        <div className="flex items-center justify-between mt-4">
          <p className="text-muted-foreground text-sm">Sudah punya akun?</p>
          <Link
            className="text-muted-foreground text-sm hover:underline"
            href="/login"
          >
            Masuk
          </Link>
        </div>
      </CardContent>
      <CardFooter>
        <GoogleSignIn />
      </CardFooter>
    </Card>
  );
}
