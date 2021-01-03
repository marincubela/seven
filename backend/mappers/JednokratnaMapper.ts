import { JednokratnaDTO } from '../dtos/JednokratnaDTO';
import { Mapper } from './Mapper';
import { IJednokratnaAttributes, Jednokratna } from '../models/Jednokratna';

export class JednokratnaMapper extends Mapper {
  public static toDomain(raw: JednokratnaDTO): IJednokratnaAttributes {
    return {
      idJednokratna: raw.idJednokratna,
      vrijemePocetak: raw.startTime,
      vrijemeKraj: raw.endTime,
      idRezervacija: raw.idRezervacija,
    };
  }

  public static async toDTO(jednokratna: Jednokratna): Promise<JednokratnaDTO> {
    const rezervacija = await jednokratna.getRezervacija();

    return {
      idRezervacija: rezervacija.idRezervacija,
      idKlijent: rezervacija.idKlijent,
      idParkiraliste: rezervacija.idParkiraliste,
      idVozilo: rezervacija.idVozilo,
      startTime: jednokratna.vrijemePocetak,
      endTime: jednokratna.vrijemeKraj,
    };
  }
}
