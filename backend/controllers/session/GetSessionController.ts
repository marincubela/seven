import { IRequest, IResponse } from '../../interfaces/network';
import { BaseController } from '../BaseController';

export class GetSessionController extends BaseController {
  executeImpl = async (req: IRequest, res: IResponse): Promise<IResponse> => {
    if (req.session.user) {
      return res.json({
        data: {
          user: req.session.user,
        },
      });
    }

    return this.unauthorized(res, ['Korisnik nije prijavljen.']);
  };
}
