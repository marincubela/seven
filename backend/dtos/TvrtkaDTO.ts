import { RacunDTO } from './RacunDTO';

export interface TvrtkaDTO extends RacunDTO {
  idTvrtka?: number;
  name: string;
  address: string;
}
