/*
  Warnings:

  - You are about to drop the column `userId` on the `Product` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Product_userId_name_idx";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "userId";

-- CreateIndex
CREATE INDEX "Product_id_name_idx" ON "Product"("id", "name");
