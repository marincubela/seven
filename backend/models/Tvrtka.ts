import { Model, DataTypes, HasOneGetAssociationMixin } from 'sequelize';

import { db } from '../db/connect';
import { Racun } from './Racun';

export interface ITvrtkaAttributes {
  idTvrtka: number;
  naziv: string;
  adresa: string;
  idRacun?: number;
}
export class Tvrtka extends Model<
  ITvrtkaAttributes,
  Omit<ITvrtkaAttributes, 'idTvrtka'>
> {
  public idTvrtka!: number;
  public naziv!: string;
  public adresa!: string;
  public idRacun!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getRacun!: HasOneGetAssociationMixin<Racun>;
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
  as: 'Racun',
});

Tvrtka.sync().then(() => {
  console.log('Napravljena tvrtka');
});
