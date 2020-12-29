import { BaseController } from "../BaseController";
import { IResponse } from "../../interfaces/network";
import { IRequest } from "../../interfaces/network";
import { VoziloRepo } from "../../repos/VoziloRepo";

export class DeleteVoziloController extends BaseController{
    executeImpl = async (
        req: IRequest,
        res: IResponse
    ): Promise<void | IResponse> => {
        
        //povuci id Vozila koje zelis obrisati
        const idVozilo = Number(req.params.idVozilo);
        
        if(isNaN(idVozilo)){
            return this.fail(res, 'Id vozila nije broj');
        }
        if(idVozilo < 1){
            return this.fail(res, 'Id vozila mora biti pozitivan broj');
        }
        //obrisi vozilo
        await VoziloRepo.deleteByIdVozilo(idVozilo);

        return this.ok(res);
    } 

}