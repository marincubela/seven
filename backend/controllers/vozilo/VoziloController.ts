import { CreateVoziloController } from './CreateVoziloController';
import { DeleteVoziloController } from './DeleteVoziloController';

export class VoziloController {
  public static create = new CreateVoziloController().execute;
  public static delete = new DeleteVoziloController().execute;
}