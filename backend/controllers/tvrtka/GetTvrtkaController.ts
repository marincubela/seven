import { IRequest, IResponse } from '../../interfaces/network';
import { BaseController } from '../BaseController';
import { RacunRepo } from '../../repos/RacunRepo';
import { TvrtkaRepo } from '../../repos/TvrtkaRepo';
import { TvrtkaMapper } from '../../mappers/TvrtkaMapper';

export class GetTvrtkaController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const idRacun = Number(req.params.idRacun);

    if (isNaN(idRacun)) {
      return this.clientError(res, ['Id nije broj']);
    }

    if (idRacun < 1) {
      return this.clientError(res, ['Id mora biti pozitivan broj']);
    }

    const racun = await RacunRepo.getRacunById(idRacun);

    if (await RacunRepo.isTvrtka(idRacun)) {
      const tvrtka = await TvrtkaRepo.getTvrtkaByIdRacun(idRacun);
      const company = await TvrtkaMapper.toPublicDTO(tvrtka);

      return this.ok(res, {
        data: {
          company,
        },
      });
    } else {
      return this.notFound(res, ['Tražena tvrtka ne postoji']);
    }
  };
}
