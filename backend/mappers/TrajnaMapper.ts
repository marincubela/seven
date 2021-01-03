import { TrajnaDTO } from '../dtos/TrajnaDTO';
import { Mapper } from './Mapper';
import { ITrajnaAttributes, Trajna } from '../models/Trajna';

export class TrajnaMapper extends Mapper {
  public static toDomain(raw: TrajnaDTO): ITrajnaAttributes {
    return {
      idTrajna: raw.idTrajna,
      vrijemePocetak: raw.startTime,
      vrijemeKraj: raw.endTime,
      idRezervacija: raw.idRezervacija,
    };
  }

  public static async toDTO(trajna: Trajna): Promise<TrajnaDTO> {
    const rezervacija = await trajna.getRezervacija();

    return {
      idRezervacija: rezervacija.idRezervacija,
      idKlijent: rezervacija.idKlijent,
      idParkiraliste: rezervacija.idParkiraliste,
      idVozilo: rezervacija.idVozilo,
      startTime: trajna.vrijemePocetak,
      endTime: trajna.vrijemeKraj,
    };
  }
}
