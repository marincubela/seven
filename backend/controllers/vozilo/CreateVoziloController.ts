import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { VoziloDTO } from '../../dtos/VoziloDTO';
import { VoziloValidator } from '../../utils/validators';
import { VoziloMapper } from '../../mappers/VoziloMapper';
import { ISessionUserDTO } from '../../dtos/SessionUserDTO';
import { RacunRepo } from '../../repos/RacunRepo';
import { VoziloRepo } from '../../repos/VoziloRepo';
import { KlijentRepo } from '../../repos/KlijentRepo';

export class CreateVoziloController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const voziloDto = req.body.data as VoziloDTO;

    const validationErrors = (
      await Promise.all([VoziloValidator.validate(voziloDto)])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    voziloDto.idKlijent = (
      await KlijentRepo.getKlijentByIdRacun(req.session.user.idRacun)
    ).idKlijent;


    const vozilo = await (new VoziloRepo).save(voziloDto);
    //u responseu ne vracati broj kartice, email, itd...

    return this.ok(res, {
        data:{
            vehicle: await VoziloMapper.toDTO(vozilo)
        }
    })


    }
}
