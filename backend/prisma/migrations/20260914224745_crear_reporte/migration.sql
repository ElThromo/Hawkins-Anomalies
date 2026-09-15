-- CreateTable
CREATE TABLE `Reporte` (
    `idReporte` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NOT NULL,
    `cuerpo` TEXT NOT NULL,
    `fechaHora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` ENUM('NO_VERIFICADO', 'EN_INVESTIGACION', 'VERIFICADO') NOT NULL DEFAULT 'NO_VERIFICADO',
    `idZona` INTEGER NOT NULL,
    `idUsuario` INTEGER NOT NULL,
    `idCategoria` INTEGER NOT NULL,

    PRIMARY KEY (`idReporte`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ImagenReporte` (
    `idImagen` INTEGER NOT NULL AUTO_INCREMENT,
    `url` VARCHAR(191) NOT NULL,
    `idReporte` INTEGER NOT NULL,

    PRIMARY KEY (`idImagen`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Reporte` ADD CONSTRAINT `Reporte_idZona_fkey` FOREIGN KEY (`idZona`) REFERENCES `Zona`(`idZona`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reporte` ADD CONSTRAINT `Reporte_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Reporte` ADD CONSTRAINT `Reporte_idCategoria_fkey` FOREIGN KEY (`idCategoria`) REFERENCES `Categoria`(`idCategoria`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ImagenReporte` ADD CONSTRAINT `ImagenReporte_idReporte_fkey` FOREIGN KEY (`idReporte`) REFERENCES `Reporte`(`idReporte`) ON DELETE CASCADE ON UPDATE CASCADE;
