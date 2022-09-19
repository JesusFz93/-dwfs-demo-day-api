// 1. IMPORTACIONES
require("dotenv").config();
const cors = require("cors");
const express = require("express");
const { dbConnection } = require("./database/config");
const app = express();
const PORT = process.env.PORT || 4003;

const authRoutes = require("./routes/auth.routes");

dbConnection();

// 2.MIDDLEWARES
app.use(cors());
app.use(express.json());

// 3.ROUTES
app.get("/", (req, res) => {
  return res.json({
    msg: "Bienvenido al API de Demo",
    autor: process.env.AUTOR,
  });
});
app.use("/api/products", require("./routes/products.routes"));
app.use("/api/auth", authRoutes);

// 4. SERVIDOR
app.listen(PORT, () => {
  console.log(`Servidor ejecutando en el puerto ${PORT}`);
});
