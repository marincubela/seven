const express = require('express');
const session = require('express-session');
const { body, validationResult } = require('express-validator');

const Racun = require('../models/Racun');
const { arePasswordEqual } = require('../utils/password');

const router = express.Router();

// Will return user if a user is logged in
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
      message: 'Korisnik nije prijavljen',
    },
  });
});

// Will create a new session for a user (login)
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

    account = account ? account.toJSON() : account;

    const passwordMatch = await arePasswordEqual(password, account.lozinka);

    if (!account || !passwordMatch) {
      return res.status(400).json({
        error: {
          message: 'Neispravni podatci za prijavu',
        },
      });
    }

    req.session.user = account;

    return res.status(200).json({
      data: {
        user: req.session.user,
      },
    });
  }
);

// Will delete user from a session (logout)
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
