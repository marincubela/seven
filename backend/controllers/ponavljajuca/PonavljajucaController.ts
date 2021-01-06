import { UpdatePonavljajucaController } from "./UpdatePonavljajucaController";
import { CreatePonavljajucaController } from "./CreatePonavljajucaController";

export class PonavljajucaController {
  public static create = new CreatePonavljajucaController().execute;
  public static update = new UpdatePonavljajucaController().execute;
}