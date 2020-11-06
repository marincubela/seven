const Sequelize = require('sequelize');
const db = require('../db/connect.js');
const Racun = require('./Racun.js');

const Klijent = db.define(
  'klijent',
  {
    idKlijent: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    prezime: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    ime: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    brojKartice: {
      type: Sequelize.DataTypes.STRING(16),
      unique: true,
    },
  },
  {
    tableName: 'Klijent',
  }
);

Klijent.belongsTo(Racun);

Klijent.sync().then(() => {
  console.log('Napravljen Klijent');
});

module.exports = Klijent;
