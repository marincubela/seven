import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { KlijentDTO } from '../../dtos/KlijentDTO';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { KlijentValidator, RacunValidator } from '../../utils/validators';
import { RacunMapper } from '../../mappers/RacunMapper';
import { ISessionUserDTO } from '../../dtos/SessionUserDTO';

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

    const klijent = await KlijentRepo.createKlijent(klijentDto);

    const racun = await klijent.getRacun();

    const { password, ...restData } = await RacunMapper.toDTO(racun);

    req.session.user = restData as ISessionUserDTO;

    return this.ok(res, {
      data: {
        user: restData,
      },
    });
  };
}
