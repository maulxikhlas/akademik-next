import { NextResponse } from "next/server";
import type { ResultSetHeader, RowDataPacket } from "mysql2";
import pool from "@/lib/db";

const JENJANG = ["S3", "S2", "S1", "D3"];

type Hasil =
  | { error: string }
  | {
      data: {
        kode: string;
        nama_prodi: string;
        jenjang: string;
        deskripsi: string | null;
      };
    };

function validasi(body: unknown): Hasil {
  const b = (body ?? {}) as Record<string, unknown>;
  const kode = String(b.kode ?? "").trim();
  const nama_prodi = String(b.nama_prodi ?? "").trim();
  const jenjang = String(b.jenjang ?? "").trim();
  const deskripsi = String(b.deskripsi ?? "").trim();

  if (!kode || !nama_prodi || !jenjang) {
    return { error: "Kode, nama prodi, dan jenjang wajib diisi" };
  }
  if (kode.length > 6) return { error: "Kode maksimal 6 karakter" };
  if (nama_prodi.length > 50) return { error: "Nama prodi maksimal 50 karakter" };
  if (!JENJANG.includes(jenjang)) return { error: "Jenjang tidak valid" };

  return { data: { kode, nama_prodi, jenjang, deskripsi: deskripsi || null } };
}

// READ: Mengambil satu prodi
export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!/^[1-9]\d*$/.test(id)) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    const [rows] = await pool.execute<RowDataPacket[]>(
      "SELECT * FROM prodi WHERE id = ?",
      [id]
    );

    if (rows.length === 0) {
      return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Gagal mengambil data" }, { status: 500 });
  }
}

// UPDATE: Mengubah data prodi
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!/^[1-9]\d*$/.test(id)) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    const hasil = validasi(await request.json());
    if ("error" in hasil) {
      return NextResponse.json({ message: hasil.error }, { status: 400 });
    }
    const { kode, nama_prodi, jenjang, deskripsi } = hasil.data;

    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE prodi
       SET kode = ?, nama_prodi = ?, jenjang = ?, deskripsi = ?
       WHERE id = ?`,
      [kode, nama_prodi, jenjang, deskripsi, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ message: "Data berhasil diperbarui" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Gagal memperbarui data" }, { status: 500 });
  }
}

// DELETE: Menghapus prodi
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!/^[1-9]\d*$/.test(id)) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    const [result] = await pool.execute<ResultSetHeader>(
      "DELETE FROM prodi WHERE id = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ message: "Data tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ message: "Data berhasil dihapus" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Gagal menghapus data" }, { status: 500 });
  }
}

