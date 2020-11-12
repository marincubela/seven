import Sequelize from 'sequelize';

import { db } from '../db/connect';
import { Racun } from './Racun';

export const Klijent = db.define(
  'klijent',
  {
    idKlijent: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
