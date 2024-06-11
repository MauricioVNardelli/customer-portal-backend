-- CreateEnum
CREATE TYPE "Type_Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "Type_Role" NOT NULL DEFAULT 'USER';
