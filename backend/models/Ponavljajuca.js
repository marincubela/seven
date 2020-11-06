const Sequelize = require('sequelize');
const db = require('../db/connect.js');
const Rezervacija = require('./Rezervacija.js');

const Ponavljajuca = db.define(
  'Ponavljajuca',
  {
    idPonavljajuce: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    datumRezervacije: {
      type: Sequelize.DataTypes.DATEONLY,
      allowNull: false,
    },
    datumKrajaRez: {
      type: Sequelize.DataTypes.DATEONLY,
      allowNull: false,
    },
    daniPonavljanja: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    vrijemePocetka: {
      type: Sequelize.DataTypes.TIME,
      allowNull: false,
    },
    vrijemeKraja: {
      type: Sequelize.DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    tableName: 'Ponavljajuca',
  }
);

Ponavljajuca.belongsTo(Rezervacija, {
  foreignKey: 'rezervacijaId',
});

Ponavljajuca.sync().then(() => {
  console.log('Napravljena Ponavljajuca');
});

module.exports = Ponavljajuca;
