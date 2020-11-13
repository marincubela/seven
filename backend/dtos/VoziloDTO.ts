import { KlijentDTO } from './KlijentDTO';

export interface VoziloDTO extends KlijentDTO {
  idVozilo?: number;
  registration: string;
  carName: string;
  color: boolean;
}
