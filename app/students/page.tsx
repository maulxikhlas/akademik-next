interface Mahasiswa {
  nim: string;
  nama: string;
  programStudi: string;
  semester: number;
  ipk: number;
  jenisKelamin: string;
}

const daftarMahasiswa: Mahasiswa[] = [
  {
    nim: "258320711008",
    nama: "Muhammad Maulana Ikhlas",
    programStudi: "Pendidikan Teknologi Informasi",
    semester: 3,
    ipk: 4.00,
    jenisKelamin: "Laki-laki",
  },
  {
    nim: "258320711006",
    nama: "Rahimin",
    programStudi: "Pendidikan Teknologi Informasi",
    semester: 5,
    ipk: 3.75,
    jenisKelamin: "Laki-laki",
  },
  {
    nim: "258320711003",
    nama: "Windu Novelia",
    programStudi: "Pendidikan Teknologi Informasi",
    semester: 3,
    ipk: 3.60,
    jenisKelamin: "Perempuan",
  },
  {
    nim: "IF24001",
    nama: "Citra Lestari",
    programStudi: "Informatika",
    semester: 3,
    ipk: 3.88,
    jenisKelamin: "Perempuan",
  },
  {
    nim: "BD24001",
    nama: "Dimas Saputra",
    programStudi: "Bisnis Digital",
    semester: 3,
    ipk: 3.45,
    jenisKelamin: "Laki-laki",
  },
  {
    nim: "IF24002",
    nama: "Eka Wulandari",
    programStudi: "Informatika",
    semester: 3,
    ipk: 3.20,
    jenisKelamin: "Perempuan",
  },
  {
    nim: "SI24003",
    nama: "Fajar Nugraha",
    programStudi: "Sistem Informasi",
    semester: 5,
    ipk: 3.90,
    jenisKelamin: "Laki-laki",
  },
];

export default function StudentsPage() {
  return (
    <main className="space-y-6">
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl text-gray-900">Sistem Informasi Akademik - Data Mahasiswa</h1>
          <p className="mt-2 text-sm text-gray-500">Daftar mahasiswa yang terdaftar pada aplikasi.</p>
        </div>
        <p className="rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800">
          Total: {daftarMahasiswa.length} mahasiswa
        </p>
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-left text-sm">
            <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600">
              <tr>
                <th className="px-5 py-4">NIM</th>
                <th className="px-5 py-4">Nama</th>
                <th className="px-5 py-4">Program Studi</th>
                <th className="px-5 py-4">Semester</th>
                <th className="px-5 py-4">IPK</th>
                <th className="px-5 py-4">Jenis Kelamin</th>
                <th className="px-5 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {daftarMahasiswa.map((mhs) => (
                <tr key={mhs.nim} className="transition hover:bg-blue-50">
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-900">{mhs.nim}</td>
                  <td className="whitespace-nowrap px-5 py-4">{mhs.nama}</td>
                  <td className="px-5 py-4">{mhs.programStudi}</td>
                  <td className="px-5 py-4">{mhs.semester}</td>
                  <td className="px-5 py-4">
                    <span className={
                      mhs.ipk >= 3.75 ? "rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800" :
                      mhs.ipk >= 3.50 ? "rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800" :
                      "rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-800"
                    }>
                      {mhs.ipk.toFixed(2)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={
                      mhs.jenisKelamin.toLowerCase() === "laki-laki" ? "rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-800" :
                      "rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-800"
                    }>
                      {mhs.jenisKelamin}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={
                      mhs.ipk >= 3.50 ? "rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800" :
                      "rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800"
                    }>
                      {mhs.ipk >= 3.50 ? "Memenuhi" : "Perlu Peningkatan"}
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