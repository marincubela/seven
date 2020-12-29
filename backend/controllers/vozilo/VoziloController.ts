import { CreateVoziloController } from './CreateVoziloController';
import { DeleteVoziloController } from './DeleteVoziloController';
import { GetVoziloController } from './GetVoziloController';

export class VoziloController {
  public static create = new CreateVoziloController().execute;
  public static delete = new DeleteVoziloController().execute;
  public static get = new GetVoziloController().execute;
}