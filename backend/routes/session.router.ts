import express from 'express';

import { SessionController } from '../controllers/session/SessionController';

export const sessionRouter = express.Router();

sessionRouter.get('/', SessionController.get);

sessionRouter.post('/', SessionController.create);

sessionRouter.delete('/', SessionController.delete);

/*
  This endpoint is used for checking if a user is logged in or not

  If user is logged in, this will retun with status 200 and:
  {
    data: {
      user: {
        id: integer,
        email: string,
        password: string,
      }
    }
  }
  User object from data is also stored in session.user

  If user is not logged, this will return with status 401 and:
  {
    errors: [
      {
        message: string,
      }
    ]
  }
 */

// Will create a new session for a user (login)
/*
  This endpoint is used for logging user in.

  This is expecting:
  {
    data: {
      email: string,
      password: string
    }
  }
  If user is logged in, this will retun with status 200 and:
  {
    data: {
      user: {
        id: integer,
        email: string,
        admin: boolean,
      }
    }
  }
  User object from data is also stored in session.user

  If user is not logged, this will return with status 400 and:
  {
    errors: [
      {
      message: string,
      }
    ]
  }
*/

// sessionRouter.post('/', async (req: IRequest, res: IResponse) => {
//   new PostSessionController().execute(req, res);
// });

/*
  This endpoint is used for deleting user from a session (logout).
  If user is logged out, this will return with status code 200 and data.user = null.

  If user is not logged, this will return with status 401 and:
  {
    errors: [
      {
        message: string,
      }
    ]
  }
*/
sessionRouter.delete('/', SessionController.delete);
