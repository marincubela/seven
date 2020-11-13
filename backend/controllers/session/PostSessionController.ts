import { BaseController } from '../BaseController';
import { IRequest } from '../../interfaces/network';
import { IResponse } from '../../interfaces/network';
import { RacunDTO } from '../../dtos/RacunDTO';
import { RacunRepo } from '../../repos/RacunRepo';
import { arePasswordEqual } from '../../utils/password';
import { ISessionUserDTO } from '../../dtos/SessionUserDTO';
import { SessionValidator } from '../../utils/validators/SessionValidator';
import { RacunMapper } from '../../mappers/RacunMapper';

export class PostSessionController extends BaseController {
  executeImpl = async (req: IRequest, res: IResponse): Promise<IResponse> => {
    console.log('++++++++++++');
    console.log('+ ');
    console.log('+ ');
    console.log('+ ');
    console.log('++++++++++++');
    const racunDTO: RacunDTO = req.body.data;

    const validationErrors = await SessionValidator.validate(racunDTO);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    const racun = await RacunRepo.getRacunByEmail(racunDTO.email);

    const passwordMatch = await arePasswordEqual(
      racunDTO.password,
      racun?.lozinka
    );

    if (!racun || !passwordMatch) {
      return this.clientError(res, ['Neispravni podaci za prijavu']);
    }

    const { password, OIB, ...restData } = await RacunMapper.toDTO(racun);

    req.session.user = restData as ISessionUserDTO;

    return this.ok(res, { data: { user: req.session.user } });
  };
}
