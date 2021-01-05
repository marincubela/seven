import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { VoziloRepo } from '../../repos/VoziloRepo';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { VoziloMapper } from '../../mappers/VoziloMapper';
import { VoziloDTO } from '../../dtos/VoziloDTO';
import { VoziloValidator } from '../../utils/validators';

export class UpdateVoziloController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const idVozilo = Number(req.params.idVozilo);

    if (isNaN(idVozilo)) {
      return this.clientError(res, ['Id nije broj']);
    }

    if (idVozilo < 1) {
      return this.clientError(res, ['Id mora biti pozitivan broj']);
    }

    const idKlijent = await VoziloRepo.getIdKlijentFromIdVozilo(idVozilo);

    if (
      req.body.data.idKlijent &&
      Number(req.body.data.idKlijent) !== idKlijent
    ) {
      return this.forbidden(res, null);
    }

    if (
      !idKlijent ||
      req.session.user.idRacun !==
        (await KlijentRepo.getIdRacunByIdKlijent(idKlijent))
    ) {
      return this.forbidden(res, null);
    }

    const oldVehicleData = await VoziloMapper.toDTO(
      await VoziloRepo.getVoziloByIdVozilo(idVozilo)
    );

    const voziloDTO = { ...oldVehicleData, ...req.body.data } as VoziloDTO;
    voziloDTO.idVozilo = idVozilo;

    const validationErrors = (
      await Promise.all([VoziloValidator.validate(voziloDTO)])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    const vozilo = await VoziloRepo.update(voziloDTO);

    return this.ok(res, {
      data: {
        vehicle: await VoziloMapper.toDTO(vozilo),
      },
    });
  };
}
