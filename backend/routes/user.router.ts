import { UserController } from '../controllers/user/UserController';
import { KlijentController } from '../controllers/klijent/KlijentController';
import { TvrtkaController } from '../controllers/tvrtka/TvrtkaController';
import express from 'express';

export const userRouter = express.Router();
userRouter.delete('/:idRacun', UserController.delete);

userRouter.get('/all', UserController.getAll);

userRouter.get('/:idRacun', UserController.get);

userRouter.patch('/client/update', KlijentController.update);

userRouter.patch('/company/update', TvrtkaController.update);
