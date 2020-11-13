import { IRequest, IResponse } from '../../interfaces/network';
import { BaseController } from '../BaseController';

export class GetSessionController extends BaseController {
  protected async executeImpl(
    req: IRequest,
    res: IResponse
  ): Promise<IResponse> {
    if (req.session.user) {
      return res.json({
        data: {
          user: req.session.user,
        },
      });
    }

    return this.unauthorized(res, ['Korisnik nije prijavljen.']);
  }
}
