import { RezervacijaDTO } from './RezervacijaDTO';

export interface PonavljajucaDTO extends RezervacijaDTO {
  idPonavljajuca?: number;
  reservationDate: Date;
  reservationEndDate: Date;
  repeatDays: number;
  startTime: Date;
  endTime: Date;
}
