import { CreateParkiralisteController } from './CreateParkiralisteController';

export class ParkiralisteController {
  public static create = new CreateParkiralisteController().execute;
}
