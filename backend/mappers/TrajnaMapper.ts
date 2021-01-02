import { TrajnaDTO } from '../dtos/TrajnaDTO';
import { Mapper } from './Mapper';
import { ITrajnaAttributes, Trajna} from '../models/Trajna';

export class TrajnaMapper extends Mapper {
  public static toDomain(raw: TrajnaDTO):  ITrajnaAttributes {
    return {
      idTrajna: raw.idTrajna,
      vrijemePocetak: raw.startTime,
      vrijemeKraj: raw.endTime,
    };
  }
  public static async toDTO(trajna: Trajna): Promise<TrajnaDTO> {
    const rezervacija=await trajna.getRezervacija();
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
      startTime: trajna.vrijemePocetak,
      endTime: trajna.vrijemeKraj,
    };
  }
}