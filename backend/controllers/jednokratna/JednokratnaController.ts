import { CreateJednokratnaController } from './CreateJednokratnaController';
import { UpdateJednokratnaController } from './UpdateJednokratnaController';

export class JednokratnaController {
  public static create = new CreateJednokratnaController().execute;

  public static update = new UpdateJednokratnaController().execute;
}
