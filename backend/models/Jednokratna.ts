import Sequelize from 'sequelize';

import { db } from '../db/connect';
import { Rezervacija } from './Rezervacija.js';

const Jednokratna = db.define(
  'jednokratna',
  {
    idJednokratna: {
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
    tableName: 'Jednokratna',
  }
);

Jednokratna.belongsTo(Rezervacija, {
  foreignKey: 'rezervacijaId',
});

Jednokratna.sync().then(() => {
  console.log('Napravljena jednokratna rezervacija');
});

export default Jednokratna;
