const express = require('express');
const { body, validationResult } = require('express-validator');

const Racun = require('../models/Racun');
const { arePasswordEqual } = require('../utils/password');

const router = express.Router();

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
    error: {
      message: string,
    }
  }
 */
router.get('/', async (req, res) => {
  if (req.session.user) {
    return res.json({
      data: {
        user: req.session.user,
      },
    });
  }

  return res.status(401).json({
    error: {
      message: 'Korisnik nije prijavljen.',
    },
  });
});

// Will create a new session for a user (login)
/*
  This endpoint is used for logging user in.

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
    error: {
      message: string,
    }
  }
*/
router.post(
  '/',
  [
    // email field needs to be an email
    body('data.email').isEmail(),

    // password field is required
    body('data.password').not().isEmpty(),
  ],
  async (req, res, next) => {
    const { email, password } = req.body.data;

    let account = await Racun.findOne({
      where: {
        email,
      },
    });

    account = account ? account.toJSON() : {};

    const passwordMatch = await arePasswordEqual(password, account.lozinka);

    if (!account || !passwordMatch) {
      return res.status(400).json({
        error: {
          message: 'Neispravni podatci za prijavu',
        },
      });
    }

    req.session.user = {
      id: account.id,
      email: account.email,
      admin: account.admin,
    };

    return res.status(200).json({
      data: {
        user: req.session.user,
      },
    });
  }
);

/*
  This endpoint is used for deleting user from a session (logout).
  If user is logged out, this will return with status code 200 and data.user = null.

  If user is not logged, this will return with status 401 and:
  {
    error: {
      message: string,
    }
  } 
*/
router.delete('/', async (req, res) => {
  if (req.session.user) {
    req.session.user = null;

    return res.json({
      data: {
        user: null,
      },
    });
  }

  return res.status(401).json({
    error: {
      message: 'Korisnik nije prijavljen',
    },
  });
});

module.exports = router;
