import express from 'express';

import { VoziloController } from '../controllers/vozilo/VoziloController';

export const vehicleRouter = express.Router();

vehicleRouter.post('/', VoziloController.create);
vehicleRouter.delete('/:idVozilo', VoziloController.delete);