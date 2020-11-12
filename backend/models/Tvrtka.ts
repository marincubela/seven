import { Model, DataTypes } from 'sequelize';

import { db } from '../db/connect';
import { Racun } from './Racun';

interface ITvrtkaAttributes {
  idTvrtka: number;
  naziv: string;
  adresa: string;
}
export class Tvrtka extends Model<
  ITvrtkaAttributes,
  Omit<ITvrtkaAttributes, 'id'>
> {
  public idTvrtka!: number;
  public naziv!: string;
  public adresa!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Tvrtka.init(
  {
    idTvrtka: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    naziv: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    adresa: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'Tvrtka',
  }
);

Tvrtka.belongsTo(Racun, {
  foreignKey: 'idRacun',
});

Tvrtka.sync().then(() => {
  console.log('Napravljena tvrtka');
});
