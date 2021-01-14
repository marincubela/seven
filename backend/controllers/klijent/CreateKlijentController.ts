import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { KlijentDTO } from '../../dtos/KlijentDTO';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { KlijentValidator, RacunValidator } from '../../utils/validators';
import { RacunMapper } from '../../mappers/RacunMapper';
import { ISessionUserDTO } from '../../dtos/SessionUserDTO';
import { RacunRepo } from '../../repos/RacunRepo';
import { KlijentMapper } from '../../mappers/KlijentMapper';

export class CreateKlijentController extends BaseController {
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

    const klijentExits =
      (await RacunRepo.getRacunByEmail(klijentDto.email)) ||
      (await RacunRepo.getRacunByOib(klijentDto.OIB)) ||
      (await KlijentRepo.getKlijentByCardNumber(klijentDto.cardNumber));

    if (klijentExits) {
      return this.clientError(res, ['Račun se već koristi']);
    }

    const klijent = await KlijentRepo.createKlijent(klijentDto);

    const racun = await klijent.getRacun();

    const { idRacun, admin, email, OIB } = await RacunMapper.toDTO(racun);

    const user = {
      idRacun,
      admin,
      email,
      OIB,
      klijent: null,
      tvrtka: null,
    } as ISessionUserDTO;

    const { firstName, lastName, cardNumber } = await KlijentMapper.toDTO(
      klijent
    );

    user.klijent = { firstName, lastName, cardNumber };

    req.session.user = user;

    return this.ok(res, { data: { user: req.session.user } });
  };
}
