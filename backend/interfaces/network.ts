import { Request, Response } from 'express';
import { Session } from 'express-session';

import { ISessionUserDTO } from '../dtos/SessionUserDTO';

export interface ISession extends Session {
  user?: ISessionUserDTO;
}

export interface IRequest extends Request {
  session: ISession;
}

export interface IResponse extends Response {}
