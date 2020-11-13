import { RacunDTO } from "./RacunDTO";

export interface TvrtkaDTO extends RacunDTO{
    idCompany?: number;
    name: string;
    address: string;
}