import { Model, DataTypes, HasOneGetAssociationMixin, Association } from 'sequelize';

import { db } from '../db/connect';
import { Klijent } from './Klijent';
import { Rezervacija } from './Rezervacija';

export interface IVoziloAttributes {
  idVozilo: number;
  registracija: string;
  nazivVozila: string;
  boja: boolean;
  idKlijent?: number;
}

export class Vozilo extends Model<
  IVoziloAttributes,
  Omit<IVoziloAttributes, 'idVozilo'>
> {
  public idVozilo!: number;
  public registracija!: string;
  public nazivVozila!: string;
  public boja: boolean;
  public idKlijent!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getKlijent!: HasOneGetAssociationMixin<Klijent>;

  public static associations: {
    rezervacija: Association<Vozilo, Rezervacija>;
  };
  
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
  as: 'Klijent',
});

Vozilo.sync().then(() => {
  console.log('Napravljeno vozilo');
});
