import Sequelize, { Model } from 'sequelize';

import { db } from '../db/connect';
import { Rezervacija } from './Rezervacija.js';

interface IJednokratnaAtrributes {
  idJednokratna: number;
  vrijemePocetak: Date;
  vrijemeKraj: Date;
}

export class Jednokratna extends Model<
  IJednokratnaAtrributes,
  Omit<IJednokratnaAtrributes, 'idJednokratna'>
> {
  public idJednokratna!: number;
  public vrijemePocetak!: Date;
  public vrijemeKraj!: Date;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
});

Jednokratna.sync().then(() => {
  console.log('Napravljena jednokratna rezervacija');
});
