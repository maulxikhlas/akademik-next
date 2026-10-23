import Link from "next/link";

const stats = [
  {
    title: "Total Mahasiswa",
    value: "120",
    note: "Data mahasiswa terdaftar",
    color: "text-blue-700",
  },
  {
    title: "Program Studi",
    value: "3",
    note: "Program studi aktif",
    color: "text-violet-700",
  },
  {
    title: "Total Mata Kuliah",
    value: "8",
    note: "Mata kuliah semester ini",
    color: "text-purple-600",
  },
  {
    title: "Status Akademik",
    value: "Aktif",
    note: "Periode akademik berjalan",
    color: "text-emerald-700",
  },
];

export default function Home() {
  return (
    <main className="space-y-8">
      <section className="overflow-hidden rounded-2xl bg-gradient-to-r from-blue-800 to-blue-600 p-6 text-white shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-wider text-blue-100">
          Sistem Informasi Akademik
        </p>
        <h1 className="mt-3 text-2xl font-bold sm:text-3xl lg:text-4xl">
          Selamat Datang di AkademikNext
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-50 sm:text-base">
          Kelola informasi akademik melalui dashboard sederhana yang dibuat dengan Next.js, TypeScript, dan Tailwind CSS.
        </p>
        <Link
          href="/students"
          className="mt-6 inline-flex rounded-lg bg-white px-5 py-3 text-sm font-semibold text-blue-800 transition hover:bg-blue-50"
        >
          Lihat Data Mahasiswa
        </Link>
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-xl font-bold sm:text-2xl">Ringkasan Akademik</h2>
          <p className="mt-1 text-sm text-gray-500">Informasi singkat aplikasi.</p>
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >
              <p className="text-sm font-medium text-gray-500">{item.title}</p>
              <p className={`mt-3 text-3xl font-bold ${item.color}`}>{item.value}</p>
              <p className="mt-2 text-sm text-gray-500">{item.note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <article className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-bold">Informasi Akademik</h2>
          <p className="mt-2 text-sm leading-6 text-gray-600">
            Halaman ini menjadi pusat ringkasan data mahasiswa dan informasi akademik.
          </p>
        </article>
        <article className="rounded-xl border border-gray-200 bg-white p-6">
          <h2 className="text-lg font-bold">Akses Cepat</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/students" className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800">
              Data Mahasiswa
            </Link>
            <Link href="/courses" className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700">
              Mata Kuliah
            </Link>
            <Link href="/profile" className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
              Profil Aplikasi
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}