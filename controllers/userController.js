class UserController {
  constructor(userService) {
    this.userService = userService;
  }
 
  getUserById = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await this.userService.getUserById(id);
      res.status(200).send({ success: true, message: user });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
 createUser = async (req, res) => {
  try {
    console.log("BODY RECIBIDO:", req.body);

    const { nombre, email, password, roleId } = req.body;

    console.log("NOMBRE:", nombre);

    const user = await this.userService.createUser({
      nombre,
      email,
      password,
      roleId,
    });

    res.status(200).send({ success: true, message: user });
  } catch (error) {
    res.status(400).send({ success: false, message: error.message });
  }
};
  updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, email, password } = req.body;
      const user = await this.userService.updateUser({
        id,
        nombre,
        email,
        password,
      });
      res.status(200).send({ success: true, message: user });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
  deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await this.userService.deleteUser(id);
      res.status(200).send({ success: true, message: user });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const token = await this.userService.login({ email, password });
      res.cookie("token", token);
      res.status(200).send({ success: true, message: "user ok" });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };

  me = async (req, res) => {
    try {
      const  {token}  = req.cookies;
      const user = await this.userService.me(token);
      res.status(200).send({ success: true, message: user });
    } catch (error) {
      res.status(400).send({ success: false, message: error.message });
    }
  };
}

export default UserController;