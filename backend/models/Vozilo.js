const Sequelize = require('sequelize');
const db = require('../db/connect.js');
const Klijent = require('./Klijent.js');

const Vozilo = db.define(
  'vozilo',
  {
    idVozilo: {
      type: Sequelize.DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true
    },
    registracija: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    nazivVozila: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
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

Vozilo.belongsTo(Klijent, {
  foreignKey: 'klijentId',
});

Vozilo.sync().then(() => {
  console.log('Napravljeno vozilo');
});

module.exports = Vozilo;
