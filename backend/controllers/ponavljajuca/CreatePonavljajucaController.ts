import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { PonavljajucaDTO } from '../../dtos/PonavljajucaDTO';
import { PonavljajucaRepo } from '../../repos/PonavljajucaRepo';
import { PonavljajucaValidator } from '../../utils/validators';
import { RezervacijaMapper } from '../../mappers/RezervacijaMapper';
import { ISessionUserDTO } from '../../dtos/SessionUserDTO';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { PonavljajucaMapper } from '../../mappers/PonavljajucaMapper';
import { VoziloRepo } from '../../repos/VoziloRepo';
import { ParkiralisteRepo } from '../../repos/ParkiralisteRepo';
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';

export class CreatePonavljajucaController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const ponavljajucaDto = req.body.data as PonavljajucaDTO;

    if (1) {
      return this.forbidden(res, ['Jos nije dovrseno!']);
    }

    //Provjeri rezervira li korisnik u svoje ime
    if (
      !(await KlijentRepo.idValidationCheck(ponavljajucaDto.idKlijent)) ||
      (await KlijentRepo.getIdRacunByIdKlijent(ponavljajucaDto.idKlijent)) !=
        req.session.user.idRacun
    ) {
      return this.forbidden(res, null);
    }

    //Provjeri postoje li auto i parkiraliste
    if (
      !(
        (await ParkiralisteRepo.idValidationCheck(
          ponavljajucaDto.idParkiraliste
        )) && (await VoziloRepo.idValidationCheck(ponavljajucaDto.idVozilo))
      )
    ) {
      return this.clientError(res, ['Neispravan id vozila ili parkiralista!']);
    }
    //Provjeri posjeduje li korisnik navedeni auto
    if (
      !(await KlijentRepo.checkCarOwner(
        ponavljajucaDto.idKlijent,
        ponavljajucaDto.idVozilo
      ))
    ) {
      return this.forbidden(res, null);
    }

    const validationErrors = (
      await Promise.all([PonavljajucaValidator.validate(ponavljajucaDto)])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    const ponavljajuca = await PonavljajucaRepo.createPonavljajuca(
      ponavljajucaDto
    );

    return this.ok(res, { data: { reservation: ponavljajucaDto } });
  };
}
