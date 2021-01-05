import Sequelize, {
  Model,
  HasOneGetAssociationMixin,
  Association,
} from 'sequelize';

import { db } from '../db/connect';
import { Rezervacija } from './Rezervacija';
import { Tvrtka } from './Tvrtka';

export interface IParkiralisteAttributes {
  idParkiraliste: number;
  nazivParkiralista: string;
  brojMjesta: number;
  brojInvalidskihMjesta: number;
  tipParkiralista: string;
  koordinate: string;
  cijenaJednokratne: number;
  cijenaPonavljajuce: number;
  cijenaTrajne: number;
  idTvrtka?: number;
}

export class Parkiraliste extends Model<
  IParkiralisteAttributes,
  Omit<IParkiralisteAttributes, 'idParkiraliste'>
> {
  idParkiraliste!: number;
  nazivParkiralista!: string;
  brojMjesta!: number;
  brojInvalidskihMjesta!: number;
  tipParkiralista!: string;
  koordinate!: string;
  cijenaJednokratne!: number;
  cijenaPonavljajuce!: number;
  cijenaTrajne!: number;
  idTvrtka!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public getTvrtka!: HasOneGetAssociationMixin<Tvrtka>;

  public static associations: {
    rezervacija: Association<Parkiraliste, Rezervacija>;
  };
}

Parkiraliste.init(
  {
    idParkiraliste: {
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
    tableName: 'Parkiraliste',
  }
);

Parkiraliste.belongsTo(Tvrtka, {
  foreignKey: 'idTvrtka',
  as: 'Tvrtka',
});

Parkiraliste.sync().then(() => {
  console.log('Napravljeno parkiraliste');
});
