import { BaseController } from '../BaseController';
import { IResponse } from '../../interfaces/network';
import { IRequest } from '../../interfaces/network';
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';
import { RacunRepo } from '../../repos/RacunRepo';

export class GetFromClientReservation extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const idRacun = Number(req.query.user);

    if (isNaN(idRacun)) {
      return this.clientError(res, ['Id nije broj']);
    }

    if (idRacun < 1) {
      return this.clientError(res, ['Id mora biti pozitivan broj']);
    }

    if (!(await RacunRepo.isKlijent(idRacun))) {
      console.log('padeee');
      return this.forbidden(res, null);
    }

    if (idRacun != req.session.user.idRacun) {
      return this.forbidden(res, null);
    }

    const reservations = await RezervacijaRepo.getReservationsFromClient(
      await RacunRepo.getIdKlijent(idRacun)
    );

    return this.ok(res, {
      data: {
        reservations,
      },
    });
  };
}
