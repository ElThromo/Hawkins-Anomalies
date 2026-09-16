-- CreateTable
CREATE TABLE `Resolucion` (
    `idResolucion` INTEGER NOT NULL AUTO_INCREMENT,
    `idReporte` INTEGER NOT NULL,
    `resolucion` VARCHAR(191) NOT NULL,
    `cuerpoResolucion` TEXT NOT NULL,
    `fechaHora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`idResolucion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Resolucion` ADD CONSTRAINT `Resolucion_idReporte_fkey` FOREIGN KEY (`idReporte`) REFERENCES `Reporte`(`idReporte`) ON DELETE CASCADE ON UPDATE CASCADE;
