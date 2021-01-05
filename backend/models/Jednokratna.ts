import Sequelize, { HasOneGetAssociationMixin, Model } from 'sequelize';

import { db } from '../db/connect';
import { Rezervacija } from './Rezervacija';

export interface IJednokratnaAttributes {
  idJednokratna: number;
  vrijemePocetak: Date;
  vrijemeKraj: Date;
  idRezervacija?: number;
}

export class Jednokratna extends Model<
  IJednokratnaAttributes,
  Omit<IJednokratnaAttributes, 'idJednokratna'>
> {
  public idJednokratna!: number;
  public vrijemePocetak!: Date;
  public vrijemeKraj!: Date;
  public idRezervacija!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getRezervacija!: HasOneGetAssociationMixin<Rezervacija>;
}

Jednokratna.init(
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
    sequelize: db,
    tableName: 'Jednokratna',
  }
);

Jednokratna.belongsTo(Rezervacija, {
  foreignKey: 'idRezervacija',
  as: 'Rezervacija',
});

Jednokratna.sync().then(() => {
  console.log('Napravljena jednokratna rezervacija');
});
