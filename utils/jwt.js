import jwt from "jsonwebtoken";
import { SECRET } from "../config/config.js";

export const generateToken = (payload) => {
  const token = jwt.sign(payload, SECRET, { expiresIn: "1h" });
  return token;
};

export const verifyToken = (payload) => {
  const decode = jwt.verify(payload, SECRET);
  return decode;
};
