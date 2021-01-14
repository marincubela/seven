import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { TvrtkaDTO } from '../../dtos/TvrtkaDTO';
import { Tvrtka } from '../../models/Tvrtka';
import { TvrtkaRepo } from '../../repos/TvrtkaRepo';
import { RacunRepo } from '../../repos/RacunRepo';
import { TvrtkaValidator } from '../../utils/validators/TvrtkaValidator';
import { RacunValidator } from '../../utils/validators/RacunValidator';
import { RacunMapper } from '../../mappers/RacunMapper';
import { ISessionUserDTO } from '../../dtos/SessionUserDTO';
import { TvrtkaMapper } from '../../mappers/TvrtkaMapper';

export class CreateTvrtkaController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
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

    const tvrtaExists =
      (await RacunRepo.getRacunByEmail(tvrtkaDto.email)) ||
      (await RacunRepo.getRacunByOib(tvrtkaDto.OIB));

    if (tvrtaExists) {
      return this.clientError(res, ['Račun se već koristi']);
    }

    const tvrtka: Tvrtka = await TvrtkaRepo.createTvrtka(tvrtkaDto);

    const racun = await tvrtka.getRacun();

    const { idRacun, admin, email, OIB } = await RacunMapper.toDTO(racun);

    const user = {
      idRacun,
      admin,
      email,
      OIB,
      klijent: null,
      tvrtka: null,
    } as ISessionUserDTO;

    const { name, address } = await TvrtkaMapper.toDTO(tvrtka);

    user.tvrtka = { name, address };

    req.session.user = user;

    return this.ok(res, { data: { user: req.session.user } });
  };
}
