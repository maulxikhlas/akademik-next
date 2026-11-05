import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { RowDataPacket, ResultSetHeader } from "mysql2";

// READ: Mengambil satu mahasiswa
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
      "SELECT * FROM mahasiswa WHERE id = ?",
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

// UPDATE: Mengubah data mahasiswa
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { nim, nama, prodi, email } = body;

    if (!/^[1-9]\d*$/.test(id)) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    if (!nim || !nama || !prodi || !email) {
      return NextResponse.json({ message: "Semua field wajib diisi" }, { status: 400 });
    }

    const [result] = await pool.execute<ResultSetHeader>(
      `UPDATE mahasiswa
       SET nim = ?, nama = ?, prodi = ?, email = ?
       WHERE id = ?`,
      [nim, nama, prodi, email, id]
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

// DELETE: Menghapus mahasiswa
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
      "DELETE FROM mahasiswa WHERE id = ?",
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
