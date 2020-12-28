import { CreateVoziloController } from './CreateVoziloController';

export class VoziloController {
  public static create = new CreateVoziloController().execute;
}