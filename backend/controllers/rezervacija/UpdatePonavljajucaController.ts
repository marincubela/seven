import { PonavljajucaMapper } from '../../mappers/PonavljajucaMapper';
import { IResponse } from '../../interfaces/network';
import { IRequest } from '../../interfaces/network';
import { BaseController } from '../BaseController';
import { PonavljajucaRepo } from '../../repos/PonavljajucaRepo';
import { PonavljajucaDTO } from '../../dtos/PonavljajucaDTO';
import { PonavljajucaValidator } from '../../utils/validators/PonavljajucaValidator';

export class UpdatePonavljajucaController extends BaseController {
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

    const oldReservationData = await PonavljajucaMapper.toDTO(
      await PonavljajucaRepo.getPonavljajucaByIdPonavljajuca(idRezervacija)
    );

    const ponavljajucaDTO = {
      ...oldReservationData,
      ...req.body.data,
    } as PonavljajucaDTO;
    ponavljajucaDTO.idPonavljajuca = idRezervacija;

    const validationErrors = (
      await Promise.all([PonavljajucaValidator.validate(ponavljajucaDTO)])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    const rezervacija = await PonavljajucaRepo.update(ponavljajucaDTO);

    return this.ok(res, {
      data: {
        repeated: await PonavljajucaMapper.toDTO(rezervacija),
      },
    });
  };
}
