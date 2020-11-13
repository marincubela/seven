import { RezervacijaDTO } from './RezervacijaDTO';

export interface JednokratnaDTO extends RezervacijaDTO {
  idJednokratna?: number;
  startTime: Date;
  endTime: Date;
}
