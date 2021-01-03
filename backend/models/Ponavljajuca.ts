import Sequelize, { IntegerDataType} from 'sequelize';
import { HasOneGetAssociationMixin, Model } from 'sequelize';

import { db } from '../db/connect';
import { Rezervacija } from './Rezervacija.js';

export interface IPonavljajucaAttributes {
  idPonavljajuca: number;
  datumRezervacije: Date;
  datumKrajaRez: Date;
  daniPonavljanja: IntegerDataType;
  vrijemePocetka: Date;
  vrijemeKraja: Date;
  idRezervacija?: number;
}

export class Ponavljajuca extends Model<
  IPonavljajucaAttributes,
  Omit<IPonavljajucaAttributes, 'idPonavljajuca'>
> {
  idPonavljajuca!: number;
  datumRezervacije!: Date;
  datumKrajaRez!: Date;
  daniPonavljanja!: IntegerDataType;
  vrijemePocetka!: Date;
  vrijemeKraja!: Date;
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
  as:'Rezervacija',
});

Ponavljajuca.sync().then(() => {
  console.log('Napravljena Ponavljajuca');
});
