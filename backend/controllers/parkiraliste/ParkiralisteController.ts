import { CreateParkiralisteController } from './CreateParkiralisteController';
import { DeleteParkiralisteController } from './DeleteParkiralisteController';
import { GetParkiralisteController } from './GetParkiralisteController';

export class ParkiralisteController {
  public static create = new CreateParkiralisteController().execute;

  public static delete = new DeleteParkiralisteController().execute;

  public static get = new GetParkiralisteController().execute;
}
