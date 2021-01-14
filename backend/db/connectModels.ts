import { Racun } from '../models/Racun';
import { Klijent } from '../models/Klijent';
import { Tvrtka } from '../models/Tvrtka';
import { Parkiraliste } from '../models/Parkiraliste';
import { Vozilo } from '../models/Vozilo';
import { Rezervacija } from '../models/Rezervacija';
import { Jednokratna } from '../models/Jednokratna';
import { Ponavljajuca } from '../models/Ponavljajuca';
import { Trajna } from '../models/Trajna';

export async function initModels() {
  /*  Racun.hasOne(Klijent, {
    sourceKey: 'idRacun',
    foreignKey: 'idKlijent',
    as: 'Klijent',
  });

  Racun.hasOne(Tvrtka, {
    sourceKey: 'idRacun',
    foreignKey: 'idTvrtka',
    as: 'Tvrtka',
  });
*/
  Klijent.belongsTo(Racun, {
    foreignKey: 'idRacun',
    as: 'Racun',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Tvrtka.belongsTo(Racun, {
    foreignKey: 'idRacun',
    as: 'Racun',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Tvrtka.hasMany(Parkiraliste, {
    foreignKey: 'idTvrtka',
    as: 'Parkiraliste',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Parkiraliste.belongsTo(Tvrtka, {
    foreignKey: 'idTvrtka',
    as: 'Tvrtka',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });
  /*
  Klijent.hasOne(Vozilo, {
    sourceKey: 'idKlijent',
    foreignKey: 'idVozilo',
    as: 'Vozilo',
  }); */
  Klijent.hasMany(Vozilo, {
    foreignKey: 'idKlijent',
    as: 'Klijent',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Vozilo.belongsTo(Klijent, {
    foreignKey: 'idKlijent',
    as: 'Klijent',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Klijent.hasMany(Rezervacija, {
    foreignKey: 'idKlijent',
    as: 'Rezervacija',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Rezervacija.belongsTo(Klijent, {
    foreignKey: 'idKlijent',
    as: 'Klijent',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Vozilo.hasMany(Rezervacija, {
    foreignKey: 'idVozilo',
    as: 'Rezervacija',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Rezervacija.belongsTo(Vozilo, {
    foreignKey: 'idVozilo',
    as: 'Vozilo',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Parkiraliste.hasMany(Rezervacija, {
    foreignKey: 'idParkiraliste',
    as: 'Rezervacija',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Rezervacija.belongsTo(Parkiraliste, {
    foreignKey: 'idParkiraliste',
    as: 'Parkiraliste',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Rezervacija.hasMany(Jednokratna, {
    foreignKey: 'idRezervacija',
    as: 'Jednokratna',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Jednokratna.belongsTo(Rezervacija, {
    foreignKey: 'idRezervacija',
    as: 'Rezervacija',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Rezervacija.hasMany(Ponavljajuca, {
    foreignKey: 'idRezervacija',
    as: 'Ponavljajuca',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Ponavljajuca.belongsTo(Rezervacija, {
    foreignKey: 'idRezervacija',
    as: 'Rezervacija',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Rezervacija.hasMany(Trajna, {
    foreignKey: 'idRezervacija',
    as: 'Trajna',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  Trajna.belongsTo(Rezervacija, {
    foreignKey: 'idRezervacija',
    as: 'Rezervacija',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  });

  await Racun.sync().then(() => {
    console.log('Baza spojena s tablicom Racun');
  });

  await Klijent.sync().then(() => {
    console.log('Baza spojena s tablicom Klijent');
  });

  await Tvrtka.sync().then(() => {
    console.log('Baza spojena s tablicom Tvrtka');
  });

  await Parkiraliste.sync().then(() => {
    console.log('Baza spojena s tablicom Parkiraliste');
  });

  await Vozilo.sync().then(() => {
    console.log('Baza spojena s tablicom Vozilo');
  });

  await Rezervacija.sync().then(() => {
    console.log('Baza spojena s tablicom Rezervacija');
  });

  await Jednokratna.sync().then(() => {
    console.log('Baza spojena s tablicom Jednokratna');
  });

  await Ponavljajuca.sync().then(() => {
    console.log('Baza spojena s tablicom Ponavljajuca');
  });

  await Trajna.sync().then(() => {
    console.log('Baza spojena s tablicom Trajna');
  });
}
