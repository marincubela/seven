import Sequelize from 'sequelize';

import { db } from '../db/connect';
import { Rezervacija } from './Rezervacija.js';

export const Ponavljajuca = db.define(
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
