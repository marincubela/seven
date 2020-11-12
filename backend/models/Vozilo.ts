import Sequelize from 'sequelize';

import { db } from '../db/connect';
import { Klijent } from './Klijent.js';

export const Vozilo = db.define(
  'vozilo',
  {
    idVozilo: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
