import { Vozilo, IVoziloAttributes } from '../models/Vozilo';
import { VoziloDTO } from '../dtos/VoziloDTO';
import { Mapper } from './Mapper';

export class VoziloMapper extends Mapper {
  public static toDomain(voziloDTO: VoziloDTO): IVoziloAttributes {
    return {
        idVozilo: voziloDTO.idVozilo,
        registracija: voziloDTO.registration,
        nazivVozila: voziloDTO.carName,
        boja: voziloDTO.color,
        idKlijent: voziloDTO.idKlijent
    };
  }

  public static async toDTO(vozilo: Vozilo): Promise<VoziloDTO> {
    const klijent = await vozilo.getKlijent();
    const racun = await klijent.getRacun();

    return {
        idRacun: racun.idRacun,
        registration: vozilo.registracija,
        carName: vozilo.nazivVozila,
        color: vozilo.boja,
        firstName: klijent.ime,
        lastName:klijent.prezime,
        cardNumber: klijent.brojKartice,
        email:racun.email
    };
  }
}