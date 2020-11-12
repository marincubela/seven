import { RacunDTO } from '../dtos/RacunDTO';
import { RacunMapper } from '../mappers/RacunMapper';
import { Klijent } from '../models/Klijent';
import { Racun } from '../models/Racun';
import { BaseRepo } from './BaseRepo';

export interface IRacunRepo extends BaseRepo<Klijent> {
  createRacun(klijentDTO: RacunDTO): Promise<Racun>;
}

export class RacunRepo implements IRacunRepo {
  async exists(t: Klijent): Promise<boolean> {
    return null;
  }

  async delete(t: Klijent): Promise<any> {}

  async save(t: Klijent): Promise<any> {}

  public static async createRacun(racunDTO: RacunDTO): Promise<Racun> {
    const { idRacun, ...racunData } = RacunMapper.toDomain(racunDTO);

    const racun = await Racun.create(racunData);

    return racun;
  }
}
