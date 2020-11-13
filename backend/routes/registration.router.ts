import express from 'express';

import { KlijentController } from '../controllers/klijent/KlijentController';
import { TvrtkaController } from '../controllers/tvrtka/TvrtkaController';

export const registrationRouter = express.Router();

registrationRouter.post('/user', KlijentController.create);

registrationRouter.post('/company', TvrtkaController.create);
