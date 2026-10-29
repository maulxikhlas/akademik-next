export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-2xl rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
      <h1 className="mb-6 text-3xl font-bold text-gray-900">Profil Mahasiswa</h1>

      <div className="space-y-4">
        <div className="border-b pb-3">
          <span className="block text-sm font-semibold text-gray-500">Nama Lengkap</span>
          <p className="text-lg font-medium text-gray-900">Muhammad Maulana Ikhlas</p>
        </div>
        <div className="border-b pb-3">
          <span className="block text-sm font-semibold text-gray-500">NIM</span>
          <p className="text-lg font-medium text-gray-900">258320711008</p>
        </div>
        <div>
          <span className="block text-sm font-semibold text-gray-500">Program Studi</span>
          <p className="text-lg font-medium text-gray-900">Pendidikan Teknologi Informasi</p>
        </div>
      </div>
    </main>
  );
}