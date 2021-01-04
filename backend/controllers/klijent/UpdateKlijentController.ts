import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { KlijentDTO } from '../../dtos/KlijentDTO';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { KlijentValidator, RacunValidator } from '../../utils/validators';
import { RacunMapper } from '../../mappers/RacunMapper';
import { ISessionUserDTO } from '../../dtos/SessionUserDTO';
import { RacunRepo } from '../../repos/RacunRepo';
import { KlijentMapper } from '../../mappers/KlijentMapper';

export class UpdateKlijentController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const klijentDto = req.body.data as KlijentDTO;

    const validationErrors = (
      await Promise.all([
        RacunValidator.validate(klijentDto),
        KlijentValidator.validate(klijentDto),
      ])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    const idRacun = req.session.user.idRacun;

    if (!(await KlijentRepo.checkUniqueForUpdate(klijentDto, idRacun))) {
      return this.clientError(res, ['Račun se već koristi']);
    }

    klijentDto.idRacun = idRacun;
    const klijent = await KlijentRepo.update(klijentDto);
    const racun = await klijent.getRacun();

    const { admin, email, OIB } = await RacunMapper.toDTO(racun);

    const { firstName, lastName, cardNumber } = await KlijentMapper.toDTO(
      klijent
    );
    const user = {
      idRacun,
      admin,
      email,
      OIB,
      klijent: { firstName, lastName, cardNumber },
      tvrtka: null,
    } as ISessionUserDTO;

    req.session.user = user;

    return this.ok(res, { data: { user: req.session.user } });
  };
}
