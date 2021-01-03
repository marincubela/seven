import { Parkiraliste, IParkiralisteAttributes } from '../models/Parkiraliste';
import { ParkiralisteDTO } from '../dtos/ParkiralisteDTO';
import { Mapper } from './Mapper';

export class ParkiralisteMapper extends Mapper {
  public static toDomain(
    parkiralisteDTO: ParkiralisteDTO
  ): IParkiralisteAttributes {
    return {
      idParkiraliste: parkiralisteDTO.idParkiraliste,
      nazivParkiralista: parkiralisteDTO.parkingName,
      brojMjesta: parkiralisteDTO.capacity,
      brojInvalidskihMjesta: parkiralisteDTO.disabledCapacity,
      tipParkiralista: parkiralisteDTO.parkingType,
      koordinate: parkiralisteDTO.coordinates,
      cijenaJednokratne: parkiralisteDTO.oneTimePrice,
      cijenaPonavljajuce: parkiralisteDTO.repetitivePrice,
      cijenaTrajne: parkiralisteDTO.permanentPrice,
      idTvrtka: parkiralisteDTO.idTvrtka,
    };
  }

  public static async toDTO(
    parkiraliste: Parkiraliste
  ): Promise<ParkiralisteDTO> {
    return {
      idParkiraliste: parkiraliste.idParkiraliste,
      parkingName: parkiraliste.nazivParkiralista,
      capacity: parkiraliste.brojMjesta,
      disabledCapacity: parkiraliste.brojInvalidskihMjesta,
      parkingType: parkiraliste.tipParkiralista,
      coordinates: parkiraliste.koordinate,
      oneTimePrice: parkiraliste.cijenaJednokratne,
      repetitivePrice: parkiraliste.cijenaPonavljajuce,
      permanentPrice: parkiraliste.cijenaTrajne,
      idTvrtka: parkiraliste.idTvrtka,
    };
  }
}
