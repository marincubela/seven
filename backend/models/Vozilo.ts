import { Model, DataTypes } from 'sequelize';

import { db } from '../db/connect';
import { Klijent } from './Klijent.js';

interface IVoziloAttributes {
  idVozilo: number;
  registracija: string;
  nazivVozila: string;
  boja: boolean;
}

export class Vozilo extends Model<
  IVoziloAttributes,
  Omit<IVoziloAttributes, 'id'>
> {
  public idVozilo!: number;
  public registracija!: string;
  public nazivVozila!: string;
  public boja!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Vozilo.init(
  {
    idVozilo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    registracija: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nazivVozila: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    boja: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize: db,
    tableName: 'Vozilo',
  }
);

Vozilo.belongsTo(Klijent, {
  foreignKey: 'idKlijent',
});

Vozilo.sync().then(() => {
  console.log('Napravljeno vozilo');
});
