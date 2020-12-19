import { Racun } from '../models/Racun';
import { RacunDTO } from '../dtos/RacunDTO';
import { RacunMapper } from '../mappers/RacunMapper';
import { BaseRepo } from './BaseRepo';
import { hashPassword } from '../utils/password';
import { KlijentRepo } from './KlijentRepo';
import { TvrtkaRepo } from './TvrtkaRepo';
import { Klijent } from '../models/Klijent';

/*
export abstract class IRacunRepo extends BaseRepo<RacunDTO> {
  public abstract createRacun(racunDTO: RacunDTO): Promise<Racun>;
}
*/
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

  public static async isKlijent(idRacun: number): Promise<Boolean> {
    return Boolean(await KlijentRepo.getKlijentByIdRacun(idRacun));
  }

  public static async isTvrtka(idRacun: number): Promise<Boolean> {
    return Boolean(await TvrtkaRepo.getTvrtkaByIdRacun(idRacun));
  }
}
