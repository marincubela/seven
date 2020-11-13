import { DeleteSessionController } from './DeleteSessionController';
import { GetSessionController } from './GetSessionController';
import { PostSessionController } from './PostSessionController';

export class SessionController {
  public static create = new PostSessionController().execute;

  public static get = new GetSessionController().execute;

  public static delete = new DeleteSessionController().execute;
}
