# The Hawkins Forum

## Grupo
### Integrantes
* 54827 - Rosati, Ignacio Jesús
* 54824 - Franceschetti, Luca
* 53668 - Dzhaparova, Ruf

### Repositorios
* [frontend app](http://hyperlinkToGihubOrGitlab)
* [backend app](http://hyperlinkToGihubOrGitlab)

## Tema
### Descripción
Aplicación web que simula un foro comunitario en el pueblo de Hawkins perteneciente al universo de Stranger Things, donde los usuarios pueden compartir teorías y reportar eventos extraños. La plataforma permite la interacción entre usuarios mediante publicaciones, comentarios y clasificaciones, facilitando la construcción colectiva de explicaciones sobre fenómenos inusuales que ocurren en el pueblo.

### Modelo

## Alcance Funcional 

### Alcance Mínimo

*Nota*: el siguiente es un ejemplo para un grupo de 3 integrantes para un sistema de hotel. El 

Regularidad:
|Req|Detalle|
|:-|:-|
|CRUD simple|1. CRUD Usuario<br>2. CRUD Categoria<br>3. CRUD Zona |
|CRUD dependiente|1. CRUD Reporte {depende de} CRUD Usuario<br>2. CRUD Comentario {depende de} CRUD Usuario y Reporte|
|Listado<br>+<br>detalle| 1. Listado de reportes, muestra título, categori y usuario => detalle muestra contenido completo y comentarios 2. Listado de publicaciones por usuario|
|CUU/Epic|1. Realizar reporte de anomalia<br>2. Comentar o reaccionar al reporte de otro usuario|


Adicionales para Aprobación
|Req|Detalle|
|:-|:-|
|CRUD |1. CRUD Usuario<br>2. CRUD Categoria<br>3. CRUD reporte<br>4. CRUD Comentario<br>5. CRUD Zona<br>6. CRUD Reaccion<br>7. CRUD Resolucion|
|CUU/Epic|1. Validar y cambiar el estado de un reporte ((No verificado, En investigacion, Verificado) <br>2. Agregar resolucion al reporte luego de la investegacion pertinente.|


### Alcance Adicional Voluntario
|Req|Detalle|
|:-|:-|
|Listados |1. Listado de reportes filtrados por categoría (criaturas, fenómenos, etc.) <br>2. Listado de usuarios => detalle con sus publicaciones|
|Otros|1. Notificaciones: notificar al usuario cuando alguien comenta o reacciona a su reporte.|

