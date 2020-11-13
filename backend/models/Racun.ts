import {
  Model,
  DataTypes,
  Association,
  HasManyCreateAssociationMixin,
} from 'sequelize';

import { db } from '../db/connect';
import { Klijent } from './Klijent';
import { Tvrtka } from './Tvrtka';

export interface IRacunAttributes {
  idRacun: number;
  email: string;
  OIB: string;
  admin: boolean;
  lozinka: string;
}

export class Racun extends Model<
  IRacunAttributes,
  Omit<IRacunAttributes, 'idRacun'>
> {
  public idRacun!: number;
  public email!: string;
  public OIB!: string;
  public admin!: boolean;
  public lozinka!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public readonly klijent?: Klijent;
  public readonly tvrtka?: Tvrtka;

  public createKlijent!: HasManyCreateAssociationMixin<Klijent>;

  public static associations: {
    klijent: Association<Racun, Klijent>;
    tvrtka: Association<Racun, Tvrtka>;
  };
}

Racun.init(
  {
    idRacun: {
      type: DataTypes.INTEGER,
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

// Racun.hasOne(Klijent, {
//   sourceKey: 'idRacun',
//   foreignKey: 'idKlijent',
//   as: 'klijent',
//   onDelete: 'CASCADE',
//   onUpdate: 'CASCADE',
// });

// () => {
//   Racun.hasOne(Tvrtka, {
//     sourceKey: 'idRacun',
//     foreignKey: 'idTvrtka',
//     as: 'tvrtka',
//     onDelete: 'CASCADE',
//     onUpdate: 'CASCADE',
//   });
// };

// TODO: extract to separate file
Racun.sync().then(() => {
  console.log('Napravljen racun');
});
