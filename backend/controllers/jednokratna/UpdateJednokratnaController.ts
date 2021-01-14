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
import { RacunRepo } from '../../repos/RacunRepo';
import { ValidatorFunctions } from '../../utils/validators/ValidatorFunctions';

export class UpdateJednokratnaController extends BaseController {
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

    if (
      !(await RezervacijaRepo.isAvailableForUpdate(
        jednokratnaDTO.idRezervacija,
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

    const rezervacija = await JednokratnaRepo.update(jednokratnaDTO);

    return this.ok(res, {
      data: {
        onetime: await JednokratnaMapper.toDTO(rezervacija),
      },
    });
  };
}
