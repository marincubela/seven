import { ParkiralisteRepo } from '../../repos/ParkiralisteRepo';
import { IRequest, IResponse } from '../../interfaces/network';
import { BaseController } from '../BaseController';

export class GetAllParkiralisteController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const parkings = await ParkiralisteRepo.getAll();

    return this.ok(res, {
      data: {
        parkings,
      },
    });
  };
}
