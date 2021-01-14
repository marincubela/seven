import { Model, DataTypes, HasOneGetAssociationMixin } from 'sequelize';

import { db } from '../db/connect';
import { Rezervacija } from './Rezervacija';

export interface ITrajnaAttributes {
  idTrajna: number;
  vrijemePocetak: Date;
  vrijemeKraj: Date;
  idRezervacija?: number;
}

export class Trajna extends Model<
  ITrajnaAttributes,
  Omit<ITrajnaAttributes, 'idTrajna'>
> {
  public idTrajna!: number;
  public vrijemePocetak!: Date;
  public vrijemeKraj!: Date;
  public idRezervacija!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getRezervacija!: HasOneGetAssociationMixin<Rezervacija>;
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
      allowNull: false,
    },
    vrijemeKraj: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'Trajna',
  }
);
