const express = require('express');
const router = express.Router();
const Racun = require('../models/Racun');
const Klijent = require('../models/Klijent');
const Tvrtka = require('../models/Tvrtka');
const { body } = require('express-validator');

// Will return user if a user is logged in
router.get('/', (req, res, next) => {
  if (req.session.user) {
    return res.json({
      data: {
        user: req.session.user,
      },
    });
  }
});

router.post(
  '/',
  [
    // email field needs to be an email
    body('email').isEmail(),

    // password field is required
    body('password').not().isEmpty(),

    // OIB field length must be 11
    body('OIB').isLength({ min: 11, max: 11 }).isNumeric(),

    // Name field must consists of letters
    body('name').isAlpha(),

    // Surname field must consists of letters
    body('surname').isAlpha(),

    // Credit card must consists of 16 numbers
    body('creditCard').isLength({ min: 16, max: 16 }).isNumeric(),
  ],
  async (req, res, next) => {
    const emailCheck = await Racun.findOne({
      where: emailCheck,
    });
  }
);

module.exports = router;
