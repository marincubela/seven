import { TrajnaMapper } from '../../mappers/TrajnaMapper';
import { IResponse } from '../../interfaces/network';
import { IRequest } from '../../interfaces/network';
import { BaseController } from '../BaseController';
import { TrajnaRepo } from '../../repos/TrajnaRepo';
import { TrajnaDTO } from '../../dtos/TrajnaDTO';
import { TrajnaValidator } from '../../utils/validators/TrajnaValidator';
import { consoleTestResultHandler } from 'tslint/lib/test';

export class UpdateTrajnaController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const idRezervacija = Number(req.params.idRezervacija);

    if (isNaN(idRezervacija)) {
      return this.clientError(res, ['Id nije broj']);
    }

    if (idRezervacija < 1) {
      return this.clientError(res, ['Id mora biti pozitivan broj']);
    }
    //dodati jos preduvijeta

    const oldReservationData = await TrajnaMapper.toDTO(
      await TrajnaRepo.getTrajnaByIdRezervacija(idRezervacija)
    );

    const trajnaDTO = { ...oldReservationData, ...req.body.data } as TrajnaDTO;
    trajnaDTO.idTrajna = await TrajnaRepo.getIdTrajna(idRezervacija);

    const validationErrors = (
      await Promise.all([TrajnaValidator.validate(trajnaDTO)])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    trajnaDTO.idRezervacija = idRezervacija;
    const rezervacija = await TrajnaRepo.update(trajnaDTO);

    return this.ok(res, {
      data: {
        permanent: await TrajnaMapper.toDTO(rezervacija),
      },
    });
  };
}
