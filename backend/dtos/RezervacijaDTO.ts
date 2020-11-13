import { KlijentDTO } from "./KlijentDTO";
import { ParkiralisteDTO } from "./ParkiralisteDTO";
import { RacunDTO } from "./RacunDTO";
import { VoziloDTO } from "./VoziloDTO";

export interface RezervacijaDTO extends KlijentDTO, VoziloDTO, ParkiralisteDTO{
    idReservation?: number;
}