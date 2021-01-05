import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { JednokratnaDTO } from '../../dtos/JednokratnaDTO';
import { JednokratnaRepo } from '../../repos/JednokratnaRepo';
import { JednokratnaValidator } from '../../utils/validators';
import { RezervacijaMapper } from '../../mappers/RezervacijaMapper';
import { ISessionUserDTO } from '../../dtos/SessionUserDTO';
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';
import { JednokratnaMapper } from '../../mappers/JednokratnaMapper';

export class CreateJednokratnaController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const jednokratnaDto = req.body.data as JednokratnaDTO;

    console.log(jednokratnaDto);

    const validationErrors = (
      await Promise.all([JednokratnaValidator.validate(jednokratnaDto)])
    ).reduce((errs, err) => [...errs, ...err], []);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    const jednokratnaExits = await JednokratnaRepo.checkAvailability(
      jednokratnaDto
    );

    if (!jednokratnaExits) {
      return this.clientError(res, [
        'Rezervacija na to vozilo u to vrijeme već postoji!',
      ]);
    }

    const jednokratna = await JednokratnaRepo.createJednokratna(jednokratnaDto);

    return this.ok(res, { data: { reservation: jednokratnaDto } });
  };
}
