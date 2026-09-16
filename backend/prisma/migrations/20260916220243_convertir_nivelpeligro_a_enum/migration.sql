/*
  Warnings:

  - You are about to alter the column `nivelPeligro` on the `zona` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `zona` MODIFY `nivelPeligro` ENUM('BAJO', 'MEDIO', 'ALTO', 'CRITICO') NOT NULL;
