import {User, Role} from "../Models/index.js"
import UserService from "../services/UserServices.js";
import UserController from "../controllers/userController.js";


const userService= new UserService(User, Role)
const userController= new UserController(userService)


export default userController;
