import Sequelize from 'sequelize';

import { db } from '../db/connect';
import { Rezervacija } from './Rezervacija.js';

export const Trajna = db.define(
  'trajna',
  {
    idTrajna: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
