-- CreateTable
CREATE TABLE `Comentario` (
    `idComentario` INTEGER NOT NULL AUTO_INCREMENT,
    `texto` TEXT NOT NULL,
    `fechaHora` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `idUsuario` INTEGER NOT NULL,
    `idReporte` INTEGER NOT NULL,

    PRIMARY KEY (`idComentario`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_idUsuario_fkey` FOREIGN KEY (`idUsuario`) REFERENCES `Usuario`(`idUsuario`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_idReporte_fkey` FOREIGN KEY (`idReporte`) REFERENCES `Reporte`(`idReporte`) ON DELETE CASCADE ON UPDATE CASCADE;
