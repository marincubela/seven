import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { KlijentDTO } from '../../dtos/KlijentDTO';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { KlijentValidator, RacunValidator } from '../../utils/validators';
import { RacunMapper } from '../../mappers/RacunMapper';
import { ISessionUserDTO } from '../../dtos/SessionUserDTO';
import { RacunRepo } from '../../repos/RacunRepo';

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

    const klijentExists =
      (await RacunRepo.getRacunByEmail(klijentDto.email)) ||
      (await RacunRepo.getRacunByOib(klijentDto.OIB)) ||
      (await KlijentRepo.getKlijentByCardNumber(klijentDto.cardNumber));

    const idRacun = await KlijentRepo.getIdRacunByIdKlijent(klijentDto.idRacun);

    if (
      idRacun == req.session.user.idRacun &&
      (await KlijentRepo.checkUniqueForUpdate(klijentDto, idRacun))
    ) {
      await KlijentRepo.update(klijentDto);
      const racun = await RacunRepo.getRacunById(idRacun);

      const { password, OIB, ...restData } = await KlijentMapper.toDTO(racun);

      req.session.user = restData as ISessionUserDTO;

      return this.ok(res, {
        data: {
          user: restData,
        },
      });
    } else {
      return this.forbidden(res, null);
    }
  };
}
