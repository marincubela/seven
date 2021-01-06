import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { JednokratnaDTO } from '../../dtos/JednokratnaDTO';
import { JednokratnaRepo } from '../../repos/JednokratnaRepo';
import { JednokratnaValidator } from '../../utils/validators';
import { RezervacijaMapper } from '../../mappers/RezervacijaMapper';
import { ISessionUserDTO } from '../../dtos/SessionUserDTO';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { JednokratnaMapper } from '../../mappers/JednokratnaMapper';
import { VoziloRepo } from '../../repos/VoziloRepo';
import { ParkiralisteRepo } from '../../repos/ParkiralisteRepo';
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';

export class CreateJednokratnaController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const jednokratnaDto = req.body.data as JednokratnaDTO;

    console.log(await KlijentRepo.idValidationCheck(jednokratnaDto.idKlijent));

    //Provjeri rezervira li korisnik u svoje ime
    if(!await KlijentRepo.idValidationCheck(jednokratnaDto.idKlijent) || await KlijentRepo.getIdRacunByIdKlijent(jednokratnaDto.idKlijent)!=req.session.user.idRacun){
      return this.forbidden(res, null);
    }

    //Provjeri postoje li auto i parkiraliste
    if(!(await ParkiralisteRepo.idValidationCheck(jednokratnaDto.idParkiraliste)&& await VoziloRepo.idValidationCheck(jednokratnaDto.idVozilo))){
      return this.clientError(res, [
        'Neispravan id vozila ili parkiralista!',
      ]);
    }

    //Provjeri posjeduje li korisnik navedeni auto
   if(!await KlijentRepo.checkCarOwner(jednokratnaDto.idKlijent, jednokratnaDto.idVozilo)){
        return this.forbidden(res, null);
    }

    const validationErrors = (
      await Promise.all([JednokratnaValidator.validate(jednokratnaDto)])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    /*if(!await JednokratnaRepo.checkTime(jednokratnaDto.startTime, jednokratnaDto.endTime)){
      return this.clientError(res,['Neispravno vrijeme!',]);
    }*/
    
    const jednokratnaExits = await JednokratnaRepo.checkAvailability(
      jednokratnaDto
    );

    if (!jednokratnaExits) {
      return this.clientError(res, [
        'Rezervacija na to vozilo u to vrijeme već postoji!',
      ]);
    }

    const jednokratna = await JednokratnaRepo.createJednokratna(jednokratnaDto);

    return this.ok(res, { data: { reservation: jednokratnaDto } });
  };
}
