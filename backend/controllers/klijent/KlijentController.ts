import { CreateKlijentController } from './CreateKlijentController';
import { GetUserController } from './GetUserController';

export class KlijentController {
  public static create = new CreateKlijentController().execute;

  public static get = new GetUserController().execute;
}
