import { TrajnaMapper } from '../../mappers/TrajnaMapper';
import { IResponse } from '../../interfaces/network';
import { IRequest } from '../../interfaces/network';
import { BaseController } from '../BaseController';
import { TrajnaRepo } from '../../repos/TrajnaRepo';
import { TrajnaDTO } from '../../dtos/TrajnaDTO';
import { TrajnaValidator } from '../../utils/validators/TrajnaValidator';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';
import { ParkiralisteRepo } from '../../repos/ParkiralisteRepo';
import { VoziloRepo } from '../../repos/VoziloRepo';
import { RacunRepo } from '../../repos/RacunRepo';
import { ValidatorFunctions } from '../../utils/validators/ValidatorFunctions';

export class UpdateTrajnaController extends BaseController {
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
    //dodati jos preduvijeta

    const oldReservationData = await TrajnaMapper.toDTO(
      await TrajnaRepo.getTrajnaByIdRezervacija(idRezervacija)
    );

    const trajnaDTO = { ...oldReservationData, ...req.body.data } as TrajnaDTO;
    trajnaDTO.idTrajna = await TrajnaRepo.getIdTrajna(idRezervacija);
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
      !(await RezervacijaRepo.isAvailableForUpdate(
        trajnaDTO.idRezervacija,
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

    trajnaDTO.idRezervacija = idRezervacija;
    const rezervacija = await TrajnaRepo.update(trajnaDTO);

    return this.ok(res, {
      data: {
        permanent: await TrajnaMapper.toDTO(rezervacija),
      },
    });
  };
}
