-- CreateEnum
CREATE TYPE "Role" AS ENUM ('user', 'admin', 'petugas', 'petugas_super');

-- CreateEnum
CREATE TYPE "status" AS ENUM ('pending', 'approved', 'rejected');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "no_identitas" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "program_studi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "unit" (
    "id" TEXT NOT NULL,
    "nama_unit" TEXT NOT NULL,

    CONSTRAINT "unit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "laporan" (
    "id" TEXT NOT NULL,
    "pelapor_id" TEXT NOT NULL,
    "judul_pelaporan" TEXT NOT NULL,
    "isi_pelaporan" TEXT NOT NULL,
    "status" "status" NOT NULL,
    "document_pendukung" TEXT NOT NULL,
    "keterangan_penindakan" TEXT NOT NULL,

    CONSTRAINT "laporan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "petugas_unit" (
    "id" TEXT NOT NULL,
    "petugas_id" TEXT NOT NULL,
    "unit_id" TEXT NOT NULL,
    "laporanId" TEXT,

    CONSTRAINT "petugas_unit_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_no_identitas_key" ON "Users"("no_identitas");

-- AddForeignKey
ALTER TABLE "laporan" ADD CONSTRAINT "laporan_pelapor_id_fkey" FOREIGN KEY ("pelapor_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "petugas_unit" ADD CONSTRAINT "petugas_unit_petugas_id_fkey" FOREIGN KEY ("petugas_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "petugas_unit" ADD CONSTRAINT "petugas_unit_unit_id_fkey" FOREIGN KEY ("unit_id") REFERENCES "unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "petugas_unit" ADD CONSTRAINT "petugas_unit_laporanId_fkey" FOREIGN KEY ("laporanId") REFERENCES "laporan"("id") ON DELETE SET NULL ON UPDATE CASCADE;
