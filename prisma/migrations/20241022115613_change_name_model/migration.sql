/*
  Warnings:

  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "role" AS ENUM ('user', 'admin', 'petugas', 'petugas_super');

-- DropForeignKey
ALTER TABLE "laporan" DROP CONSTRAINT "laporan_pelapor_id_fkey";

-- DropForeignKey
ALTER TABLE "petugas_unit" DROP CONSTRAINT "petugas_unit_petugas_id_fkey";

-- DropTable
DROP TABLE "Users";

-- DropEnum
DROP TYPE "Role";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "no_identitas" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "program_studi" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "role" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_no_identitas_key" ON "users"("no_identitas");

-- AddForeignKey
ALTER TABLE "laporan" ADD CONSTRAINT "laporan_pelapor_id_fkey" FOREIGN KEY ("pelapor_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "petugas_unit" ADD CONSTRAINT "petugas_unit_petugas_id_fkey" FOREIGN KEY ("petugas_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
