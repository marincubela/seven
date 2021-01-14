import { JednokratnaController } from '../controllers/jednokratna/JednokratnaController';
import express from 'express';

import { RezervacijaController } from '../controllers/rezervacija/RezervacijaController';
import { PonavljajucaController } from '../controllers/ponavljajuca/PonavljajucaController';
import { TrajnaController } from '../controllers/trajna/TrajnaController';

export const reservationRouter = express.Router();

reservationRouter.get('/:idRezervacija', RezervacijaController.get);

reservationRouter.get('', RezervacijaController.getFromClient);

reservationRouter.delete('/:idRezervacija', RezervacijaController.delete);

reservationRouter.post('/onetime', JednokratnaController.create);
reservationRouter.post('/permanent', TrajnaController.create);
reservationRouter.post('/repetitive', PonavljajucaController.create);

reservationRouter.patch(
  '/onetime/:idRezervacija',
  JednokratnaController.update
);

reservationRouter.patch(
  '/repetitive/:idRezervacija',
  PonavljajucaController.update
);

reservationRouter.patch(
  '/permanent/:idRezervacija',
  TrajnaController.update
);
