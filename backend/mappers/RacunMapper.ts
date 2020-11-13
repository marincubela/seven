import { RacunDTO } from '../dtos/RacunDTO';
import { IRacunAttributes, Racun } from '../models/Racun';
import { Mapper } from './Mapper';

export class RacunMapper extends Mapper {
  // TODO: revisit this
  public static toDomain(raw: any): IRacunAttributes {
    return {
      idRacun: raw.idRacun,
      email: raw.email,
      OIB: raw.OIB,
      admin: raw.admin,
      lozinka: raw.password,
    };
  }

  public static toPersistence(racun: any): any {}

  public static toDTO(racun: Racun): Promise<RacunDTO> {
    return null;
  }
}
