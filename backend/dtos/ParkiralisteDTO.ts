import { TvrtkaDTO } from './TvrtkaDTO';

export interface ParkiralisteDTO extends TvrtkaDTO {
  idParkiraliste?: number;
  parkingName: string;
  capacity: number;
  disabledCapacity: number;
  parkingType: string;
  coordinates: string;
  oneTimePrice: number;
  repetitivePrice: number;
  permanentPrice: number;
}
