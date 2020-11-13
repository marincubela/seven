import { IResponse } from '../../interfaces/network';
import { IRequest } from '../../interfaces/network';
import { BaseController } from '../../controllers/BaseController';

export class DeleteSessionCOntroller extends BaseController {
  protected async executeImpl(
    req: IRequest,
    res: IResponse
  ): Promise<IResponse> {
    if (req.session.user) {
      req.session.user = null;
      this.ok(res);
    }

    return this.unauthorized(res, ['Korisnik nije prijavljen']);
  }
}
