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
import { RacunRepo } from '../../repos/RacunRepo';

export class CreatePonavljajucaController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const ponavljajucaDto = req.body.data as PonavljajucaDTO;

    if (!(await RacunRepo.isKlijent(req.session.user.idRacun))) {
      return this.forbidden(res, null);
    }

    ponavljajucaDto.idKlijent = await RacunRepo.getIdKlijent(
      req.session.user.idRacun
    );

    //Provjeri posjeduje li korisnik navedeni auto
    if (
      !(await KlijentRepo.checkCarOwner(
        ponavljajucaDto.idKlijent,
        ponavljajucaDto.idVozilo
      ))
    ) {
      return this.forbidden(res, ['Traženo vozilo nije u Vašoj listi vozila.']);
    }

    //Provjeri postoje li auto i parkiraliste
    if (
      !(await ParkiralisteRepo.getParkiralisteByIdParkiraliste(
        ponavljajucaDto.idParkiraliste
      ))
    ) {
      return this.notFound(res, ['Traženo parkiralište nije pronađeno.']);
    }

    if (!(await VoziloRepo.getVoziloByIdVozilo(ponavljajucaDto.idVozilo))) {
      return this.notFound(res, ['Traženo vozilo nije pronađeno.']);
    }

    // Provjeri ispravnost vremena
    if (
      !this.checkIsOneHourLong(
        PonavljajucaRepo.timeAndDateToDate(
          ponavljajucaDto.reservationDate,
          ponavljajucaDto.startTime
        ).toISOString(),
        PonavljajucaRepo.timeAndDateToDate(
          ponavljajucaDto.reservationDate,
          ponavljajucaDto.endTime
        ).toISOString()
      )
    ) {
      return this.clientError(res, [
        'Rezervacija mora trajati najmanje sat vremena.',
      ]);
    }

    if (
      !this.checkIsStartBeforeEnd(
        PonavljajucaRepo.timeAndDateToDate(
          ponavljajucaDto.reservationDate,
          ponavljajucaDto.startTime
        ).toISOString(),
        PonavljajucaRepo.timeAndDateToDate(
          ponavljajucaDto.reservationDate,
          ponavljajucaDto.endTime
        ).toISOString()
      ) ||
      !this.checkIsStartBeforeEnd(
        PonavljajucaRepo.timeAndDateToDate(
          ponavljajucaDto.reservationDate,
          ponavljajucaDto.startTime
        ).toISOString(),
        PonavljajucaRepo.timeAndDateToDate(
          ponavljajucaDto.reservationEndDate,
          ponavljajucaDto.endTime
        ).toISOString()
      ) ||
      !this.checkIsStartBeforeEnd(
        new Date(ponavljajucaDto.reservationDate).toISOString(),
        new Date(ponavljajucaDto.reservationEndDate).toISOString()
      )
    ) {
      return this.clientError(res, [
        'Početak rezervacije mora biti prije kraja rezervacije.',
      ]);
    }

    if (
      !this.checkIsStartBeforeNow(
        PonavljajucaRepo.timeAndDateToDate(
          ponavljajucaDto.reservationDate,
          ponavljajucaDto.startTime
        ).toISOString()
      )
    ) {
      return this.clientError(res, [
        'Početak rezervacije mora biti u budućnosti.',
      ]);
    }

    // Postoji li rezervacija s danim vozilom u to vrijeme
    for (const dates of PonavljajucaRepo.getAllDates(ponavljajucaDto)) {
      if (
        !(await RezervacijaRepo.isAvailable(
          ponavljajucaDto.idVozilo,
          dates.startTime,
          dates.endTime
        ))
      ) {
        return this.conflict(res, [
          'Već postoji rezervacija s odabranim u vozilom u odabranom vremenu.',
        ]);
      }
    }

    const validationErrors = (
      await Promise.all([PonavljajucaValidator.validate(ponavljajucaDto)])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    // Vraća true ako je placanje uspjesno
    if (!(await KlijentRepo.chargeKlijent())) {
      // 402 status je payment required
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402
      return CreatePonavljajucaController.jsonResponse(res, 402, [
        'Nije moguće provesti plaćanje: nedovoljno sredstava na kartici ',
      ]);
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

  private checkIsStartBeforeNow(startTime: string): Boolean {
    const start = parseISO(startTime);

    return !isBefore(start, new Date());
  }

  private checkIsStartBeforeEnd(startTime: string, endTime: string): Boolean {
    const start = parseISO(startTime);
    const end = parseISO(endTime);

    return !isAfter(start, end);
  }

  private checkIsOneHourLong(startTime: string, endTime: string): Boolean {
    if (String(startTime) > String(endTime)) {
      return false;
    }
    const start = parseISO(startTime);
    const end = parseISO(endTime);

    const interval = intervalToDuration({
      start: new Date(start),
      end: new Date(end),
    });

    return interval.hours >= 1;
  }
}
