/*
  Warnings:

  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `laporan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "laporan" DROP CONSTRAINT "laporan_kategori_id_fkey";

-- DropForeignKey
ALTER TABLE "laporan" DROP CONSTRAINT "laporan_pelapor_id_fkey";

-- DropForeignKey
ALTER TABLE "petugas_unit" DROP CONSTRAINT "petugas_unit_laporanId_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "role";

-- DropTable
DROP TABLE "laporan";

-- CreateTable
CREATE TABLE "laporanMasyarakat" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "isi" TEXT NOT NULL,
    "nomor_telepon" TEXT NOT NULL,
    "document_pendukung" TEXT NOT NULL,
    "kategori_id" TEXT NOT NULL,
    "unit_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "laporanMasyarakat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "laporanMahasiswaDosen" (
    "id" TEXT NOT NULL,
    "pelapor_id" TEXT NOT NULL,
    "judul_pelaporan" TEXT NOT NULL,
    "isi_pelaporan" TEXT NOT NULL,
    "status" "status" NOT NULL,
    "document_pendukung" TEXT NOT NULL,
    "keterangan_penindakan" TEXT NOT NULL,
    "kategori_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "laporanMahasiswaDosen_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "laporanMasyarakat" ADD CONSTRAINT "laporanMasyarakat_kategori_id_fkey" FOREIGN KEY ("kategori_id") REFERENCES "kategori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laporanMasyarakat" ADD CONSTRAINT "laporanMasyarakat_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laporanMahasiswaDosen" ADD CONSTRAINT "laporanMahasiswaDosen_pelapor_id_fkey" FOREIGN KEY ("pelapor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "laporanMahasiswaDosen" ADD CONSTRAINT "laporanMahasiswaDosen_kategori_id_fkey" FOREIGN KEY ("kategori_id") REFERENCES "kategori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "petugas_unit" ADD CONSTRAINT "petugas_unit_laporanId_fkey" FOREIGN KEY ("laporanId") REFERENCES "laporanMahasiswaDosen"("id") ON DELETE SET NULL ON UPDATE CASCADE;
