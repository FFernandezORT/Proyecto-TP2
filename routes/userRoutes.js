import { Router } from "express";
import userController from "../container/userContainer.js";

const userRoutes= Router();


userRoutes.get("/me", userController.me);
userRoutes.get("/:id", userController.getUserById);
userRoutes.post("/", userController.createUser);
userRoutes.post("/login", userController.login);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);

export default userRoutes;