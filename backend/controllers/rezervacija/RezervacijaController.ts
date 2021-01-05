import { DeleteReservationController } from './DeleteReservationController';
import { GetFromClientReservation } from './GetFromClientReservation';
import { GetReservationController } from './GetReservationController';

export class RezervacijaController {
  public static delete = new DeleteReservationController().execute;

  public static get = new GetReservationController().execute;

  public static getFromClient = new GetFromClientReservation().execute;
}
