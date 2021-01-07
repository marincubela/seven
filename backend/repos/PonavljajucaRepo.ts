import { Rezervacija } from '../models/Rezervacija';
import { PonavljajucaDTO } from '../dtos/PonavljajucaDTO';
import { JednokratnaDTO } from '../dtos/JednokratnaDTO';
import { PonavljajucaMapper } from '../mappers/PonavljajucaMapper';
import { Ponavljajuca } from '../models/Ponavljajuca';
import { BaseRepo } from './BaseRepo';
import { RezervacijaRepo } from './RezervacijaRepo';
import { Op } from 'sequelize';
import {
  addDays,
  areIntervalsOverlapping,
  eachWeekOfInterval,
  format,
  getDay,
  isAfter,
  isBefore,
  parseISO,
  toDate,
} from 'date-fns';
import { timeStamp } from 'console';

export class PonavljajucaRepo extends BaseRepo<PonavljajucaDTO> {
  async exists(ponavljajucaDTO: PonavljajucaDTO): Promise<boolean> {
    const { idRezervacija } = PonavljajucaMapper.toDomain(ponavljajucaDTO);

    const rezervacija = await Ponavljajuca.findOne({
      where: {
        idRezervacija,
      },
    });

    return Boolean(rezervacija);
  }

  async delete(ponavljajucaDTO: PonavljajucaDTO): Promise<any> {
    const { idRezervacija } = PonavljajucaMapper.toDomain(ponavljajucaDTO);

    return await Rezervacija.destroy({
      where: {
        idRezervacija,
      },
    });
  }

  async save(ponavljajucaDTO: PonavljajucaDTO): Promise<any> {
    if (await this.exists(ponavljajucaDTO)) {
      const {
        idRezervacija,
        ...ponavljajucaData
      } = PonavljajucaMapper.toDomain(ponavljajucaDTO);

      const rezervacijaRepo = new RezervacijaRepo();
      rezervacijaRepo.save(ponavljajucaDTO);

      return await Ponavljajuca.update(ponavljajucaData, {
        where: {
          idRezervacija,
        },
      });
    }

    return await PonavljajucaRepo.createPonavljajuca(ponavljajucaDTO);
  }

  static async createPonavljajuca(
    ponavljajucaDTO: PonavljajucaDTO
  ): Promise<Ponavljajuca> {
    const rezervacija = await RezervacijaRepo.createRezervacija(
      ponavljajucaDTO
    );

    const { idPonavljajuca, ...ponavljajucaData } = PonavljajucaMapper.toDomain(
      ponavljajucaDTO
    );

    const ponavljajuca = await Ponavljajuca.create({
      ...ponavljajucaData,
      idRezervacija: rezervacija.idRezervacija,
    });

    return ponavljajuca;
  }

  public static async getPonavljajucaByIdRezervacija(
    idRezervacija: number
  ): Promise<Ponavljajuca> {
    return await Ponavljajuca.findOne({
      where: {
        idRezervacija,
      },
    });
  }

  public static async getPonavljajucaByIdPonavljajuca(
    idPonavljajuca: number
  ): Promise<Ponavljajuca> {
    return await Ponavljajuca.findOne({
      where: {
        idPonavljajuca,
      },
    });
  }

  public static async getIdRezervacijaByIdPonavljajuca(
    idPonavljajuca: number
  ): Promise<number> {
    return (
      await (
        await this.getPonavljajucaByIdPonavljajuca(idPonavljajuca)
      ).getRezervacija()
    ).idRezervacija;
  }

  public static async update(
    ponavljajucaDTO: PonavljajucaDTO
  ): Promise<Ponavljajuca> {
    const ponavljajucaData = PonavljajucaMapper.toDomain(ponavljajucaDTO);

    await RezervacijaRepo.updateRezervacija(ponavljajucaDTO);

    await Ponavljajuca.update(ponavljajucaData, {
      where: {
        idPonavljajuca: ponavljajucaDTO.idPonavljajuca,
      },
    });

    return await this.getPonavljajucaByIdPonavljajuca(
      ponavljajucaDTO.idPonavljajuca
    );
  }

