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
      idKlijent: voziloDTO.idKlijent,
    };
  }

  public static async toDTO(vozilo: Vozilo): Promise<VoziloDTO> {
    return {
      registration: vozilo.registracija,
      carName: vozilo.nazivVozila,
      color: vozilo.boja,
      idKlijent: vozilo.idKlijent,
    };
  }
}
