export interface ParkiralisteDTO {
  idParkiraliste?: number;
  parkingName: string;
  capacity: number;
  freeCapacity?: number;
  disabledCapacity: number;
  parkingType: string;
  coordinates: string;
  oneTimePrice: number;
  repetitivePrice: number;
  permanentPrice: number;
  idTvrtka?: number;
  idRacun?: number;
}
