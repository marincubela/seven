import { DeleteUserController } from './DeleteUserController';

export class UserController {
    public static delete = new DeleteUserController().execute;
  }
