import Sequelize, { HasOneGetAssociationMixin, Model } from 'sequelize';

import { db } from '../db/connect';
import { Klijent } from './Klijent.js';
import { Parkiraliste } from './Parkiraliste.js';
import { Vozilo } from './Vozilo.js';

export interface IRezervacijaAttributes {
  idRezervacija: number;
  idKlijent?: number;
  idParkiraliste?: number;
  idVozilo?: number;
}

export class Rezervacija extends Model<
  IRezervacijaAttributes,
  Omit<IRezervacijaAttributes, 'idRezervacija'>
> {
  public idRezervacija!: number;
  public idKlijent!: number;
  public idParkiraliste!: number;
  public idVozilo!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getKlijent!: HasOneGetAssociationMixin<Klijent>;
  public getParkiraliste!: HasOneGetAssociationMixin<Parkiraliste>;
  public getVozilo!: HasOneGetAssociationMixin<Vozilo>;
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
    sequelize: db,
    tableName: 'Rezervacija',
  }
);

Rezervacija.belongsTo(Klijent, {
  foreignKey: 'idKlijent',
  as: 'Klijent',
});

Rezervacija.belongsTo(Vozilo, {
  foreignKey: 'idVozilo',
  as: 'Vozilo',
});

Rezervacija.belongsTo(Parkiraliste, {
  foreignKey: 'idParkiraliste',
  as: 'Parkiraliste',
});

Rezervacija.sync().then(() => {
  console.log('Napravljena rezervacija');
});
