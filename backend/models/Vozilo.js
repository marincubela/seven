const Sequelize = require('sequelize');
const db = require('../db/connect.js');

const Vozilo = db.define(
  'vozilo',
  {
    idVozilo: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
    },
    registracija: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    boja: {
      type: Sequelize.DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'Vozilo',
  }
);

Vozilo.sync().then(() => {
  console.log('Napravljeno vozilo');
});

module.exports = Vozilo;
