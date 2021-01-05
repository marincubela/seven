import { RacunDTO } from '../dtos/RacunDTO';
import { IRacunAttributes, Racun } from '../models/Racun';
import { Mapper } from './Mapper';

export class RacunMapper extends Mapper {
  // TODO: revisit this
  public static toDomain(raw: RacunDTO): IRacunAttributes {
    return {
      idRacun: raw.idRacun,
      email: raw.email,
      OIB: raw.OIB,
      admin: raw.admin,
      lozinka: raw.password,
    };
  }

  public static async toDTO(racun: Racun): Promise<RacunDTO> {
    return {
      idRacun: racun.idRacun,
      email: racun.email,
      OIB: racun.OIB,
      admin: racun.admin,
    };
  }
}
