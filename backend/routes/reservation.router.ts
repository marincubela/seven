import express from 'express';

import { RezervacijaController } from '../controllers/rezervacija/RezervacijaController';

export const reservationRouter = express.Router();

reservationRouter.get('/:idReservation', RezervacijaController.get);

reservationRouter.delete('/:idReservation', RezervacijaController.delete);

reservationRouter.get('/:idKlijent', RezervacijaController.getFromClient);
