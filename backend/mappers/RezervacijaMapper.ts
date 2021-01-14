import { RezervacijaDTO } from '../dtos/RezervacijaDTO';
import { Mapper } from './Mapper';
import { IRezervacijaAttributes, Rezervacija } from '../models/Rezervacija';

export class RezervacijaMapper extends Mapper {
  public static toDomain(raw: RezervacijaDTO): IRezervacijaAttributes {
    return {
      idRezervacija: raw.idRezervacija,
      idVozilo: raw.idVozilo,
      idKlijent: raw.idKlijent,
      idParkiraliste: raw.idParkiraliste,
    };
  }

  public static async toDTO(rezervacija: Rezervacija): Promise<RezervacijaDTO> {
    return {
      idRezervacija: rezervacija.idRezervacija,
      idKlijent: rezervacija.idKlijent,
      idParkiraliste: rezervacija.idParkiraliste,
      idVozilo: rezervacija.idVozilo,
    };
  }
}
