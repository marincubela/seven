import express from 'express';

import { IResponse } from '../interfaces/network';
import { IRequest } from '../interfaces/network';
import { PostSessionController } from '../controllers/session/PostSessionController';

export const sessionRouter = express.Router();

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
sessionRouter.get('/', async (req: any, res) => {
  if (req.session.user) {
    return res.json({
      data: {
        user: req.session.user,
      },
    });
  }

  return res.status(401).json({
    errors: [
      {
        message: 'Korisnik nije prijavljen.',
      },
    ],
  });
});

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
sessionRouter.post('/', async (req: IRequest, res: IResponse) => {
  new PostSessionController().execute(req, res);
});

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
sessionRouter.delete('/', async (req: any, res) => {
  if (req.session.user) {
    req.session.user = null;

    return res.json({
      data: {
        user: null,
      },
    });
  }

  return res.status(401).json({
    errors: [
      {
        message: 'Korisnik nije prijavljen',
      },
    ],
  });
});
