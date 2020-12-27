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
      return this.clientError(res, ['Racun se već koristi']);
    }

    const tvrtka: Tvrtka = await TvrtkaRepo.createTvrtka(tvrtkaDto);

    const racun = await tvrtka.getRacun();

    const { password, OIB, ...restData } = await RacunMapper.toDTO(racun);

    req.session.user = restData as ISessionUserDTO;

    return this.ok(res, {
      data: {
        user: restData,
      },
    });
  };
}
