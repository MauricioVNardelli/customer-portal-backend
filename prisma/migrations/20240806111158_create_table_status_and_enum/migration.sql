-- CreateEnum
CREATE TYPE "status_enum" AS ENUM ('ATIVO', 'DESATIVADO');

-- CreateTable
CREATE TABLE "status" (
    "id" TEXT NOT NULL,
    "status" "status_enum" NOT NULL DEFAULT 'ATIVO',

    CONSTRAINT "status_pkey" PRIMARY KEY ("id")
);
