import express from 'express';

import { ParkiralisteController } from '../controllers/parkiraliste/ParkiralisteController';

export const parkingRouter = express.Router();

parkingRouter.post('/', ParkiralisteController.create);

parkingRouter.delete('/:idParkiraliste', ParkiralisteController.delete);

parkingRouter.get('/all', ParkiralisteController.getAll);

parkingRouter.get('/:idParkiraliste', ParkiralisteController.get);
