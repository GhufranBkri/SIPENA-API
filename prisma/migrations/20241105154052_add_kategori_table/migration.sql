/*
  Warnings:

  - Added the required column `kategori_id` to the `laporan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `laporan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "laporan" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "kategori_id" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "kategori" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "kategori_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "kategori_nama_key" ON "kategori"("nama");

-- AddForeignKey
ALTER TABLE "laporan" ADD CONSTRAINT "laporan_kategori_id_fkey" FOREIGN KEY ("kategori_id") REFERENCES "kategori"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
