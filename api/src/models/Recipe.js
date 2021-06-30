const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("recipe", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      get() {
        return this.getDataValue("name").toUpperCase();
      },
    },
    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
    rating: {
      type: DataTypes.STRING,
    },
    level_of_healthy: {
      type: DataTypes.INTEGER,
    },
    step_by_step: {
      type: DataTypes.STRING,
    },
  });
};
