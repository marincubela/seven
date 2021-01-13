import { CreateTvrtkaController } from './CreateTvrtkaController';
import { UpdateTvrtkaController } from './UpdateTvrtkaController';

export class TvrtkaController {
  public static create = new CreateTvrtkaController().execute;

  public static update = new UpdateTvrtkaController().execute;
}
