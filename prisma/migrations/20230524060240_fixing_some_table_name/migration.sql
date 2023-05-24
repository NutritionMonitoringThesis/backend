/*
  Warnings:

  - You are about to drop the `StandarStunting` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "StandarStunting";

-- CreateTable
CREATE TABLE "StandardStunting" (
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

    CONSTRAINT "StandardStunting_pkey" PRIMARY KEY ("id")
);
