import { IntegerDataType } from "sequelize/types";
import { RezervacijaDTO } from "./RezervacijaDTO";

export interface PonavljajucaDTO extends RezervacijaDTO{
    idRepetitive?: number;
    reservationDate: Date;
    reservationEndDate: Date;
    repeatDays: IntegerDataType;
    startTime: Date;
    endTime: Date;
}