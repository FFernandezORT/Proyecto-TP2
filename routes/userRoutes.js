import { Router } from "express";
import userController from "../container/userContainer.js";
import { authenticate, isAdmin } from "../middlewares/auth.js";

const userRoutes= Router();


userRoutes.get("/me", authenticate, userController.me);
userRoutes.get("/:id", authenticate, userController.getUserById);
userRoutes.post("/", authenticate, userController.createUser);
userRoutes.post("/login", authenticate, userController.login);
userRoutes.put("/:id", authenticate, userController.updateUser);
userRoutes.delete("/:id", authenticate, userController.deleteUser);

export default userRoutes;