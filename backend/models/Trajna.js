const Sequelize = require('sequelize');
const db = require('../db/connect.js');
const Rezervacija = require('./Rezervacija.js');

const Trajna = db.define(
  'trajna',
  {
    idTrajna: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement=1
    },
    vrijemePocetak: {
      type: Sequelize.DataTypes.DATE,
    },
    vrijemeKraj: {
      type: Sequelize.DataTypes.DATE,
    },
  },
  {
    tableName: 'Trajna',
  }
);

Trajna.belongsTo(Rezervacija, {
  foreignKey: 'rezervacijaId',
});
Trajna.sync().then(() => {
  console.log('Napravljena trajna rezervacija');
});

module.exports = Trajna;
