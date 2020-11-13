import Sequelize, { HasOneGetAssociationMixin, Model } from 'sequelize';

import { db } from '../db/connect';
import { Racun } from './Racun';

export interface IKlijentAtrributes {
  idKlijent: number;
  ime: string;
  prezime: string;
  brojKartice: string;
  idRacun?: number;
}

export class Klijent extends Model<
  IKlijentAtrributes,
  Omit<IKlijentAtrributes, 'idKlijent'>
> {
  public idKlijent!: number;
  public ime!: string;
  public prezime!: string;
  public brojKartice!: string;
  public idRacun!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getRacun!: HasOneGetAssociationMixin<Racun>;
}

Klijent.init(
  {
    idKlijent: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    prezime: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    ime: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    brojKartice: {
      type: Sequelize.DataTypes.STRING(16),
      unique: true,
    },
  },
  {
    sequelize: db,
    tableName: 'Klijent',
  }
);

console.log('Klijent');
Klijent.belongsTo(Racun, { foreignKey: 'idRacun' });

Klijent.sync().then(() => {
  console.log('Napravljen Klijent');
});
