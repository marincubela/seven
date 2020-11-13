import { RacunDTO } from '../dtos/RacunDTO';
import { RacunMapper } from '../mappers/RacunMapper';
import { Racun } from '../models/Racun';
import { BaseRepo } from './BaseRepo';

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
    const { idRacun, ...racunData } = RacunMapper.toDomain(racunDTO);

    const racun = await Racun.create(racunData);

    return racun;
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
}
