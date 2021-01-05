import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { RezervacijaMapper } from '../../mappers/RezervacijaMapper';
import { RezervacijaRepo } from '../../repos/RezervacijaRepo';
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
      
      const oldReservationData = await RezervacijaMapper.toDTO(
        await RezervacijaRepo.getRezervacijaByIdRezervacija(idRezervacija)
      );
  };
}
