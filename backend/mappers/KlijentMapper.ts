import { KlijentDTO } from '../dtos/KlijentDTO';
import { IKlijentAtrributes } from '../models/Klijent';
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

  public static toPersistence(vinyl: Model): any;

  public static toDTO(vinyl: Model): DTO;
}
