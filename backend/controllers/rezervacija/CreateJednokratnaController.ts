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

export class CreateJednokratnaController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const jednokratnaDto = req.body.data as JednokratnaDTO;

    //Provjeri rezervira li korisnik u svoje ime
    if(await KlijentRepo.getIdRacunByIdKlijent(jednokratnaDto.idKlijent)!=req.session.user.idRacun){
      return this.forbidden(res, null);
    }

    //Provjeri postoje li auto i parkiraliste
    if(!(ParkiralisteRepo.idValidationCheck(jednokratnaDto.idParkiraliste)&&VoziloRepo.idValidationCheck(jednokratnaDto.idVozilo))){
      return this.clientError(res, [
        'Neispravan id vozila ili parkiralista!',
      ]);
    }

    //Provjeri posjeduje li korisnik navedeni auto
   if(!KlijentRepo.checkCarOwner(jednokratnaDto.idKlijent, jednokratnaDto.idVozilo)){
        return this.forbidden(res, null);
    }

    const validationErrors = (
      await Promise.all([JednokratnaValidator.validate(jednokratnaDto)])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    
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
