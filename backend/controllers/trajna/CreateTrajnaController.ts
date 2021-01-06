import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { TrajnaDTO } from '../../dtos/TrajnaDTO';
import { TrajnaRepo } from '../../repos/TrajnaRepo';
import { TrajnaValidator } from '../../utils/validators';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { VoziloRepo } from '../../repos/VoziloRepo';
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';
import { ParkiralisteRepo } from '../../repos/ParkiralisteRepo';

export class CreateTrajnaController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const trajnaDto = req.body.data as TrajnaDTO;

    //Provjeri rezervira li korisnik u svoje ime
    if(!await KlijentRepo.idValidationCheck(trajnaDto.idKlijent) || await KlijentRepo.getIdRacunByIdKlijent(trajnaDto.idKlijent)!=req.session.user.idRacun){
      return this.forbidden(res, null);
    }

    //Provjeri postoje li auto i parkiraliste
    if(!(await ParkiralisteRepo.idValidationCheck(trajnaDto.idParkiraliste)&&await VoziloRepo.idValidationCheck(trajnaDto.idVozilo))){
      return this.clientError(res, [
        'Neispravan id vozila ili parkiralista!',
      ]);
    }

    //Provjeri posjeduje li korisnik navedeni auto
   if(!await KlijentRepo.checkCarOwner(trajnaDto.idKlijent, trajnaDto.idVozilo)){
        return this.forbidden(res, null);
    }

    const validationErrors = (
      await Promise.all([TrajnaValidator.validate(trajnaDto)])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    /*if(!await TrajnaRepo.checkTime(trajnaDto.startTime, trajnaDto.endTime)){
      return this.clientError(res,['Neispravno vrijeme!',]);
    }*/

    const trajnaExits = await TrajnaRepo.checkAvailability(
      trajnaDto
    );

    if (!trajnaExits) {
      return this.clientError(res, [
        'Rezervacija na to vozilo u to vrijeme već postoji!',
      ]);
    }

    const trajna = await TrajnaRepo.createTrajna(trajnaDto);

    return this.ok(res, { data: { reservation: trajnaDto } });
  };
}