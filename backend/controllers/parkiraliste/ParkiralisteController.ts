import {
  CreateParkiralisteController,
  DeleteParkiralisteController,
  GetAllParkiralisteController,
  GetParkiralisteController,
  GetFromCompanyParkiralisteController,
  UpdateParkiralisteController,
} from '.';
/*import { CreateParkiralisteController } from './CreateParkiralisteController';
import { DeleteParkiralisteController } from './DeleteParkiralisteController';
import { GetAllParkiralisteController } from './GetAllParkiralisteController'; 
import { GetParkiralisteController } from './GetParkiralisteController';
import { GetFromCompanyParkiralisteController } from './GetFromCompanyParkiralisteController'; */

export class ParkiralisteController {
  public static create = new CreateParkiralisteController().execute;

  public static delete = new DeleteParkiralisteController().execute;

  public static get = new GetParkiralisteController().execute;

  public static getAll = new GetAllParkiralisteController().execute;

  public static getFromCompany = new GetFromCompanyParkiralisteController()
    .execute;

  public static update = new UpdateParkiralisteController().execute;
}
