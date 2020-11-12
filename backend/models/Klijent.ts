import Sequelize, { Model } from 'sequelize';

import { db } from '../db/connect';
import { Racun } from './Racun';

interface IKlijentAtrributes {
  idKlijent: number;
  ime: string;
  prezime: string;
  brojKartice: string;
}

export class Klijent extends Model<
  IKlijentAtrributes,
  Omit<IKlijentAtrributes, 'idJednokratna'>
> {
  public idKlijent!: number;
  public ime!: string;
  public prezime!: string;
  public brojKartice!: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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

Klijent.belongsTo(Racun);

Klijent.sync().then(() => {
  console.log('Napravljen Klijent');
});
