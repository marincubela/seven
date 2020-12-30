import { DeleteUserController } from './DeleteUserController';
import { GetUserController } from './GetUserController';
import { GetAllUsersController } from './GetAllUsersController';

export class UserController {
  public static delete = new DeleteUserController().execute;

  public static get = new GetUserController().execute;

  public static getAll = new GetAllUsersController().execute;
}
