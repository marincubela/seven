import express from 'express';

import { SessionController } from '../controllers/session/SessionController';

export const sessionRouter = express.Router();

sessionRouter.get('/', SessionController.get);

sessionRouter.post('/', SessionController.create);

sessionRouter.delete('/', SessionController.delete);
