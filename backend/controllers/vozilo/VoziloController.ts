import { CreateVoziloController } from './CreateVoziloController';
import { DeleteVoziloController } from './DeleteVoziloController';
import { GetVoziloController } from './GetVoziloController';
import { GetAllVoziloController } from './GetAllVoziloController';
import { GetFromClientVoziloController } from './GetFromClientVoziloController';

export class VoziloController {
  public static create = new CreateVoziloController().execute;

  public static delete = new DeleteVoziloController().execute;

  public static get = new GetVoziloController().execute;

  public static getAll = new GetAllVoziloController().execute;

  public static getFromCompany = new GetFromClientVoziloController().execute;
}
