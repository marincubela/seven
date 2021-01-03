import { BaseController } from '../BaseController';
import { IResponse, IRequest } from '../../interfaces/network';
import { ParkiralisteDTO } from '../../dtos/ParkiralisteDTO';
import { ParkiralisteValidator } from '../../utils/validators/ParkiralisteValidator';
import { TvrtkaRepo } from '../../repos/TvrtkaRepo';
import { ParkiralisteRepo } from '../../repos/ParkiralisteRepo';
import { ParkiralisteMapper } from '../../mappers/ParkiralisteMapper';
import { RacunRepo } from '../../repos/RacunRepo';

export class CreateParkiralisteController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const parkiralisteDto = req.body.data as ParkiralisteDTO;

    const validationErrors = (
      await Promise.all([ParkiralisteValidator.validate(parkiralisteDto)])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    if (!(await RacunRepo.isTvrtka(req.session.user.idRacun))) {
      return this.forbidden(res, null);
    }

    parkiralisteDto.idTvrtka = (
      await TvrtkaRepo.getTvrtkaByIdRacun(req.session.user.idRacun)
    ).idTvrtka;

    const parkiraliste = await ParkiralisteRepo.createParkiraliste(
      parkiralisteDto
    );

    const {
      idRacun,
      email,
      password,
      OIB,
      idTvrtka,
      address,
      name,
      ...parkiralisteData
    } = await ParkiralisteMapper.toDTO(parkiraliste);

    return this.ok(res, {
      data: {
        parking: parkiralisteData,
      },
    });
  };
}
