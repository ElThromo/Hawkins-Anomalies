-- CreateTable
CREATE TABLE `Reaccion` (
    `idReaccion` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('ME_GUSTA', 'MIEDO', 'SORPRESA', 'ME_ENCANTA') NOT NULL,
    `idUsuario` INTEGER NOT NULL,
    `idReporte` INTEGER NOT NULL,

    UNIQUE INDEX `Reaccion_idUsuario_idReporte_key`(`idUsuario`, `idReporte`),
    PRIMARY KEY (`idReaccion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reaccion` ADD CONSTRAINT `Reaccion_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reaccion` ADD CONSTRAINT `Reaccion_idReporte_fkey` FOREIGN KEY (`idReporte`) REFERENCES `Reporte`(`idReporte`) ON DELETE CASCADE ON UPDATE CASCADE;
