import { BaseController } from '../BaseController';
import { IResponse } from '../../interfaces/network';
import { IRequest } from '../../interfaces/network';
import { VoziloRepo } from '../../repos/VoziloRepo';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { RacunRepo } from '../../repos/RacunRepo';

export class DeleteVoziloController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    //povuci id Vozila koje zelis obrisati
    const idVozilo = Number(req.params.idVozilo);

    if (isNaN(idVozilo)) {
      return this.clientError(res, ['Id vozila nije broj']);
    }
    if (idVozilo < 1) {
      return this.clientError(res, ['Id vozila mora biti pozitivan broj']);
    }
    const idKlijent = await VoziloRepo.getIdKlijentFromIdVozilo(idVozilo);

    if (
      req.session.user.idRacun !=
      (await KlijentRepo.getIdRacunByIdKlijent(idKlijent))
    ) {
      return this.forbidden(res, null);
    }
    //obrisi vozilo
    const deletedRows = await VoziloRepo.deleteByIdVozilo(idVozilo);

    if (!deletedRows) {
      return this.notFound(res, ['Traženo vozilo ne postoji']);
    }

    return this.ok(res, {});
  };
}
