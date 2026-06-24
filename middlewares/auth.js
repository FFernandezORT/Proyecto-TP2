import { verifyToken } from "../utils/jwt.js";

export const authenticate = (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      throw new Error("Debe iniciar sesión");
    }

    const user = verifyToken(token);
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({
      success: false,
      message: error.message
    });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user.role !== 1) {
    return res.status(403).send({
      success: false,
      message: "Solo administradores"
    });
  }

  next();
};