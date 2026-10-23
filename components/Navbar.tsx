import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-blue-700 text-white shadow-md">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold">
          AkademikNext
        </Link>

        <div className="flex gap-5 text-sm font-medium">
          <Link href="/" className="hover:text-blue-200">
            Home
          </Link>
          <Link href="/profile" className="hover:text-blue-200">
            Profil
          </Link>
          <Link href="/students" className="hover:text-blue-200">
            Mahasiswa
          </Link>
          <Link href="/courses" className="hover:text-blue-200">
            Mata Kuliah
          </Link>
        </div>
      </nav>
    </header>
  );
}