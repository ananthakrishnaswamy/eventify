/*
  Warnings:

  - The values [PANDIT] on the enum `VendorType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `panditId` on the `EventBooking` table. All the data in the column will be lost.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "VendorType_new" AS ENUM ('HALL', 'CATERER', 'PUROHIT', 'DECOR', 'MUSIC', 'PHOTOGRAPHY', 'VIDEOGRAPHY');
ALTER TABLE "Vendor" ALTER COLUMN "type" TYPE "VendorType_new" USING ("type"::text::"VendorType_new");
ALTER TYPE "VendorType" RENAME TO "VendorType_old";
ALTER TYPE "VendorType_new" RENAME TO "VendorType";
DROP TYPE "public"."VendorType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "EventBooking" DROP CONSTRAINT "EventBooking_panditId_fkey";

-- AlterTable
ALTER TABLE "EventBooking" DROP COLUMN "panditId",
ADD COLUMN     "purohitId" TEXT;

-- AddForeignKey
ALTER TABLE "EventBooking" ADD CONSTRAINT "EventBooking_purohitId_fkey" FOREIGN KEY ("purohitId") REFERENCES "Vendor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
