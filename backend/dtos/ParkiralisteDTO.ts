import { TvrtkaDTO } from "./TvrtkaDTO";

export interface ParkiralisteDTO extends TvrtkaDTO{
    idParking?: number;
    parkingName: string;
    capacity: number;
    invalidCapacity: number;
    parkingType: string;
    coordinates: string;
    oneTimePrice: number;
    repetitivePrice: number;
    permanentPrice: number;
}