# Gestion-eventos

API RESTful para la gestión de eventos, desarrollada con Node.js, Express y Sequelize. El proyecto está organizado con el patrón MVC para separar responsabilidades y mantener el código más fácil de escalar y mantener.

## Tecnologías utilizadas

- Node.js: entorno de ejecución.
- Express: framework para crear el servidor HTTP y las rutas.
- Sequelize: ORM para trabajar con la base de datos.
- MySQL: motor de base de datos.
- bcrypt, jsonwebtoken y cookie-parser: autenticación y manejo de sesión.
- morgan: registro de peticiones.

## Estructura del proyecto

```text
app.js
config/
connection/
container/
controllers/
middlewares/
models/
routes/
services/
utils/
```

### Cómo funciona el MVC en este proyecto

- Routes: reciben la petición y definen qué controlador se ejecuta.
- Middlewares: validan autenticación y permisos antes de entrar al controlador.
- Controllers: reciben la petición, coordinan la lógica y responden al cliente.
- Services: contienen la lógica de negocio.
- Models: definen las entidades y su relación con la base de datos.
- Connection: inicializa Sequelize y la conexión con MySQL.

El flujo general es: cliente -> ruta -> middleware -> controlador -> servicio -> modelo -> base de datos.

## Requisitos previos

- Node.js instalado.
- MySQL corriendo localmente o en un servidor accesible.
- Una base de datos creada para el proyecto.

## Instalación

1. Instalar dependencias:

```bash
npm install
```

## Ejecución

### Modo producción o local simple

```bash
npm start
```

### Modo desarrollo

```bash
npm run dev
```

El servidor sincroniza las tablas con Sequelize al iniciar la aplicación.

## Uso del MVC

### 1. Rutas

Las rutas principales están agrupadas por recurso:

- `/users`
- `/eventos`
- `/categorias`

### 2. Autenticación

Las rutas protegidas usan un token guardado en cookies. Para acceder a ellas primero debés iniciar sesión.

- `authenticate`: verifica que exista un token válido.
- `isAdmin`: valida que el usuario tenga rol de administrador.

### 3. Controladores y servicios

Los controladores coordinan la petición HTTP y delegan la lógica de negocio en los servicios. Esto evita mezclar acceso a datos con validaciones o armado de respuestas.

### 4. Modelos

Los modelos representan las tablas de la base de datos y se usan para crear, buscar, actualizar y eliminar registros.

## Endpoints disponibles

### Users

- `GET /users/me` - Devuelve el usuario autenticado.
- `GET /users/:id` - Busca un usuario por id.
- `POST /users` - Crea un usuario.
- `POST /users/login` - Inicia sesión.
- `PUT /users/:id` - Actualiza un usuario.
- `DELETE /users/:id` - Elimina un usuario.

### Eventos

- `GET /eventos/:id` - Busca un evento por id.
- `POST /eventos` - Crea un evento. Requiere autenticación y rol admin.
- `PUT /eventos/:id` - Actualiza un evento. Requiere autenticación y rol admin.
- `DELETE /eventos/:id` - Elimina un evento. Requiere autenticación y rol admin.

### Categorías

- `GET /categorias/:id` - Busca una categoría por id.
- `POST /categorias` - Crea una categoría. Requiere autenticación y rol admin.
- `PUT /categorias/:id` - Actualiza una categoría. Requiere autenticación y rol admin.
- `DELETE /categorias/:id` - Elimina una categoría. Requiere autenticación y rol admin.

### Aclaracion

En la base de datos hay que crear los roles de admin(1) y user(2).

## Ejemplo de flujo de uso

1. Levantás el servidor.
2. Hacés login con `POST /users/login`.
3. El token queda guardado en cookies.
4. Consumís los endpoints protegidos de usuarios, eventos o categorías.
5. Los controladores llaman a los servicios y esos servicios usan los modelos para operar sobre la base de datos.

## Estructura de respuesta esperada

La API responde en formato JSON. En caso de error, devuelve un mensaje descriptivo y el código HTTP correspondiente.

## Notas

- Si la base de datos no está disponible, la conexión fallará al iniciar el proyecto.