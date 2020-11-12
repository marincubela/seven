import Sequelize, { IntegerDataType, Model } from 'sequelize';

import { db } from '../db/connect';
import { Rezervacija } from './Rezervacija.js';

interface IPonavljajucaAttributes {
  idPonavljajuce: number;
  datumRezervacije: Date;
  datumKrajaRez: Date;
  daniPonavljanja: IntegerDataType;
  vrijemePocetka: Date;
  vrijemeKraja: Date;


}

export class Ponavljajuca extends Model<
  IPonavljajucaAttributes,
  Omit<IPonavljajucaAttributes, 'idPonavljajuce'>
> {
  idPonavljajuce!: number;
  datumRezervacije!: Date;
  datumKrajaRez!: Date;
  daniPonavljanja!: IntegerDataType;
  vrijemePocetka!: Date;
  vrijemeKraja!: Date;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Ponavljajuca.init(
  {
    idPonavljajuce: {
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
      type: Sequelize.DataTypes.INTEGER,
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
  foreignKey: 'rezervacijaId',
});

Ponavljajuca.sync().then(() => {
  console.log('Napravljena Ponavljajuca');
});
