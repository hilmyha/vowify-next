import { auth } from "@/auth";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import SignOutButton from "@/components/signout-button";
import { Menu } from "lucide-react";

const links: { name: string; href: string }[] = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "About",
    href: "/about",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const dropdownLinks: { name: string; href: string }[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
];

export default async function Header() {
  const session = await auth();
  return (
    <div className="py-8 w-full md:shadow-xl md:border-b md:py-6 sticky top-0 z-20 left-0 bg-background">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-1">
          <Link href="/">
            <h1 className="font-black italic font-serif text-4xl">Vowify</h1>
          </Link>

          <div className="md:flex gap-2 hidden ml-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-indigo-600 text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-2 md:gap-1">
          <div className="hidden md:block">
            <ModeToggle />
          </div>

          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer outline-none">
                <Avatar className="w-10 h-10">
                  {session.user.image ? (
                    <AvatarImage src={session.user.image} />
                  ) : (
                    <AvatarFallback>
                      {session.user.name?.slice(0, 2).toLocaleUpperCase()}
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>{session.user.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {dropdownLinks.map((link) => (
                  <DropdownMenuItem asChild key={link.href}>
                    <Link href={link.href}>{link.name}</Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <SignOutButton />
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant={"outline"} asChild>
              <Link href="/login">Masuk</Link>
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant={"outline"}>
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle className="font-black italic font-serif text-2xl">
                  Vowify
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col px-4 gap-2">
                {links.map((link) => (
                  <Button
                    variant={"outline"}
                    className="w-full justify-start"
                    asChild
                    key={link.href}
                  >
                    <Link href={link.href}>{link.name}</Link>
                  </Button>
                ))}
              </div>
              <div className="p-4 mt-auto">
                <ModeToggle />
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
