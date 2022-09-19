const mongoose = require("mongoose");

const dbConnection = () => {
  try {
    // https://arunrajeevan.medium.com/understanding-mongoose-connection-options-2b6e73d96de1 - para mas info acerca de opciones adicionales de mongoose

    mongoose.connect(process.env.MONGODB_CONNECTION, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Base de datos conectada");
  } catch (error) {
    console.log("Error en la base de datos");
  }
};

module.exports = {
  dbConnection,
};
