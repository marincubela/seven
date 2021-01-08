import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { PonavljajucaDTO } from '../../dtos/PonavljajucaDTO';
import { PonavljajucaRepo } from '../../repos/PonavljajucaRepo';
import { PonavljajucaValidator } from '../../utils/validators';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { VoziloRepo } from '../../repos/VoziloRepo';
import { ParkiralisteRepo } from '../../repos/ParkiralisteRepo';
import { intervalToDuration, isAfter, isBefore, parseISO } from 'date-fns';
import { PonavljajucaMapper } from '../../mappers/PonavljajucaMapper';
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';

export class CreatePonavljajucaController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const ponavljajucaDto = req.body.data as PonavljajucaDTO;

    //Provjeri rezervira li korisnik u svoje ime
    //Provjeri posjeduje li korisnik navedeni auto
    if (
      !(await KlijentRepo.idValidationCheck(ponavljajucaDto.idKlijent)) ||
      (await KlijentRepo.getIdRacunByIdKlijent(ponavljajucaDto.idKlijent)) !=
        req.session.user.idRacun ||
      !(await KlijentRepo.checkCarOwner(
        ponavljajucaDto.idKlijent,
        ponavljajucaDto.idVozilo
      ))
    ) {
      return this.forbidden(res, null);
    }

    //Provjeri postoje li auto i parkiraliste
    if (
      !(
        (await ParkiralisteRepo.getParkiralisteByIdParkiraliste(
          ponavljajucaDto.idParkiraliste
        )) && (await VoziloRepo.getVoziloByIdVozilo(ponavljajucaDto.idVozilo))
      )
    ) {
      return this.clientError(res, ['Neispravan id vozila ili parkiralista!']);
    }

    // Provjeri ispravnost vremena
    if (
      !this.checkTime2(
        PonavljajucaRepo.timeAndDateToDate(
          ponavljajucaDto.reservationDate,
          ponavljajucaDto.startTime
        ).toISOString(),
        PonavljajucaRepo.timeAndDateToDate(
          ponavljajucaDto.reservationDate,
          ponavljajucaDto.endTime
        ).toISOString()
      ) ||
      !this.checkTime(
        new Date(ponavljajucaDto.reservationDate).toISOString(),
        new Date(ponavljajucaDto.reservationEndDate).toISOString()
      )
    ) {
      return this.clientError(res, [
        'Početak i kraj rezervacije nisu ispravni',
      ]);
    }

    if (1) {
      return this.ok(res, {});
    }

    // Postoji li rezervacija s danim vozilom u to vrijeme

    // Treba se promijeniti u RezervacijaRepo.isAvailable(), al treba prilagoditi... ima posla
    for (const dates of PonavljajucaRepo.getAllDates(ponavljajucaDto)) {
      if (
        !(await RezervacijaRepo.isAvailable(
          ponavljajucaDto.idVozilo,
          dates.startTime,
          dates.endTime
        ))
      ) {
        return this.conflict(res, ['Nije moguće rezervirati u dano vrijeme']);
      }
    }

    const validationErrors = (
      await Promise.all([PonavljajucaValidator.validate(ponavljajucaDto)])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    const ponavljajuca = await PonavljajucaRepo.createPonavljajuca(
      ponavljajucaDto
    );

    return this.ok(res, {
      data: {
        reservation: await PonavljajucaMapper.toDTO(ponavljajuca),
      },
    });
  };

  private checkTime(startTime: string, endTime: string): Boolean {
    const start = parseISO(startTime);
    const end = parseISO(endTime);

    if (isAfter(start, end) || isBefore(start, new Date())) {
      return false;
    }

    return true;
  }

  private checkTime2(startTime: string, endTime: string): Boolean {
    if (String(startTime) > String(endTime)) {
      return false;
    }
    const start = parseISO(startTime);
    const end = parseISO(endTime);

    const interval = intervalToDuration({
      start: new Date(start),
      end: new Date(end),
    });

    console.log(interval);

    if (interval.hours < 1) {
      return false;
    }

    if (isAfter(start, end) || isBefore(start, new Date())) {
      return false;
    }

    return true;
  }
}
