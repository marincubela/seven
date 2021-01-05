import { BaseController } from '../BaseController';
import { IResponse } from '../../interfaces/network';
import { IRequest } from '../../interfaces/network';
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';
import { RezervacijaMapper } from '../../mappers/RezervacijaMapper';
import { JednokratnaRepo } from '../../repos/JednokratnaRepo';
import { JednokratnaMapper } from '../../mappers/JednokratnaMapper';
import { PonavljajucaRepo } from '../../repos/PonavljajucaRepo';
import { PonavljajucaMapper } from '../../mappers/PonavljajucaMapper';
import { TrajnaRepo } from '../../repos/TrajnaRepo';
import { TrajnaMapper } from '../../mappers/TrajnaMapper';

export class GetReservationController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const idRezervacija = Number(req.params.idRezervacija);

    if (isNaN(idRezervacija)) {
      return this.clientError(res, ['Id rezervacije nije broj']);
    }

    if (idRezervacija < 1) {
      return this.clientError(res, ['Id rezervacije mora biti pozitivan']);
    }
    //nisam sigurna koje jos provjere trebam raditi, dodat cu naknadno!

    const rezervacija = await RezervacijaRepo.getRezervacijaByIdRezervacija(
      idRezervacija
    );
    //ako je jednokratna
    if (await RezervacijaRepo.isJednokratna(idRezervacija)) {
      const jednokratna = await JednokratnaRepo.getJednokratnaByIdRezervacija(
        idRezervacija
      );
      const rezervacija = await JednokratnaMapper.toDTO(jednokratna);

      return this.ok(res, {
        data: {
          rezervacija,
        },
      });
    }
    //ako je ponavljajuca
    if (await RezervacijaRepo.isPonavljajuca(idRezervacija)) {
      const ponavljajuca = await PonavljajucaRepo.getPonavljajucaByIdRezervacija(
        idRezervacija
      );
      const rezervacija = await PonavljajucaMapper.toDTO(ponavljajuca);

      return this.ok(res, {
        data: {
          rezervacija,
        },
      });
    }

    if (await RezervacijaRepo.isTrajna(idRezervacija)) {
      const trajna = await TrajnaRepo.getTrajnaByIdRezervacija(idRezervacija);
      const rezervacija = await TrajnaMapper.toDTO(trajna);

      return this.ok(res, {
        data: {
          rezervacija,
        },
      });
    }
    throw new Error(
      'Rezervacija s id=' +
        idRezervacija +
        ' nije ni jednokratna ni ponavljajuca ni trajna, pogreska u bazi!'
    );
  };
}
