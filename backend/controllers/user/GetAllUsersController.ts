import { IRequest, IResponse } from '../../interfaces/network';
import { BaseController } from '../BaseController';
import { RacunRepo } from '../../repos/RacunRepo';

export class GetAllUsersController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    if (!req.session.user.admin) {
      return this.forbidden(res, null);
    }

    const users = await RacunRepo.getAll();

    return this.ok(res, { data: { users } });
  };
}
