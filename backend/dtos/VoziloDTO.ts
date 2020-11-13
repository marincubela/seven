import { KlijentDTO } from "./KlijentDTO";

export interface VoziloDTO extends KlijentDTO{
    idCar?: number;
    registration: string;
    carName: string;
    color: boolean;
}