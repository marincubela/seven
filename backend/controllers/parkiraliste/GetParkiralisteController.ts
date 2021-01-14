import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { ParkiralisteRepo } from '../../repos/ParkiralisteRepo';
import { ParkiralisteMapper } from '../../mappers/ParkiralisteMapper';

export class GetParkiralisteController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const idParkiraliste = Number(req.params.idParkiraliste);

    if (isNaN(idParkiraliste)) {
      return this.clientError(res, ['Id parkirališta nije broj']);
    }

    if (idParkiraliste < 1) {
      return this.clientError(res, ['Id parkirališta mora biti pozitivan']);
    }

    const parkiraliste = await ParkiralisteRepo.getParkiralisteByIdParkiraliste(
      idParkiraliste
    );

    if (!parkiraliste) {
      return this.notFound(res, ['Traženo parkiralište ne postoji']);
    }

    const parkiralisteDTO = await ParkiralisteMapper.toDTO(parkiraliste);

    return this.ok(res, {
      data: {
        parking: parkiralisteDTO,
      },
    });
  };
}
