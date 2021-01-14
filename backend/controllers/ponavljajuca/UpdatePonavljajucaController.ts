import { PonavljajucaMapper } from '../../mappers/PonavljajucaMapper';
import { IResponse } from '../../interfaces/network';
import { IRequest } from '../../interfaces/network';
import { BaseController } from '../BaseController';
import { PonavljajucaRepo } from '../../repos/PonavljajucaRepo';
import { PonavljajucaDTO } from '../../dtos/PonavljajucaDTO';
import { PonavljajucaValidator } from '../../utils/validators/PonavljajucaValidator';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';
import { ParkiralisteRepo } from '../../repos/ParkiralisteRepo';
import { VoziloRepo } from '../../repos/VoziloRepo';
import { RacunRepo } from '../../repos/RacunRepo';
import { intervalToDuration, isAfter, isBefore, parseISO } from 'date-fns';
import { ValidatorFunctions } from '../../utils/validators/ValidatorFunctions';

export class UpdatePonavljajucaController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const idRezervacija = Number(req.params.idRezervacija);

    if (!(await RacunRepo.isKlijent(req.session.user.idRacun))) {
      return this.forbidden(res, null);
    }

    if (isNaN(idRezervacija)) {
      return this.clientError(res, ['Id nije broj']);
    }

    if (idRezervacija < 1) {
      return this.clientError(res, ['Id mora biti pozitivan broj']);
    }

    const oldReservationData = await PonavljajucaMapper.toDTO(
      await PonavljajucaRepo.getPonavljajucaByIdRezervacija(idRezervacija)
    );

    const ponavljajucaDTO = {
      ...oldReservationData,
      ...req.body.data,
    } as PonavljajucaDTO;

    ponavljajucaDTO.idPonavljajuca = await PonavljajucaRepo.getIdPonavljajuca(
      idRezervacija
    );
    ponavljajucaDTO.idRezervacija = idRezervacija;
    ponavljajucaDTO.idKlijent = await RacunRepo.getIdKlijent(
      req.session.user.idRacun
    );

    //Provjeri posjeduje li korisnik navedeni auto
    if (
      !(await KlijentRepo.checkCarOwner(
        ponavljajucaDTO.idKlijent,
        ponavljajucaDTO.idVozilo
      ))
    ) {
      return this.forbidden(res, ['Traženo vozilo nije u Vašoj listi vozila.']);
    }

    //Provjeri postoje li auto i parkiraliste
    if (
      !(await ParkiralisteRepo.getParkiralisteByIdParkiraliste(
        ponavljajucaDTO.idParkiraliste
      ))
    ) {
      return this.notFound(res, ['Traženo parkiralište nije pronađeno.']);
    }

    if (!(await VoziloRepo.getVoziloByIdVozilo(ponavljajucaDTO.idVozilo))) {
      return this.notFound(res, ['Traženo vozilo nije pronađeno.']);
    }

    // Provjeri ispravnost vremena
    if (
      !ValidatorFunctions.checkIsOneHourLong(
        PonavljajucaRepo.timeAndDateToDate(
          ponavljajucaDTO.reservationDate,
          ponavljajucaDTO.startTime
        ).toISOString(),
        PonavljajucaRepo.timeAndDateToDate(
          ponavljajucaDTO.reservationDate,
          ponavljajucaDTO.endTime
        ).toISOString()
      )
    ) {
      return this.clientError(res, [
        'Ponavljajucća rezervacija mora trajati najmanje sat vremena.',
      ]);
    }

    if (
      !ValidatorFunctions.checkIsStartBeforeEnd(
        PonavljajucaRepo.timeAndDateToDate(
          ponavljajucaDTO.reservationDate,
          ponavljajucaDTO.startTime
        ).toISOString(),
        PonavljajucaRepo.timeAndDateToDate(
          ponavljajucaDTO.reservationDate,
          ponavljajucaDTO.endTime
        ).toISOString()
      ) ||
      !ValidatorFunctions.checkIsStartBeforeEnd(
        PonavljajucaRepo.timeAndDateToDate(
          ponavljajucaDTO.reservationDate,
          ponavljajucaDTO.startTime
        ).toISOString(),
        PonavljajucaRepo.timeAndDateToDate(
          ponavljajucaDTO.reservationEndDate,
          ponavljajucaDTO.endTime
        ).toISOString()
      ) ||
      !ValidatorFunctions.checkIsStartBeforeEnd(
        new Date(ponavljajucaDTO.reservationDate).toISOString(),
        new Date(ponavljajucaDTO.reservationEndDate).toISOString()
      )
    ) {
      return this.clientError(res, [
        'Početak rezervacije mora biti prije kraja rezervacije.',
      ]);
    }

    if (
      !ValidatorFunctions.checkIsStartBeforeNow(
        PonavljajucaRepo.timeAndDateToDate(
          ponavljajucaDTO.reservationDate,
          ponavljajucaDTO.startTime
        ).toISOString()
      )
    ) {
      return this.clientError(res, [
        'Početak rezervacije mora biti u budućnosti.',
      ]);
    }

    // Postoji li rezervacija s danim vozilom u to vrijeme
    for (const dates of PonavljajucaRepo.getAllDates(ponavljajucaDTO)) {
      if (
        !(await RezervacijaRepo.isAvailableForUpdate(
          ponavljajucaDTO.idRezervacija,
          ponavljajucaDTO.idVozilo,
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
      await Promise.all([PonavljajucaValidator.validate(ponavljajucaDTO)])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    const rezervacija = await PonavljajucaRepo.update(ponavljajucaDTO);

    return this.ok(res, {
      data: {
        repetitive: await PonavljajucaMapper.toDTO(rezervacija),
      },
    });
  };
}
