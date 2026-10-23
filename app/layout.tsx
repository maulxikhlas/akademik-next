import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "AkademikNext",
  description: "Sistem Informasi Akademik Mahasiswa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="flex min-h-screen flex-col bg-gray-50 text-gray-900">
        <Navbar />
        <div className="mx-auto w-full max-w-6xl flex-1 px-6 py-8">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}