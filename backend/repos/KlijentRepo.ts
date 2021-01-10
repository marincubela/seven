import { Racun } from '../models/Racun';
import { KlijentDTO } from '../dtos/KlijentDTO';
import { KlijentMapper } from '../mappers/KlijentMapper';
import { Klijent } from '../models/Klijent';
import { BaseRepo } from './BaseRepo';
import { RacunRepo } from './RacunRepo';
import { VoziloRepo } from './VoziloRepo';
import { Op } from 'sequelize';
import { exists } from 'fs';

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

  public static async getKlijentByCardNumber(
    brojKartice: string
  ): Promise<Klijent> {
    return await Klijent.findOne({
      where: {
        brojKartice,
      },
    });
  }

  public static async getIdRacunByIdKlijent(
    idKlijent: number
  ): Promise<number> {
    return (await (await this.getKlijentByIdKlijent(idKlijent)).getRacun())
      .idRacun;
  }

  public static async update(klijentDTO: KlijentDTO): Promise<Klijent> {
    const { idRacun, ...klijentData } = KlijentMapper.toDomain(klijentDTO);

    await new RacunRepo().save(klijentDTO);

    await Klijent.update(klijentData, {
      where: {
        idRacun,
      },
    });

    return this.getKlijentByIdRacun(idRacun);
  }

  public static async checkUniqueForUpdate(
    klijentDTO: KlijentDTO,
    idRacun: number
  ): Promise<Boolean> {
    const klijent = await Klijent.findAll({
      where: {
        brojKartice: klijentDTO.cardNumber,
        idRacun: { [Op.ne]: idRacun },
      },
    });

    return (
      !klijent.length &&
      (await RacunRepo.checkUniqueForUpdate(klijentDTO, idRacun))
    );
  }

  public static async checkCarOwner(
    idKlijent: number,
    idVozilo: number
  ): Promise<Boolean> {
    const vozila = await VoziloRepo.getVoziloFromClient(idKlijent);
    for (const vozilo of vozila) {
      if (vozilo.idVozilo == idVozilo) return true;
    }
    return false;
  }

  public static async idValidationCheck(idKlijent: number): Promise<Boolean> {
    const klijent = await Klijent.findOne({
      where: {
        idKlijent,
      },
    });

    return Boolean(klijent);
  }

  public static async chargeKlijent(): Promise<Boolean> {
    const isPaymentSuccessful = Math.random() > 0.12;

    return isPaymentSuccessful;
  }
}
