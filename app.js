import express from "express";
import cookieParser from "cookie-parser";
import router from "./routes/router.js";
import "./connection/sequielize.js";
import { SERVER_PORT } from "./config/config.js";
import { log } from "./middlewares/log.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(log);

app.use(router);

app.listen(SERVER_PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${SERVER_PORT}`);
});
