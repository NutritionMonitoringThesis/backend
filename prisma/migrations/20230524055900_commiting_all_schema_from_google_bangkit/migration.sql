-- CreateEnum
CREATE TYPE "StatusKelahiran" AS ENUM ('LAHIR', 'MENINGGAL', 'KEGUGURAN', 'BELUM');

-- CreateTable
CREATE TABLE "UserDetails" (
    "userId" TEXT NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TIMESTAMP(3) NOT NULL,
    "profileUrl" TEXT,
    "jenisKelamin" "JenisKelamin" NOT NULL,

    CONSTRAINT "UserDetails_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "Anak" (
    "id" TEXT NOT NULL,
    "namaLengkap" TEXT NOT NULL,
    "tempatLahir" TEXT NOT NULL,
    "tanggalLahir" TEXT NOT NULL,
    "parentId" TEXT NOT NULL,

    CONSTRAINT "Anak_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryGizi" (
    "id" TEXT NOT NULL,
    "anakId" TEXT,
    "ibuId" TEXT,
    "timastamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "namaMakanan" TEXT NOT NULL,
    "persentaseHabis" DECIMAL(65,30) NOT NULL,
    "VitA" DOUBLE PRECISION NOT NULL,
    "VitB1" DOUBLE PRECISION NOT NULL,
    "VitB2" DOUBLE PRECISION NOT NULL,
    "VitB3" DOUBLE PRECISION NOT NULL,
    "VitC" DOUBLE PRECISION NOT NULL,
    "Energi" DOUBLE PRECISION NOT NULL,
    "Protein" DOUBLE PRECISION NOT NULL,
    "Lemak" DOUBLE PRECISION NOT NULL,
    "Karbohidrat" DOUBLE PRECISION NOT NULL,
    "Serat" DOUBLE PRECISION NOT NULL,
    "Air" DOUBLE PRECISION NOT NULL,
    "Ca" DOUBLE PRECISION NOT NULL,
    "F" DOUBLE PRECISION NOT NULL,
    "Fe2" DOUBLE PRECISION NOT NULL,
    "Zn2" DOUBLE PRECISION NOT NULL,
    "Ka" DOUBLE PRECISION NOT NULL,
    "Na" DOUBLE PRECISION NOT NULL,
    "Cu" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "HistoryGizi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryStunting" (
    "id" TEXT NOT NULL,
    "anakId" TEXT NOT NULL,
    "tinggiBadan" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "result" TEXT NOT NULL,

    CONSTRAINT "HistoryStunting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StandarGizi" (
    "id" TEXT NOT NULL,
    "awalRentang" INTEGER,
    "akhirRentang" INTEGER,
    "trimester" INTEGER,
    "satuan" TEXT,
    "kelompok" TEXT NOT NULL,

    CONSTRAINT "StandarGizi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StandarGiziDetails" (
    "standardGiziId" TEXT NOT NULL,
    "tinggiBadan" INTEGER NOT NULL,
    "beratBadan" DOUBLE PRECISION NOT NULL,
    "VitA" DOUBLE PRECISION NOT NULL,
    "VitB1" DOUBLE PRECISION NOT NULL,
    "VitB2" DOUBLE PRECISION NOT NULL,
    "VitB3" DOUBLE PRECISION NOT NULL,
    "VitC" DOUBLE PRECISION NOT NULL,
    "Energi" DOUBLE PRECISION NOT NULL,
    "Protein" DOUBLE PRECISION NOT NULL,
    "Lemak" DOUBLE PRECISION NOT NULL,
    "Karbohidrat" DOUBLE PRECISION NOT NULL,
    "Serat" DOUBLE PRECISION NOT NULL,
    "Air" DOUBLE PRECISION NOT NULL,
    "Ca" DOUBLE PRECISION NOT NULL,
    "F" DOUBLE PRECISION NOT NULL,
    "Fe2" DOUBLE PRECISION NOT NULL,
    "Zn2" DOUBLE PRECISION NOT NULL,
    "Ka" DOUBLE PRECISION NOT NULL,
    "Na" DOUBLE PRECISION NOT NULL,
    "Cu" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "StandarGiziDetails_pkey" PRIMARY KEY ("standardGiziId")
);

-- CreateTable
CREATE TABLE "GiziMakanan" (
    "id" TEXT NOT NULL,
    "namaMakanan" TEXT NOT NULL,
    "beratPerPorsi" DOUBLE PRECISION NOT NULL,
    "VitA" DOUBLE PRECISION NOT NULL,
    "VitB1" DOUBLE PRECISION NOT NULL,
    "VitB2" DOUBLE PRECISION NOT NULL,
    "VitB3" DOUBLE PRECISION NOT NULL,
    "VitC" DOUBLE PRECISION NOT NULL,
    "Energi" DOUBLE PRECISION NOT NULL,
    "Protein" DOUBLE PRECISION NOT NULL,
    "Lemak" DOUBLE PRECISION NOT NULL,
    "Karbohidrat" DOUBLE PRECISION NOT NULL,
    "Serat" DOUBLE PRECISION NOT NULL,
    "Air" DOUBLE PRECISION NOT NULL,
    "Ca" DOUBLE PRECISION NOT NULL,
    "F" DOUBLE PRECISION NOT NULL,
    "Fe2" DOUBLE PRECISION NOT NULL,
    "Zn2" DOUBLE PRECISION NOT NULL,
    "Ka" DOUBLE PRECISION NOT NULL,
    "Na" DOUBLE PRECISION NOT NULL,
    "Cu" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "GiziMakanan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HistoryKehamilan" (
    "id" TEXT NOT NULL,
    "userDetailId" TEXT NOT NULL,
    "tanggalHamil" TIMESTAMP(3) NOT NULL,
    "tanggalKelahiran" TIMESTAMP(3),
    "lahir" "StatusKelahiran" NOT NULL,

    CONSTRAINT "HistoryKehamilan_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StandarStunting" (
    "id" TEXT NOT NULL,
    "umur" INTEGER NOT NULL,
    "gender" "JenisKelamin" NOT NULL,
    "SDMinus3" DOUBLE PRECISION NOT NULL,
    "SDMinus2" DOUBLE PRECISION NOT NULL,
    "SDMinus1" DOUBLE PRECISION NOT NULL,
    "Median" DOUBLE PRECISION NOT NULL,
    "SDPlus1" DOUBLE PRECISION NOT NULL,
    "SDPlus2" DOUBLE PRECISION NOT NULL,
    "SDPlus3" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "StandarStunting_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EducationArticle" (
    "id" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "urlToImage" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EducationArticle_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserDetails" ADD CONSTRAINT "UserDetails_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Anak" ADD CONSTRAINT "Anak_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "UserDetails"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryGizi" ADD CONSTRAINT "HistoryGizi_anakId_fkey" FOREIGN KEY ("anakId") REFERENCES "Anak"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryGizi" ADD CONSTRAINT "HistoryGizi_ibuId_fkey" FOREIGN KEY ("ibuId") REFERENCES "UserDetails"("userId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryStunting" ADD CONSTRAINT "HistoryStunting_anakId_fkey" FOREIGN KEY ("anakId") REFERENCES "Anak"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StandarGiziDetails" ADD CONSTRAINT "StandarGiziDetails_standardGiziId_fkey" FOREIGN KEY ("standardGiziId") REFERENCES "StandarGizi"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HistoryKehamilan" ADD CONSTRAINT "HistoryKehamilan_userDetailId_fkey" FOREIGN KEY ("userDetailId") REFERENCES "UserDetails"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
