import { RezervacijaDTO } from "./RezervacijaDTO";

export interface TrajnaDTO extends RezervacijaDTO{
    idPermanent?: number;
    startTime: Date;
    endTime: Date;
}