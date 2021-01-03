import { PonavljajucaDTO } from '../dtos/PonavljajucaDTO';
import { Mapper } from './Mapper';
import { IPonavljajucaAttributes, Ponavljajuca } from '../models/Ponavljajuca';

export class PonavljajucaMapper extends Mapper {
  public static toDomain(raw: PonavljajucaDTO): IPonavljajucaAttributes {
    return {
      idPonavljajuca: raw.idPonavljajuca,
      datumRezervacije: raw.reservationDate,
      datumKrajaRez: raw.reservationEndDate,
      daniPonavljanja: raw.repeatDays,
      vrijemePocetka: raw.startTime,
      vrijemeKraja: raw.endTime,
      idRezervacija: raw.idRezervacija,
    };
  }

  public static async toDTO(
    ponavljajuca: Ponavljajuca
  ): Promise<PonavljajucaDTO> {
    const rezervacija = await ponavljajuca.getRezervacija();

    return {
      idRezervacija: rezervacija.idRezervacija,
      idKlijent: rezervacija.idKlijent,
      idParkiraliste: rezervacija.idParkiraliste,
      idVozilo: rezervacija.idVozilo,
      reservationDate: ponavljajuca.datumRezervacije,
      reservationEndDate: ponavljajuca.datumKrajaRez,
      repeatDays: ponavljajuca.daniPonavljanja,
      startTime: ponavljajuca.vrijemePocetka,
      endTime: ponavljajuca.vrijemeKraja,
    };
  }
}