  public static async getIdPonavljajuca(idRezervacija: number) {
    const ponavljajuca = await this.getPonavljajucaByIdRezervacija(
      idRezervacija
    );
    if (!ponavljajuca) {
      return null;
    }
    return ponavljajuca.idPonavljajuca;
  }

  public static async isAvailable(
    ponavljajucaDTO: PonavljajucaDTO
  ): Promise<Boolean> {
    const rezervacije = await Rezervacija.findAll({
      where: {
        idVozilo: ponavljajucaDTO.idVozilo,
      },
    });

    for (const rezervacija of rezervacije) {
      const ponavljajuce = await Ponavljajuca.findAll({
        where: {
          idRezervacija: rezervacija.idRezervacija,
        },
      });

      for (const ponavljajuca of ponavljajuce) {
        const ponavDTO = await PonavljajucaMapper.toDTO(ponavljajuca);

        for (const baseDates of this.getAllDates(ponavDTO)) {
          for (const dates of this.getAllDates(ponavljajucaDTO)) {
            const check = areIntervalsOverlapping(
              {
                start: new Date(baseDates.startTime),
                end: new Date(baseDates.endTime),
              },
              {
                start: new Date(dates.startTime),
                end: new Date(dates.endTime),
              }
            );

            console.log(baseDates);
            console.log(dates);
            console.log(check);

            if (check) {
              return false;
            }
          }
        }
      }
    }

    return true;
  }

  public static getAllDates(ponavljajucaDTO: PonavljajucaDTO): any {
    const dows = ponavljajucaDTO.repeatDays.toString().split('');

    const firstDate = new Date(
      this.timeAndDateToDate(
        ponavljajucaDTO.reservationDate,
        ponavljajucaDTO.startTime
      )
    );

    const lastDate = new Date(
      this.timeAndDateToDate(
        ponavljajucaDTO.reservationEndDate,
        ponavljajucaDTO.endTime
      )
    );

    const dates = [];
    for (const dowString of dows) {
      const dow = Number(dowString);
      var newDate = firstDate;

      while (getDay(newDate) !== dow) {
        newDate = addDays(newDate, 1);
      }

      var eachWeek = eachWeekOfInterval({
        start: newDate,
        end: lastDate,
      });

      for (var d of eachWeek) {
        while (getDay(d) !== dow) {
          d = addDays(d, 1);
        }
        if (isBefore(d, firstDate) || isBefore(d, new Date())) {
          continue;
        }
        var startTime = new Date(
          this.timeAndDateToDate(d, ponavljajucaDTO.startTime)
        );

        var endTime = new Date(
          this.timeAndDateToDate(d, ponavljajucaDTO.endTime)
        );

        dates.push({ startTime, endTime });
      }
    }

    return this.toSQLDates(dates);
  }

  public static toSQLDates(dates: any): any {
    const newDates = [];

    for (const date of dates) {
      const startTime = this.toSQLDate(date.startTime);
      const endTime = this.toSQLDate(date.endTime);

      newDates.push({ startTime, endTime });
    }

    return newDates;
  }

  public static toSQLDate(date: Date): string {
    return format(new Date(date), "yyyy-MM-dd' 'HH:mm:ss.SSSxxx");
  }

  public static timeAndDateToDate(date: Date, time: Date): Date {
    const year = new Date(date).getFullYear();
    const month = new Date(date).getMonth();
    const day = new Date(date).getDate();

    const hour = new Date('1970-1-1 ' + time.toString()).getHours();
    const min = new Date('1970-1-1 ' + time.toString()).getMinutes();
    const sec = new Date('1970-1-1 ' + time.toString()).getSeconds();

    return new Date(year, month, day, hour, min, sec);
  }

  private static checkTime(startTime: string, endTime: string): Boolean {
    const start = parseISO(startTime);
    const end = parseISO(endTime);
    const now = parseISO(new Date().toISOString());

    if (isAfter(start, end) || isBefore(start, new Date())) {
      return false;
    }

    return true;
  }
}
