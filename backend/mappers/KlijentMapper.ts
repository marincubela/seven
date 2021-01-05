import { KlijentDTO } from '../dtos/KlijentDTO';
import { IKlijentAtrributes, Klijent } from '../models/Klijent';
import { Mapper } from './Mapper';
import { RacunMapper } from './RacunMapper';

export class KlijentMapper extends Mapper {
  public static toDomain(raw: KlijentDTO): IKlijentAtrributes {
    return {
      idKlijent: raw.idKlijent,
      brojKartice: raw.cardNumber,
      ime: raw.firstName,
      prezime: raw.lastName,
      idRacun: raw.idRacun,
    };
  }

  public static async toDTO(klijent: Klijent): Promise<KlijentDTO> {
    const racun = await klijent.getRacun();

    return {
      ...(await RacunMapper.toDTO(racun)),
      firstName: klijent.ime,
      lastName: klijent.prezime,
      cardNumber: klijent.brojKartice,
    };
  }
}
