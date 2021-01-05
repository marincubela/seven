import express from 'express';

import { RezervacijaController } from '../controllers/rezervacija/RezervacijaController';

export const reservationRouter = express.Router();

reservationRouter.get('/:idRezervacija', RezervacijaController.get);

reservationRouter.get('', RezervacijaController.getFromClient);

reservationRouter.delete('/:idRezervacija', RezervacijaController.delete);

reservationRouter.post(
  '/onetime',
  RezervacijaController.createJednokratnaController
);
