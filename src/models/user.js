const { Schema, model } = require("mongoose");

const UserSchema = Schema({
  email: {
    type: String,
    require: [true, "El email es requerido"],
  },

  username: {
    type: String,
    require: [true, "El nombre es requerido"],
    unique: true,
  },

  password: {
    type: String,
  },
});

UserSchema.methods.toJSON = function () {
  const { __v, _id, ...lodemas } = this.toObject();
  lodemas.id = _id;
  return lodemas;
};

const User = model("user", UserSchema);
module.exports = User;
