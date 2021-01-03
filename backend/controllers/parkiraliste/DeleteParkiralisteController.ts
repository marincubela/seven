import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { ParkiralisteRepo } from '../../repos/ParkiralisteRepo';
import { TvrtkaRepo } from '../../repos/TvrtkaRepo';

export class DeleteParkiralisteController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const idParkiraliste = Number(req.params.idParkiraliste);

    if (isNaN(idParkiraliste)) {
      return this.clientError(res, ['Id parkirališta nije broj']);
    }

    if (idParkiraliste < 1) {
      return this.clientError(res, ['Id parkirališta mora biti pozitivan']);
    }

    const idTvrtka = await ParkiralisteRepo.getIdTvrtkaFromIdParkiraliste(
      idParkiraliste
    );

    if (
      !idTvrtka ||
      req.session.user.idRacun !=
        (await TvrtkaRepo.getIdRacunFromIdTvrtka(idTvrtka))
    ) {
      return this.forbidden(res, null);
    }

    await ParkiralisteRepo.deleteByIdParkiraliste(idParkiraliste);

    return this.ok(res);
  };
}
