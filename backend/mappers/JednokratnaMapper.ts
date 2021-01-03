import { JednokratnaDTO } from '../dtos/JednokratnaDTO';
import { Mapper } from './Mapper';
import { IJednokratnaAttributes, Jednokratna} from '../models/Jednokratna';

export class JednokratnaMapper extends Mapper {
  public static toDomain(raw: JednokratnaDTO):  IJednokratnaAttributes {
    return {
      idJednokratna: raw.idJednokratna,
      vrijemePocetak: raw.startTime,
      vrijemeKraj: raw.endTime,
      idRezervacija: raw.idRezervacija,
    };
  }
  public static async toDTO(jednokratna: Jednokratna): Promise<JednokratnaDTO> {
    const rezervacija=await jednokratna.getRezervacija();
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
      startTime: jednokratna.vrijemePocetak,
      endTime: jednokratna.vrijemeKraj,
    };
  }
}