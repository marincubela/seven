import { Racun } from '../models/Racun';
import { KlijentDTO } from '../dtos/KlijentDTO';
import { KlijentMapper } from '../mappers/KlijentMapper';
import { Klijent } from '../models/Klijent';
import { BaseRepo } from './BaseRepo';
import { RacunRepo } from './RacunRepo';

/*
export interface IKlijentRepo extends BaseRepo<Klijent> {
  createKlijent(klijentDTO: KlijentDTO): Promise<Klijent>;
} */

export class KlijentRepo extends BaseRepo<KlijentDTO> {
  async exists(klijentDTO: KlijentDTO): Promise<boolean> {
    const { idRacun } = KlijentMapper.toDomain(klijentDTO);

    const racun = await Klijent.findOne({
      where: {
        idRacun,
      },
    });

    return Boolean(racun);
  }

  async delete(klijentDTO: KlijentDTO): Promise<any> {
    const { idRacun } = KlijentMapper.toDomain(klijentDTO);

    return await Racun.destroy({
      where: {
        idRacun,
      },
    });
  }

  async save(klijentDTO: KlijentDTO): Promise<any> {
    if (await this.exists(klijentDTO)) {
      const { idRacun, ...klijentData } = KlijentMapper.toDomain(klijentDTO);

      const racunRepo = new RacunRepo();
      racunRepo.save(klijentDTO);

      return await Klijent.update(klijentData, {
        where: {
          idRacun,
        },
      });
    }

    return await KlijentRepo.createKlijent(klijentDTO);
  }

  static async createKlijent(klijentDTO: KlijentDTO): Promise<Klijent> {
    const racun = await RacunRepo.createRacun(klijentDTO);

    const { idKlijent, ...klijentData } = KlijentMapper.toDomain(klijentDTO);

    const klijent = await Klijent.create({
      ...klijentData,
      idRacun: racun.idRacun,
    });

    return klijent;
  }

  public static async getKlijentByIdRacun(idRacun: number): Promise<Klijent> {
    return await Klijent.findOne({
      where: {
        idRacun,
      },
    });
  }

  public static async getKlijentByIdKlijent(
    idKlijent: number
  ): Promise<Klijent> {
    return await Klijent.findOne({
      where: {
        idKlijent,
      },
    });
  }

  public static async getIdRacunByIdKlijent(
    idKlijent: number
  ): Promise<number> {
    return (await (await this.getKlijentByIdKlijent(idKlijent)).getRacun())
      .idRacun;
  }


  public static async update(klijentDTO: KlijentDTO):Promise<number>{
    
      const { idRacun, ...klijentData } = KlijentMapper.toDomain(klijentDTO);

      const racunRepo = new RacunRepo();
      racunRepo.save(klijentDTO);

      await Klijent.update(klijentData, {
        where: {
          idRacun,
        },
      });
      const klijent=await this.getIdRacunByIdKlijent(klijentDTO.idKlijent);
      return klijent;
}
}
