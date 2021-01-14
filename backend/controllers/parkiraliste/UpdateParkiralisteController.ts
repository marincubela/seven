import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { ParkiralisteRepo } from '../../repos/ParkiralisteRepo';
import { TvrtkaRepo } from '../../repos/TvrtkaRepo';
import { ParkiralisteMapper } from '../../mappers/ParkiralisteMapper';
import { ParkiralisteDTO } from '../../dtos/ParkiralisteDTO';
import { ParkiralisteValidator } from '../../utils/validators';

export class UpdateParkiralisteController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const idParkiraliste = Number(req.params.idParkiraliste);

    if (isNaN(idParkiraliste)) {
      return this.clientError(res, ['Id nije broj']);
    }

    if (idParkiraliste < 1) {
      return this.clientError(res, ['Id mora biti pozitivan broj']);
    }

    const idTvrtka = await ParkiralisteRepo.getIdTvrtkaFromIdParkiraliste(
      idParkiraliste
    );

    if (req.body.data.idTvrtka && Number(req.body.data.idTvrtka) !== idTvrtka) {
      return this.forbidden(res, null);
    }

    if (
      !idTvrtka ||
      req.session.user.idRacun !==
        (await TvrtkaRepo.getIdRacunFromIdTvrtka(idTvrtka))
    ) {
      return this.forbidden(res, null);
    }

    const oldParkingData = await ParkiralisteMapper.toDTO(
      await ParkiralisteRepo.getParkiralisteByIdParkiraliste(idParkiraliste)
    );

    const parkiralisteDTO = {
      ...oldParkingData,
      ...req.body.data,
    } as ParkiralisteDTO;
    parkiralisteDTO.idParkiraliste = idParkiraliste;

    const validationErrors = (
      await Promise.all([ParkiralisteValidator.validate(parkiralisteDTO)])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    const parkiraliste = await ParkiralisteRepo.update(parkiralisteDTO);

    return this.ok(res, {
      data: {
        parking: await ParkiralisteMapper.toDTO(parkiraliste),
      },
    });
  };
}
