const { Schema, model } = require("mongoose");

const ProductSchema = Schema({
  name: {
    type: String,
    require: [true, "El nombre es requerido"],
    unique: true,
  },

  description: {
    type: String,
    default: "Descripcion del producto",
  },

  price: Number,
});

const product = model("product", ProductSchema);
module.exports = product;
