import express from 'express';

import { ParkiralisteController } from '../controllers/parkiraliste/ParkiralisteController';

export const parkingRouter = express.Router();

parkingRouter.get('/all', ParkiralisteController.getAll);

parkingRouter.get('/company/:idRacun', ParkiralisteController.getFromCompany);

parkingRouter.get('/:idParkiraliste', ParkiralisteController.get);

parkingRouter.post('/', ParkiralisteController.create);

parkingRouter.delete('/:idParkiraliste', ParkiralisteController.delete);
