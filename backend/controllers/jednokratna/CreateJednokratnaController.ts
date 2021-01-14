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
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';
import { ValidatorFunctions } from '../../utils/validators/ValidatorFunctions';

export class CreateJednokratnaController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const jednokratnaDTO = req.body.data as JednokratnaDTO;

    if (!(await RacunRepo.isKlijent(req.session.user.idRacun))) {
      return this.forbidden(res, null);
    }

    jednokratnaDTO.idKlijent = await RacunRepo.getIdKlijent(
      req.session.user.idRacun
    );

    //Provjeri posjeduje li korisnik navedeni auto
    if (
      !(await KlijentRepo.checkCarOwner(
        jednokratnaDTO.idKlijent,
        jednokratnaDTO.idVozilo
      ))
    ) {
      return this.forbidden(res, ['Traženo vozilo nije u Vašoj listi vozila.']);
    }

    //Provjeri postoje li auto i parkiraliste
    if (
      !(await ParkiralisteRepo.getParkiralisteByIdParkiraliste(
        jednokratnaDTO.idParkiraliste
      ))
    ) {
      return this.notFound(res, ['Traženo parkiralište nije pronađeno.']);
    }

    if (!(await VoziloRepo.getVoziloByIdVozilo(jednokratnaDTO.idVozilo))) {
      return this.notFound(res, ['Traženo vozilo nije pronađeno.']);
    }

    // Provjeri ispravnost vremena
    if (
      ValidatorFunctions.checkIsOneDayLong(
        new Date(jednokratnaDTO.startTime).toISOString(),
        new Date(jednokratnaDTO.endTime).toISOString()
      )
    ) {
      return this.clientError(res, [
        'Jednokratna rezervacija ne smije trajati dulje od jednog dana.',
      ]);
    }

    if (
      !ValidatorFunctions.checkIsStartBeforeEnd(
        new Date(jednokratnaDTO.startTime).toISOString(),
        new Date(jednokratnaDTO.endTime).toISOString()
      )
    ) {
      return this.clientError(res, [
        'Početak rezervacije mora biti prije kraja rezervacije.',
      ]);
    }

    if (
      !ValidatorFunctions.checkIsStartBeforeNow6Hours(
        new Date(jednokratnaDTO.startTime).toISOString()
      )
    ) {
      return this.clientError(res, [
        'Jednokratna rezervacija mora biti obavljena najmanje 6 sati unaprijed.',
      ]);
    }

    // Postoji li rezervacija s danim vozilom u to vrijeme
    if (
      !(await RezervacijaRepo.isAvailable(
        jednokratnaDTO.idVozilo,
        jednokratnaDTO.startTime,
        jednokratnaDTO.endTime
      ))
    ) {
      return this.conflict(res, [
        'Već postoji rezervacija s odabranim u vozilom u odabranom vremenu.',
      ]);
    }

    const validationErrors = (
      await Promise.all([JednokratnaValidator.validate(jednokratnaDTO)])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    // Vraća true ako je placanje uspjesno
    if (!(await KlijentRepo.chargeKlijent())) {
      // 402 status je payment required
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/402
      return CreateJednokratnaController.jsonResponse(res, 402, [
        'Nije moguće provesti plaćanje: nedovoljno sredstava na kartici ',
      ]);
    }

    const jednokratna = await JednokratnaRepo.createJednokratna(jednokratnaDTO);

    return this.ok(res, {
      data: {
        reservation: await JednokratnaMapper.toDTO(jednokratna),
      },
    });
  };
}
