import { BaseController } from '../BaseController';
import { IResponse } from '../../interfaces/network';
import { IRequest } from '../../interfaces/network';
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';
import { RezervacijaMapper } from '../../mappers/RezervacijaMapper';

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

    const rezervacija = await RezervacijaRepo.getRezervacijaByIdRezervacija(
      idRezervacija
    );

    if (!rezervacija) {
      return this.notFound(res, ['Trazena rezervacija ne postoji!']);
    }

    const {
      firstName,
      lastName,
      cardNumber,
      registration,
      carName,
      color,
      parkingName,
      capacity,
      disabledCapacity,
      parkingType,
      coordinates,
      oneTimePrice,
      repetitivePrice,
      permanentPrice,
      email,
      name,
      address,
      ...rezervacijaData
    } = await RezervacijaMapper.toDTO(rezervacija);

    return this.ok(res, {
      data: {
        rezervacija: rezervacijaData,
      },
    });
  };
}
