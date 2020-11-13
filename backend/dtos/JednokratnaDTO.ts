import { RezervacijaDTO } from "./RezervacijaDTO";

export interface JednokratnaDTO extends RezervacijaDTO{
    idOneTime?: number;
    startTime: Date;
    endTime: Date;
}