import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { TrajnaDTO } from '../../dtos/TrajnaDTO';
import { TrajnaRepo } from '../../repos/TrajnaRepo';
import { TrajnaValidator } from '../../utils/validators';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { VoziloRepo } from '../../repos/VoziloRepo';
import { ParkiralisteRepo } from '../../repos/ParkiralisteRepo';
import { isAfter, isBefore, parseISO } from 'date-fns';
import { TrajnaMapper } from '../../mappers/TrajnaMapper';
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';
import { RacunRepo } from '../../repos/RacunRepo';

export class CreateTrajnaController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const trajnaDto = req.body.data as TrajnaDTO;

    if (!(await RacunRepo.isKlijent(req.session.user.idRacun))) {
      return this.forbidden(res, null);
    }

    trajnaDto.idKlijent = await RacunRepo.getIdKlijent(
      req.session.user.idRacun
    );

    //Provjeri posjeduje li korisnik navedeni auto
    if (
      !(await KlijentRepo.checkCarOwner(
        trajnaDto.idKlijent,
        trajnaDto.idVozilo
      ))
    ) {
      return this.forbidden(res, null);
    }

    //Provjeri postoje li auto i parkiraliste
    if (
      !(
        (await ParkiralisteRepo.getParkiralisteByIdParkiraliste(
          trajnaDto.idParkiraliste
        )) && (await VoziloRepo.getVoziloByIdVozilo(trajnaDto.idVozilo))
      )
    ) {
      return this.clientError(res, ['Neispravan id vozila ili parkirališta!']);
    }

    // Provjeri ispravnost vremena
    if (
      !this.checkTime(
        new Date(trajnaDto.startTime).toISOString(),
        new Date(trajnaDto.endTime).toISOString()
      )
    ) {
      return this.clientError(res, [
        'Početak i kraj rezervacije nisu ispravni',
      ]);
    }

    // Postoji li rezervacija s danim vozilom u to vrijeme
    if (
      !(await RezervacijaRepo.isAvailable(
        trajnaDto.idVozilo,
        trajnaDto.startTime,
        trajnaDto.endTime
      ))
    ) {
      return this.conflict(res, ['Nije moguće rezervirati u dano vrijeme']);
    }

    const validationErrors = (
      await Promise.all([TrajnaValidator.validate(trajnaDto)])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    // Vraća true ako je placanje uspjesno
    if (!(await KlijentRepo.chargeKlijent())) {
      // 402 status je payment required
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402
      return CreateTrajnaController.jsonResponse(res, 402, [
        'Nije moguće provesti plaćanje: nedovoljno sredstava na kartici ',
      ]);
    }

    const trajna = await TrajnaRepo.createTrajna(trajnaDto);

    return this.ok(res, {
      data: {
        reservation: await TrajnaMapper.toDTO(trajna),
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
}
