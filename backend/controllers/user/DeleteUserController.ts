import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { RacunRepo } from '../../repos/RacunRepo';

export class DeleteUserController extends BaseController {
  executeImpl = async (
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> => {
    const idRacun = Number(req.params.idRacun);

    

    if(req.session.user.admin){
      console.log("admin je");
    }

    if (!req.session.user.admin && req.session.user.idRacun != idRacun) {
      return this.forbidden(res, null);
    }

    //brisanje racuna
    RacunRepo.deleteById(idRacun);

    //odjava
    if(!req.session.user.admin){
        req.session.user = null;
    }
    
    return this.ok(res);
  };
}
