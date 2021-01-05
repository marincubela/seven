import { DeleteReservationController } from './DeleteReservationController';
import { GetFromClientReservation } from './GetFromClientReservation';
import { GetReservationController } from './GetReservationController';
import { CreateJednokratnaController } from './CreateJednokratnaController';

export class RezervacijaController {
  public static delete = new DeleteReservationController().execute;

  public static get = new GetReservationController().execute;

  public static getFromClient = new GetFromClientReservation().execute;

  public static createJednokratnaController= new CreateJednokratnaController().execute;
}
