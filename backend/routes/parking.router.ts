import express from 'express';

import { ParkiralisteController } from '../controllers/parkiraliste/ParkiralisteController';

export const parkingRouter = express.Router();

parkingRouter.post('/', ParkiralisteController.create);
