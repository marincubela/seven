import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { ParkiralisteRepo } from '../../repos/ParkiralisteRepo';

export class DeleteParkiralisteController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const idParkiraliste = Number(req.params.idParkiraliste);

    if (isNaN(idParkiraliste)) {
      return this.fail(res, 'Id parkirališta nije broj');
    }

    if (idParkiraliste < 1) {
      return this.fail(res, 'Id parkirališta mora biti pozitivan');
    }

    await ParkiralisteRepo.deleteByIdParkiraliste(idParkiraliste);

    return this.ok(res);
  };
}
