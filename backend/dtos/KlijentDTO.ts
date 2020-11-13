import { RacunDTO } from './RacunDTO';

export interface KlijentDTO extends RacunDTO {
  idClient?: number;
  firstName: string;
  lastName: string;
  creditCardNumber: number;
  idCheck?: number;
}
