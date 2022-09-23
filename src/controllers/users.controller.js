const User = require("../models/user");
const bcrypt = require("bcrypt");

const updateUser = async (req, res) => {
    try {
        const { email, username, password, image } = req.body;
        const { id } = req.params;

        const usuarioEncontrado = await User.findById(id);

        if (!usuarioEncontrado) {
            return res.status(404).json({
                ok: false,
                msg: `Error, el usuario ${usuarioEncontrado.id} no se encontro`,
            });
        }

        const emailEncontrado = await User.findOne({ email: email });

        if (emailEncontrado.id == id) {
            return res.status(400).json({
                ok: false,
                msg: `Error, el correo ${emailEncontrado.email} ya esta registrado`,
            });
        }

        const usernameEncontrado = await User.findOne({ username: username });

        if (usernameEncontrado.id == id) {
            return res.status(400).json({
                ok: false,
                msg: `Error, el username ${usernameEncontrado.username} ya esta registrado`,
            });
        }

        const salt = bcrypt.genSaltSync(10);

        const user = {
            email,
            username,
            image,
            password: bcrypt.hashSync(password, salt),
        };

        const nuevoUsuario = await User.create(user);

        const token = await generarJWT(nuevoUsuario.id);

        const userFound = {
            id: nuevoUsuario.id,
            email: nuevoUsuario.email,
            username: nuevoUsuario.username,
            image: nuevoUsuario.image,
        }

        return res.status(201).json({
            ok: true,
            msg: "Registro exitoso",
            data: userFound,
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

module.exports = {
    updateUser,
};
