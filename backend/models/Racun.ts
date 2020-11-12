import { Model, DataTypes } from 'sequelize';

import { db } from '../db/connect';

interface IRacunAttributes {
  idRacun: number;
  email: string;
  OIB: string;
  admin: boolean;
  lozinka: string;
}

export class Racun extends Model<
  IRacunAttributes,
  Omit<IRacunAttributes, 'id'>
> {
  public idRacun!: number;
  public email!: string;
  public OIB!: string;
  public admin!: boolean;
  public lozinka!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Racun.init(
  {
    idRacun: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    OIB: {
      type: DataTypes.STRING(11),
      unique: true,
      allowNull: false,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    lozinka: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'Racun',
  }
);

// TODO: extract to separate file
Racun.sync().then(() => {
  console.log('> Napravljen racun');
});
