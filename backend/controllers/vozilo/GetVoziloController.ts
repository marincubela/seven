import { BaseController } from "../BaseController";
import { IResponse } from "../../interfaces/network";
import { IRequest } from "../../interfaces/network";
import { VoziloRepo } from "../../repos/VoziloRepo";
import { VoziloMapper } from '../../mappers/VoziloMapper';

export class GetVoziloController extends BaseController{
    executeImpl = async (
        req: IRequest,
        res: IResponse
    ): Promise<void | IResponse> => {
        const idVozilo = Number(req.params.idVozilo);

        if(isNaN(idVozilo)){
            return this.clientError(res, ['Id vozila nije broj']);
        }
        if(idVozilo < 1){
            return this.clientError(res, ['Id parkiralista mora biti pozitivan broj']);
        }
        const vozilo = await VoziloRepo.getVoziloByIdVozilo(idVozilo);
        if(!vozilo){
            return this.notFound(res, ['Trazeno vozilo ne postoji']);
        }

        const {
            idRacun,
            firstName,
            lastName,
            cardNumber,
            email,
            ...voziloData
          } = await VoziloMapper.toDTO(vozilo);

          return this.ok(res, {
            data: {
              vozilo: voziloData,
            },
          });   
    }
}