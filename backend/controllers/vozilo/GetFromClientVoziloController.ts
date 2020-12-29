import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { RacunRepo } from '../../repos/RacunRepo';
import { VoziloRepo } from '../../repos/VoziloRepo';

export class GetFromClientVoziloController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const idRacun = Number(req.params.idRacun);

    if (isNaN(idRacun)) {
      return this.clientError(res, ['Id nije broj']);
    }

    if (idRacun < 1) {
      return this.clientError(res, ['Id mora biti pozitivan broj']);
    }

    if (idRacun != req.session.user.idRacun && !req.session.user.admin) {
      return this.forbidden(res, null);
    }

    if (!(await RacunRepo.isTvrtka(idRacun))) {
      return this.forbidden(res, null);
    }

    const vehicles = await VoziloRepo.getVoziloFromClient(
      await RacunRepo.getIdKlijent(idRacun)
    );

    return this.ok(res, {
      data: {
        vehicles,
      },
    });
  };
}