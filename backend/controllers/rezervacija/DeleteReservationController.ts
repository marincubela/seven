import { BaseController } from "../BaseController";
import { IResponse } from "../../interfaces/network";
import { IRequest } from "../../interfaces/network";

export class DeleteReservationController extends BaseController {
    executeImpl = async (
        req: IRequest,
        res: IResponse
    ): Promise<void | IResponse> => {
        const idReservartion = Number(req.params.idReservation);

        if(isNaN(idReservartion)){
            return this.clientError(res, ['Id rezervacije nije broj!']);
        }

        if(idReservartion < 1){
            return  this.clientError(res, ['Id rezervacije ne smije biti negativan broj!']);
        }

      

        return this.ok(res);
    }
    
}