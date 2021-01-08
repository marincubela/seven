import { TrajnaMapper } from '../../mappers/TrajnaMapper';
import { IResponse } from '../../interfaces/network';
import { IRequest } from '../../interfaces/network';
import { BaseController } from '../BaseController';
import { TrajnaRepo } from '../../repos/TrajnaRepo';
import { TrajnaDTO } from '../../dtos/TrajnaDTO';
import { TrajnaValidator } from '../../utils/validators/TrajnaValidator';
import { isAfter, isBefore, parseISO } from 'date-fns';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';
import { ParkiralisteRepo } from '../../repos/ParkiralisteRepo';
import { VoziloRepo } from '../../repos/VoziloRepo';

export class UpdateTrajnaController extends BaseController {
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
    //dodati jos preduvijeta

    const oldReservationData = await TrajnaMapper.toDTO(
      await TrajnaRepo.getTrajnaByIdRezervacija(idRezervacija)
    );

    const trajnaDTO = { ...oldReservationData, ...req.body.data } as TrajnaDTO;
    trajnaDTO.idTrajna = await TrajnaRepo.getIdTrajna(idRezervacija);

    //Provjeri rezervira li korisnik u svoje ime
    //Provjeri posjeduje li korisnik navedeni auto
    if (
      !(await KlijentRepo.getKlijentByIdKlijent(trajnaDTO.idKlijent)) ||
      (await KlijentRepo.getIdRacunByIdKlijent(trajnaDTO.idKlijent)) !=
        req.session.user.idRacun ||
      !(await KlijentRepo.checkCarOwner(
        trajnaDTO.idKlijent,
        trajnaDTO.idVozilo
      ))
    ) {
      return this.forbidden(res, null);
    }

    //Provjeri postoje li auto i parkiraliste
    if (
      !(
        (await ParkiralisteRepo.getParkiralisteByIdParkiraliste(
          trajnaDTO.idParkiraliste
        )) && (await VoziloRepo.getVoziloByIdVozilo(trajnaDTO.idVozilo))
      )
    ) {
      return this.clientError(res, ['Neispravan id vozila ili parkirališta!']);
    }

    // Provjeri ispravnost vremena
    if (
      !this.checkTime(
        new Date(trajnaDTO.startTime).toISOString(),
        new Date(trajnaDTO.endTime).toISOString()
      )
    ) {
      return this.clientError(res, [
        'Početak i kraj rezervacije nisu ispravni',
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
      return this.conflict(res, ['Nije moguće rezervirati u dano vrijeme']);
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

  private checkTime(startTime: string, endTime: string): Boolean {
    const start = parseISO(startTime);
    const end = parseISO(endTime);

    if (isAfter(start, end) || isBefore(start, new Date())) {
      return false;
    }

    return true;
  }
}
