import { PonavljajucaDTO } from '../dtos/PonavljajucaDTO';
import { Mapper } from './Mapper';
import { IPonavljajucaAttributes, Ponavljajuca} from '../models/Ponavljajuca';

export class PonavljajucaMapper extends Mapper {
  public static toDomain(raw: PonavljajucaDTO):  IPonavljajucaAttributes {
    return {
      idPonavljajuca: raw.idPonavljajuca,
      datumRezervacije: raw.reservationDate,
      datumKrajaRez: raw.reservationEndDate,
      daniPonavljanja:raw.repeatDays,
      vrijemePocetka:raw.startTime,
      vrijemeKraja:raw.endTime,
      idRezervacija: raw.idRezervacija,
    };
  }
  public static async toDTO(ponavljajuca: Ponavljajuca): Promise<PonavljajucaDTO> {
    const rezervacija=await ponavljajuca.getRezervacija();
    const klijent = await rezervacija.getKlijent();
    const vozilo = await rezervacija.getVozilo();
    const parkiraliste = await rezervacija.getParkiraliste();
    const racun = await klijent.getRacun();
    const tvrtka = await parkiraliste.getTvrtka();

    return {
      idRezervacija: rezervacija.idRezervacija,
      idKlijent: klijent.idKlijent,
      idParkiraliste: parkiraliste.idParkiraliste,
      idVozilo: vozilo.idVozilo,
      firstName: klijent.ime,
      lastName: klijent.prezime,
      cardNumber: klijent.brojKartice,
      registration: vozilo.registracija,
      carName: vozilo.nazivVozila,
      color: vozilo.boja,
      parkingName: parkiraliste.nazivParkiralista,
      capacity: parkiraliste.brojMjesta,
      disabledCapacity: parkiraliste.brojInvalidskihMjesta,
      parkingType: parkiraliste.tipParkiralista,
      coordinates: parkiraliste.koordinate,
      oneTimePrice: parkiraliste.cijenaJednokratne,
      repetitivePrice: parkiraliste.cijenaPonavljajuce,
      permanentPrice: parkiraliste.cijenaTrajne,
      email: racun.email,
      name: tvrtka.naziv,
      address: tvrtka.adresa,
      reservationDate: ponavljajuca.datumRezervacije,
      reservationEndDate: ponavljajuca.datumKrajaRez,
      repeatDays: ponavljajuca.daniPonavljanja,
      startTime: ponavljajuca.vrijemePocetka,
      endTime:ponavljajuca.vrijemeKraja
      
    };
  }
}