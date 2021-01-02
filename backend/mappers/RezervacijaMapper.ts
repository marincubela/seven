import { RezervacijaDTO } from '../dtos/RezervacijaDTO';
import { Mapper } from './Mapper';
import { IRezervacijaAttributes, Rezervacija } from '../models/Rezervacija';

export class RezervacijaMapper extends Mapper {
  public static toDomain(raw: RezervacijaDTO): IRezervacijaAttributes {
    return {
      idRezervacija: raw.idRezervacija,
      idVozilo: raw.idVozilo,
      idKlijent: raw.idKlijent,
      idParkiraliste: raw.idParkiraliste
    };
  }
  public static async toDTO(rezervacija: Rezervacija): Promise<RezervacijaDTO> {
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
    };
  }
}
