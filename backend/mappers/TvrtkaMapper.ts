import { Tvrtka, ITvrtkaAttributes } from '../models/Tvrtka';
import { TvrtkaDTO } from '../dtos/TvrtkaDTO';
import { Mapper } from './Mapper';
import { RacunMapper } from './RacunMapper';
import { PublicTvrtkaDTO } from '../dtos/PublicDTO';

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
      ...(await RacunMapper.toDTO(racun)),
      name: tvrtka.naziv,
      address: tvrtka.adresa,
    };
  }

  public static async toPublicDTO(tvrtka: Tvrtka): Promise<PublicTvrtkaDTO> {
    const racun = await tvrtka.getRacun();

    return {
      idRacun: racun.idRacun,
      idTvrtka: tvrtka.idTvrtka,
      name: tvrtka.naziv,
      address: tvrtka.adresa,
    };
  }
}
