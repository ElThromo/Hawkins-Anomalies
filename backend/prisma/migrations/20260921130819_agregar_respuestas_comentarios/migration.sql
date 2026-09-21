-- AlterTable
ALTER TABLE `comentario` ADD COLUMN `idComentarioPadre` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Comentario` ADD CONSTRAINT `Comentario_idComentarioPadre_fkey` FOREIGN KEY (`idComentarioPadre`) REFERENCES `Comentario`(`idComentario`) ON DELETE CASCADE ON UPDATE NO ACTION;
