import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { RezervacijaMapper } from '../../mappers/RezervacijaMapper';
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';
import { RezervacijaDTO } from '../../dtos/RezervacijaDTO';
import { JednokratnaMapper } from '../../mappers/JednokratnaMapper';
import { JednokratnaRepo } from '../../repos/JednokratnaRepo';
import { JednokratnaDTO } from '../../dtos/JednokratnaDTO';
import { JednokratnaValidator } from '../../utils/validators';
export class UpdateResevationController extends BaseController {
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
      
      const oldReservationData = await JednokratnaMapper.toDTO(
        await JednokratnaRepo.getJednokratnaByIdRezervacija(idRezervacija)
      );

      const reservationDto = {...oldReservationData, ...req.body.data} as JednokratnaDTO;
      const validationErrors = (
        await Promise.all([
          JednokratnaValidator.validate(reservationDto)
        ])
      ).reduce((errs, err) => [...errs, ...err], []);

      if(validationErrors.length){
        return this.clientError(res, validationErrors);
      }

      if(!(await JednokratnaRepo.ch))
      
  };
}
