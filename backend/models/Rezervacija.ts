import Sequelize from 'sequelize';

import { db } from '../db/connect';
import { Klijent } from './Klijent.js';
import { Parkiraliste } from './Parkiraliste.js';
import { Vozilo } from './Vozilo.js';

export const Rezervacija = db.define(
  'rezervacija',
  {
    idRezervacija: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  },
  {
    tableName: 'Rezervacija',
  }
);

Rezervacija.belongsTo(Klijent, {
  foreignKey: 'klijentId',
});

Rezervacija.belongsTo(Vozilo, {
  foreignKey: 'voziloId',
});

Rezervacija.belongsTo(Parkiraliste, {
  foreignKey: 'parkiralisteId',
});

Rezervacija.sync().then(() => {
  console.log('Napravljena rezervacija');
});
