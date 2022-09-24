const User = require("../models/user");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
  try {
    const { email, username, password, image, firstName, lastName } = req.body;
    const { id } = req.params;
    const { usuario } = req;

    // const usuarioEncontrado = await User.findById(usuario.id);

    // if (!usuarioEncontrado) {
    //   return res.status(404).json({
    //     ok: false,
    //     msg: `Error, el usuario ${usuarioEncontrado.id} no se encontro`,
    //   });
    // }

    if (usuario.id !== id) {
      return res.status(401).json({
        ok: false,
        msg: "Error, no tiene privilegios para editar este usuario",
      });
    }

    const emailEncontrado = await User.findOne({ email: email });

    if (emailEncontrado && emailEncontrado.id !== usuario.id) {
      return res.status(400).json({
        ok: false,
        msg: `Error, el correo ${emailEncontrado.email} ya esta registrado`,
      });
    }

    const usernameEncontrado = await User.findOne({ username: username });

    if (usernameEncontrado && usernameEncontrado.id !== usuario.id) {
      return res.status(400).json({
        ok: false,
        msg: `Error, el username ${usernameEncontrado.username} ya esta registrado`,
      });
    }

    const user = {
      email,
      username,
      image,
      firstName,
      lastName,
    };

    if (password) {
      const salt = bcrypt.genSaltSync(10);
      user.password = bcrypt.hashSync(password, salt);
    }

    const usuarioActualizado = await User.findByIdAndUpdate(usuario.id, user, {
      new: true,
    });

    const userFound = {
      id: usuarioActualizado.id,
      email: usuarioActualizado.email,
      username: usuarioActualizado.username,
      image: usuarioActualizado.image,
      firstName: usuarioActualizado.firstName,
      lastName: usuarioActualizado.lastName,
    };

    return res.status(200).json({
      ok: true,
      msg: "Informacion del usuario actualizada",
      data: userFound,
    });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      msg: "Problemas del lado del servidor",
      data: [],
    });
  }
};

module.exports = {
  updateUser,
};
