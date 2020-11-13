import { Tvrtka, ITvrtkaAttributes } from '../models/Tvrtka';
import { TvrtkaDTO } from '../dtos/TvrtkaDTO';
import { Mapper } from './Mapper';

export class TvrtkaMapper extends Mapper {
  public static toDomain(tvrtkaDTO: TvrtkaDTO): ITvrtkaAttributes {
    return {
      idTvrtka: tvrtkaDTO.idTvrtka,
      adresa: tvrtkaDTO.address,
      naziv: tvrtkaDTO.name,
      idRacun: tvrtkaDTO.idRacun,
    };
  }

  public static async toDTO(tvrtka: Tvrtka): Promise<TvrtkaDTO> {
    const racun = await tvrtka.getRacun();

    return {
      idRacun: racun.idRacun,
      email: racun.email,
      OIB: racun.OIB,
      name: tvrtka.naziv,
      address: tvrtka.adresa,
    };
  }
}
