const express = require('express');
const router = express.Router();
const Racun = require('../models/Racun');
const Klijent = require('../models/Klijent');
const Tvrtka = require('../models/Tvrtka');
const { body } = require('express-validator');

// Will create a Racun model
const createAccount = (accountData) => {};

// Will create a Klijent accountđ
router.post(
  '/user',
  [
    // email field needs to be an email
    body('data.email').isEmail(),

    // password field is required
    body('data.password').not().isEmpty(),

    // OIB field length must be 11
    body('data.OIB').isLength({ min: 11, max: 11 }).isNumeric(),

    // Name field must consists of letters
    body('data.firstname').isAlpha(),

    // Surname field must consists of letters
    body('data.lastname').isAlpha(),

    // Credit card must consists of 16 numbers
    body('data.creditCard').isLength({ min: 16, max: 16 }).isNumeric(),
  ],
  async (req, res, next) => {
    const emailCheck = await Racun.findOne({
      where: emailCheck,
    });
  }
);

// Will create a Tvrtka account
router.post(
  '/firm',
  [
    // email field needs to be an email
    body('data.email').isEmail(),

    // password field is required
    body('data.password').not().isEmpty(),

    // OIB field length must be 11
    body('data.OIB').isLength({ min: 11, max: 11 }).isNumeric(),

    // Name field must consists of letters
    body('data.name').isAlpha(),

    // Surname field must consists of letters
    body('data.surname').isAlpha(),

    // Credit card must consists of 16 numbers
    body('data.creditCard').isLength({ min: 16, max: 16 }).isNumeric(),
  ],
  async (req, res, next) => {
    const emailCheck = await Racun.findOne({
      where: emailCheck,
    });
  }
);

module.exports = router;
