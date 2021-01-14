import { Rezervacija } from '../models/Rezervacija';
import { PonavljajucaDTO } from '../dtos/PonavljajucaDTO';
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
} from 'date-fns';

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
    idVozilo: number,
    startTime: Date,
    endTime: Date
  ): Promise<Boolean> {
    const rezervacije = await Rezervacija.findAll({
      where: {
        idVozilo,
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
          const check = areIntervalsOverlapping(
            {
              start: new Date(baseDates.startTime),
              end: new Date(baseDates.endTime),
            },
            {
              start: new Date(startTime),
              end: new Date(endTime),
            }
          );

          if (check) {
            return false;
          }
        }
      }
    }

    return true;
  }

  public static async isAvailableForUpdate(
    idRezervacija: number,
    idVozilo: number,
    startTime: Date,
    endTime: Date
  ): Promise<Boolean> {
    const rezervacije = await Rezervacija.findAll({
      where: {
        idVozilo,
        idRezervacija: { [Op.ne]: idRezervacija },
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
          const check = areIntervalsOverlapping(
            {
              start: new Date(baseDates.startTime),
              end: new Date(baseDates.endTime),
            },
            {
              start: new Date(startTime),
              end: new Date(endTime),
            }
          );

          if (check) {
            return false;
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

      var eachWeek = eachWeekOfInterval({
        start: firstDate,
        end: lastDate,
      });

      for (var d of eachWeek) {
        while (getDay(d) !== dow || isBefore(d, firstDate)) {
          if (isAfter(d, lastDate)) {
            break;
          }
          d = addDays(d, 1);
        }

        if (
          isBefore(d, firstDate) ||
          isBefore(d, new Date()) ||
          isAfter(d, lastDate)
        ) {
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
    var hour, min, sec;

    // 2020-02-02T13:13:13
    if (time.toString().indexOf('T') >= 0) {
      hour = new Date(time.toString()).getHours();
      min = new Date(time.toString()).getMinutes();
      sec = new Date(time.toString()).getSeconds();
    } else {
      hour = new Date('1970-1-1 ' + time.toString()).getHours();
      min = new Date('1970-1-1 ' + time.toString()).getMinutes();
      sec = new Date('1970-1-1 ' + time.toString()).getSeconds();
    }

    return new Date(year, month, day, hour, min, sec);
  }
}
