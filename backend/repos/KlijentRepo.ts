import { KlijentDTO } from '../dtos/KlijentDTO';
import { KlijentMapper } from '../mappers/KlijentMapper';
import { Klijent } from '../models/Klijent';
import { BaseRepo } from './BaseRepo';
import { RacunRepo } from './RacunRepo';

export interface IKlijentRepo extends BaseRepo<Klijent> {
  createKlijent(klijentDTO: KlijentDTO): Promise<Klijent>;
}

export class KlijentRepo implements IKlijentRepo {
  async exists(t: Klijent): Promise<boolean> {
    return null;
  }

  async delete(t: Klijent): Promise<any> {}

  async save(t: Klijent): Promise<any> {}

  static async createKlijent(klijentDTO: KlijentDTO): Promise<Klijent> {
    const racun = await RacunRepo.createRacun(klijentDTO);

    const { idKlijent, ...klijentData } = KlijentMapper.toDomain(klijentDTO);

    const klijent = await Klijent.create({
      ...klijentData,
      idRacun: racun.idRacun,
    });

    return klijent;
  }
}
