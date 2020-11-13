import { RacunDTO } from './RacunDTO';

export interface KlijentDTO extends RacunDTO {
  idKlijent?: number;
  firstName: string;
  lastName: string;
  CardNumber: number;
}
