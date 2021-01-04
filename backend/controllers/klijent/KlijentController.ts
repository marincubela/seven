import { CreateKlijentController } from './CreateKlijentController';
import { UpdateKlijentController } from './UpdateKlijentController';

export class KlijentController {
  public static create = new CreateKlijentController().execute;
  public static update=new UpdateKlijentController().execute;
}
