import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { KlijentDTO } from '../../dtos/KlijentDTO';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { KlijentValidator, RacunValidator } from '../../utils/validators';
import { RacunMapper } from '../../mappers/RacunMapper';
import { ISessionUserDTO } from '../../dtos/SessionUserDTO';
import { KlijentMapper } from '../../mappers/KlijentMapper';

export class UpdateKlijentController extends BaseController {
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

    const oldClientData = await KlijentMapper.toDTO(
      await KlijentRepo.getKlijentByIdRacun(idRacun)
    );

    const klijentDto = { ...oldClientData, ...req.body.data } as KlijentDTO;

    const validationErrors = (
      await Promise.all([
        RacunValidator.validate(klijentDto),
        KlijentValidator.validate(klijentDto),
      ])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    if (!(await KlijentRepo.checkUniqueForUpdate(klijentDto, idRacun))) {
      return this.clientError(res, ['Račun se već koristi']);
    }

    klijentDto.idRacun = idRacun;
    const klijent = await KlijentRepo.update(klijentDto);

    if (idRacun === req.session.user.idRacun) {
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
    }

    return this.ok(res, {
      data: {
        user: klijentDto,
      },
    });
  };
}
