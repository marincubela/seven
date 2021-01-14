import express from 'express';

import { ParkiralisteController } from '../controllers/parkiraliste/ParkiralisteController';

export const parkingRouter = express.Router();

parkingRouter.get('/all', ParkiralisteController.getAll);

parkingRouter.get('/:idParkiraliste', ParkiralisteController.get);

parkingRouter.get('', ParkiralisteController.getFromCompany);

parkingRouter.post('/', ParkiralisteController.create);

parkingRouter.delete('/:idParkiraliste', ParkiralisteController.delete);

parkingRouter.patch('/:idParkiraliste', ParkiralisteController.update);
