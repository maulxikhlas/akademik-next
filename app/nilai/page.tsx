// app/nilai/page.tsx

// Poin 7: Buat file Datatype Nilai (di sini kita gabungkan interfacenya agar praktis)
interface Nilai {
  tahun: string;
  nim: string;
  nama: string;
  tugas: number;
  uts: number;
  uas: number;
}

// Data dummy untuk diuji coba
const daftarNilai: Nilai[] = [
  {
    tahun: "2026",
    nim: "258320711008",
    nama: "Muhammad Maulana Ikhlas",
    tugas: 90,
    uts: 85,
    uas: 95,
  },
  {
    tahun: "2026",
    nim: "258320711006",
    nama: "Rahimin",
    tugas: 50,
    uts: 70,
    uas: 60,
  },
  {
    tahun: "2026",
    nim: "258320711003",
    nama: "Windu Novelia",
    tugas: 87,
    uts: 85,
    uas: 95,
  },

  {
    tahun: "2026",
    nim: "IF24001",
    nama: "Citra Lestari",
    tugas: 85,
    uts: 88,
    uas: 90,
  },
  {
    tahun: "2026",
    nim: "BD24001",
    nama: "Dimas Saputra",
    tugas: 60,
    uts: 65,
    uas: 60,
  },
  {
    tahun: "2026",
    nim: "IF24002",
    nama: "Eka Wulandari",
    tugas: 75,
    uts: 75,
    uas: 80,
  },
  {
    tahun: "2026",
    nim: "SI24003",
    nama: "Fajar Nugraha",
    tugas: 95,
    uts: 92,
    uas: 90,
  }
];

export default function NilaiPage() {
  return (
    <main className="space-y-6">
      <section className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl text-gray-900">Data Nilai Mahasiswa</h1>
          <p className="mt-2 text-sm text-gray-500">Rekapitulasi perhitungan nilai akhir.</p>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-left text-sm">
            <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600">
              <tr>
                <th className="px-5 py-4">Tahun</th>
                <th className="px-5 py-4">NIM</th>
                <th className="px-5 py-4">Nama</th>
                <th className="px-5 py-4">Tugas</th>
                <th className="px-5 py-4">UTS</th>
                <th className="px-5 py-4">UAS</th>
                {/* Poin 8: Kolom Nilai Akhir dan Keterangan di paling kanan */}
                <th className="px-5 py-4">Nilai Akhir</th>
                <th className="px-5 py-4">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {daftarNilai.map((data, index) => {
                // Poin 9: Rumus Nilai Akhir
                const nilaiAkhir = (0.20 * data.tugas) + (0.35 * data.uts) + (0.45 * data.uas);
                
                // Poin 10: Logika Keterangan
                let keterangan = "";
                let styleKeterangan = "";
                
                if (nilaiAkhir >= 85) {
                  keterangan = "Terpuji";
                  styleKeterangan = "bg-green-100 text-green-800";
                } else if (nilaiAkhir >= 65) {
                  keterangan = "Sangat Memuaskan";
                  styleKeterangan = "bg-blue-100 text-blue-800";
                } else {
                  keterangan = "Ulang Lagi";
                  styleKeterangan = "bg-red-100 text-red-800";
                }

                return (
                  <tr key={index} className="transition hover:bg-blue-50">
                    <td className="whitespace-nowrap px-5 py-4">{data.tahun}</td>
                    <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-900">{data.nim}</td>
                    <td className="whitespace-nowrap px-5 py-4">{data.nama}</td>
                    <td className="px-5 py-4">{data.tugas}</td>
                    <td className="px-5 py-4">{data.uts}</td>
                    <td className="px-5 py-4">{data.uas}</td>
                    <td className="px-5 py-4 font-bold text-gray-900">
                      {nilaiAkhir.toFixed(2)}
                    </td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styleKeterangan}`}>
                        {keterangan}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}