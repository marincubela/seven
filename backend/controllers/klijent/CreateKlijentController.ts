import { BaseController } from '../BaseController';
import { IRequest, IResponse } from '../../interfaces/network';
import { Klijent } from '../../models/Klijent';
import { KlijentDTO } from '../../dtos/KlijentDTO';
import { KlijentRepo } from '../../repos/KlijentRepo';
import { KlijentValidator } from '../../utils/validators';
import { RacunMapper } from '../../mappers/RacunMapper';
import { Racun } from '../../models/Racun';

export class CreateKlijentController extends BaseController {
  protected static async executeImpl(
    req: IRequest,
    res: IResponse
  ): Promise<void | IResponse> {
    const klijentDto = req.body.data as KlijentDTO;

    const validationErrors = await KlijentValidator.validate(klijentDto);

    if (validationErrors.length) {
      return this.clientError(res, validationErrors);
    }

    let klijent: Klijent;

    try {
      klijent = await KlijentRepo.createKlijent(klijentDto);
    } catch (error) {
      console.error('Error occued while creating a client.');
      console.error(error);
    }

    let racun: Racun;

    try {
      racun = await klijent.getRacun();

      if (!racun) {
        throw new Error('No racun is found');
      }
    } catch (error) {
      console.error("Error occued while getting a client's account.");
      console.error(error);
    }

    const { password, ...restData } = await RacunMapper.toDTO(racun);

    req.session.user = restData;

    return this.ok(res, {
      data: {
        user: restData,
      },
    });
  }
}
