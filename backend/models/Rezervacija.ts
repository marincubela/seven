import Sequelize, { Model } from 'sequelize';

import { db } from '../db/connect';
import { Klijent } from './Klijent.js';
import { Parkiraliste } from './Parkiraliste.js';
import { Vozilo } from './Vozilo.js';

interface IRezervacijaAttributes {
  idRezervacija: number;
}

export class Rezervacija extends Model<
  IRezervacijaAttributes,
  Omit<IRezervacijaAttributes, 'idRezervacija'>
> {
  public idRezervacija!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Rezervacija.init(
  {
      idRezervacija: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
  },
    {
      sequelize:db,
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
