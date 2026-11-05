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

// READ: Menampilkan semua prodi
export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT * FROM prodi ORDER BY id DESC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Gagal mengambil data" }, { status: 500 });
  }
}

// CREATE: Menambahkan prodi
export async function POST(request: Request) {
  try {
    const hasil = validasi(await request.json());
    if ("error" in hasil) {
      return NextResponse.json({ message: hasil.error }, { status: 400 });
    }
    const { kode, nama_prodi, jenjang, deskripsi } = hasil.data;

    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO prodi (kode, nama_prodi, jenjang, deskripsi)
       VALUES (?, ?, ?, ?)`,
      [kode, nama_prodi, jenjang, deskripsi]
    );

    return NextResponse.json(
      { message: "Data berhasil ditambahkan", result },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Gagal menambahkan data" }, { status: 500 });
  }
}

