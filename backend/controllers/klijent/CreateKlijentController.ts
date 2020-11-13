import { KlijentDTO } from '../../dtos/KlijentDTO';
import { IRequest, IResponse } from '../../interfaces/network';
import { Klijent } from '../../models/Klijent';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { KlijentValidator } from '../../utils/validators';
import { BaseController } from '../BaseController';

export class CreateKlijentController extends BaseController {
  protected async executeImpl(
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> {
    const klijentDto = req.body.data as KlijentDTO;

    const validationErrors = await KlijentValidator.validate(klijentDto);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    const klijent: Klijent = await KlijentRepo.createKlijent(klijentDto);

    // TODO!!!!!!

    /*
      -ooooooooooooooo+.   `-+syhhhyso:`      `/ooooooooo+/-`         .:osyhhhys+-`
      /mNNNNNMMMMNNNNNh- `/hNMMNmmmNMMNdo.    .hMMMNNNNNMMMNdo.     .sdNMMNmmmNMMmh/`
      .::::/oNMMm+::::-``sNMMms:-..-+dNMMh:   .hMMNo::::/odNMNh-   :dMMNh+-..-:smMMNo`
            :NMMd.     `+NMMd:       .sNMMh`  .hMMm/      .yMMMy` .hMMNs`      `:mMMN+
            :NMMd.     .hMMM+         -mMMN:  .hMMm/       :NMMm- /NMMd-         oMMMy.
            :NMMd.     .dMMN/         .dMMM/  .hMMm/       -mMMm: /MMMy.         +MMMh.
            :NMMd.     .hMMN+         -mMMN:  .hMMm/       :NMMd- /MMMd-         oMMMy.
            :NMMd.     `+NMMd-       .sNMMh`  .hMMm/      -yMMNs` .hMMNo`       :dMMN+`
            :NMMd.      `sNMMdo-...-/hNMMd:   .hMMNo----:odMMNy.   :dMMNy/-...:omMMNo`
            :NMMd.       `+dNMMNmdmmNMNms-    .hMMMNNNNNNMMNd+.     -smNMNmmdmNMMNh+`
            -syyo.         `:oyhhddhys/.      `+yyyyyyyyso+:`         ./syhddhyyo-`
    */

    const racun = await klijent.getRacun();

    return this.ok(res, {
      data: {
        user: racun,
      },
    });
  }
}
