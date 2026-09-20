# Administración de tipos de reacción

Página: /admin/tipos-reaccion. Se muestra en el menú lateral para usuarios ADMIN.
Permite listar, crear, editar y eliminar tipos con nombre y emoji. El backend
comprueba el rol y estado actuales en la base. Los tipos en uso no se eliminan.

Después de estos cambios, reiniciar el backend. No hay migraciones nuevas respecto
de crear_tipo_reaccion. Iniciar sesión con una cuenta ADMIN ya configurada; si se
cambia su rol desde la base, cerrar sesión e ingresar de nuevo para renovar el perfil.

Seguridad: PUT y DELETE /usuarios/:id ahora requieren un administrador activo.
Antes eran públicos y permitían cambiar roles sin autenticación. Si se implementa
edición del perfil propio, deberá ser una ruta con campos permitidos explícitos,
sin permitir cambios de rol o estado por parte del usuario.

Prueba automática desde la raíz:

    node --test backend/tests/tipoReaccion.test.js

Usa HTTP real con repositorios simulados: no modifica la base local. Cubre CRUD,
validación, duplicados, registros inexistentes, eliminación en uso y permisos
(incluido un token con rol ADMIN cuyo usuario tiene rol USUARIO en la base).

Verificación manual con MySQL: crear un tipo temporal, editarlo, reaccionar con él
a un reporte y comprobar que no se permite eliminarlo. Quitar esa reacción y borrar
el tipo temporal. Probar también una cuenta sin permisos. La prueba automática no
sustituye esta comprobación de las restricciones reales de MySQL.
