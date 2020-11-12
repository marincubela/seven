import { IRequest, IResponse } from '../../interfaces/network';
import { Klijent } from '../../models/Klijent';
import { BaseController } from '../BaseController';

export class CreateKlijentController extends BaseController {
  protected async executeImpl(
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> {
    // const { VinylRepo } = this;
    //   const vinylId: string = this.req.params.vinylId;
    //   const vinyl: Vinyl = await VinylRepo.getVinylById(vinylId);
    //   const dto: VinylDTO = VinylMap.toDTO(vinyl);
    //   return this.ok<VinylDTO>(this.res, dto)

    const klijentDto: KlijentDTO = req.body.data;

    const klijent: Klijent = await KlijentRepo.createKlijent();
    return null;
  }
}
