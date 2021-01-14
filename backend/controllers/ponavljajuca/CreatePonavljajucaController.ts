import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { PonavljajucaDTO } from '../../dtos/PonavljajucaDTO';
import { PonavljajucaRepo } from '../../repos/PonavljajucaRepo';
import { PonavljajucaValidator } from '../../utils/validators';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { VoziloRepo } from '../../repos/VoziloRepo';
import { ParkiralisteRepo } from '../../repos/ParkiralisteRepo';
import { PonavljajucaMapper } from '../../mappers/PonavljajucaMapper';
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';
import { RacunRepo } from '../../repos/RacunRepo';
import { ValidatorFunctions } from '../../utils/validators/ValidatorFunctions';

export class CreatePonavljajucaController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const ponavljajucaDTO = req.body.data as PonavljajucaDTO;

    if (!(await RacunRepo.isKlijent(req.session.user.idRacun))) {
      return this.forbidden(res, null);
    }

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
        'Ponavljajuća rezervacija mora trajati najmanje sat vremena.',
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
        !(await RezervacijaRepo.isAvailable(
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

    // Vraća true ako je placanje uspjesno
    if (!(await KlijentRepo.chargeKlijent())) {
      // 402 status je payment required
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402
      return CreatePonavljajucaController.jsonResponse(res, 402, [
        'Nije moguće provesti plaćanje: nedovoljno sredstava na kartici ',
      ]);
    }

    const ponavljajuca = await PonavljajucaRepo.createPonavljajuca(
      ponavljajucaDTO
    );

    return this.ok(res, {
      data: {
        reservation: await PonavljajucaMapper.toDTO(ponavljajuca),
      },
    });
  };
}
