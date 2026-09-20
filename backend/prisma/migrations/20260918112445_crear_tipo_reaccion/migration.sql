-- 1. Crear el catálogo de tipos.
CREATE TABLE `TipoReaccion` (
    `idTipoReaccion` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `emoji` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `TipoReaccion_nombre_key` (`nombre`),
    PRIMARY KEY (`idTipoReaccion`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 2. Cargar las opciones que ya existían.
INSERT INTO `TipoReaccion` (`idTipoReaccion`, `nombre`, `emoji`)
VALUES
    (1, 'Me gusta', '👍'),
    (2, 'Miedo', '😨'),
    (3, 'Sorpresa', '😮'),
    (4, 'Me encanta', '❤️');

-- 3. Agregar el vínculo, permitiendo NULL temporalmente.
ALTER TABLE `Reaccion`
ADD COLUMN `idTipoReaccion` INTEGER NULL;

-- 4. Conservar la elección de cada usuario.
UPDATE `Reaccion`
SET `idTipoReaccion` = CASE `tipo`
    WHEN 'ME_GUSTA' THEN 1
    WHEN 'MIEDO' THEN 2
    WHEN 'SORPRESA' THEN 3
    WHEN 'ME_ENCANTA' THEN 4
END;

-- 5. Hacer obligatorio el vínculo y agregar la clave foránea.
ALTER TABLE `Reaccion`
MODIFY COLUMN `idTipoReaccion` INTEGER NOT NULL,
ADD CONSTRAINT `Reaccion_idTipoReaccion_fkey`
FOREIGN KEY (`idTipoReaccion`)
REFERENCES `TipoReaccion` (`idTipoReaccion`)
ON DELETE RESTRICT ON UPDATE CASCADE;

-- 6. Quitar la columna anterior, después de trasladar sus datos.
ALTER TABLE `Reaccion`
DROP COLUMN `tipo`;
