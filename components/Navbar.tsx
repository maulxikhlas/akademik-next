"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { href: "/", label: "Home" },
  { href: "/profile", label: "Profil" },
  { href: "/students", label: "Mahasiswa" },
  { href: "/courses", label: "Mata Kuliah" },
  { href: "/nilai", label: "Nilai" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="bg-indigo-700 text-white shadow-md">
      <nav className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          AkademikNext
        </Link>

        <div className="flex flex-wrap gap-1 text-sm font-medium">
          {menu.map((item) => {
            const aktif =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-1.5 transition-colors ${
                  aktif
                    ? "bg-white/15 text-white"
                    : "text-indigo-100 hover:bg-white/10 hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}