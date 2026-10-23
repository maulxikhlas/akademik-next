type Mahasiswa = {
  nim: string;
  nama: string;
  prodi: string;
  angkatan: number;
  status: "Aktif" | "Cuti";
};

const mahasiswa: Mahasiswa[] = [
  {
    nim: "258320711008",
    nama: "Muhammad Maulana Ikhlas",
    prodi: "Pendidikan Teknologi Informasi",
    angkatan: 2025,
    status: "Aktif",
  },
  {
    nim: "2026001",
    nama: "Andi Saputra",
    prodi: "Sistem Informasi",
    angkatan: 2026,
    status: "Aktif",
  },
  {
    nim: "2026002",
    nama: "Siti Rahma",
    prodi: "Informatika",
    angkatan: 2026,
    status: "Aktif",
  },
  {
    nim: "2026003",
    nama: "Budi Pratama",
    prodi: "Bisnis Digital",
    angkatan: 2026,
    status: "Cuti",
  },
];

export default function StudentsPage() {
  return (
    <main className="space-y-6">
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-blue-700">AKADEMIK</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Data Mahasiswa</h1>
          <p className="mt-2 text-sm text-gray-500">Daftar mahasiswa yang terdaftar pada aplikasi.</p>
        </div>
        <p className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800">
          Total: {mahasiswa.length} mahasiswa
        </p>
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[700px] w-full text-left text-sm">
            <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600">
              <tr>
                <th className="px-5 py-4">NIM</th>
                <th className="px-5 py-4">Nama</th>
                <th className="px-5 py-4">Program Studi</th>
                <th className="px-5 py-4">Angkatan</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mahasiswa.map((mhs) => (
                <tr key={mhs.nim} className="transition hover:bg-blue-50">
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-900">{mhs.nim}</td>
                  <td className="whitespace-nowrap px-5 py-4">{mhs.nama}</td>
                  <td className="px-5 py-4">{mhs.prodi}</td>
                  <td className="px-5 py-4">{mhs.angkatan}</td>
                  <td className="px-5 py-4">
                    <span
                      className={
                        mhs.status === "Aktif"
                          ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800"
                          : "rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800"
                      }
                    >
                      {mhs.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <p className="text-xs text-gray-500">Geser tabel ke samping jika dibuka pada layar kecil.</p>
    </main>
  );
}