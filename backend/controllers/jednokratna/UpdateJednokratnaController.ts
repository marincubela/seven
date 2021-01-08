import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { JednokratnaMapper } from '../../mappers/JednokratnaMapper';
import { JednokratnaRepo } from '../../repos/JednokratnaRepo';
import { JednokratnaDTO } from '../../dtos/JednokratnaDTO';
import { JednokratnaValidator } from '../../utils/validators';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { ParkiralisteRepo } from '../../repos/ParkiralisteRepo';
import { VoziloRepo } from '../../repos/VoziloRepo';
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';
import {
  addHours,
  intervalToDuration,
  isAfter,
  isBefore,
  parseISO,
} from 'date-fns';

export class UpdateJednokratnaController extends BaseController {
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

    // Jel prijavljen korisnik cija se rezervacija pokusava promijeniti

    const oldReservationData = await JednokratnaMapper.toDTO(
      await JednokratnaRepo.getJednokratnaByIdRezervacija(idRezervacija)
    );

    //dodati provjere dodatne

    const jednokratnaDTO = {
      ...oldReservationData,
      ...req.body.data,
    } as JednokratnaDTO;

    jednokratnaDTO.idJednokratna = await JednokratnaRepo.getIdJednokratna(
      idRezervacija
    );

    jednokratnaDTO.idRezervacija = idRezervacija;

    //Provjeri rezervira li korisnik u svoje ime
    //Provjeri posjeduje li korisnik navedeni auto
    if (
      !(await KlijentRepo.getKlijentByIdKlijent(jednokratnaDTO.idKlijent)) ||
      (await KlijentRepo.getIdRacunByIdKlijent(jednokratnaDTO.idKlijent)) !=
        req.session.user.idRacun ||
      !(await KlijentRepo.checkCarOwner(
        jednokratnaDTO.idKlijent,
        jednokratnaDTO.idVozilo
      ))
    ) {
      return this.forbidden(res, null);
    }

    //Provjeri postoje li auto i parkiraliste
    if (
      !(
        (await ParkiralisteRepo.getParkiralisteByIdParkiraliste(
          jednokratnaDTO.idParkiraliste
        )) && (await VoziloRepo.getVoziloByIdVozilo(jednokratnaDTO.idVozilo))
      )
    ) {
      return this.clientError(res, ['Neispravan id vozila ili parkirališta!']);
    }

    // Provjeri ispravnost vremena
    if (
      !this.checkTime(
        new Date(jednokratnaDTO.startTime).toISOString(),
        new Date(jednokratnaDTO.endTime).toISOString()
      )
    ) {
      return this.clientError(res, [
        'Početak i kraj rezervacije nisu ispravni',
      ]);
    }

    if (
      !(await RezervacijaRepo.isAvailableForUpdate(
        jednokratnaDTO.idRezervacija,
        jednokratnaDTO.idVozilo,
        jednokratnaDTO.startTime,
        jednokratnaDTO.endTime
      ))
    ) {
      return this.conflict(res, ['Nije moguće rezervirati u dano vrijeme']);
    }

    const validationErrors = (
      await Promise.all([JednokratnaValidator.validate(jednokratnaDTO)])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    const rezervacija = await JednokratnaRepo.update(jednokratnaDTO);

    return this.ok(res, {
      data: {
        onetime: await JednokratnaMapper.toDTO(rezervacija),
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
