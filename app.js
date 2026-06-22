import express from "express";
import router from "./routes/router.js";
import morgan from "morgan";
import sequelize from "./connection/sequielize.js";
import { SERVER_PORT } from "./config/config.js";
import cookieParser from "cookie-parser";



const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());   
app.use(morgan('dev'));
app.use(cookieParser());


await sequelize.sync({force: false})
try {
  await sequelize.sync();
  console.log("Tablas sincronizadas");
} catch (error) {
  console.error("Error al sincronizar las tablas:", error);
}

app.use(router);

app.listen(SERVER_PORT, () => (
    console.log(`Servidor en puerto: http://localhost:${SERVER_PORT}`)
))
