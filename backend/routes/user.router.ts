import { UserController } from '../controllers/user/UserController';
import { KlijentController } from '../controllers/klijent/KlijentController';
import { TvrtkaController } from '../controllers/tvrtka/TvrtkaController';
import express from 'express';

export const userRouter = express.Router();
userRouter.delete('/:idRacun', UserController.delete);

userRouter.get('/all', UserController.getAll);

userRouter.get('/:idRacun', UserController.get);

userRouter.get('/company/:idRacun', TvrtkaController.get);

userRouter.patch('/client/:idRacun', KlijentController.update);

userRouter.patch('/company/:idRacun', TvrtkaController.update);
