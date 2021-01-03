import Sequelize, {
  Association,
  HasOneGetAssociationMixin,
  Model,
} from 'sequelize';

import { db } from '../db/connect';
import { Racun } from './Racun';
import { Rezervacija } from './Rezervacija';
import { Vozilo } from './Vozilo';

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

  public static associations: {
    vozilo: Association<Klijent, Vozilo>;
    rezervacija: Association<Klijent, Rezervacija>;
  };

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

Klijent.belongsTo(Racun, {
  foreignKey: 'idRacun',
  as: 'Racun',
});

Klijent.sync().then(() => {
  console.log('Napravljen Klijent');
});
