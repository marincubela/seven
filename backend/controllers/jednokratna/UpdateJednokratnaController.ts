import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { JednokratnaMapper } from '../../mappers/JednokratnaMapper';
import { JednokratnaRepo } from '../../repos/JednokratnaRepo';
import { JednokratnaDTO } from '../../dtos/JednokratnaDTO';
import { JednokratnaValidator } from '../../utils/validators';

export class UpdateJednokratnaController extends BaseController {
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

    // Jel prijavljen korisnik cija se rezervacija pokusava promijeniti

    const oldReservationData = await JednokratnaMapper.toDTO(
      await JednokratnaRepo.getJednokratnaByIdRezervacija(idRezervacija)
    );

    //dodati provjere dodatne

    const jednokratnaDTO = {
      ...oldReservationData,
      ...req.body.data,
    } as JednokratnaDTO;

    jednokratnaDTO.idJednokratna = await JednokratnaRepo.getIdJednokratna(
      idRezervacija
    );

    // jednokratnaDTO.idJednokratna = idRezervacija;

    const jednokratnaExits = await JednokratnaRepo.checkAvailability(
      jednokratnaDTO
    );

    if (!jednokratnaExits) {
      return this.clientError(res, [
        'Rezervacija na to vozilo u to vrijeme već postoji!',
      ]);
    }

    const validationErrors = (
      await Promise.all([JednokratnaValidator.validate(jednokratnaDTO)])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    jednokratnaDTO.idRezervacija = idRezervacija;
    const rezervacija = await JednokratnaRepo.update(jednokratnaDTO);

    return this.ok(res, {
      data: {
        onetime: await JednokratnaMapper.toDTO(rezervacija),
      },
    });
  };
}
