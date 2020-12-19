import { IRequest, IResponse } from '../../interfaces/network';
import { BaseController } from '../BaseController';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { KlijentMapper } from '../../mappers/KlijentMapper';
import { RacunRepo } from '../../repos/RacunRepo';
import { TvrtkaRepo } from '../../repos/TvrtkaRepo';
import { TvrtkaMapper } from '../../mappers/TvrtkaMapper';
import { UsersDTO } from '../../dtos/ResponseDtos/UsersDTO';

export class GetAllUsersController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    if (!req.session.user.admin) {
      this.forbidden(res, null);
    }

    const users = await RacunRepo.getAll();

    return this.ok(res, { data: { users } });
  };
}
