import { UpdateTrajnaController } from "./UpdateTrajnaController";
import { CreateTrajnaController } from "./CreateTrajnaController";

export class TrajnaController {
    public static create = new CreateTrajnaController().execute;
   
     public static update = new UpdateTrajnaController().execute;
   }