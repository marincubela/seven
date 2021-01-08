import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { JednokratnaDTO } from '../../dtos/JednokratnaDTO';
import { JednokratnaRepo } from '../../repos/JednokratnaRepo';
import { JednokratnaValidator } from '../../utils/validators';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { JednokratnaMapper } from '../../mappers/JednokratnaMapper';
import { VoziloRepo } from '../../repos/VoziloRepo';
import { ParkiralisteRepo } from '../../repos/ParkiralisteRepo';
import { RacunRepo } from '../../repos/RacunRepo';
import {
  addHours,
  intervalToDuration,
  isAfter,
  isBefore,
  parseISO,
} from 'date-fns';
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';

export class CreateJednokratnaController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const jednokratnaDto = req.body.data as JednokratnaDTO;

    jednokratnaDto.idKlijent = await RacunRepo.getIdKlijent(
      req.session.user.idRacun
    );

    //Provjeri posjeduje li korisnik navedeni auto
    if (
      !(await KlijentRepo.checkCarOwner(
        jednokratnaDto.idKlijent,
        jednokratnaDto.idVozilo
      ))
    ) {
      return this.forbidden(res, null);
    }

    //Provjeri postoje li auto i parkiraliste
    if (
      !(
        (await ParkiralisteRepo.getParkiralisteByIdParkiraliste(
          jednokratnaDto.idParkiraliste
        )) && (await VoziloRepo.getVoziloByIdVozilo(jednokratnaDto.idVozilo))
      )
    ) {
      return this.clientError(res, ['Neispravan id vozila ili parkirališta!']);
    }

    // Provjeri ispravnost vremena
    if (
      !this.checkTime(
        new Date(jednokratnaDto.startTime).toISOString(),
        new Date(jednokratnaDto.endTime).toISOString()
      )
    ) {
      return this.clientError(res, [
        'Početak i kraj rezervacije nisu ispravni',
      ]);
    }

    // Postoji li rezervacija s danim vozilom u to vrijeme
    if (
      !(await RezervacijaRepo.isAvailable(
        jednokratnaDto.idVozilo,
        jednokratnaDto.startTime,
        jednokratnaDto.endTime
      ))
    ) {
      return this.conflict(res, ['Nije moguće rezervirati u dano vrijeme']);
    }

    const validationErrors = (
      await Promise.all([JednokratnaValidator.validate(jednokratnaDto)])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    const jednokratna = await JednokratnaRepo.createJednokratna(jednokratnaDto);

    return this.ok(res, {
      data: {
        reservation: await JednokratnaMapper.toDTO(jednokratna),
      },
    });
  };

  private checkTime(startTime: string, endTime: string): Boolean {
    const start = parseISO(startTime);
    const end = parseISO(endTime);

    const interval = intervalToDuration({
      start: new Date(startTime),
      end: new Date(endTime),
    });

    if (interval.days || interval.months || interval.years) {
      return false;
    }

    if (isAfter(start, end) || isBefore(start, addHours(new Date(), 6))) {
      return false;
    }

    return true;
  }
}
