import { IRequest, IResponse } from '../../interfaces/network';
import { BaseController } from '../BaseController';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { KlijentMapper } from '../../mappers/KlijentMapper';
import { RacunRepo } from '../../repos/RacunRepo';
import { TvrtkaRepo } from '../../repos/TvrtkaRepo';
import { TvrtkaMapper } from '../../mappers/TvrtkaMapper';

export class GetUserController extends BaseController {
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

    if (idRacun != req.session.user.idRacun && !req.session.user.admin) {
      return this.forbidden(res, null);
    }

    if (req.session.user.admin && !(await RacunRepo.exists(idRacun))) {
      return this.notFound(res, ['Traženi korisnik ne postoji']);
    }

    // Izvaditi dohvat racuna iz mappera i to elegantno rijesiti
    const racun = await RacunRepo.getRacunById(idRacun);

    if (await RacunRepo.isKlijent(idRacun)) {
      const klijent = await KlijentRepo.getKlijentByIdRacun(idRacun);
      const user = await KlijentMapper.toDTO(klijent);

      return this.ok(res, {
        data: {
          user,
        },
      });
    }

    if (await RacunRepo.isTvrtka(idRacun)) {
      const tvrtka = await TvrtkaRepo.getTvrtkaByIdRacun(idRacun);
      const user = await TvrtkaMapper.toDTO(tvrtka);

      return this.ok(res, {
        data: {
          user,
        },
      });
    }

    throw new Error(
      'Racun s id=' + idRacun + ' nije ni tvrtka ni klijent, pogreska u bazi!'
    );
  };
}
