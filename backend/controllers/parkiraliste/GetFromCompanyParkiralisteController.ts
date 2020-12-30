import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { RacunRepo } from '../../repos/RacunRepo';
import { ParkiralisteRepo } from '../../repos/ParkiralisteRepo';

export class GetFromCompanyParkiralisteController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const idRacun = Number(req.query.company);

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

    const parkings = await ParkiralisteRepo.getParkiralisteFromCompany(
      await RacunRepo.getIdTvrtka(idRacun)
    );

    return this.ok(res, {
      data: {
        parkings,
      },
    });
  };
}
