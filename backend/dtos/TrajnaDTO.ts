import { RezervacijaDTO } from './RezervacijaDTO';

export interface TrajnaDTO extends RezervacijaDTO {
  idTrajna?: number;
  startTime: Date;
  endTime: Date;
}
