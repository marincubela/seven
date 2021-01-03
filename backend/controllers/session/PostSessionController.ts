import { BaseController } from '../BaseController';
import { IRequest } from '../../interfaces/network';
import { IResponse } from '../../interfaces/network';
import { RacunDTO } from '../../dtos/RacunDTO';
import { RacunRepo } from '../../repos/RacunRepo';
import { arePasswordEqual } from '../../utils/password';
import { ISessionUserDTO } from '../../dtos/SessionUserDTO';
import { SessionValidator } from '../../utils/validators/SessionValidator';
import { RacunMapper } from '../../mappers/RacunMapper';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { KlijentMapper } from '../../mappers/KlijentMapper';
import { TvrtkaRepo } from '../../repos/TvrtkaRepo';
import { TvrtkaMapper } from '../../mappers/TvrtkaMapper';

export class PostSessionController extends BaseController {
  executeImpl = async (req: IRequest, res: IResponse): Promise<IResponse> => {
    const racunDTO: RacunDTO = req.body.data;

    const validationErrors = await SessionValidator.validate(racunDTO);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    const racun = await RacunRepo.getRacunByEmail(racunDTO.email);

    if (!racun) {
      return this.clientError(res, ['Neispravni podaci za prijavu']);
    }

    const passwordMatch = await arePasswordEqual(
      racunDTO.password,
      racun?.lozinka
    );

    if (!passwordMatch) {
      return this.clientError(res, ['Neispravni podaci za prijavu']);
    }

    const { idRacun, admin, email, OIB } = await RacunMapper.toDTO(racun);

    const user = {
      idRacun,
      admin,
      email,
      OIB,
      klijent: null,
      tvrtka: null,
    } as ISessionUserDTO;

    if (await RacunRepo.isKlijent(idRacun)) {
      const klijent = await KlijentRepo.getKlijentByIdRacun(idRacun);
      const { firstName, lastName, cardNumber } = await KlijentMapper.toDTO(
        klijent
      );
      user.klijent = { firstName, lastName, cardNumber };
    } else if (await RacunRepo.isTvrtka(idRacun)) {
      const tvrtka = await TvrtkaRepo.getTvrtkaByIdRacun(idRacun);
      const { name, address } = await TvrtkaMapper.toDTO(tvrtka);
      user.tvrtka = { name, address };
    }

    req.session.user = user;

    return this.ok(res, { data: { user: req.session.user } });
  };
}
