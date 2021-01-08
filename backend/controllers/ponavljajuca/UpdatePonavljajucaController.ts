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
import { intervalToDuration, isAfter, isBefore, parseISO } from 'date-fns';

export class UpdatePonavljajucaController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const idRezervacija = Number(req.params.idRezervacija);

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

    //Provjeri rezervira li korisnik u svoje ime
    //Provjeri posjeduje li korisnik navedeni auto
    if (
      !(await KlijentRepo.idValidationCheck(ponavljajucaDTO.idKlijent)) ||
      (await KlijentRepo.getIdRacunByIdKlijent(ponavljajucaDTO.idKlijent)) !=
        req.session.user.idRacun ||
      !(await KlijentRepo.checkCarOwner(
        ponavljajucaDTO.idKlijent,
        ponavljajucaDTO.idVozilo
      ))
    ) {
      return this.forbidden(res, null);
    }

    //Provjeri postoje li auto i parkiraliste
    if (
      !(
        (await ParkiralisteRepo.getParkiralisteByIdParkiraliste(
          ponavljajucaDTO.idParkiraliste
        )) && (await VoziloRepo.getVoziloByIdVozilo(ponavljajucaDTO.idVozilo))
      )
    ) {
      return this.clientError(res, ['Neispravan id vozila ili parkiralista!']);
    }

    // Provjeri ispravnost vremena
    if (
      !this.checkTime2(
        PonavljajucaRepo.timeAndDateToDate(
          ponavljajucaDTO.reservationDate,
          ponavljajucaDTO.startTime
        ).toISOString(),
        PonavljajucaRepo.timeAndDateToDate(
          ponavljajucaDTO.reservationDate,
          ponavljajucaDTO.endTime
        ).toISOString()
      ) ||
      !this.checkTime(
        new Date(ponavljajucaDTO.reservationDate).toISOString(),
        new Date(ponavljajucaDTO.reservationEndDate).toISOString()
      )
    ) {
      return this.clientError(res, [
        'Početak i kraj rezervacije nisu ispravni',
      ]);
    }

    // Postoji li rezervacija s danim vozilom u to vrijeme

    // Treba se promijeniti u RezervacijaRepo.isAvailable(), al treba prilagoditi... ima posla
    for (const dates of PonavljajucaRepo.getAllDates(ponavljajucaDTO)) {
      if (
        !(await RezervacijaRepo.isAvailableForUpdate(
          idRezervacija,
          ponavljajucaDTO.idVozilo,
          dates.startTime,
          dates.endTime
        ))
      ) {
        return this.conflict(res, ['Nije moguće rezervirati u dano vrijeme']);
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
