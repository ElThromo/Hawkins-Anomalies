-- CreateTable
CREATE TABLE `Vigilante` (
    `idVigilante` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `idZona` INTEGER NOT NULL,

    PRIMARY KEY (`idVigilante`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Vigilante` ADD CONSTRAINT `Vigilante_idZona_fkey` FOREIGN KEY (`idZona`) REFERENCES `Zona`(`idZona`) ON DELETE RESTRICT ON UPDATE CASCADE;
