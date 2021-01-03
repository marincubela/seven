import { BaseController } from '../BaseController';
import { IResponse } from '../../interfaces/network';
import { IRequest } from '../../interfaces/network';
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';

export class GetFromClientReservation extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const idKlijent = Number(req.params.idKlijent);

    if (isNaN(idKlijent)) {
      return this.clientError(res, ['Id nije broj']);
    }

    if (idKlijent < 1) {
      return this.clientError(res, ['Id mora biti pozitivan broj']);
    }

    if (idKlijent != req.session.user.idRacun) {
      return this.forbidden(res, null);
    }

    const reservations = await RezervacijaRepo.getReservationsFromClient(
      idKlijent
    );

    return this.ok(res, {
      data: {
        reservations,
      },
    });
  };
}
