import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { TvrtkaDTO } from '../../dtos/TvrtkaDTO';
import { TvrtkaRepo } from '../../repos/TvrtkaRepo';
import { TvrtkaValidator, RacunValidator } from '../../utils/validators';
import { RacunMapper } from '../../mappers/RacunMapper';
import { ISessionUserDTO } from '../../dtos/SessionUserDTO';
import { TvrtkaMapper } from '../../mappers/TvrtkaMapper';

export class UpdateTvrtkaController extends BaseController {
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

    if (idRacun !== req.session.user.idRacun && !req.session.user.admin) {
      return this.forbidden(res, null);
    }

    const tvrtkaDto = req.body.data as TvrtkaDTO;

    const validationErrors = (
      await Promise.all([
        RacunValidator.validate(tvrtkaDto),
        TvrtkaValidator.validate(tvrtkaDto),
      ])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    if (!(await TvrtkaRepo.checkUniqueForUpdate(tvrtkaDto, idRacun))) {
      return this.clientError(res, ['Račun se već koristi']);
    }

    tvrtkaDto.idRacun = idRacun;
    const tvrtka = await TvrtkaRepo.update(tvrtkaDto);

    if (idRacun === req.session.user.idRacun) {
      const racun = await tvrtka.getRacun();

      const { admin, email, OIB } = await RacunMapper.toDTO(racun);

      const { name, address } = await TvrtkaMapper.toDTO(tvrtka);
      const user = {
        idRacun,
        admin,
        email,
        OIB,
        klijent: null,
        tvrtka: { name, address },
      } as ISessionUserDTO;

      req.session.user = user;
    }

    return this.ok(res, { data: { user: req.session.user } });
  };
}
