import { RacunDTO } from './RacunDTO';

export interface KlijentDTO extends RacunDTO {
  firstName: string;
  lastName: string;
  creditCardNumber: number;
}
