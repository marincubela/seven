import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { RacunRepo } from '../../repos/RacunRepo';

export class DeleteUserController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const idRacun = Number(req.params.idRacun);

    if (isNaN(idRacun)) {
      return this.fail(res, 'Id nije broj');
    }

    if (idRacun < 1) {
      return this.fail(res, 'Id mora biti pozitivan');
    }

    if (!req.session.user.admin && req.session.user.idRacun != idRacun) {
      return this.forbidden(res, null);
    }

    //brisanje racuna
    const deletedRows = await RacunRepo.deleteById(idRacun);

    //odjava
    if (!req.session.user.admin) {
      req.session.user = null;
    } else {
      if (!deletedRows) {
        return this.notFound(res, ['Traženi korisnik ne postoji']);
      }
    }

    return this.ok(res, {});
  };
}
