export default function ProfilePage() {
  return (
    <main className="mx-auto max-w-2xl rounded-xl border border-slate-200 border-t-4 border-t-indigo-700 bg-white p-8 shadow-sm">
      <div className="mb-8 flex items-center gap-4">
        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-indigo-700 text-xl font-bold text-white">
          MMI
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          Profil Mahasiswa
        </h1>
      </div>

      <div className="space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Nama Lengkap
          </span>
          <p className="mt-1 text-lg font-medium text-slate-900">
            Muhammad Maulana Ikhlas
          </p>
        </div>
        <div className="border-b border-slate-200 pb-3">
          <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
            NIM
          </span>
          <p className="mt-1 text-lg font-medium text-slate-900">258320711008</p>
        </div>
        <div>
          <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
            Program Studi
          </span>
          <p className="mt-1 text-lg font-medium text-slate-900">
            Pendidikan Teknologi Informasi
          </p>
        </div>
      </div>
    </main>
  );
}