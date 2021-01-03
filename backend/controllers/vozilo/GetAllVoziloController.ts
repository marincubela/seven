import { VoziloRepo } from '../../repos/VoziloRepo';
import { IRequest, IResponse } from '../../interfaces/network';
import { BaseController } from '../BaseController';

export class GetAllVoziloController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const vehicles = await VoziloRepo.getAll();

    return this.ok(res, {
      data: {
        vehicles,
      },
    });
  };
}