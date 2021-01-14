import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { TrajnaDTO } from '../../dtos/TrajnaDTO';
import { TrajnaRepo } from '../../repos/TrajnaRepo';
import { TrajnaValidator } from '../../utils/validators';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { VoziloRepo } from '../../repos/VoziloRepo';
import { ParkiralisteRepo } from '../../repos/ParkiralisteRepo';
import { TrajnaMapper } from '../../mappers/TrajnaMapper';
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';
import { RacunRepo } from '../../repos/RacunRepo';
import { ValidatorFunctions } from '../../utils/validators/ValidatorFunctions';

export class CreateTrajnaController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const trajnaDTO = req.body.data as TrajnaDTO;

    if (!(await RacunRepo.isKlijent(req.session.user.idRacun))) {
      return this.forbidden(res, null);
    }

    trajnaDTO.idKlijent = await RacunRepo.getIdKlijent(
      req.session.user.idRacun
    );

    //Provjeri posjeduje li korisnik navedeni auto
    if (
      !(await KlijentRepo.checkCarOwner(
        trajnaDTO.idKlijent,
        trajnaDTO.idVozilo
      ))
    ) {
      return this.forbidden(res, ['Traženo vozilo nije u Vašoj listi vozila.']);
    }

    //Provjeri postoje li auto i parkiraliste
    if (
      !(await ParkiralisteRepo.getParkiralisteByIdParkiraliste(
        trajnaDTO.idParkiraliste
      ))
    ) {
      return this.notFound(res, ['Traženo parkiralište nije pronađeno.']);
    }

    if (!(await VoziloRepo.getVoziloByIdVozilo(trajnaDTO.idVozilo))) {
      return this.notFound(res, ['Traženo vozilo nije pronađeno.']);
    }

    // Provjeri ispravnost vremena
    if (
      !ValidatorFunctions.checkIsStartBeforeEnd(
        new Date(trajnaDTO.startTime).toISOString(),
        new Date(trajnaDTO.endTime).toISOString()
      )
    ) {
      return this.clientError(res, [
        'Početak rezervacije mora biti prije kraja rezervacije.',
      ]);
    }

    if (
      !ValidatorFunctions.checkIsStartBeforeNow(
        new Date(trajnaDTO.startTime).toISOString()
      )
    ) {
      return this.clientError(res, [
        'Početak rezervacije mora biti u budućnosti.',
      ]);
    }

    // Postoji li rezervacija s danim vozilom u to vrijeme
    if (
      !(await RezervacijaRepo.isAvailable(
        trajnaDTO.idVozilo,
        trajnaDTO.startTime,
        trajnaDTO.endTime
      ))
    ) {
      return this.conflict(res, [
        'Već postoji rezervacija s odabranim u vozilom u odabranom vremenu.',
      ]);
    }

    const validationErrors = (
      await Promise.all([TrajnaValidator.validate(trajnaDTO)])
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

    const trajna = await TrajnaRepo.createTrajna(trajnaDTO);

    return this.ok(res, {
      data: {
        reservation: await TrajnaMapper.toDTO(trajna),
      },
    });
  };
}
