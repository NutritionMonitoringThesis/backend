/*
  Warnings:

  - Added the required column `jenisKelamin` to the `Anak` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Anak" ADD COLUMN     "jenisKelamin" "JenisKelamin" NOT NULL;
