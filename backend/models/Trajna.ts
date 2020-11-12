import { Model, DataTypes } from 'sequelize';

import { db } from '../db/connect';
import { Rezervacija } from './Rezervacija.js';

interface ITrajnaAttributes {
  idTrajna: number;
  vrijemePocetak: Date;
  vrijemeKraj: Date;
}

export class Trajna extends Model<
  ITrajnaAttributes,
  Omit<ITrajnaAttributes, 'id'>
> {
  public idTrajna!: number;
  public vrijemePocetak!: Date;
  public vrijemeKraj!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Trajna.init(
  {
    idTrajna: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    vrijemePocetak: {
      type: DataTypes.DATE,
    },
    vrijemeKraj: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize: db,
    tableName: 'Trajna',
  }
);

Trajna.belongsTo(Rezervacija, {
  foreignKey: 'idRezervacija',
});

Trajna.sync().then(() => {
  console.log('Napravljena trajna rezervacija');
});
