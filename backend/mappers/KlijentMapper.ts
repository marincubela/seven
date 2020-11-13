import { KlijentDTO } from '../dtos/KlijentDTO';
import { IKlijentAtrributes, Klijent } from '../models/Klijent';
import { Mapper } from './Mapper';

export class KlijentMapper extends Mapper {
  public static toDomain(raw: any): IKlijentAtrributes {
    return {
      idKlijent: raw.idKlijent,
      brojKartice: raw.cardNumber,
      ime: raw.firstName,
      prezime: raw.lastName,
      idRacun: raw.idRacun,
    };
  }

  public static toPersistence(klijent: any): any {}

  public static async toDTO(klijent: Klijent): Promise<KlijentDTO> {
    const racun = await klijent.getRacun();

    return {
      idRacun: racun.idRacun,
      email: racun.email,
      oib: racun.OIB,
      firstName: klijent.ime,
      lastName: klijent.prezime,
      cardNumber: klijent.brojKartice,
    };
  }
}
