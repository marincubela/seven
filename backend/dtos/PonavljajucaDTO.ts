import { RezervacijaDTO } from './RezervacijaDTO';

export interface PonavljajucaDTO extends RezervacijaDTO {
  idPonavljajuca?: number;
  reservationDate: Date;
  reservationEndDate: Date;
  repeatDays: string;
  startTime: Date;
  endTime: Date;
}
