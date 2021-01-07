import Sequelize, { IntegerDataType } from 'sequelize';
import { HasOneGetAssociationMixin, Model } from 'sequelize';

import { db } from '../db/connect';
import { Rezervacija } from './Rezervacija';

export interface IPonavljajucaAttributes {
  idPonavljajuca: number;
  datumRezervacije: Date;
  datumKrajaRez: Date;
  daniPonavljanja: string;
  vrijemePocetka: Date;
  vrijemeKraja: Date;
  idRezervacija?: number;
}

export class Ponavljajuca extends Model<
  IPonavljajucaAttributes,
  Omit<IPonavljajucaAttributes, 'idPonavljajuca'>
> {
  public idPonavljajuca!: number;
  public datumRezervacije!: Date;
  public datumKrajaRez!: Date;
  public daniPonavljanja!: string;
  public vrijemePocetka!: Date;
  public vrijemeKraja!: Date;
  public idRezervacija!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getRezervacija!: HasOneGetAssociationMixin<Rezervacija>;
}

Ponavljajuca.init(
  {
    idPonavljajuca: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    datumRezervacije: {
      type: Sequelize.DataTypes.DATEONLY,
      allowNull: false,
    },
    datumKrajaRez: {
      type: Sequelize.DataTypes.DATEONLY,
      allowNull: false,
    },
    daniPonavljanja: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    vrijemePocetka: {
      type: Sequelize.DataTypes.TIME,
      allowNull: false,
    },
    vrijemeKraja: {
      type: Sequelize.DataTypes.TIME,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'Ponavljajuca',
  }
);

Ponavljajuca.belongsTo(Rezervacija, {
  foreignKey: 'idRezervacija',
  as: 'Rezervacija',
});

Ponavljajuca.sync().then(() => {
  console.log('Napravljena Ponavljajuca');
});
