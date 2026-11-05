"use client";

import { useEffect, useState } from "react";

type Prodi = {
  id: number;
  kode: string;
  nama_prodi: string;
  jenjang: string;
  deskripsi: string | null;
};

const initialForm = {
  kode: "",
  nama_prodi: "",
  jenjang: "S1",
  deskripsi: "",
};

const inputClass =
  "rounded-lg border border-slate-300 bg-white p-3 text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:placeholder:text-slate-500";

export default function ProdiPage() {
  const [data, setData] = useState<Prodi[]>([]);
  const [form, setForm] = useState(initialForm);
  const [editId, setEditId] = useState<number | null>(null);
  const [pesan, setPesan] = useState("");

  // READ
  async function loadData() {
    const response = await fetch("/api/prodi");
    const result = await response.json();

    if (response.ok) {
      setData(result);
    } else {
      setPesan(result.message || "Gagal mengambil data");
    }
  }

  useEffect(() => {
    let batal = false;

    fetch("/api/prodi")
      .then(async (response) => {
        const result = await response.json();
        if (batal) return;

        if (response.ok) {
          setData(result);
        } else {
          setPesan(result.message || "Gagal mengambil data");
        }
      })
      .catch(() => {
        if (!batal) setPesan("Gagal terhubung ke server");
      });

    return () => {
      batal = true;
    };
  }, []);

  // CREATE dan UPDATE
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const url = editId ? `/api/prodi/${editId}` : "/api/prodi";
    const method = editId ? "PUT" : "POST";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const result = await response.json();

    if (response.ok) {
      setPesan(result.message);
      setForm(initialForm);
      setEditId(null);
      loadData();
    } else {
      setPesan(result.message || "Operasi gagal");
    }
  }

  // EDIT
  function handleEdit(item: Prodi) {
    setForm({
      kode: item.kode,
      nama_prodi: item.nama_prodi,
      jenjang: item.jenjang,
      deskripsi: item.deskripsi ?? "",
    });
    setEditId(item.id);
    setPesan("");
  }

  // DELETE
  async function handleDelete(id: number) {
    const yakin = confirm("Yakin ingin menghapus data ini?");
    if (!yakin) return;

    const response = await fetch(`/api/prodi/${id}`, {
      method: "DELETE",
    });

    const result = await response.json();
    setPesan(result.message);
    loadData();
  }

  return (
    <main className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-indigo-700 dark:text-indigo-400">AKADEMIK</p>
        <h1 className="mt-1 text-2xl font-bold text-slate-900 dark:text-slate-100 sm:text-3xl">
          Manajemen Data Program Studi
        </h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Tambah, ubah, dan hapus data program studi.
        </p>
      </div>

      {pesan && (
        <div className="rounded-lg bg-indigo-50 p-3 text-sm font-medium text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-300">
          {pesan}
        </div>
      )}

      {/* FORM PRODI */}
      <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="mb-5 text-xl font-semibold text-slate-900 dark:text-slate-100">
          {editId ? "Edit Program Studi" : "Tambah Program Studi"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <input
              type="text"
              placeholder="Kode Prodi (maks. 6 karakter)"
              maxLength={6}
              value={form.kode}
              onChange={(e) => setForm({ ...form, kode: e.target.value })}
              className={inputClass}
              required
            />

            <input
              type="text"
              placeholder="Nama Program Studi"
              maxLength={50}
              value={form.nama_prodi}
              onChange={(e) => setForm({ ...form, nama_prodi: e.target.value })}
              className={inputClass}
              required
            />

            <select
              value={form.jenjang}
              onChange={(e) => setForm({ ...form, jenjang: e.target.value })}
              className={inputClass}
              required
            >
              <option value="D3">D3</option>
              <option value="S1">S1</option>
              <option value="S2">S2</option>
              <option value="S3">S3</option>
            </select>

            <textarea
              placeholder="Deskripsi (opsional)"
              rows={3}
              value={form.deskripsi}
              onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
              className={`${inputClass} md:col-span-2`}
            />
          </div>

          <div className="mt-5 flex gap-3">
            <button
              type="submit"
              className="rounded-lg bg-indigo-700 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-800 dark:bg-indigo-600 dark:hover:bg-indigo-500"
            >
              {editId ? "Update Data" : "Simpan Data"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={() => {
                  setForm(initialForm);
                  setEditId(null);
                }}
                className="rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
              >
                Batal
              </button>
            )}
          </div>
        </form>
      </section>

      {/* TABEL PRODI */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left text-sm">
            <thead className="bg-slate-100 text-xs uppercase tracking-wide text-slate-600 dark:bg-slate-800 dark:text-slate-300">
              <tr>
                <th className="px-5 py-4">No</th>
                <th className="px-5 py-4">Kode</th>
                <th className="px-5 py-4">Nama Program Studi</th>
                <th className="px-5 py-4">Jenjang</th>
                <th className="px-5 py-4">Deskripsi</th>
                <th className="px-5 py-4">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {data.map((item, index) => (
                <tr
                  key={item.id}
                  className="transition hover:bg-indigo-50 dark:hover:bg-slate-800/60"
                >
                  <td className="px-5 py-4 text-slate-700 dark:text-slate-300">{index + 1}</td>
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-900 dark:text-slate-100">{item.kode}</td>
                  <td className="whitespace-nowrap px-5 py-4 text-slate-800 dark:text-slate-200">{item.nama_prodi}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-300">
                      {item.jenjang}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-slate-700 dark:text-slate-300">{item.deskripsi || "-"}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(item)}
                        className="rounded-lg bg-amber-100 px-3 py-1.5 text-xs font-semibold text-amber-800 transition hover:bg-amber-200 dark:bg-amber-500/15 dark:text-amber-300 dark:hover:bg-amber-500/25"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-lg bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-800 transition hover:bg-red-200 dark:bg-red-500/15 dark:text-red-300 dark:hover:bg-red-500/25"
                      >
                        Hapus
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-5 text-center text-slate-500 dark:text-slate-400">
                    Belum ada data program studi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}

