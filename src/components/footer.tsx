import Link from "next/link";

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

export default function Footer() {
  return (
    <div className="border bg-background mt-auto">
      <div className="container py-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row md:pb-12">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Vowify
          </div>
          <div className="flex items-center gap-4">
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
      </div>
      <div className="relative overflow-hidden md:h-28 lg:h-34">
        <span
          aria-hidden="true"
          role="presentation"
          className="pointer-events-none select-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 block font-sans font-black tracking-tight text-foreground/10 leading-none text-[15vw] text-nowrap"
        >
          Vowifyapp
        </span>
      </div>
    </div>
  );
}
