import { BaseController } from '../BaseController';
import { IResponse } from '../../interfaces/network';
import { IRequest } from '../../interfaces/network';
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';

export class DeleteReservationController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const idRezervacija = Number(req.params.idRezervacija);

    if (isNaN(idRezervacija)) {
      return this.clientError(res, ['Id rezervacije nije broj!']);
    }

    if (idRezervacija < 1) {
      return this.clientError(res, [
        'Id rezervacije ne smije biti negativan broj!',
      ]);
    }

    //obrisi
    await RezervacijaRepo.deleteByIdRezervacija(idRezervacija);

    return this.ok(res, {});
  };
}
