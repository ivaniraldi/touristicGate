const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('activity', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        difficulty: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        duration: {
            type: DataTypes.FLOAT,
        },
        season: {
            type: DataTypes.ENUM("Winter", "Autumn", "Spring", "Summer"),
            allowNull: false,
        },
    }, { timestamps: false });
};