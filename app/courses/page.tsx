type Course = {
  code: string;
  name: string;
  sks: number;
  lecturer: string;
};

const courses: Course[] = [
  {
    code: "PTI201",
    name: "Pemrograman Berorientasi Objek",
    sks: 3,
    lecturer: "Amuharnis, M.Kom",
  },
  {
    code: "PTI202",
    name: "Pengembangan Web Modern",
    sks: 3,
    lecturer: "Amuharnis, M.Kom",
  },
  {
    code: "PTI203",
    name: "Basis Data & ORM",
    sks: 3,
    lecturer: "Tim Dosen PTI",
  },
];

export default function CoursesPage() {
  return (
    <main className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-blue-700">AKADEMIK</p>
        <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Daftar Mata Kuliah</h1>
        <p className="mt-2 text-sm text-gray-500">Mata kuliah semester ini.</p>
      </div>

      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[600px] w-full text-left text-sm">
            <thead className="bg-gray-100 text-xs uppercase tracking-wide text-gray-600">
              <tr>
                <th className="px-5 py-4">Kode MK</th>
                <th className="px-5 py-4">Nama Mata Kuliah</th>
                <th className="px-5 py-4">SKS</th>
                <th className="px-5 py-4">Dosen Pengampu</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {courses.map((course) => (
                <tr key={course.code} className="transition hover:bg-blue-50">
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-gray-900">{course.code}</td>
                  <td className="whitespace-nowrap px-5 py-4 font-semibold">{course.name}</td>
                  <td className="px-5 py-4">{course.sks} SKS</td>
                  <td className="px-5 py-4">{course.lecturer}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}