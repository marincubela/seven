import { IRequest, IResponse } from '../../interfaces/network';
import { BaseController } from '../BaseController';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { KlijentMapper } from '../../mappers/KlijentMapper';

export class GetUserController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const idRacun = Number(req.params.idRacun);

    // Izvaditi dohvat racuna iz mappera i to elegantno rijesiti
    const klijent = await KlijentRepo.getKlijentByIdRacun(idRacun);
    const racun = await klijent.getRacun();

    if (idRacun != req.session.user.idRacun && !racun.admin) {
      return this.forbidden(res, null);
    }

    const { password, idKlijent, ...user } = await KlijentMapper.toDTO(klijent);

    return this.ok(res, {
      data: {
        user,
      },
    });
  };
}
