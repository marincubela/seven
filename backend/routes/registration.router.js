const express = require('express');
const router = express.Router();
const Racun = require('../models/Racun');
const Klijent = require('../models/Klijent');
const Tvrtka = require('../models/Tvrtka');
const { body, validationResult } = require('express-validator');
const { hashPassword } = require('../utils/password');

// Will create a Racun model
const createAccount = async ({ email, oib, password }) => {
  const user = await Racun.create({
    email,
    OIB: oib,
    admin: false,
    lozinka: await hashPassword(password),
  });

  return user;
};

//Will create a Tvrtka model
const createCompany = (accountData) => {};

//Will create a Klijent model
const createClient = async ({ name, surname, number }) => {
  if (!(await creditCardCheck(creditCardNumber))) {
    return res.status(400).json({
      error: {
        message: 'Klijent s tom karticom već postoji',
      },
    });
  }

  const client = await Klijent.create({
    idKlijent: id,
    prezime: surname,
    ime: name,
    brojKartice: number,
  });
};

let emailCheck = async (email) => {
  const accountWithEmail = await Racun.findOne({
    where: {
      email,
    },
  });

  return Boolean(accountWithEmail);
};

let oibCheck = async (oib) => {
  const accountWithOIB = await Racun.findOne({
    where: {
      OIB: oib,
    },
  });

  return Boolean(accountWithOIB);
};

let creditCardCheck = async (number) => {
  const accountWithCardNumber = await Klijent.findOne({
    where: {
      brojKartice: number,
    },
  });

  return Boolean(accountWithCardNumber);
};

let getUserId = async () => {
  return 1 + (await Klijent.count());
};

// Will create a Klijent accountđ
router.post(
  '/user',
  [
    // email field needs to be an email
    body('data.email')
      .isEmail()
      .custom((email) =>
        emailCheck(email).then((emailExist) => {
          if (emailExist) {
            Promise.reject('Račun u uporabi');
          }
        })
      ),

    // password field is required
    body('data.password').not().isEmpty(),

    // OIB field length must be 11
    body('data.oib')
      .isLength({ min: 11, max: 11 })
      .isNumeric()
      .custom((oib) =>
        oibCheck(oib).then((oibExist) => {
          if (oibExist) {
            Promise.reject('Račun u uporabi');
          }
        })
      ),
    // Name field must consists of letters
    body('data.firstname')
      .not()
      .isEmpty()
      .withMessage('Ime je prazno')
      .isAlpha()
      .withMessage('Ime nije ispravno'),

    // Surname field must consists of letters
    body('data.lastname').isAlpha(),

    // Credit card must consists of 16 numbers
    body('data.creditCardNumber')
      .not()
      .isEmpty()
      .withMessage('Kreditna kartica ne smije biti prazna')
      .isNumeric()
      .withMessage('Kreditna kartica mora sadržavati samo brojeve')
      .isLength({ min: 16, max: 16 })
      .withMessage('Kreditna kartica mora sadržavati 16 brojeva')
      .custom((creditCard) =>
        creditCardCheck(creditCard).then((creditCardExist) => {
          if (creditCardExist) {
            Promise.reject('Račun u uporabi');
          }
        })
      ),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      email,
      oib,
      creditCardNumber,
      firstname,
      lastname,
      password,
    } = req.body.data;

    var user = await createAccount({ email, oib, password });

    await createClient(id, firstname, lastname, creditCardNumber);

    req.session.user = {
      id: user.id,
      email: user.email,
      admin: user.admin,
    };

    return res.status(200).json({
      data: {
        user: req.session.user,
      },
    });
  }
);

// Will create a Tvrtka account
router.post(
  '/company',
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
