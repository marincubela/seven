import Sequelize, { Model } from 'sequelize';

import { db } from '../db/connect';
import { Tvrtka } from './Tvrtka.js';

interface IParkiralisteAtrributes {
  idParkiralista: number;
  nazivParkiralista: string;
  brojMjesta: number;
  brojInvalidskihMjesta: number;
  tipParkiralista: string;
  koordinate: string;
  cijenaJednokratne: number;
  cijenaPonavljajuce: number;
  cijenaTrajne: number;
}

export class Parkiraliste extends Model<
  IParkiralisteAtrributes,
  Omit<IParkiralisteAtrributes, 'idParkiralista'>
> {
  idParkiralista!: number;
  nazivParkiralista!: string;
  brojMjesta!: number;
  brojInvalidskihMjesta!: number;
  tipParkiralista!: string;
  koordinate!: string;
  cijenaJednokratne!: number;
  cijenaPonavljajuce!: number;
  cijenaTrajne!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Parkiraliste.init(
  {
    idParkiralista: {
      type: Sequelize.DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nazivParkiralista: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    brojMjesta: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    brojInvalidskihMjesta: {
      type: Sequelize.DataTypes.INTEGER,
      allowNull: false,
    },
    tipParkiralista: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    koordinate: {
      type: Sequelize.DataTypes.STRING,
      allowNull: false,
    },
    cijenaJednokratne: {
      type: Sequelize.DataTypes.DECIMAL,
      allowNull: false,
    },
    cijenaPonavljajuce: {
      type: Sequelize.DataTypes.DECIMAL,
      allowNull: false,
    },
    cijenaTrajne: {
      type: Sequelize.DataTypes.DECIMAL,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'Klijent',
  }
);

Parkiraliste.belongsTo(Tvrtka, {
  foreignKey: 'tvrtkaId',
});

Parkiraliste.sync().then(() => {
  console.log('Napravljeno parkiraliste');
});
