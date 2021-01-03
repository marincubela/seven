import { KlijentDTO } from './KlijentDTO';
import { ParkiralisteDTO } from './ParkiralisteDTO';
import { VoziloDTO } from './VoziloDTO';

export interface RezervacijaDTO extends KlijentDTO, VoziloDTO, ParkiralisteDTO {
  idRezervacija?: number;
}
