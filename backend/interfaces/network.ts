import { Request, Response } from 'express';
import { Session } from 'express-session';

import { SessionUserDTO } from '../dtos/SessionUserDTO';

export interface ISession extends Session {
  user?: SessionUserDTO;
}

export interface IRequest extends Request {
  session: ISession;
}

export interface IResponse extends Response {}
