import { CreateKlijentController } from './CreateKlijentController';

export class KlijentController {
  public static create = new CreateKlijentController().execute;
}
