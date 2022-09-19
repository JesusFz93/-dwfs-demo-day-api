const User = require("../models/user");
const bcrypt = require("bcrypt");
const { generarJWT } = require("../helpers/jwt.helper");

const registerUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    const emailEncontrado = await User.findOne({ email: email });

    if (emailEncontrado) {
      return res.status(400).json({
        ok: false,
        msg: `Error, el correo ${emailEncontrado.email} ya esta registrado`,
      });
    }

    const usernameEncontrado = await User.findOne({ username: username });

    if (usernameEncontrado) {
      return res.status(400).json({
        ok: false,
        msg: `Error, el username ${usernameEncontrado.username} ya esta registrado`,
      });
    }

    const salt = bcrypt.genSaltSync(10);

    const user = {
      email: email,
      username: username,
      password: bcrypt.hashSync(password, salt),
    };

    const nuevoUsuario = await User.create(user);

    const token = await generarJWT(nuevoUsuario.id);

    const { password: contra, ...user_obj } = nuevoUsuario._doc;

    return res.status(201).json({
      ok: true,
      msg: "Registro exitoso",
      data: user_obj,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Problemas del lado del servidor",
      data: [],
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        ok: false,
        msg: "Error al iniciar sesion - no se encontro el usuario",
      });
    }

    const validarPassword = bcrypt.compareSync(password, user.password);

    if (!validarPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Error al iniciar sesion - contrasenia incorrecta",
      });
    }

    const token = await generarJWT(user.id);

    const { password: contra, ...user_obj } = user._doc;

    console.log();

    return res.json({
      ok: true,
      msg: "Acceso otorgado",
      data: user_obj,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Problemas del lado del servidor",
      data: [],
    });
  }
};

const verificarUsuario = async (req, res) => {
  const { usuario } = req;

  const token = await generarJWT(usuario.id);

  const { password: contra, ...user_obj } = usuario._doc;

  return res.json({
    ok: true,
    msg: "Usuario validado",
    data: user_obj,
    token,
  });
};

module.exports = {
  registerUser,
  login,
  verificarUsuario,
};
