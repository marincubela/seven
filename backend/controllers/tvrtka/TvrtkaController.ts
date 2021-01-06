import { CreateTvrtkaController } from './CreateTvrtkaController';
import { UpdateTvrtkaController } from './UpdateTvrtkaController';
import { GetTvrtkaController } from './GetTvrtkaController';

export class TvrtkaController {
  public static create = new CreateTvrtkaController().execute;

  public static update = new UpdateTvrtkaController().execute;

  public static get = new GetTvrtkaController().execute;
}
