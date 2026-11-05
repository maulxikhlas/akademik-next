import { NextResponse } from "next/server";
import pool from "@/lib/db";

// READ: Menampilkan semua mahasiswa
export async function GET() {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM mahasiswa ORDER BY id DESC"
    );
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}

// CREATE: Menambahkan mahasiswa
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nim, nama, prodi, email } = body;

    if (!nim || !nama || !prodi || !email) {
      return NextResponse.json(
        { message: "Semua field wajib diisi" },
        { status: 400 }
      );
    }

    const [result] = await pool.execute(
      `INSERT INTO mahasiswa
       (nim, nama, prodi, email)
       VALUES (?, ?, ?, ?)`,
      [nim, nama, prodi, email]
    );

    return NextResponse.json(
      {
        message: "Data berhasil ditambahkan",
        result,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Gagal menambahkan data. Periksa kemungkinan NIM duplikat." },
      { status: 500 }
    );
  }
}           