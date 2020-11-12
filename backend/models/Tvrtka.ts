import Sequelize from 'sequelize';

import { db } from '../db/connect';
import { Racun } from './Racun';

export const Tvrtka = db.define(
  'tvrtka',
  {
    idTvrtka: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    naziv: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    adresa: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Tvrtka',
  }
);

Tvrtka.belongsTo(Racun);

Tvrtka.sync().then(() => {
  console.log('Napravljena tvrtka');
});
