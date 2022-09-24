const { Router } = require("express");
const { updateUser } = require("../controllers/users.controller");

const { validarJWT } = require("../middlewares/jwt.middleware");

const router = Router();

router.put("/:id", validarJWT, updateUser);

module.exports = router;
