import express from "express";
import cookieParser from "cookie-parser";NP


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());


