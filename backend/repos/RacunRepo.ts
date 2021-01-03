import { Racun } from '../models/Racun';
import { RacunDTO } from '../dtos/RacunDTO';
import { RacunMapper } from '../mappers/RacunMapper';
import { BaseRepo } from './BaseRepo';
import { hashPassword } from '../utils/password';
import { KlijentRepo } from './KlijentRepo';
import { TvrtkaRepo } from './TvrtkaRepo';
import { Klijent } from '../models/Klijent';
import { UsersDTO } from '../dtos/ResponseDtos/UsersDTO';
import { KlijentMapper } from '../mappers/KlijentMapper';
import { TvrtkaMapper } from '../mappers/TvrtkaMapper';

export class RacunRepo implements BaseRepo<RacunDTO> {
  async exists(racunDTO: RacunDTO): Promise<boolean> {
    const { idRacun } = RacunMapper.toDomain(racunDTO);

    const racun = await Racun.findOne({
      where: {
        idRacun,
      },
    });

    return Boolean(racun);
  }

  async delete(racunDTO: RacunDTO): Promise<any> {
    const { idRacun } = RacunMapper.toDomain(racunDTO);

    return await Racun.destroy({
      where: {
        idRacun,
      },
    });
  }

  static async deleteById(idRacun: number): Promise<any> {
    return await Racun.destroy({
      where: {
        idRacun,
      },
    });
  }

  async save(racunDTO: RacunDTO): Promise<any> {
    if (await this.exists(racunDTO)) {
      const { idRacun, ...racunData } = RacunMapper.toDomain(racunDTO);

      return await Racun.update(racunData, {
        where: {
          idRacun,
        },
      });
    }

    return await RacunRepo.createRacun(racunDTO);
  }

  public static async exists(idRacun: number): Promise<Boolean> {
    return Boolean(
      await Racun.findOne({
        where: {
          idRacun,
        },
      })
    );
  }

  public static async createRacun(racunDTO: RacunDTO): Promise<Racun> {
    const { idRacun, lozinka, ...racunData } = RacunMapper.toDomain(racunDTO);

    const racun = await Racun.create({
      ...racunData,
      lozinka: await hashPassword(lozinka),
    });

    return racun;
  }

  public static async getRacunByOib(OIB: string): Promise<Racun> {
    return await Racun.findOne({
      where: {
        OIB,
      },
    });
  }

  public static async getRacunByEmail(email: string): Promise<Racun> {
    return await Racun.findOne({
      where: {
        email,
      },
    });
  }

  public static async getRacunById(idRacun: number): Promise<Racun> {
    return await Racun.findOne({
      where: {
        idRacun,
      },
    });
  }

  public static async getAll(): Promise<UsersDTO> {
    const accounts = await Racun.findAll();
    const users: UsersDTO = { clients: [], companies: [] };

    for (const racun of accounts) {
      if (await RacunRepo.isKlijent(racun.idRacun)) {
        const klijent = await KlijentRepo.getKlijentByIdRacun(racun.idRacun);
        users.clients.push(await KlijentMapper.toDTO(klijent));
      } else if (await RacunRepo.isTvrtka(racun.idRacun)) {
        const tvrtka = await TvrtkaRepo.getTvrtkaByIdRacun(racun.idRacun);
        users.companies.push(await TvrtkaMapper.toDTO(tvrtka));
      } else {
        throw new Error('Račun nije ni tvrtka ni klijent, greška u bazi');
      }
    }

    return users;
  }

  public static async isKlijent(idRacun: number): Promise<Boolean> {
    return Boolean(await KlijentRepo.getKlijentByIdRacun(idRacun));
  }

  public static async getIdKlijent(idRacun: number): Promise<number> {
    return (await KlijentRepo.getKlijentByIdRacun(idRacun)).idKlijent;
  }

  public static async isTvrtka(idRacun: number): Promise<Boolean> {
    return Boolean(await TvrtkaRepo.getTvrtkaByIdRacun(idRacun));
  }

  public static async getIdTvrtka(idRacun: number): Promise<number> {
    return (await TvrtkaRepo.getTvrtkaByIdRacun(idRacun)).idTvrtka;
  }
}
