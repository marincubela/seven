import { KlijentDTO } from './KlijentDTO';
import { TvrtkaDTO } from './TvrtkaDTO';

export interface ISessionUserDTO {
  idRacun: number;
  email: string;
  admin: boolean;
  OIB: string;
  klijent?: KlijentDTO;
  tvrtka?: TvrtkaDTO;
}
