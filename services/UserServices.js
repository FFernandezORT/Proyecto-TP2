import { generateToken, verifyToken } from "../utils/jwt.js";
class UserService {
  constructor(user, role) {
    this.user = user;
    this.role = role;
  }

  getUserById = async (id) => {
    const user = await this.user.findOne({
      where: { id },
      attributes: ["id", "name", "email", "roleId"],
    });
    return user;
  };
  createUser = async ({ nombre, email, password, roleId }) => {
    const user = await this.user.create({
      nombre,
      email,
      password,
      roleId,
    });
    return user;
  };
  updateUser = async ({ id, nombre, email, password }) => {
    const user = await this.user.update(
      { nombre, email, password },
      {
        where: { id },
      },
    );
    return user;
  };
  deleteUser = async (id) => {
    return await this.user.destroy({ where: { id } });
  };

  login = async ({ email, password }) => {
    const user = await this.user.findOne({
      where: { email },
      attributes: ["id","nombre", "password", "roleId"],
    });
    if (!user) throw new Error("user not found");
    const validatePassword = await user.validatePassword(password);
    if (!validatePassword) throw new Error("invalid password");

    const payload = {
      id: user.id,
      role: user.roleId,
      nombre: user.nombre
    };
    const token = generateToken(payload);
    return token;
  };

  me = async (token) => {
    const user = await verifyToken(token);
    return user;
  };
}

export default UserService;
